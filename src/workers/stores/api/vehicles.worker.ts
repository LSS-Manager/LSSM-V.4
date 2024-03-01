import TypedWorker from '@workers/TypedWorker';

import checkRequestInit from '../../../importableScripts/checkRequestInit';

import type { APIs } from '@stores/newApi';
import type { Building } from 'typings/Building';
import type { Vehicle } from 'typings/Vehicle';

type ExcludeNull<T> = Exclude<T, null>;

// TODO: Use Map and Set instead of Record and Array after switching to Vue3
// a record allows more performant updating than a list. Still switching to Set after Vue3-Update
type VehicleList = Record<Vehicle['id'], Vehicle>;
export type VehicleStates = Record<Vehicle['fms_real'], number>;
export type VehiclesByTarget = Record<
    ExcludeNull<Vehicle['target_type']>,
    Record<ExcludeNull<Vehicle['target_id']>, VehicleList>
>; // Map<Vehicle['target_type'], Map<Vehicle['target_id'], Set<Vehicle>>>;
export type VehiclesByType = Record<Vehicle['vehicle_type'], VehicleList>; // Map<Vehicle['vehicle_type'], Set<Vehicle>>;
export type VehiclesByBuilding = Record<Vehicle['building_id'], VehicleList>; // Map<Vehicle['building_id'], Set<Vehicle>>;
export type VehiclesByDispatchCenter = Record<
    ExcludeNull<Building['leitstelle_building_id']> | -1,
    VehicleList
>; // Map<Building['leitstelle_building_id'], Set<Vehicle>>;

export const VehiclesWorker = new TypedWorker(
    'api/vehicles.worker',
    async (self, vehicles: APIs['vehicles'], buildings: APIs['buildings']) => {
        const vehiclesArray = Object.values(vehicles);
        const vehicleStates: VehicleStates = {};
        const vehiclesByTarget: VehiclesByTarget = {
            building: {},
            mission: {},
        };
        const vehiclesByType: VehiclesByType = {};
        const vehiclesByBuilding: VehiclesByBuilding = {};
        const vehiclesByDispatchCenter: VehiclesByDispatchCenter = {};

        for (const vehicle of vehiclesArray) {
            const {
                target_type,
                id,
                fms_real,
                target_id,
                vehicle_type,
                building_id,
            } = vehicle;

            // vehicle states
            vehicleStates[fms_real] = (vehicleStates[fms_real] || 0) + 1;

            // by target
            if (target_type && target_id) {
                vehiclesByTarget[target_type][target_id] ||= {};
                vehiclesByTarget[target_type][target_id][id] = vehicle;
            }

            // by type
            vehiclesByType[vehicle_type] ||= {};
            vehiclesByType[vehicle_type][id] = vehicle;

            // by building
            vehiclesByBuilding[building_id] ||= {};
            vehiclesByBuilding[building_id][id] = vehicle;

            // by dispatch center
            const building = buildings[building_id];
            if (building) {
                const leitstelle = building.leitstelle_building_id ?? -1;
                vehiclesByDispatchCenter[leitstelle] ||= {};
                vehiclesByDispatchCenter[leitstelle][id] = vehicle;
            }
        }

        return {
            vehiclesArray,
            vehicleStates,
            vehiclesByTarget,
            vehiclesByType,
            vehiclesByBuilding,
            vehiclesByDispatchCenter,
        };
    },
    {}
);

export const FetchSingleVehicleWorker = new TypedWorker(
    'api/vehicles.single.worker',
    async (
        self,
        vehicleId: Vehicle['id'],
        init: RequestInit
    ): Promise<Vehicle> => {
        self.checkRequestInit(init);

        // TODO: switch to API V2 here

        return fetch(
            new URL(`/api/vehicles/${vehicleId}`, location.origin),
            init
        ).then(res => res.json());
    },
    { checkRequestInit }
);

export const FetchVehiclesAtBuildingWorker = new TypedWorker(
    'api/vehicles.building.worker',
    async (
        self,
        buildingId: Building['id'],
        init: RequestInit
    ): Promise<Vehicle[]> => {
        self.checkRequestInit(init);

        // TODO: switch to API V2 here

        return fetch(
            new URL(`/api/buildings/${buildingId}/vehicles`, location.origin),
            init
        ).then(res => res.json());
    },
    { checkRequestInit }
);
