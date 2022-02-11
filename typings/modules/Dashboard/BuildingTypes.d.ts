import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import VueI18n from 'vue-i18n';
import { Building, InternalBuilding } from 'typings/Building';

interface buildingWithExtension extends Building {
    extension_available: number;
    extension_enabled: number;
    extension_unavailable: number;
}

export interface BuildingTypes {
    buildingTypes: Record<number, InternalBuilding>;
    categoryColors: Record<string, string>;
    groups: Record<string, Category>;
    faBuilding: IconDefinition;
}

export interface Category {
    color: string;
    rows: Record<
        string,
        {
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
        }
    >;
}

export interface BuildingTypesComputed {
    coloredGroups: BuildingTypes['groups'];
}

export interface BuildingTypesMethods {
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    $sm(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    $mc(
        key: string,
        amount: number,
        args?: Record<string, unknown>
    ): VueI18n.TranslateResult;
    $smc(
        key: string,
        amount: number,
        args?: Record<string, unknown>
    ): VueI18n.TranslateResult;
    showBuildings(
        listType: string,
        type: string,
        buildings: buildingWithExtension[] | Building[]
    ): void;
}
