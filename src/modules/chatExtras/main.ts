import { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, getSetting }) => {
    if (await getSetting('chatTime')) {
        import(
            /* webpackChunkName: "modules/chatExtras/timeFormatter" */ './assets/timeFormatter'
        ).then(async ({ default: timeFormatter }) =>
            timeFormatter(LSSM, await getSetting<string>('chatTimeFormat'))
        );
    }
}) as ModuleMainFunction;
