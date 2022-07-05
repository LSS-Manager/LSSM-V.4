import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(({ getSetting }) => {
    getSetting('autoClickSuccessBtns').then(autoClickSuccessBtns => {
        if (autoClickSuccessBtns) {
            import(
                /* webpackChunkName: "modules/enhancedTransportRequests/autoClickSuccessBtns" */ './assets/autoClickSuccessBtns'
            ).then(({ default: autoClickSuccessBtns }) =>
                autoClickSuccessBtns()
            );
        }
    });
});
