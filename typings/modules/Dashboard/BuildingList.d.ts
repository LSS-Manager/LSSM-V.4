import type { Building } from 'typings/Building';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { useAPIStore } from '@stores/api';
import type { useTranslationStore } from '@stores/translationUtilities';
import type VueI18n from 'vue-i18n';

interface buildingWithExtension extends Building {
    extension_available: number;
    extension_enabled: number;
    extension_unavailable: number;
}

type Headings = Record<string, { title: string; noSort?: boolean }>;

export interface BuildingList {
    buildingTypeNames: Record<number, string>;
    search: string;
    sort: string;
    sortDir: string;
    faPencilAlt: IconDefinition;
    headingsExtensions: Headings;
    headingsAll: Headings;
    headingsHospital: Headings;
    dispatchBuildings: Building[];
    dispatchCenterBuildings: number[];
    bedBuildings: Building[];
    bedBuildingsType: number[];
    apiStore: ReturnType<typeof useAPIStore>;
    translationStore: ReturnType<typeof useTranslationStore>;
}

export interface BuildingListMethods {
    setSort(type: string): void;
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    setDispatchCenter(
        building: Building | buildingWithExtension,
        dispatchBuilding: Building
    ): void;
    getDispatchCenterCaption(
        dispatchBuildings: Building[],
        building: Building
    ): string;
    getTotalBeds(building: Building | buildingWithExtension): number;
}

export interface BuildingListComputed {
    buildingsFiltered: Building[] | buildingWithExtension[];
    buildingsSorted: Building[] | buildingWithExtension[];
}

export interface BuildingListProps {
    title: string;
    buildings: Building[] | buildingWithExtension[];
    listType: string;
}
