import VueI18n from 'vue-i18n';
import { InternalBuilding } from 'typings/Building';

export interface BuildingTypes {
    buildingTypes: { [id: number]: InternalBuilding };
    categoryColors: {
        [category: string]: string;
    };
    groups: {
        [category: string]: Category;
    };
}

export interface Category {
    color: string;
    rows: {
        [caption: string]: {
            type: 'building' | 'extension';
            color:
                | 'bright'
                | 'dark'
                | 'bright-bright'
                | 'bright-dark'
                | 'dark-bright'
                | 'dark-dark';
            children: number;
            total: number;
            enabled: number;
            unavailable: number;
            maximum: number;
        };
    };
}

export interface BuildingTypesComputed {
    coloredGroups: BuildingTypes['groups'];
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
