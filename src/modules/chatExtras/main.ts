import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = <type = boolean>(settingId: string): Promise<type> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    const chatTime = await getSetting('chatTime');
    if (chatTime) {
        (
            await import(
                /* webpackChunkName: "modules/chatExtras/timeFormatter" */ './assets/timeFormatter'
            )
        ).default(LSSM, await getSetting<string>('chatTimeFormat'));
    }
}) as ModuleMainFunction;
