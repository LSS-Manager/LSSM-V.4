import TypedWorker from '@workers/TypedWorker';

import type { APIs } from '@stores/newApi';
import type { Building } from 'typings/Building';
import type { Vehicle } from 'typings/Vehicle';
import type { VehiclesByDispatchCenter } from '@workers/stores/api/vehicles.worker';

type ExcludeNull<T> = Exclude<T, null>;

// TODO: Use Map and Set instead of Record and Array after switching to Vue3
// a record allows more performant updating than a list. Still switching to Set after Vue3-Update
type BuildingList = Record<Building['id'], Building>;
export type BuildingsByType = Record<Building['building_type'], BuildingList>; // Map<Building['building_type'], Set<Building>>;
export type BuildingsByDispatchCenter = Record<
    ExcludeNull<Building['leitstelle_building_id']> | -1,
    BuildingList
>; // Map<Building['leitstelle_building_id'], Set<Building>>
export type BuildingsByCategory = Record<string, BuildingList>; // Map<string, Set<Building>>

export const BuildingsWorker = new TypedWorker(
    'api/buildings.worker',
    async (
        buildings: APIs['buildings'],
        buildingCategoryByType: Record<Building['building_type'], string>,
        vehicles: Vehicle[]
    ) => {
        const buildingsArray = Object.values(buildings);
        const buildingsByType: BuildingsByType = {};
        const buildingsByDispatchCenter: BuildingsByDispatchCenter = {};
        const buildingsByCategory: BuildingsByCategory = {};
        const vehiclesByDispatchCenter: VehiclesByDispatchCenter = {};

        for (const building of buildingsArray) {
            const { id, building_type, leitstelle_building_id } = building;

            // by type
            buildingsByType[building_type] ||= {};
            buildingsByType[building_type][id] = building;

            // by dispatch center
            const leitstelle = leitstelle_building_id ?? -1;
            buildingsByDispatchCenter[leitstelle] ||= {};
            buildingsByDispatchCenter[leitstelle][id] = building;

            // by category
            buildingsByCategory[buildingCategoryByType[building_type]] ||= {};
            buildingsByCategory[buildingCategoryByType[building_type]][id] =
                building;
        }

        for (const vehicle of vehicles) {
            // vehicles by dispatch center
            const building = buildings[vehicle.building_id];
            if (building) {
                const leitstelle = building.leitstelle_building_id ?? -1;
                vehiclesByDispatchCenter[leitstelle] ||= {};
                vehiclesByDispatchCenter[leitstelle][vehicle.id] = vehicle;
            }
        }

        return {
            buildingsArray,
            buildingsByType,
            buildingsByDispatchCenter,
            buildingsByCategory,
            vehiclesByDispatchCenter,
        };
    }
);

export const FetchSingleBuildingWorker = new TypedWorker(
    'api/buildings.single.worker',
    async (
        buildingId: Building['id'],
        init: RequestInit
    ): Promise<Building> => {
        const headers = new Headers(init.headers);

        // CAVEAT: headers are stored lowercase
        // if the LSSM-Header is not set, abort the request!
        if (!headers.has('x-lss-manager')) {
            return Promise.reject(
                new Error(
                    'No X-LSS-Manager Header has been set. Aborting the request!'
                )
            );
        }

        return fetch(
            new URL(`/api/buildings/${buildingId}`, location.origin),
            init
        ).then(res => res.json());
    }
);
