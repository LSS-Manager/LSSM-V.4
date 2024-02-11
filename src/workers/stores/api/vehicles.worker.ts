import TypedWorker from '@workers/TypedWorker';

import type { APIs } from '@stores/newApi';
import type { Building } from 'typings/Building';
import type { Vehicle } from 'typings/Vehicle';

type ExcludeNull<T> = Exclude<T, null>;

// TODO: Use Map and Set instead of Record and Array after switching to Vue3
export type VehicleStates = Record<Vehicle['fms_real'], number>;
export type VehiclesByTarget = Partial<
    Record<
        ExcludeNull<Vehicle['target_type']>,
        Record<ExcludeNull<Vehicle['target_id']>, Vehicle[]>
    >
>; // Map<Vehicle['target_type'], Map<Vehicle['target_id'], Set<Vehicle>>>;
export type VehiclesByType = Record<Vehicle['vehicle_type'], Vehicle[]>; // Map<Vehicle['vehicle_type'], Set<Vehicle>>;
export type VehiclesByBuilding = Record<Vehicle['building_id'], Vehicle[]>; // Map<Vehicle['building_id'], Set<Vehicle>>;
export type VehiclesByDispatchCenter = Record<
    ExcludeNull<Building['leitstelle_building_id']> | -1,
    Vehicle[]
>; // Map<Building['leitstelle_building_id'], Set<Vehicle>>;
export default new TypedWorker(
    'api/vehicles.worker',
    async (vehicles: APIs['vehicles'], buildings: APIs['buildings']) => {
        const vehiclesArray = Object.values(vehicles);
        const vehicleStates: VehicleStates = {};
        const vehiclesByTarget: VehiclesByTarget = {};
        const vehiclesByType: VehiclesByType = {};
        const vehiclesByBuilding: VehiclesByBuilding = {};
        const vehiclesByDispatchCenter: VehiclesByDispatchCenter = {};

        for (const vehicle of vehiclesArray) {
            // vehicle states
            vehicleStates[vehicle.fms_real] =
                (vehicleStates[vehicle.fms_real] || 0) + 1;

            // by target
            if (vehicle.target_type && vehicle.target_id) {
                vehiclesByTarget[vehicle.target_type] ||= {};
                const targetRecord = vehiclesByTarget[vehicle.target_type];
                if (targetRecord) {
                    targetRecord[vehicle.target_id] ||= [];
                    targetRecord[vehicle.target_id].push(vehicle);
                }
            }

            // by type
            vehiclesByType[vehicle.vehicle_type] ||= [];
            vehiclesByType[vehicle.vehicle_type].push(vehicle);

            // by building
            vehiclesByBuilding[vehicle.building_id] ||= [];
            vehiclesByBuilding[vehicle.building_id].push(vehicle);

            // by dispatch center
            const building = buildings[vehicle.building_id];
            if (building) {
                vehiclesByDispatchCenter[
                    building.leitstelle_building_id || -1
                ] ||= [];
                vehiclesByDispatchCenter[
                    building.leitstelle_building_id || -1
                ].push(vehicle);
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
    }
);
