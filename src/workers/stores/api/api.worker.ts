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

// APIs whose single entries (vehicles and buildings) can be updated, e.g. by radio messages
export type EntityApi = 'alliance_buildings' | 'buildings' | 'vehicles';
type Entity = Building | Vehicle;

// windows listening to `api:<name>` receive the new data whenever an API has changed
// windows listening to `entities:<name>` receive single vehicles or buildings that have changed
export type ApiEvents = {
    [Api in APIKey as `api:${Api}`]: { version: string; data: APIs[Api] };
} & {
    [Api in EntityApi as `entities:${Api}`]: {
        entities: APIs[Api][number][];
        // the version of the API after and before this change, see storeEntities
        version?: string;
        previousVersion?: string;
    };
};

/**
 * Stores single vehicles or buildings in the worker and sends those that have changed to the windows.
 * The same change usually arrives several times, for example a radio message in every tab of the main page.
 * So only entities that differ from the stored ones are sent.
 * The stored data then differs from the last response, so the API gets a new version: The next refresh sends the full
 * data again, which corrects wrong updates, and windows that missed the change (like frozen pages) know they are outdated.
 * CAVEAT: This function is stringified (see TypedWorker), so it must not reference anything outside its own body!
 * @param self - The scope of the worker.
 * @param api - The API the entities belong to.
 * @param entities - The vehicles or buildings to store.
 * @returns The entities, merged with the stored ones.
 */
const storeEntities = <StoredEntity extends Entity>(
    self: {
        apiStorage?: Partial<Record<EntityApi, Record<number, Entity>>>;
        apiVersions?: Map<string, string>;
        publish(event: string, data: unknown): void;
    },
    api: EntityApi,
    entities: StoredEntity[]
): StoredEntity[] => {
    const stored = self.apiStorage?.[api];
    // the APIs of single entities lack some fields of the full APIs (e.g. assigned_equipments of vehicles),
    // so entities are merged into the stored ones to keep those fields
    const merged = entities.map(
        entity => ({ ...stored?.[entity.id], ...entity }) as StoredEntity
    );
    const changed = merged.filter(
        entity =>
            !stored ||
            JSON.stringify(stored[entity.id]) !== JSON.stringify(entity)
    );
    if (!changed.length) return merged;

    const previousVersion = self.apiVersions?.get(api);
    let version: string | undefined = undefined;
    if (stored) {
        changed.forEach(entity => (stored[entity.id] = entity));
        if (previousVersion) {
            // a version that never equals the hash of a response
            version = `${previousVersion.split('+')[0]}+${crypto.randomUUID()}`;
            self.apiVersions?.set(api, version);
        }
    }
    self.publish(`entities:${api}`, {
        entities: changed,
        version,
        previousVersion,
    });
    return merged;
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
        smallBuildingsMap: SmallBuildingsMap,
        // background refreshes don't store responses that are not ok (e.g. when logged out)
        isBackgroundRefresh?: boolean
    ): Promise<string>;
    missions: MissionsById;
    missionArray: MissionsArray;
}

const scripts = {
    checkRequestInit,
    updateBuildingTypeIfSmall,
    LSSMStorage,
    storeEntities,
} as const;

type Self = WorkerSelf<ApiWorkerState, typeof scripts, ApiEvents>;
// storeEntities only needs a part of the scope
type EntityScope = Parameters<typeof storeEntities>[0];

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
        self.loadApi ??= (
            loadedApi,
            loadInit,
            loadSmallBuildingsMap,
            isBackgroundRefresh = false
        ) => {
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
                // requests of windows keep storing whatever the API returns, as before
                if (isBackgroundRefresh && !res.ok) {
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
                        args.smallBuildingsMap,
                        true
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
            .then(
                building =>
                    self.storeEntities(
                        self as unknown as EntityScope,
                        'buildings',
                        [
                            self.updateBuildingTypeIfSmall(
                                building,
                                smallBuildingsMap
                            ),
                        ]
                    )[0]
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
            .then(
                building =>
                    self.storeEntities(
                        self as unknown as EntityScope,
                        'alliance_buildings',
                        [
                            self.updateBuildingTypeIfSmall(
                                building,
                                smallBuildingsMap
                            ),
                        ]
                    )[0]
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
        )
            .then<Vehicle>(res => res.json())
            .then(
                vehicle =>
                    self.storeEntities(
                        self as unknown as EntityScope,
                        'vehicles',
                        [vehicle]
                    )[0]
            );
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
        )
            .then<Vehicle[]>(res => res.json())
            .then(vehicles =>
                self.storeEntities(
                    self as unknown as EntityScope,
                    'vehicles',
                    vehicles
                )
            );
    },
    // a window has updated vehicles or buildings itself (e.g. from a radio message) and shares them with the other windows
    updateEntities: (self: Self, api: EntityApi, entities: Entity[]) => {
        self.storeEntities(self as unknown as EntityScope, api, entities);
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
