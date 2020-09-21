export default (MODULE_ID: string): unknown => ({
    enhanceVehicleList: {
        type: 'toggle',
        default: true,
    },
    vehicleTypes: {
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    fmsSwitch: {
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    personnelAssignmentBtn: {
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelMax: {
        type: 'toggle',
        default: true,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelCurrent: {
        type: 'toggle',
        default: false,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelAssigned: {
        type: 'toggle',
        default: false,
        dependsOn: '.enhanceVehicleList',
    },
    vehiclesPersonnelColorized: {
        type: 'toggle',
        default: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled: (settings): boolean =>
            !(
                settings[MODULE_ID].vehiclesPersonnelAssigned.value &&
                settings[MODULE_ID].vehiclesPersonnelMax.value
            ),
    },
    personnelDemands: {
        type: 'toggle',
        default: true,
    },
    schoolingSummary: {
        type: 'toggle',
        default: true,
    },
    enhancedPersonnelAssignment: {
        type: 'toggle',
        default: true,
    },
    expansions: {
        type: 'toggle',
        default: true,
    },
    buildingsLeftRight: {
        type: 'toggle',
        default: false,
    },
    fastDispatchChooser: {
        type: 'toggle',
        default: true,
    },
    autoBuyLevels: {
        type: 'toggle',
        default: false,
        disabled: () => true,
    },
});
