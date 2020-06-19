import VueI18n from 'vue-i18n';
import { InternalBuilding } from '../Building';
import {
    InternalVehicle,
    VehicleCategory,
    ResolvedVehicleCategory,
} from 'typings/Vehicle';

export interface Overview {
    buildings: InternalBuilding[];
    vehicles: InternalVehicle[];
    vehicleCategories: {
        [name: string]: VehicleCategory | ResolvedVehicleCategory;
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
    };
}

export interface OverviewComputed {
    buildingsFiltered: InternalBuilding[];
    buildingsSorted: InternalBuilding[];
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
}
