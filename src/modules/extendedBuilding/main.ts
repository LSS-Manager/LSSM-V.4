import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID, $m) => {
    if (
        (!window.location.pathname.match(
            /^\/buildings\/\d+(\/(personals|vehicles\/new))?\/?$/
        ) &&
            !window.location.pathname.match(
                /^\/vehicles\/\d+\/zuweisung\/?$/
            )) ||
        document.querySelectorAll('[href*="profile"]').length
    )
        return;

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

        const path = window.location.pathname.split('/').filter(s => !!s);
        const buildingId = parseInt(path[path.length - 1]);
        await LSSM.$store.dispatch('api/fetchBuilding', buildingId);

        if (await getSetting('enhanceVehicleList'))
            await (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/enhanceVehicleList" */ './assets/enhanceVehicleList'
                )
            ).default(LSSM, BUILDING_MODE, getSetting, $m);

        if (BUILDING_MODE === 'building') {
            if (
                (await getSetting('personnelDemands')) &&
                document.getElementById('vehicle_table')
            )
                (
                    await import(
                        /* webpackChunkName: "modules/extendedBuilding/personnelDemands" */ './assets/personnelDemands'
                    )
                ).default(LSSM, $m);
            if (await getSetting('fastDispatchChooser'))
                (
                    await import(
                        /* webpackChunkName: "modules/extendedBuilding/fastDispatchChooser" */ './assets/fastDispatchChooser'
                    )
                ).default(LSSM, $m);
        }

        if (
            (await getSetting('expansions')) &&
            document.querySelector('#ausbauten')
        )
            (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/expansions" */ './assets/expansions'
                )
            ).default(LSSM, MODULE_ID, $m);

        if (await getSetting('buildingsLeftRight'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/buildingsLeftRight" */ './assets/buildingsLeftRight'
                )
            ).default(LSSM);
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
        window.location.pathname.match(/^\/buildings\/\d+\/vehicles\/new\/?$/)
    ) {
        if (await getSetting('autoBuyLevels'))
            await (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/autoBuyLevels" */ './assets/autoBuyLevels'
                )
            ).default(LSSM);
    } else if (
        window.location.pathname.match(/^\/vehicles\/\d+\/zuweisung\/?$/)
    )
        if (await getSetting('enhancedPersonnelAssignment')) {
            await LSSM.$store.dispatch(
                'api/fetchVehicle',
                parseInt(
                    window.location.pathname.match(
                        /(?<=vehicles\/)\d+(?=\/zuweisung)/
                    )?.[0] ?? '-1'
                )
            );
            (
                await import(
                    /* webpackChunkName: "modules/extendedBuilding/enhancedPersonnelAssignment" */ './assets/enhancedPersonnelAssignment'
                )
            ).default(LSSM, $m);
        }
}) as ModuleMainFunction;
