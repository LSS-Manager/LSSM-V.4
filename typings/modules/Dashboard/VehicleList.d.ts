import type { Building } from 'typings/Building';
import type { useAPIStore } from '@stores/api';
import type { Vehicle } from 'typings/Vehicle';
import type VueI18n from 'vue-i18n';

interface VehicleWithBuilding extends Vehicle {
    building: string | undefined;
}

export interface VehicleList {
    vehicleTypeNames: Record<number, string>;
    vehiclesWithBuildings: VehicleWithBuilding[];
    buildings: Building[];
    search: string;
    sort: keyof VehicleWithBuilding;
    sortDir: string;
    resolveLinkClass: string;
    resolving: number | null;
    apiStore: ReturnType<typeof useAPIStore>;
}

export interface VehicleListMethods {
    setSort(type: keyof VehicleWithBuilding): void;
    toggleFMS(vehicle: Vehicle): void;
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    startResolve(type: 'building' | 'mission', id: number): void;
    endResolve(): void;
    resolveMission(id: number): string;
}

export interface VehicleListComputed {
    vehiclesFiltered: VehicleWithBuilding[];
    vehiclesSorted: VehicleWithBuilding[];
}

export interface VehicleListProps {
    title: string;
    vehicles: Vehicle[];
}
