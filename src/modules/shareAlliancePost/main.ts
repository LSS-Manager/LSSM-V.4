import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async moduleParams => {
    if (/^\/missions\/\d+\/?/u.test(window.location.pathname)) {
        import(
            /* webpackChunkName: "modules/shareAlliancePost/mission" */ './assets/missionWindow'
        ).then(({ default: mission }) => mission(moduleParams));
    } else if (window.location.pathname === '/') {
        import(
            /* webpackChunkName: "modules/shareAlliancePost/largeScaleAllianceMission" */ './assets/largeScaleAllianceMission'
        ).then(({ default: largeScaleAllianceMission }) =>
            largeScaleAllianceMission(moduleParams)
        );
    }
});
