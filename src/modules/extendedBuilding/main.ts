import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID, $m) => {
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
                    /* webpackChunkName: "modules/extendedBuilding/enhanceVehicleList" */ './assets/enhanceVehicleList'
                )
            ).default(LSSM, BUILDING_MODE, getSetting, $m);

        if (
            BUILDING_MODE === 'building' &&
            (await getSetting('personnelDemands'))
        )
            (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/personnelDemands" */ './assets/personnelDemands'
                )
            ).default(LSSM, $m);

        if (
            (await getSetting('expansions')) &&
            document.querySelector('#ausbauten')
        )
            (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/expansions" */ './assets/expansions'
                )
            ).default(LSSM, MODULE_ID, $m);
    } else if (
        window.location.pathname.match(/^\/buildings\/\d+\/personals\/?$/)
    ) {
        if (await getSetting('schoolingSummary'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/schoolingSummary" */ './assets/schoolingSummary'
                )
            ).default(LSSM, $m);
    } else if (
        window.location.pathname.match(/^\/vehicles\/\d+\/zuweisung\/?$/)
    )
        if (await getSetting('enhancedPersonnelAssignment'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/enhancedPersonnelAssignment" */ './assets/enhancedPersonnelAssignment'
                )
            ).default(LSSM, $m);
}) as ModuleMainFunction;
