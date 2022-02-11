import type VueI18n from 'vue-i18n';
import type { Building, BuildingCategory } from 'typings/Building';
import type { Vehicle, VehicleCategory } from 'typings/Vehicle';

export interface ChartSummary {
    buildingsId: string;
    buildings: Record<string, Building[]>;
    buildingCategories: Record<string, BuildingCategory>;
    buildingTypeNames: Record<number, string>;
    buildingTypeColors: Record<number, string>;
    vehiclesId: string;
    vehicles: Record<string, Vehicle[]>;
    vehicleCategories: Record<string, VehicleCategory>;
    vehicleTypeNames: Record<number, string>;
    vehicleTypeColors: Record<number, string>;
    vehiclesByBuilding: Record<string, Vehicle[]>;
    buildingsAsColumn: boolean;
}

export interface ChartSummaryMethods {
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    $sm(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    changeBuildingChart(): void;
    mountBuildingChart(): void;
}

export interface ChartSummaryComputed {
    personalCount: number;
}
