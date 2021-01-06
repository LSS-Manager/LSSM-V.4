import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID, $m) => {
    const getSetting = (settingId: string): Promise<boolean> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    const buildings = ['buildingTax'].filter(async s => await getSetting(s));
    const missions = ['missionPrisoners', 'missionReply'].filter(
        async s => await getSetting(s)
    );

    if (
        window.location.pathname.match(/^\/buildings\/\d+\/?$/) &&
        !document.querySelectorAll('[href*="profile"]').length &&
        buildings.length
    ) {
        (
            await import(
                /* webpackChunkName: "modules/asyncButtons/buildings" */ './assets/buildings'
            )
        ).default(LSSM, buildings, MODULE_ID);
    }

    if (
        window.location.pathname.match(/^\/missions\/\d+\/?$/) &&
        missions.length
    ) {
        import(
            /* webpackChunkName: "modules/asyncButtons/missions" */ './assets/missions'
        ).then(a => a.default(LSSM, missions, MODULE_ID));
    }

    if (
        window.location.pathname.match(/^\/verband\/mitglieder(\/\d+)?\/?$/) &&
        (await getSetting('memberlistManageUser'))
    ) {
        (
            await import(
                /* webpackChunkName: "modules/asyncButtons/memberlist" */ './assets/memberlist'
            )
        ).default(LSSM, $m, MODULE_ID);
    }
    if (
        window.location.pathname.match(
            /^\/alliance_threads\/\d+\/?(\?page=\d+)?$/
        ) &&
        (await getSetting('deleteForumPost'))
    ) {
        import(
            /* webpackChunkName: "modules/asyncButtons/forumpost" */ './assets/forumpost'
        ).then(a => a.default(LSSM, $m, MODULE_ID));
    }

    if (window.location.pathname.match(/^\/aaos/)) {
        import(
            /* webpackChunkName: "modules/asyncButtons/arr" */ './assets/arr'
        ).then(a => a.default(LSSM, $m, MODULE_ID));
    }
}) as ModuleMainFunction;
