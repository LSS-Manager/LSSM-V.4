import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(({ getSetting }) => {
    if (
        window.location.pathname.match(
            /^\/vehicles\/\d+\/(gefangener|patient)\/\d+\/?$/u
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

    if (window.location.pathname.match(/\/missions\/\d+\/?$/u)) {
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
