import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, MODULE_ID, $m, getSetting, setSetting }) => {
    if (
        (!window.location.pathname.match(
            /^\/buildings\/\d+(\/(personals|vehicles\/new))?\/?$/u
        ) &&
            !window.location.pathname.match(
                /^\/vehicles\/\d+\/zuweisung\/?$/u
            ) &&
            !window.location.pathname.match(/^\/schoolings\/\d+\/?$/u)) ||
        document.querySelectorAll('[href*="profile"]').length
    )
        return;

    if (window.location.pathname.match(/^\/buildings\/\d+\/?$/u)) {
        const BUILDING_MODE = document.querySelector<HTMLDivElement>(
            '#tab_protocol'
        )
            ? 'dispatch'
            : document.querySelector<HTMLDivElement>('#schooling_running')
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
                document.querySelector<HTMLTableElement>('#vehicle_table')
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
            document.querySelector('#ausbauten')
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
    } else if (
        window.location.pathname.match(/^\/buildings\/\d+\/personals\/?$/u)
    ) {
        if (await getSetting('schoolingSummary')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/schoolingSummary" */ './assets/schoolingSummary'
            ).then(({ default: schoolingSummary }) =>
                schoolingSummary(LSSM, $m, MODULE_ID)
            );
        }
    } else if (
        window.location.pathname.match(/^\/buildings\/\d+\/vehicles\/new\/?$/u)
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
        window.location.pathname.match(/^\/vehicles\/\d+\/zuweisung\/?$/u)
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
    } else if (window.location.pathname.match(/^\/schoolings\/\d+\/?$/u)) {
        if (await getSetting('schoolsBuildingFilter')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/schoolsBuildingFilter" */ './assets/schoolsBuildingFilter'
            ).then(({ default: schoolsBuildingFilter }) =>
                schoolsBuildingFilter(LSSM)
            );
        }
    }
}) as ModuleMainFunction;
