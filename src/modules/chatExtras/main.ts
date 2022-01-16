import { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, MODULE_ID }) => {
    const getSetting = <type = boolean>(settingId: string): Promise<type> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (await getSetting('chatTime')) {
        import(
            /* webpackChunkName: "modules/chatExtras/timeFormatter" */ './assets/timeFormatter'
        ).then(async ({ default: timeFormatter }) =>
            timeFormatter(LSSM, await getSetting<string>('chatTimeFormat'))
        );
    }
}) as ModuleMainFunction;
