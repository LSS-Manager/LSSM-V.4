import type { ModuleMainFunction } from 'typings/Module';

export default (async ({
    LSSM,
    MODULE_ID,
    $m,
    $mc,
    getSetting,
    setSetting,
}) => {
    if (
        window.location.pathname === '/' &&
        (await getSetting('startPatrolsShortcut'))
    ) {
        return import(
            /* webpackChunkName: "modules/extendedBuilding/startPatrolsShortcut" */ './assets/startPatrolsShortcut'
        ).then(({ default: sps }) => sps(LSSM, $m, $mc, MODULE_ID));
    }

    if (
        (!/^\/buildings\/\d+(?:\/(?:personals|vehicles\/new))?\/?$/u.test(
            window.location.pathname
        ) &&
            !/^\/vehicles\/\d+\/zuweisung\/?$/u.test(
                window.location.pathname
            ) &&
            !/^\/schoolings\/\d+\/?$/u.test(window.location.pathname)) ||
        (!document.getElementById('bereitstellungsraumReset') &&
            document.querySelectorAll('[href*="profile"]').length)
    )
        return;

    if (/^\/buildings\/\d+\/?$/u.test(window.location.pathname)) {
        const BUILDING_MODE = document.getElementById('tab_protocol')
            ? 'dispatch'
            : document.getElementById('schooling_running')
              ? 'schooling'
              : 'building';

        const path = window.location.pathname.split('/').filter(s => !!s);
        const buildingId = parseInt(path.at(-1) ?? '-1');
        await LSSM.$stores.api.getBuilding(buildingId, `${MODULE_ID}-main`);

        if (
            (BUILDING_MODE === 'dispatch' || BUILDING_MODE === 'building') &&
            (await getSetting('enhanceVehicleList'))
        ) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/enhanceVehicleList" */ './assets/enhanceVehicleList'
            ).then(({ default: evl }) =>
                evl(LSSM, BUILDING_MODE, getSetting, $m, MODULE_ID)
            );
        }
        if (await getSetting('fastDispatchChooser')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/fastDispatchChooser" */ './assets/fastDispatchChooser'
            ).then(({ default: fastDispatchChooser }) =>
                fastDispatchChooser(LSSM, BUILDING_MODE, $m, MODULE_ID)
            );
        }

        if (BUILDING_MODE === 'building') {
            if (
                (await getSetting('personnelDemands')) &&
                document.getElementById('vehicle_table')
            ) {
                import(
                    /* webpackChunkName: "modules/extendedBuilding/personnelDemands" */ './assets/personnelDemands'
                ).then(({ default: personnelDemands }) =>
                    personnelDemands(LSSM, $m, buildingId, MODULE_ID)
                );
            }
            if (
                (await getSetting('upgradeConfirmation')) &&
                document.querySelector('.alert a[href$="/small_expand"]')
            ) {
                import(
                    /* webpackChunkName: "modules/extendedBuilding/upgradeConfirmation" */ './assets/upgradeConfirmation'
                ).then(({ default: upgradeConfirmation }) =>
                    upgradeConfirmation(LSSM, $m, MODULE_ID)
                );
            }
        }

        if (
            (await getSetting('expansions')) &&
            document.getElementById('ausbauten')
        ) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/expansions" */ './assets/expansions'
            ).then(({ default: expansions }) =>
                expansions(LSSM, MODULE_ID, $m)
            );
        }

        if (await getSetting('buildingsLeftRight')) {
            await LSSM.$stores.api.getBuildings(`${MODULE_ID}_blr`);
            import(
                /* webpackChunkName: "modules/extendedBuilding/buildingsLeftRight" */ './assets/buildingsLeftRight'
            ).then(({ default: buildingsLeftRight }) =>
                buildingsLeftRight(LSSM)
            );
        }

        if (BUILDING_MODE === 'dispatch') {
            if (await getSetting('dispatchCenterBuildingFilter')) {
                import(
                    /* webpackChunkName: "modules/extendedBuilding/dispatchCenterBuildingFilter" */ './assets/dispatchCenterBuildingFilter'
                ).then(({ default: dispatchCenterBuildingFilter }) =>
                    dispatchCenterBuildingFilter(LSSM, MODULE_ID)
                );
            }
        }

        if (
            BUILDING_MODE === 'schooling' &&
            (await getSetting('schoolsBuildingFilter'))
        ) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/schoolsBuildingFilter" */ './assets/schoolsBuildingFilter'
            ).then(({ default: schoolsBuildingFilter }) =>
                schoolsBuildingFilter(LSSM)
            );
        }

        if (
            document.querySelector<HTMLAnchorElement>(
                '#bereitstellungsraumReset'
            )
        ) {
            if (await getSetting('renewAllStagingAreas')) {
                import(
                    /* webpackChunkName: "modules/extendedBuilding/renewAllStagingAreas" */ './assets/renewAllStagingAreas'
                ).then(({ default: renewAllStagingAreas }) =>
                    renewAllStagingAreas(LSSM, MODULE_ID, (key, args) =>
                        $m(`renewAllStagingAreas.${key}`, args)
                    )
                );
            }
        }
    } else if (
        /^\/buildings\/\d+\/personals\/?$/u.test(window.location.pathname)
    ) {
        if (await getSetting('schoolingSummary')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/schoolingSummary" */ './assets/schoolingSummary'
            ).then(({ default: schoolingSummary }) =>
                schoolingSummary(LSSM, $m, MODULE_ID)
            );
        }
    } else if (
        /^\/buildings\/\d+\/vehicles\/new\/?$/u.test(window.location.pathname)
    ) {
        if (await getSetting('autoBuyLevels')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/autoBuyLevels" */ './assets/autoBuyLevels'
            ).then(({ default: autoBuyLevels }) =>
                autoBuyLevels(LSSM, MODULE_ID)
            );
        }
        import(
            /* webpackChunkName: "modules/extendedBuilding/personalAssignmentButton" */ './assets/personalAssignmentButton'
        ).then(({ default: personalAssignmentButton }) =>
            personalAssignmentButton()
        );
    } else if (
        /^\/vehicles\/\d+\/zuweisung\/?$/u.test(window.location.pathname)
    ) {
        if (await getSetting('enhancedPersonnelAssignment')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/enhancedPersonnelAssignment" */ './assets/enhancedPersonnelAssignment'
            ).then(({ default: enhancedPersonnelAssignment }) =>
                enhancedPersonnelAssignment(
                    LSSM,
                    MODULE_ID,
                    getSetting,
                    setSetting,
                    $m
                )
            );
        }
    } else if (/^\/schoolings\/\d+\/?$/u.test(window.location.pathname)) {
        if (await getSetting('schoolsBuildingFilter')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/schoolsBuildingFilter" */ './assets/schoolsBuildingFilter'
            ).then(({ default: schoolsBuildingFilter }) =>
                schoolsBuildingFilter(LSSM)
            );
        }
    }
}) as ModuleMainFunction;
