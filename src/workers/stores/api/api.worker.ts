import {
    type SmallBuildingsMap,
    updateBuildingTypeIfSmall,
} from '@workers/stores/api/buildings.worker';
import { TypedMultiWorker, type WorkerSelf } from '@workers/TypedWorker';

import checkRequestInit from '../../../importableScripts/checkRequestInit';
import LSSMStorage from '../../../importableScripts/LSSMStorage';

import type { Building } from 'typings/Building';
import type { Mission } from 'typings/Mission';
import type { SchoolingAPI } from 'typings/api/Schoolings';
import type { Vehicle } from 'typings/Vehicle';
import type { APIKey, APIs } from '@stores/api';

export type MissionsById = Record<Mission['id'], Mission>;
export type MissionsArray = Mission[];

interface MissionTypes {
    missions: MissionsById;
    missionArray: MissionsArray;
}

type ApiFetchResults = APIs & {
    vehicles: Vehicle[];
    buildings: Building[];
    alliance_buildings: Building[];
    schoolings: SchoolingAPI;
    alliance_schoolings: SchoolingAPI;
};

export interface ApiResult<Api extends APIKey> {
    // a hash of the raw response, identifying the current data of this API
    version: string;
    // only included if the window does not know this version yet
    data?: APIs[Api];
}

// windows listening to `api:<name>` receive the new data whenever an API has changed
export type ApiEvents = {
    [Api in APIKey as `api:${Api}`]: { version: string; data: APIs[Api] };
};

interface ApiWorkerState {
    lastUpdates: Map<APIKey, number>;
    apiStorage: Partial<APIs>;
    apiVersions: Map<APIKey, string>;
    // requests that are currently running, shared by all windows. They resolve to the version of the API
    runningFetches: Map<APIKey, Promise<string>>;
    // the arguments of the last request of each API, used to refresh it in the background
    refreshArgs: Map<
        APIKey,
        { init: RequestInit; smallBuildingsMap: SmallBuildingsMap }
    >;
    nextRefresh: Map<APIKey, number>;
    refreshTimer: ReturnType<typeof setInterval>;
    loadApi(
        api: APIKey,
        init: RequestInit,
        smallBuildingsMap: SmallBuildingsMap
    ): Promise<string>;
    missions: MissionsById;
    missionArray: MissionsArray;
}

const scripts = {
    checkRequestInit,
    updateBuildingTypeIfSmall,
    LSSMStorage,
} as const;

type Self = WorkerSelf<ApiWorkerState, typeof scripts, ApiEvents>;

