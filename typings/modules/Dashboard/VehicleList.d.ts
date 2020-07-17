import { Vehicle } from 'typings/Vehicle';
import { Building } from 'typings/Building';
import VueI18n from 'vue-i18n';

interface VehicleWithBuilding extends Vehicle {
    building: string | undefined;
}

export interface VehicleList {
    vehicleTypeNames: string[];
    vehiclesWithBuildings: VehicleWithBuilding[];
    buildings: Building[];
    search: string;
    sort: string;
    sortDir: string;
}

export interface VehicleListMethods {
    setSort(type: string): void;
    toggleFMS(vehicle: Vehicle): void;
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
}

export interface VehicleListComputed {
    vehiclesFiltered: Vehicle[];
    vehiclesSorted: Vehicle[];
}

export interface VehicleListProps {
    title: string;
    vehicles: Vehicle[];
}
