import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, MODULE_ID, $m, getSetting }) => {
    const buildings = ['buildingTax', 'switchExtensionState'].filter(
        async s => await getSetting(s)
    );
    const missions = ['missionPrisoners', 'missionReply'].filter(
        async s => await getSetting(s)
    );

    if (
        window.location.pathname.match(/^\/buildings\/\d+\/?$/u) &&
        !document.querySelectorAll('[href*="profile"]').length &&
        buildings.length
    ) {
        import(
            /* webpackChunkName: "modules/asyncButtons/buildings" */ './assets/buildings'
        ).then(({ default: buildingsFn }) =>
            buildingsFn(LSSM, buildings, $m, MODULE_ID)
        );
    }

    if (
        window.location.pathname.match(/^\/buildings\/\d+\/personals\/?$/u) &&
        (await getSetting('buildingPersonal'))
    ) {
        import(
            /* webpackChunkName: "modules/asyncButtons/buildingPersonal" */ './assets/buildingPersonal'
        ).then(({ default: buildingPersonal }) =>
            buildingPersonal(LSSM, $m, MODULE_ID)
        );
    }

    if (
        window.location.pathname.match(/^\/missions\/\d+\/?$/u) &&
        missions.length
    ) {
        import(
            /* webpackChunkName: "modules/asyncButtons/missions" */ './assets/missions'
        ).then(({ default: missionsFn }) =>
            missionsFn(LSSM, missions, MODULE_ID)
        );
    }

    if (
        window.location.pathname.match(/^\/verband\/mitglieder(\/\d+)?\/?$/u) &&
        (await getSetting('memberlistManageUser'))
    ) {
        import(
            /* webpackChunkName: "modules/asyncButtons/memberlist" */ './assets/memberlist'
        ).then(({ default: memberlist }) => memberlist(LSSM, $m, MODULE_ID));
    }
    if (
        window.location.pathname.match(
            /^\/alliance_threads\/\d+\/?(\?page=\d+)?$/u
        ) &&
        (await getSetting('deleteForumPost'))
    ) {
        import(
            /* webpackChunkName: "modules/asyncButtons/forumpost" */ './assets/forumpost'
        ).then(({ default: forumpost }) => forumpost(LSSM, $m, MODULE_ID));
    }

    if (window.location.pathname.match(/^\/aaos/u)) {
        import(
            /* webpackChunkName: "modules/asyncButtons/arr" */ './assets/arr'
        ).then(({ default: arr }) => arr(LSSM, $m, MODULE_ID));
    }
}) as ModuleMainFunction;
