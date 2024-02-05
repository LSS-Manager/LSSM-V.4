import PageObject from './base';

import type { Building } from 'typings/Building';
import type { ModuleMainFunction } from 'typings/Module';

export default abstract class BuildingBasePageObject extends PageObject {
    protected readonly _currentBuilding: Building;

    constructor(
        protected readonly moduleParams: Parameters<ModuleMainFunction>[0]
    ) {
        super(moduleParams);

        const match = document.location.pathname.match(
            /^\/buildings\/(\d+)(?:\/edit)?$/u
        );
        if (!match) throw new Error('Unknown building page');

        const buildingId = Number(match[1]);
        const currentBuilding: Building | undefined =
            this.moduleParams.LSSM.$stores.api.buildingsById[buildingId];
        if (!currentBuilding)
            throw new Error(`Unknown building id ${buildingId}`);

        this._currentBuilding = currentBuilding;
    }
}
