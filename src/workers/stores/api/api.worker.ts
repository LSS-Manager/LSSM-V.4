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

interface ApiWorkerState {
    lastUpdates: Map<APIKey, number>;
    apiStorage: Partial<APIs>;
    // requests that are currently running, shared by all windows
    runningFetches: Map<APIKey, Promise<APIs[APIKey]>>;
    missions: MissionsById;
    missionArray: MissionsArray;
}

const scripts = {
    checkRequestInit,
    updateBuildingTypeIfSmall,
    LSSMStorage,
} as const;

type Self = WorkerSelf<ApiWorkerState, typeof scripts>;

// CAVEAT: Each method is stringified (see TypedWorker), so it must not reference anything outside its own body!
const methods = {
    fetchApi: async <Api extends APIKey>(
        self: Self,
        api: Api,
        init: RequestInit,
        smallBuildingsMap: SmallBuildingsMap
    ): Promise<APIs[Api]> => {
        // this is not the 5 Minutes used in API store to avoid issues with different transaction times etc.
        const API_UPDATE_AFTER = ['schoolings', 'alliance_schoolings'].includes(
            api
        )
            ? 30 * 1000 // 30 seconds for schoolings
            : 4.5 * 60 * 1000; // 4 Minutes and 30 seconds

        self.lastUpdates ??= new Map<APIKey, number>();
        self.apiStorage ??= {};
        self.runningFetches ??= new Map();

        // if the API has been fetched recently, return the stored result
        const stored = self.apiStorage[api];
        if (
            stored &&
            (self.lastUpdates.get(api) ?? 0) > Date.now() - API_UPDATE_AFTER
        )
            return stored;

        // if another window is already fetching this API, wait for that request instead of sending another one
        const running = self.runningFetches.get(api);
        if (running) return running as Promise<APIs[Api]>;

        self.checkRequestInit(init);

        // TODO: Add support for paged API (/api/v2) for supported APIs (vehicles)

        const postProcessFetch = (res: ApiFetchResults[Api]) => {
            // we want to store vehicles and buildings by ID for easier access
            // TODO: Remove Array.isArray check and casts when Typescript extends oneof is available
            if (
                Array.isArray(res) &&
                (api === 'vehicles' ||
                    api === 'buildings' ||
                    api === 'alliance_buildings')
            ) {
                // @ts-expect-error unfortunately, typescript doesn't understand that we're filtering here (we need the extends oneof!)
                const byId: APIs[Api] = {};
                for (const item of res) {
                    if ('small_building' in item) {
                        byId[item.id] = self.updateBuildingTypeIfSmall(
                            item,
                            smallBuildingsMap
                        );
                    } else {
                        byId[item.id] = item;
                    }
                }
                return byId;
            } else if (
                'result' in res &&
                (api === 'schoolings' || api === 'alliance_schoolings')
            ) {
                return res.result as APIs[Api];
            }

            return res;
        };

        const request = fetch(new URL(`/api/${api}`, location.origin), init)
            .then(res => res.json())
            .then((res: ApiFetchResults[Api]) => postProcessFetch(res))
            .then(result => {
                self.apiStorage[api] = result;
                self.lastUpdates.set(api, Date.now());
                return result;
            })
            .finally(() => self.runningFetches.delete(api));
        self.runningFetches.set(api, request as Promise<APIs[APIKey]>);
        return request;
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
    Record<never, never>,
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
