import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = <type = boolean>(settingId: string): Promise<type> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (await getSetting('remainingTime'))
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/remainingTime" */ './assets/remainingTime'
            )
        ).default(LSSM, await getSetting('remainingTimeGreenOnly'));
}) as ModuleMainFunction;
