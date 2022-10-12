import type { ModuleSettingFunction } from 'typings/Module';
import type { Hidden, ModuleSettings, Toggle } from 'typings/Setting';

export default ((MODULE_ID: string) => ({
    enhanceVehicleList: <Toggle>{
        type: 'toggle',
        default: true,
    },
    vehicleTypes: <Toggle>{
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    vehicleTypesOnlyOwn: <Toggle>{
        type: 'toggle',
        default: false,
        disabled: (settings: ModuleSettings) =>
            !(
                (settings[MODULE_ID].vehicleTypes as Toggle).value &&
                (settings[MODULE_ID].enhanceVehicleList as Toggle).value
            ),
    },
    fmsSwitch: <Toggle>{
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    personnelAssignmentBtn: <Toggle>{
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelMax: <Toggle>{
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelCurrent: <Toggle>{
        type: 'toggle',
        default: false,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelAssigned: <Toggle>{
        type: 'toggle',
        default: false,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelColorized: <Toggle>{
        type: 'toggle',
        default: false,
        disabled: (settings: ModuleSettings) =>
            !(
                (settings[MODULE_ID].vehiclesPersonnelAssigned as Toggle)
                    .value &&
                (settings[MODULE_ID].vehiclesPersonnelMax as Toggle).value &&
                (settings[MODULE_ID].enhanceVehicleList as Toggle).value
            ),
    },
    personnelDemands: <Toggle>{
        type: 'toggle',
        default: true,
    },
    schoolingSummary: <Toggle>{
        type: 'toggle',
        default: true,
    },
    enhancedPersonnelAssignment: <Toggle>{
        type: 'toggle',
        default: true,
    },
    enhancedPersonnelAssignmentCheckbox: <Hidden>{
        type: 'hidden',
        default: false,
    },
    expansions: <Toggle>{
        type: 'toggle',
        default: true,
    },
    buildingsLeftRight: <Toggle>{
        type: 'toggle',
        default: false,
    },
    fastDispatchChooser: <Toggle>{
        type: 'toggle',
        default: true,
    },
    upgradeConfirmation: <Toggle>{
        type: 'toggle',
        default: true,
    },
    schoolsBuildingFilter: <Toggle>{
        type: 'toggle',
        default: false,
    },
    dispatchCenterBuildingFilter: <Toggle>{
        type: 'toggle',
        default: false,
    },
    //autoBuyLevels: {
    //    type: 'toggle',
    //    default: false,
    //    disabled: () => true,
    //},
})) as ModuleSettingFunction;
