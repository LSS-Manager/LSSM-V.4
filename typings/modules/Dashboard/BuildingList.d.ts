import { Building } from 'typings/Building';
import VueI18n from 'vue-i18n';

interface buildingWithExtension extends Building {
    extension_available: number;
    extension_enabled: number;
    extension_unavailable: number;
}

export interface BuildingList {
    buildingTypeNames: { [id: number]: string };
    search: string;
    sort: string;
    sortDir: string;
}

export interface BuildingListMethods {
    setSort(type: string): void;
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    setDispatchCenter(
        building: buildingWithExtension | Building,
        dispatchBuilding: Building
    ): void;
    getDispatchCenterCaption(
        dispatchBuildings: Building[],
        building: Building
    ): string;
}

export interface BuildingListComputed {
    buildingsFiltered: buildingWithExtension[] | Building[];
    buildingsSorted: buildingWithExtension[] | Building[];
}

export interface BuildingListProps {
    title: string;
    buildings: buildingWithExtension[] | Building[];
    listType: string;
}
