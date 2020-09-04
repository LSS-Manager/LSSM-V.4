import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID, $m) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
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
        },
    });

    if (
        (!window.location.pathname.match(
            /^\/buildings\/\d+(\/personals)?\/?$/
        ) &&
            !window.location.pathname.match(
                /^\/vehicles\/\d+\/zuweisung\/?$/
            )) ||
        document.querySelectorAll('[href*="profile"]').length
    )
        return;

    await LSSM.$store.dispatch('api/registerVehiclesUsage', true);
    await LSSM.$store.dispatch('api/registerBuildingsUsage', true);

    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (window.location.pathname.match(/^\/buildings\/\d+\/?$/)) {
        const BUILDING_MODE = document.getElementById('tab_protocol')
            ? 'dispatch'
            : 'building';

        if (await getSetting('enhanceVehicleList'))
            await (
                await import(
                    /* webpackChunkName: "extendedBuilding/enhanceVehicleList" */ './assets/enhanceVehicleList'
                )
            ).default(LSSM, BUILDING_MODE, getSetting, $m);

        if (
            BUILDING_MODE === 'building' &&
            (await getSetting('personnelDemands'))
        )
            (
                await import(
                    /* webpackChunkName: "extendedBuilding/personnelDemands" */ './assets/personnelDemands'
                )
            ).default(LSSM, $m);

        if (
            (await getSetting('expansions')) &&
            document.querySelector('#ausbauten')
        )
            (
                await import(
                    /* webpackChunkName: "extendedBuilding/expansions" */ './assets/expansions'
                )
            ).default(LSSM, MODULE_ID, $m);
    } else if (
        window.location.pathname.match(/^\/buildings\/\d+\/personals\/?$/)
    ) {
        if (await getSetting('schoolingSummary'))
            (
                await import(
                    /* webpackChunkName: "extendedBuilding/schoolingSummary" */ './assets/schoolingSummary'
                )
            ).default(LSSM, $m);
    } else if (
        window.location.pathname.match(/^\/vehicles\/\d+\/zuweisung\/?$/)
    )
        if (await getSetting('enhancedPersonnelAssignment'))
            (
                await import(
                    /* webpackChunkName: "extendedBuilding/enhancedPersonnelAssignment" */ './assets/enhancedPersonnelAssignment'
                )
            ).default(LSSM, $m);
}) as ModuleMainFunction;
