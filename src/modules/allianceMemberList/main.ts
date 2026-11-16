import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, MODULE_ID, $m }) => {
    if (!/^\/verband\/mitglieder(?:\/\d+)?\/?$/u.test(window.location.pathname))
        return;

    import(
        /* webpackChunkName: "modules/allianceMemberList/memberList" */ './assets/memberList'
    ).then(({ default: memberList }) => memberList(LSSM, $m, MODULE_ID));
}) as ModuleMainFunction;
