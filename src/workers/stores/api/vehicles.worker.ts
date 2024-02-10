import TypedWorker from '@workers/TypedWorker';

import type { APIs } from '@stores/newApi';
import type { Vehicle } from 'typings/Vehicle';

export default new TypedWorker(
    'api/vehicles.worker',
    async (vehicles: APIs['vehicles']) => {
        const vehiclesArray = Object.values(vehicles);
        const vehicleStates: Record<Vehicle['fms_real'], number> = {};
        const vehiclesByTarget = new Map<
            Vehicle['target_type'],
            Map<Vehicle['target_id'], Set<Vehicle>>
        >();
        const vehiclesByType = new Map<Vehicle['vehicle_type'], Set<Vehicle>>();
        const vehiclesByBuilding = new Map<
            Vehicle['building_id'],
            Set<Vehicle>
        >();
        // TODO when buildings are available
        // const vehiclesByDispatchCenter = new Map<
        //     Building['leitstelle_building_id'],
        //     Set<Vehicle>
        // >();

        for (const vehicle of vehiclesArray) {
            // vehicle states
            vehicleStates[vehicle.fms_real] =
                (vehicleStates[vehicle.fms_real] || 0) + 1;

            // by target
            if (!vehiclesByTarget.has(vehicle.target_type))
                vehiclesByTarget.set(vehicle.target_type, new Map());
            const targetMap = vehiclesByTarget.get(vehicle.target_type);
            if (!targetMap?.has(vehicle.target_id))
                targetMap?.set(vehicle.target_id, new Set());
            targetMap?.get(vehicle.target_id)?.add(vehicle);

            // by type
            if (!vehiclesByType.has(vehicle.vehicle_type))
                vehiclesByType.set(vehicle.vehicle_type, new Set());
            vehiclesByType?.get(vehicle.vehicle_type)?.add(vehicle);

            // by building
            if (!vehiclesByBuilding.has(vehicle.building_id))
                vehiclesByBuilding.set(vehicle.building_id, new Set());
            vehiclesByBuilding?.get(vehicle.building_id)?.add(vehicle);
        }

        return {
            vehicleStates,
            vehiclesArray,
            vehiclesByTarget,
            vehiclesByType,
            vehiclesByBuilding,
        };
    }
);
