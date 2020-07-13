import VueI18n from 'vue-i18n';
import { InternalBuilding } from 'typings/Building';

export interface BuildingType {
    caption: string;
    color: string;
    type: number;
    amount: number;
}

export interface BuildingTypes {
    buildingTypes: InternalBuilding[];
    extensionList: BuildingType[];
    categoryColors: {
        [category: string]: string;
    };
}

export interface Category extends BuildingType {
    extensions: {
        [caption: string]: {
            total: number;
            enabled: number;
            unavailable: number;
            maximum: number;
        };
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
    rows: {
        [category: string]: Category[];
    };
}