// CAVEAT: Each method is stringified (see TypedWorker), so it must not reference anything outside its own body!
const methods = {
    fetchApi: async <Api extends APIKey>(
        self: Self,
        api: Api,
        init: RequestInit,
        smallBuildingsMap: SmallBuildingsMap,
        knownVersion?: string
    ): Promise<ApiResult<Api>> => {
        // this is not the 5 Minutes used in API store to avoid issues with different transaction times etc.
        const API_UPDATE_AFTER = ['schoolings', 'alliance_schoolings'].includes(
            api
        )
            ? 30 * 1000 // 30 seconds for schoolings
            : 4.5 * 60 * 1000; // 4 Minutes and 30 seconds
        // APIs that windows listen to are refreshed in the background this often
        const REFRESH_AFTER = 5 * 60 * 1000;
        // if a refresh failed (e.g. logged out), the stored data is kept and the refresh is retried after this time
        const RETRY_AFTER = 60 * 1000;

        self.lastUpdates ??= new Map();
        self.apiStorage ??= {};
        self.apiVersions ??= new Map();
        self.runningFetches ??= new Map();
        self.refreshArgs ??= new Map();
        self.nextRefresh ??= new Map();

        self.checkRequestInit(init);
        self.refreshArgs.set(api, { init, smallBuildingsMap });

        // fetches an API and stores it. If the data has changed, it is published to the windows listening to it.
        self.loadApi ??= (loadedApi, loadInit, loadSmallBuildingsMap) => {
            // if another window is already fetching this API, wait for that request instead of sending another one
            const running = self.runningFetches.get(loadedApi);
            if (running) return running;

            const postProcess = <ProcessedApi extends APIKey>(
                res: ApiFetchResults[ProcessedApi]
            ): APIs[ProcessedApi] => {
                // we want to store vehicles and buildings by ID for easier access
                // TODO: Remove Array.isArray check and casts when Typescript extends oneof is available
                if (
                    Array.isArray(res) &&
                    (loadedApi === 'vehicles' ||
                        loadedApi === 'buildings' ||
                        loadedApi === 'alliance_buildings')
                ) {
                    // @ts-expect-error unfortunately, typescript doesn't understand that we're filtering here (we need the extends oneof!)
                    const byId: APIs[ProcessedApi] = {};
                    for (const item of res) {
                        if ('small_building' in item) {
                            byId[item.id] = self.updateBuildingTypeIfSmall(
                                item,
                                loadSmallBuildingsMap
                            );
                        } else {
                            byId[item.id] = item;
                        }
                    }
                    return byId;
                } else if (
                    'result' in res &&
                    (loadedApi === 'schoolings' ||
                        loadedApi === 'alliance_schoolings')
                ) {
                    return res.result as APIs[ProcessedApi];
                }

                return res;
            };

            // TODO: Add support for paged API (/api/v2) for supported APIs (vehicles)

            const request = (async () => {
                const res = await fetch(
                    new URL(`/api/${loadedApi}`, location.origin),
                    loadInit
                );
                if (!res.ok) {
                    throw new Error(
                        `Fetching API ${loadedApi} failed with status ${res.status}`
                    );
                }
                const text = await res.text();
                const version = new Uint8Array(
                    await crypto.subtle.digest(
                        'SHA-256',
                        new TextEncoder().encode(text)
                    )
                ).toHex();
                // most of the time, the data has not changed. Then, nothing has to be parsed or sent to the windows
                if (version !== self.apiVersions.get(loadedApi)) {
                    const data = postProcess(JSON.parse(text));
                    // TypeScript cannot narrow the union of all APIs here
                    (self.apiStorage as Record<APIKey, unknown>)[loadedApi] =
                        data;
                    self.apiVersions.set(loadedApi, version);
                    self.publish(`api:${loadedApi}`, {
                        version,
                        data,
                    } as ApiEvents[`api:${APIKey}`]);
                }
                self.lastUpdates.set(loadedApi, Date.now());
                self.nextRefresh.set(loadedApi, Date.now() + REFRESH_AFTER);
                return version;
            })().finally(() => self.runningFetches.delete(loadedApi));
            self.runningFetches.set(loadedApi, request);
            return request;
        };

        // one timer in the worker refreshes the APIs windows listen to, so that windows don't need their own timers
        self.refreshTimer ??= setInterval(
            () =>
                self.nextRefresh.forEach((next, refreshedApi) => {
                    const args = self.refreshArgs.get(refreshedApi);
                    if (
                        next > Date.now() ||
                        !args ||
                        !self.hasSubscribers(`api:${refreshedApi}`)
                    )
                        return;
                    self.loadApi(
                        refreshedApi,
                        args.init,
                        args.smallBuildingsMap
                    ).catch(() =>
                        self.nextRefresh.set(
                            refreshedApi,
                            Date.now() + RETRY_AFTER
                        )
                    );
                }),
            30 * 1000
        );

        // if the API has been fetched recently, use the stored version
        let version = self.apiVersions.get(api);
        if (
            !version ||
            (self.lastUpdates.get(api) ?? 0) <= Date.now() - API_UPDATE_AFTER
        )
            version = await self.loadApi(api, init, smallBuildingsMap);

        return {
            version,
            data:
                version === knownVersion
                    ? undefined
                    : (self.apiStorage[api] as APIs[Api]),
        };
    },
    fetchBuilding: async (
        self: Self,
        buildingId: Building['id'],
        init: RequestInit,
        smallBuildingsMap: SmallBuildingsMap
    ): Promise<Building> => {
        self.checkRequestInit(init);

        return fetch(
            new URL(`/api/buildings/${buildingId}`, location.origin),
            init
        )
            .then<Building>(res => res.json())
            .then(building =>
                self.updateBuildingTypeIfSmall(building, smallBuildingsMap)
            );
    },
    fetchAllianceBuilding: async (
        self: Self,
        buildingId: Building['id'],
        init: RequestInit,
        smallBuildingsMap: SmallBuildingsMap
    ): Promise<Building> => {
        self.checkRequestInit(init);

        return fetch(
            new URL(`/api/alliance_buildings/${buildingId}`, location.origin),
            init
        )
            .then<Building>(res => res.json())
            .then(building =>
                self.updateBuildingTypeIfSmall(building, smallBuildingsMap)
            );
    },
    fetchVehicle: async (
        self: Self,
        vehicleId: Vehicle['id'],
        init: RequestInit
    ): Promise<Vehicle> => {
        self.checkRequestInit(init);

        // TODO: switch to API V2 here

        return fetch(
            new URL(`/api/vehicles/${vehicleId}`, location.origin),
            init
        ).then(res => res.json());
    },
    fetchVehiclesAtBuilding: async (
        self: Self,
        buildingId: Building['id'],
        init: RequestInit
    ): Promise<Vehicle[]> => {
        self.checkRequestInit(init);

        // TODO: switch to API V2 here

        return fetch(
            new URL(`/api/buildings/${buildingId}/vehicles`, location.origin),
            init
        ).then(res => res.json());
    },
    fetchMissionTypes: async (
        self: Self,
        locale: string,
        init: RequestInit
    ): Promise<MissionTypes> => {
        self.checkRequestInit(init);

        if (self.missions)
            return { missions: self.missions, missionArray: self.missionArray };

        return fetch(`${SERVER}missions/${locale}.json`, init)
            .then(res => res.json())
            .then((missions: MissionsById) => {
                self.missions = missions;
                self.missionArray = Object.values(missions);
                const storage = new self.LSSMStorage();
                storage.storeMissionTypes(missions).then();
                return { missions, missionArray: self.missionArray };
            })
            .catch(async () => {
                // if the fetch fails, try to get the missionTypes from indexedDB
                const storage = new self.LSSMStorage();
                const missionTypes = await storage.getMissionTypes();
                self.missions = missionTypes;
                self.missionArray = Object.values(missionTypes);
                return {
                    missions: missionTypes,
                    missionArray: self.missionArray,
                };
            });
    },
};

/**
 * All requests of the API store run in this single SharedWorker, so that all windows share one cache.
 */
export default new TypedMultiWorker<
    ApiWorkerState,
    typeof methods,
    ApiEvents,
    typeof scripts
>('api', methods, scripts, {
    // this worker combines the former single workers of the API store
    replaces: [
        'api/fetch.worker',
        'api/buildings.single.worker',
        'api/alliance_buildings.single.worker',
        'api/vehicles.single.worker',
        'api/vehicles.building.worker',
        'api/missionTypes.worker',
    ],
});
