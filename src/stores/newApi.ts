import { ref, type Ref } from 'vue';
// well, we cannot set default type import + non-default non-type import
// eslint-disable-next-line no-duplicate-imports
import type Vue from 'vue';

import { defineStore } from 'pinia';
import FetchApiWorker from '@workers/stores/api/fetchApi.worker';

import type { Vehicle } from 'typings/Vehicle';

export interface APIs {
    vehicles: Vehicle[];
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
        vehicles: ref<Vehicle[]>([]),
    };
    const lastUpdates = new Map<APIKey, number>();

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
     */
    const _storeApi = <Api extends APIKey>(api: Api, value: APIs[Api]) => {
        apiStorage[api].value = value;
        lastUpdates.set(api, Date.now());

        // TODO: Update fake-computed for heavy calculations with many iterations (switch-case and extra methods)
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
                .then(value => {
                    // store the value in the ref and set latest update time
                    _storeApi(api, value);

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
        // state: APIs
        ...apiStorage,
        // actions: get API data
        getVehicles: (feature: string) =>
            _getStoredOrFetch('vehicles', feature),
    };
});

// TODO: Rename to useAPIStore
export const useNewAPIStore: () => ReturnType<typeof defineNewAPIStore> = () =>
    (window[PREFIX] as Vue)?.$stores?.newApi ?? defineNewAPIStore();
