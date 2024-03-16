import type { Ref } from 'vue';

import TypedWorker from '@workers/TypedWorker';

import checkRequestInit from '../../../importableScripts/checkRequestInit';

import type { APIs } from '@stores/api';
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

export const doVehicleCalculations = (
    vehicles: Ref<APIs['vehicles']>,
    buildings: Ref<APIs['buildings']>,
    vehicleStates: Ref<VehicleStates>,
    vehiclesByTarget: Ref<VehiclesByTarget>,
    vehiclesByType: Ref<VehiclesByType>,
    vehiclesByBuilding: Ref<VehiclesByBuilding>,
    vehiclesByDispatchCenter: Ref<VehiclesByDispatchCenter>
) => {
    const vehiclesArray = Object.values(vehicles.value);

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
        vehicleStates.value[fms_real] =
            (vehicleStates.value[fms_real] || 0) + 1;

        // by target
        if (target_type && target_id) {
            vehiclesByTarget.value[target_type][target_id] ||= {};
            vehiclesByTarget.value[target_type][target_id][id] = vehicle;
        }

        // by type
        vehiclesByType.value[vehicle_type] ||= {};
        vehiclesByType.value[vehicle_type][id] = vehicle;

        // by building
        vehiclesByBuilding.value[building_id] ||= {};
        vehiclesByBuilding.value[building_id][id] = vehicle;

        // by dispatch center
        const building = buildings.value[building_id];
        if (building) {
            const leitstelle = building.leitstelle_building_id ?? -1;
            vehiclesByDispatchCenter.value[leitstelle] ||= {};
            vehiclesByDispatchCenter.value[leitstelle][id] = vehicle;
        }
    }

    // reactivity wörkaround
    vehicleStates.value = Object.assign({}, vehicleStates.value);
    vehiclesByTarget.value = Object.assign({}, vehiclesByTarget.value);
    vehiclesByType.value = Object.assign({}, vehiclesByType.value);
    vehiclesByBuilding.value = Object.assign({}, vehiclesByBuilding.value);
    vehiclesByDispatchCenter.value = Object.assign(
        {},
        vehiclesByDispatchCenter.value
    );
};

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
