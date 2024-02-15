import TypedWorker from '@workers/TypedWorker';

import type { APIs } from '@stores/newApi';
import type { Vehicle } from 'typings/Vehicle';
import type { VehiclesByDispatchCenter } from '@workers/stores/api/vehicles.worker';
import type { Building, BuildingCategory } from 'typings/Building';

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

export default new TypedWorker(
    'api/buildings.worker',
    async (
        buildings: APIs['buildings'],
        buildingCategories: Record<string, BuildingCategory>,
        vehicles: Vehicle[]
    ) => {
        const categoryByType: Record<Building['building_type'], string> = {};
        for (const [category, { buildings }] of Object.entries(
            buildingCategories
        )) {
            for (const building of buildings)
                categoryByType[building] = category;
        }

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
            buildingsByCategory[categoryByType[building_type]] ||= {};
            buildingsByCategory[categoryByType[building_type]][id] = building;
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
