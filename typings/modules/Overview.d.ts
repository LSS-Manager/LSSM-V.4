import VueI18n from 'vue-i18n';
import { InternalBuilding, ResolvedBuildingCategory } from '../Building';
import { InternalVehicle, ResolvedVehicleCategory } from 'typings/Vehicle';
import { Schooling } from 'typings/Schooling';

export interface Overview {
    vehicles: {
        [id: number]: InternalVehicle;
    };
    vehicleCategories: {
        [name: string]: ResolvedVehicleCategory;
    };
    vehiclesTab: {
        head: {
            [key: string]: {
                title: string;
            };
        };
        search: string;
        sort: string;
        sortDir: string;
        current: {
            category: number;
            group: number;
        };
    };
    buildings: InternalBuilding[];
    buildingCategories: {
        [name: string]: ResolvedBuildingCategory;
    };
    buildingsTab: {
        head: {
            [key: string]: {
                title: string;
            };
        };
        search: string;
        sort: string;
        sortDir: string;
        current: {
            category: number;
        };
    };
    schoolingCategories: {
        [category: string]: Schooling[];
    };
    schoolingsTab: {
        head: {
            [key: string]: {
                title: string;
            };
        };
        search: string;
        sort: string;
        sortDir: string;
        current: {
            category: number;
        };
    };
    currentType: number;
}

export interface OverviewComputed {
    currentBuildings: InternalBuilding[];
    buildingsFiltered: InternalBuilding[];
    buildingsSorted: InternalBuilding[];
    currentSchoolings: Schooling[];
    schoolingsFiltered: Schooling[];
    schoolingsSorted: Schooling[];
    vehicleTypes: InternalVehicle[];
}

export interface OverviewMethods {
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    setSortBuildings(type: string): void;
    setSortVehicles(type: string): void;
    setSortSchoolings(type: string): void;
    setVehicleCategory(_: unknown, group: number): void;
    setVehicleGroup(_: unknown, group: number): void;
    setBuildingCategory(_: unknown, group: number): void;
    setSchoolingCategory(_: unknown, group: number): void;
    setType(_: unknown, type: number): void;
}
