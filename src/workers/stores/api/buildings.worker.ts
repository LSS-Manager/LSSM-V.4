import type { Ref } from 'vue';

import TypedWorker from '@workers/TypedWorker';

import checkRequestInit from '../../../importableScripts/checkRequestInit';

import type { APIs } from '@stores/api';
import type { Building } from 'typings/Building';
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

export type SmallBuildingsMap = Record<
    Building['building_type'],
    Building['building_type']
>;

/**
 * Changes the building type if the building is a small building.
 * @param building - The building to update.
 * @param smallBuildingsMap - The map to use for updating the building type.
 * @returns The updated building.
 */
export const updateBuildingTypeIfSmall = (
    building: Building,
    smallBuildingsMap: SmallBuildingsMap
) => {
    if (building.small_building && building.building_type in smallBuildingsMap)
        building.building_type = smallBuildingsMap[building.building_type];
    return building;
};

export const doBuildingCalculations = (
    buildings: Ref<APIs['buildings']>,
    vehicles: Ref<APIs['vehicles']>,
    buildingsByType: Ref<BuildingsByType>,
    buildingsByDispatchCenter: Ref<BuildingsByDispatchCenter>,
    buildingsByCategory: Ref<BuildingsByCategory>,
    vehiclesByDispatchCenter: Ref<VehiclesByDispatchCenter>,
    buildingCategoryByType: Record<Building['building_type'], string>
) => {
    const buildingsArray = Object.values(buildings.value);

    for (const building of buildingsArray) {
        const { id, building_type, leitstelle_building_id } = building;

        // by type
        buildingsByType.value[building_type] ||= {};
        buildingsByType.value[building_type][id] = building;

        // by dispatch center
        const leitstelle = leitstelle_building_id ?? -1;
        buildingsByDispatchCenter.value[leitstelle] ||= {};
        buildingsByDispatchCenter.value[leitstelle][id] = building;

        // by category
        buildingsByCategory.value[buildingCategoryByType[building_type]] ||= {};
        buildingsByCategory.value[buildingCategoryByType[building_type]][id] =
            building;
    }

    for (const vehicle of Object.values(vehicles.value)) {
        // vehicles by dispatch center
        const building = buildings.value[vehicle.building_id];
        if (building) {
            const leitstelle = building.leitstelle_building_id ?? -1;
            vehiclesByDispatchCenter.value[leitstelle] ||= {};
            vehiclesByDispatchCenter.value[leitstelle][vehicle.id] = vehicle;
        }
    }

    // reactivity wörkaround
    buildingsByType.value = Object.assign({}, buildingsByType.value);
    buildingsByDispatchCenter.value = Object.assign(
        {},
        buildingsByDispatchCenter.value
    );
    buildingsByCategory.value = Object.assign({}, buildingsByCategory.value);
    if (Object.keys(vehicles.value).length) {
        vehiclesByDispatchCenter.value = Object.assign(
            {},
            vehiclesByDispatchCenter.value
        );
    }
};

export const FetchSingleBuildingWorker = new TypedWorker(
    'api/buildings.single.worker',
    async (
        self,
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
    { checkRequestInit, updateBuildingTypeIfSmall }
);

export const FetchSingleAllianceBuildingWorker = new TypedWorker(
    'api/alliance_buildings.single.worker',
    async (
        self,
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
    { checkRequestInit, updateBuildingTypeIfSmall }
);
