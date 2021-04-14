import { Schooling } from 'typings/Schooling';
import VueI18n from 'vue-i18n';
import { InternalBuilding, ResolvedBuildingCategory } from '../Building';
import { InternalVehicle, ResolvedVehicleCategory } from 'typings/Vehicle';

interface ResolvedSchooling extends Pick<Schooling, 'caption' | 'duration'> {
    required_for: string[];
    [key: string]: string | string[];
}

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
    buildings: { [id: number]: InternalBuilding };
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
        [category: string]: ResolvedSchooling[];
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
    currentSchoolings: ResolvedSchooling[];
    schoolingsFiltered: ResolvedSchooling[];
    schoolingsSorted: ResolvedSchooling[];
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
