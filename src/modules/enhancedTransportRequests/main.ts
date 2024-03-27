import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(({ getSetting }) => {
    if (
        /^\/vehicles\/\d+(?:\/(?:gefangener|patient)\/\d+)?\/?$/u.test(
            window.location.pathname
        )
    ) {
        getSetting('autoClickSuccessBtns').then(autoClickSuccessBtns => {
            if (autoClickSuccessBtns) {
                import(
                    /* webpackChunkName: "modules/enhancedTransportRequests/autoClickSuccessBtns" */ './assets/autoClickSuccessBtns'
                ).then(({ default: autoClickSuccessBtns }) =>
                    autoClickSuccessBtns()
                );
            }
        });
    }

    if (/\/missions\/\d+\/?$/u.test(window.location.pathname)) {
        getSetting('autoOpenTransportRequest').then(
            autoOpenTransportRequest => {
                if (autoOpenTransportRequest) {
                    import(
                        /* webpackChunkName: "modules/enhancedTransportRequests/autoOpenTransportRequest" */ './assets/autoOpenTransportRequest'
                    ).then(({ default: autoOpenTransportRequest }) =>
                        autoOpenTransportRequest()
                    );
                }
            }
        );
    }
});
