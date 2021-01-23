import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = <type = boolean>(settingId: string): Promise<type> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (window.location.pathname.match(/^\/vehicles\/\d+\/?/)) {
        return await (
            await import(
                /* webpackChunkName: "modules/extendedCallList/vehicleMissionParticipitationState" */ './assets/vehicleMissionParticipitationState'
            )
        ).default(LSSM, MODULE_ID);
    }

    if (await getSetting('remainingTime')) {
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/remainingTime" */ './assets/remainingTime'
            )
        ).default(LSSM, await getSetting('remainingTimeGreenOnly'));
    }
}) as ModuleMainFunction;
