import VueI18n from 'vue-i18n';
import { InternalBuilding } from 'typings/Building';

export interface BuildingType {
    caption: string;
    color: string;
    type: number;
    amount: number;
}

export interface Extension {
    caption: string;
    parent: string;
    maximal: number;
    types: string[];
}

type BuildingOrExtension = BuildingType | Extension;

export interface BuildingTypes {
    search: string;
    sort: string;
    sortDir: 'asc' | 'desc';
    buildingTypes: InternalBuilding[];
    extensionList: BuildingOrExtension[];
    categoryColors: {
        [category: string]: string;
    };
}

export interface BuildingTypesMethods {
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    $sm(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
}

export interface BuildingTypesComputed {
    rows: unknown;
}
