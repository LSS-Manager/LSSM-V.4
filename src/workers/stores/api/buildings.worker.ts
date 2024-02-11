import TypedWorker from '@workers/TypedWorker';

import type { APIs } from '@stores/newApi';
import type { Vehicle } from 'typings/Vehicle';
import type { VehiclesByDispatchCenter } from '@workers/stores/api/vehicles.worker';
import type { Building, BuildingCategory } from 'typings/Building';

type ExcludeNull<T> = Exclude<T, null>;

// TODO: Use Map and Set instead of Record and Array after switching to Vue3
export type BuildingsByType = Record<Building['building_type'], Building[]>; // Map<Building['building_type'], Set<Building>>;
export type BuildingsByDispatchCenter = Record<
    ExcludeNull<Building['leitstelle_building_id']> | -1,
    Building[]
>; // Map<Building['leitstelle_building_id'], Set<Building>>
export type BuildingsByCategory = Record<string, Building[]>; // Map<string, Set<Building>>

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
            // by type
            buildingsByType[building.building_type] ||= [];
            buildingsByType[building.building_type].push(building);

            // by dispatch center
            buildingsByDispatchCenter[building.leitstelle_building_id || -1] ||=
                [];
            buildingsByDispatchCenter[
                building.leitstelle_building_id || -1
            ].push(building);

            // by category
            buildingsByCategory[categoryByType[building.building_type]] ||= [];
            buildingsByCategory[categoryByType[building.building_type]].push(
                building
            );
        }

        for (const vehicle of vehicles) {
            // vehicles by dispatch center
            const building = buildings[vehicle.building_id];
            if (building) {
                vehiclesByDispatchCenter[
                    building.leitstelle_building_id || -1
                ] ||= [];
                vehiclesByDispatchCenter[
                    building.leitstelle_building_id || -1
                ].push(vehicle);
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
