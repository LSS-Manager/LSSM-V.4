import type { Schooling } from 'typings/Schooling';
import type VueI18n from 'vue-i18n';
import type { InternalBuilding, ResolvedBuildingCategory } from '../Building';
import type { InternalVehicle, ResolvedVehicleCategory } from 'typings/Vehicle';

type ResolvedSchooling = Pick<
    Schooling,
    'caption' | 'duration' | 'key' | 'staffList'
> & {
    required_for: string[];
};

export interface Overview {
    vehicles: Record<number, InternalVehicle>;
    vehicleCategories: Record<string, ResolvedVehicleCategory>;
    vehiclesTab: {
        head: Record<
            string,
            {
                title: string;
            }
        >;
        search: string;
        sort: keyof InternalVehicle;
        sortDir: string;
        current: {
            category: number;
            group: number;
        };
    };
    buildings: Record<number, InternalBuilding>;
    buildingCategories: Record<string, ResolvedBuildingCategory>;
    buildingsTab: {
        head: Record<
            string,
            {
                title: string;
            }
        >;
        search: string;
        sort: keyof InternalBuilding;
        sortDir: string;
        current: {
            category: number;
        };
    };
    schoolingCategories: Record<string, ResolvedSchooling[]>;
    schoolingsTab: {
        head: Record<
            string,
            {
                title: string;
            }
        >;
        search: string;
        sort: keyof ResolvedSchooling;
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
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    $mc(
        key: string,
        n: number,
        args?: Record<string, unknown>
    ): VueI18n.TranslateResult;
    setSortBuildings(type: keyof InternalBuilding): void;
    setSortVehicles(type: keyof InternalVehicle): void;
    setSortSchoolings(type: keyof ResolvedSchooling): void;
    setVehicleCategory(_: unknown, group: number): void;
    setVehicleGroup(_: unknown, group: number): void;
    setBuildingCategory(_: unknown, group: number): void;
    setSchoolingCategory(_: unknown, group: number): void;
    setType(_: unknown, type: number): void;
}
