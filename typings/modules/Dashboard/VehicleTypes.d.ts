import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Vehicle } from 'typings/Vehicle';
import VueI18n from 'vue-i18n';

export interface VehicleTypes {
    vehicleTypeNames: { [id: number]: string };
    statuses: number[];
    statusHeads: {
        [status: string]: {
            title: string;
        };
    };
    search: string;
    sort: string;
    sortDir: string;
    faCarSide: IconDefinition;
}

interface Type {
    title: string;
    sum: number;
    vehicles: Vehicle[];
    fms: {
        [status: string]: Vehicle[];
    };
    [key: string]:
        | string
        | number
        | Vehicle[]
        | {
              [status: string]: Vehicle[];
          };
}

export interface VehicleTypesMethods {
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
    $mc(
        key: string,
        amount: number,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    $smc(
        key: string,
        amount: number,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    setSort(type: string): void;
    showVehicles(status: number, type: Type, vehicles: Vehicle[]): void;
}

export interface TypeList {
    [vehicleType: string]: Type;
}

export interface VehicleTypesComputed {
    vehicleTypes: TypeList;
    vehicleTypesFiltered: TypeList;
    vehicleTypesSorted: string[];
    sum: {
        [state: string]: Vehicle[];
    };
}
