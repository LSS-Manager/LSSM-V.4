import type { ModuleMainFunction } from 'typings/Module';

export default class ExclusionHelper {
    private excludedBuildings: string[] = [];
    private excludedUnits: string[] = [];

    constructor(
        private readonly moduleParams: Parameters<ModuleMainFunction>[0]
    ) {}

    public async init() {
        const {
            MODULE_ID: moduleId,
            LSSM: {
                $stores: { settings },
            },
        } = this.moduleParams;

        this.excludedBuildings = await settings.getSetting<string[]>({
            moduleId,
            settingId: 'excludeBuildings',
            defaultValue: [],
        });

        this.excludedUnits = await settings.getSetting<string[]>({
            moduleId,
            settingId: 'excludeUnits',
            defaultValue: [],
        });
    }

    public isBuildingTypeExcluded(typeId: number) {
        return this.excludedBuildings.some(id => Number(id) === typeId);
    }

    public isVehicleTypeExcluded(typeId: number) {
        return this.excludedUnits.some(id => Number(id) === typeId);
    }
}
