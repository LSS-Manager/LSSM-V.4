import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Vehicle } from 'typings/Vehicle';
import type VueI18n from 'vue-i18n';

export interface VehicleTypes {
    vehicleTypeNames: Record<number, string>;
    statuses: number[];
    statusHeads: Record<
        string,
        {
            title: string;
        }
    >;
    search: string;
    sort: string;
    sortDir: string;
    faCarSide: IconDefinition;
    faChartPie: IconDefinition;
    showChart: boolean;
}

interface Type {
    title: string;
    sum: number;
    vehicles: Vehicle[];
    fms: Record<string, Vehicle[]>;
    [key: string]: Record<string, Vehicle[]> | Vehicle[] | number | string;
}

export interface VehicleTypesMethods {
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
    setSort(type: string): void;
    showVehicles(status: number, type: Type, vehicles: Vehicle[]): void;
}

export type TypeList = Record<string, Type>;

export interface VehicleTypesComputed {
    vehicleTypes: TypeList;
    vehicleTypesFiltered: TypeList;
    vehicleTypesSorted: string[];
    sum: Record<string, Vehicle[]>;
    chart: {
        chart: {
            type: 'pie';
            backgroundColor: string;
            margin: number;
            spacing: number[];
            height: string;
            borderRadius: string;
        };
        tooltip: {
            pointFormat: string;
        };
        plotOptions: {
            pie: {
                cursor: 'pointer';
                dataLabels: {
                    enabled: true;
                    format: string;
                };
            };
        };
        title: { text: string; align: string };
        series: [
            {
                name: string;
                data: { name: string; y: number; value: string }[];
            },
        ];
    };
}
