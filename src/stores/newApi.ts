import { ref, type Ref } from 'vue';
// well, we cannot set default type import + non-default non-type import
// eslint-disable-next-line no-duplicate-imports
import type Vue from 'vue';

import { defineStore } from 'pinia';
import FetchApiWorker from '@workers/stores/api/fetchApi.worker';
import VehiclesWorker from '@workers/stores/api/vehicles.worker';

import type { Vehicle } from 'typings/Vehicle';

// TODO: Switch to Maps instead of plain objects after switching to Vue3 (Vue2 does not support Maps without some hacks)
export interface APIs {
    vehicles: Record<number, Vehicle>;
}
export type APIKey = keyof APIs;

type PromiseParam<ReturnType> = Parameters<
    ConstructorParameters<typeof Promise<ReturnType>>[0]
>;
type ApiUpdatePromise<Api extends APIKey> = readonly [
    PromiseParam<APIs[Api]>[0],
    PromiseParam<APIs[Api]>[1],
];

type RunningUpdatesMap = {
    [Api in APIKey]?: ApiUpdatePromise<Api>[];
};

const API_UPDATE_AFTER = 5 * 60 * 1000; // 5 Minutes

// TODO: Rename to defineAPIStore and id to api
export const defineNewAPIStore = defineStore('newApi', () => {
    // TODO: fetch secretKey from according endpoint
    const secretKey = ref<string>('');
    const currentlyRunningUpdates: RunningUpdatesMap = {};

    // we're storing the refs in an object to make it easier to access them dynamically
    const apiStorage: {
        [Api in APIKey]: Ref<APIs[Api]>;
    } = {
        vehicles: ref<APIs['vehicles']>({}),
    };
    const lastUpdates = new Map<APIKey, number>();

    // region computed values and fake-computed values for vehicles
    // fake computed values require many iterations and are not suitable for the main thread
    // for performance reasons, they are calculated in a worker
    const vehiclesArray = ref<Vehicle[]>([]);
    const vehicleStates = ref<Record<Vehicle['fms_real'], number>>({});
    const vehiclesByTarget = ref<
        Map<Vehicle['target_type'], Map<Vehicle['target_id'], Set<Vehicle>>>
    >(new Map());
    const vehiclesByType = ref<Map<Vehicle['vehicle_type'], Set<Vehicle>>>(
        new Map()
    );
    const vehiclesByBuilding = ref<Map<Vehicle['building_id'], Set<Vehicle>>>(
        new Map()
    );
    // endregion

    /**
     * Modify a RequestInit object to include the LSSM headers.
     * @param init - A RequestInit object that should be extended.
     * @param feature - The feature that is requesting the API.
     * @param isRequestToLSSMServer - A boolean indicating whether the request is to the LSSM server.
     * @returns The modified RequestInit object.
     */
    const _getRequestInit = (
        init: RequestInit,
        feature: string,
        isRequestToLSSMServer = false
    ) => {
        init.mode ||= 'cors';
        init.cache ||= 'no-cache';

        // convert headers to be a Headers object for easier manipulation
        init.headers = new Headers(init.headers);

        init.headers.set('X-LSS-Manager', VERSION);
        init.headers.set('X-LSS-Manager-Branch', BRANCH);
        init.headers.set('X-LSS-Manager-Feature', feature);

        if (isRequestToLSSMServer) {
            init.headers.set(
                'X-LSSM-User',
                btoa(`${secretKey.value}:${VERSION}-${MODE}`)
            );
        }

        // convert headers back to a plain object, otherwise it's not cloneable
        init.headers = Object.fromEntries(init.headers);

        return init;
    };

    /**
     * Store the API in the store and update the last update time.
     * Also calls a method to update the fake-computed values.
     * @param api - The API to store.
     * @param value - The value to store.
     * @returns A void promise.
     */
    const _storeApi = async <Api extends APIKey>(
        api: Api,
        value: APIs[Api]
    ) => {
        apiStorage[api].value = value;
        lastUpdates.set(api, Date.now());

        if (api === 'vehicles') {
            await VehiclesWorker.run(value).then(calculations => {
                vehiclesArray.value = calculations.vehiclesArray;
                vehicleStates.value = calculations.vehicleStates;
                vehiclesByTarget.value = calculations.vehiclesByTarget;
                vehiclesByType.value = calculations.vehiclesByType;
                vehiclesByBuilding.value = calculations.vehiclesByBuilding;
            });
        }

        return Promise.resolve(value);
    };

    /**
     * Fetch the API and update the store.
     * Do not fetch the API if there is already an update running but still resolve with the result of currently running update.
     * @param api - The API to fetch.
     * @param feature - The feature that is requesting the API.
     * @returns A promise that resolves with the fetched data.
     */
    const _updateAPI = <Api extends APIKey>(api: Api, feature: string) =>
        new Promise<APIs[Api]>((res, rej) => {
            // resolve and reject will be called when the fetch is done
            const callbackPromise = [res, rej] as const;

            // if there are callbacks
            const updateIsRunning =
                (currentlyRunningUpdates[api]?.length ?? 0) > 0;

            // add the "callback" to the list of callbacks
            currentlyRunningUpdates[api] ??= [];
            currentlyRunningUpdates[api]?.push(callbackPromise);

            // if there is already an update running, we don't need to start a new one
            if (updateIsRunning) return;

            const feat = `apiStore/_updateAPI:${api}(${feature})`;

            // let's start the update on a worker
            FetchApiWorker.run(api, _getRequestInit({}, feat))
                .then(value => _storeApi(api, value))
                .then(value => {
                    // success! let's resolve all the callbacks
                    let callback = currentlyRunningUpdates[api]?.shift();
                    while (callback) {
                        const [resolve] = callback;
                        resolve(value);
                        callback = currentlyRunningUpdates[api]?.shift();
                    }
                })
                .catch(value => {
                    // error! let's reject all the callbacks
                    let callback = currentlyRunningUpdates[api]?.shift();
                    while (callback) {
                        const [, reject] = callback;
                        reject(value);
                        callback = currentlyRunningUpdates[api]?.shift();
                    }
                });
        });

    /**
     * Returns the stored value of an API or fetches it if it's older than API_UPDATE_AFTER.
     * @param api - The API to get the value for.
     * @param feature - The feature that is requesting the API.
     * @returns A promise that resolves with the current API data.
     */
    const _getStoredOrFetch = <Api extends APIKey>(
        api: Api,
        feature: string
    ) => {
        const lastUpdate = lastUpdates.get(api) ?? 0;
        if (Date.now() - lastUpdate > API_UPDATE_AFTER)
            return _updateAPI(api, feature);
        return Promise.resolve(apiStorage[api].value);
    };

    return {
        // TODO: remove the lastUpdate things, this is only for debugging purposes
        lastUpdates,
        // state: APIs
        ...apiStorage,
        // getters: get computed and fake-computed values
        vehiclesArray,
        vehicleStates,
        vehiclesByTarget,
        vehiclesByType,
        vehiclesByBuilding,
        // actions: get API data
        getVehicles: (feature: string, returnAsArray = false) =>
            // for legacy reasons, optionally return the vehicles as an array
            _getStoredOrFetch('vehicles', feature).then(vehicles =>
                returnAsArray ? vehiclesArray.value : vehicles
            ),
    };
});

// TODO: Rename to useAPIStore
export const useNewAPIStore: () => ReturnType<typeof defineNewAPIStore> = () =>
    (window[PREFIX] as Vue)?.$stores?.newApi ?? defineNewAPIStore();
