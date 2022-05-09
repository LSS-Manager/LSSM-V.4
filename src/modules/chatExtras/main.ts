import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, getSetting }) => {
    getSetting('chatTime').then(chatTime => {
        if (chatTime) {
            import(
                /* webpackChunkName: "modules/chatExtras/timeFormatter" */ './assets/timeFormatter'
            ).then(async ({ default: timeFormatter }) =>
                timeFormatter(LSSM, await getSetting<string>('chatTimeFormat'))
            );
        }
    });

    getSetting('cloneHistoryBtnToHeader').then(clone => {
        if (clone) {
            import(
                /* webpackChunkName: "modules/chatExtras/cloneHistoryBtnToHeader" */ './assets/cloneHistoryBtnToHeader'
            ).then(({ default: cloner }) => cloner());
        }
    });
}) as ModuleMainFunction;
