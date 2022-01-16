import { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, MODULE_ID, $m }) => {
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
        await LSSM.$store.dispatch('api/fetchBuilding', {
            id: buildingId,
            feature: `${MODULE_ID}-main`,
        });

        if (await getSetting('enhanceVehicleList')) {
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
            document.querySelector('#ausbauten')
        ) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/expansions" */ './assets/expansions'
            ).then(({ default: expansions }) =>
                expansions(LSSM, MODULE_ID, $m)
            );
        }

        if (await getSetting('buildingsLeftRight')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/buildingsLeftRight" */ './assets/buildingsLeftRight'
            ).then(({ default: buildingsLeftRight }) =>
                buildingsLeftRight(LSSM)
            );
        }
    } else if (
        window.location.pathname.match(/^\/buildings\/\d+\/personals\/?$/)
    ) {
        if (await getSetting('schoolingSummary')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/schoolingSummary" */ './assets/schoolingSummary'
            ).then(({ default: schoolingSummary }) =>
                schoolingSummary(LSSM, $m, MODULE_ID)
            );
        }
    } else if (
        window.location.pathname.match(/^\/buildings\/\d+\/vehicles\/new\/?$/)
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
            personalAssignmentButton(LSSM)
        );
    } else if (
        window.location.pathname.match(/^\/vehicles\/\d+\/zuweisung\/?$/)
    ) {
        if (await getSetting('enhancedPersonnelAssignment')) {
            import(
                /* webpackChunkName: "modules/extendedBuilding/enhancedPersonnelAssignment" */ './assets/enhancedPersonnelAssignment'
            ).then(({ default: enhancedPersonnelAssignment }) =>
                enhancedPersonnelAssignment(LSSM, MODULE_ID, getSetting, $m)
            );
        }
    }
}) as ModuleMainFunction;
