import PageObject from './base';

import type { Building } from 'typings/Building';
import type { ModuleMainFunction } from 'typings/Module';
import type { Vehicle } from 'typings/Vehicle';

export default abstract class VehicleBasePageObject extends PageObject {
    protected readonly _currentBuilding: Building;
    protected readonly _currentVehicle: Vehicle;

    constructor(
        protected readonly moduleParams: Parameters<ModuleMainFunction>[0]
    ) {
        super(moduleParams);

        const match = document.location.pathname.match(
            /^\/vehicles\/(\d+)(?:\/edit)?$/u
        );
        if (!match) throw new Error('Unknown vehicle page');

        const vehicleId = Number(match[1]);
        const currentVehicle: Vehicle | undefined =
            this.moduleParams.LSSM.$stores.api.vehicles.find(
                ({ id }) => id === vehicleId
            );
        if (!currentVehicle) throw new Error(`Unknown vehicle id ${vehicleId}`);

        this._currentVehicle = currentVehicle;
        this._currentBuilding =
            this.moduleParams.LSSM.$stores.api.buildingsById[
                currentVehicle.building_id
            ];
    }
}
