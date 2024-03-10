import type Vue from 'vue';

import { defineStore } from 'pinia';

import type { IconName } from '@fortawesome/free-solid-svg-icons';
import type { InternalEquipments } from 'typings/Equipment';
import type { InternalVehicle } from 'typings/Vehicle';
import type {
    Building,
    BuildingCategory,
    InternalBuilding,
} from 'typings/Building';

const translationStore = defineStore('translationUtilities', () => {
    const LSSM = window[PREFIX] as Vue;

    const buildings = LSSM.$t('buildings') as unknown as Record<
        number,
        InternalBuilding
    >;
    const vehicles = LSSM.$t('vehicles') as unknown as Record<
        number,
        InternalVehicle
    >;
    const equipment = LSSM.$t(
        'equipment'
    ) as unknown as InternalEquipments<string>;

    const vehicleBuildings = Object.entries(buildings)
        .filter(([, building]) => 'startVehicles' in building)
        .map(([id]) => parseInt(id.toString()));

    const dispatchCenterBuildings = Object.entries(buildings)
        .filter(
            ([, building]) =>
                'isDispatchCenter' in building && building.isDispatchCenter
        )
        .map(([id]) => parseInt(id.toString()));

    const stagingAreaBuildings = Object.entries(buildings)
        .filter(
            ([, building]) =>
                'isStagingArea' in building && building.isStagingArea
        )
        .map(([id]) => parseInt(id.toString()));

    const bedBuildings = Object.entries(buildings)
        .filter(([, building]) => 'startBeds' in building)
        .map(([id]) => parseInt(id.toString()));

    const cellBuildings = Object.entries(buildings)
        .filter(([, building]) => 'startCells' in building)
        .map(([id]) => parseInt(id.toString()));
    const cellExtensions = cellBuildings.flatMap(building =>
        buildings[building].extensions
            .map((extension, index) =>
                extension && 'newCells' in extension
                    ? `${building}_${index}`
                    : ''
            )
            .filter(e => !!e)
    );

    const classroomBuildings = Object.entries(buildings)
        .filter(([, building]) => 'startClassrooms' in building)
        .map(([id]) => parseInt(id.toString()));

    const buildingIcons: Record<number, IconName> = Object.fromEntries(
        Object.entries(buildings).map(([id, { icon }]) => [id, icon])
    );

    const buildingCategories = LSSM.$t(
        'buildingCategories'
    ) as unknown as Record<string, BuildingCategory>;

    const buildingCategoryByType: Record<Building['building_type'], string> =
        {};
    for (const [category, { buildings }] of Object.entries(
        buildingCategories
    )) {
        for (const building of buildings)
            buildingCategoryByType[building] = category;
    }

    return {
        buildings,
        vehicles,
        equipment,
        vehicleBuildings,
        dispatchCenterBuildings,
        stagingAreaBuildings,
        bedBuildings,
        cellBuildings,
        cellExtensions,
        classroomBuildings,
        buildingIcons,
        buildingCategories,
        buildingCategoryByType,
    };
});

export const useTranslationStore: () => ReturnType<
    typeof translationStore
> = () => (window[PREFIX] as Vue)?.$stores?.translations ?? translationStore();
