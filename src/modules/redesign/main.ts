import { ModuleMainFunction } from 'typings/Module';
import { routeChecks } from 'typings/modules/Redesign';

const routeChecks: routeChecks = {
    '^/vehicles/\\d+/?$': 'vehicle',
};

export default ((LSSM, MODULE_ID) => {
    LSSM.$store
        .dispatch('hook', {
            event: 'lightboxOpen',
            abortOnFalse: true,
            callback(href: string) {
                LSSM.$store
                    .dispatch('api/getMissions', {
                        force: false,
                        feature: 'redesign-lightboxOpen',
                    })
                    .then();
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "modules/redesign/lightbox" */ `./components/lightbox.vue`
                        ),
                    {
                        url: href,
                        $m: (
                            key: string,
                            args?: {
                                [key: string]: unknown;
                            }
                        ) => LSSM.$t(`modules.${MODULE_ID}.${key}`, args),
                        $mc: (
                            key: string,
                            amount: number,
                            args?: {
                                [key: string]: unknown;
                            }
                        ) =>
                            LSSM.$tc(
                                `modules.${MODULE_ID}.${key}`,
                                amount,
                                args
                            ),
                        routeChecks,
                    },
                    {
                        name: 'redesign-lightbox',
                        height: '96%',
                        width: '96%',
                    },
                    {
                        closed() {
                            window.lightboxClose();
                        },
                    }
                );
                return false;
            },
        })
        .then();

    const lightboxAdjust = () => {
        const iframe = document.getElementById(
            LSSM.$store.getters.nodeAttribute('redesign-lightbox-iframe')
        ) as HTMLIFrameElement | null;
        if (!iframe) return true;
        const container = iframe.contentDocument?.getElementById(
            'iframe-inside-container'
        );
        if (!container) return true;
        container.style.width = '100%';
        container.style.height = '100%';
        const modal = document.querySelector<HTMLDivElement>(
            '.vm--overlay[data-modal="redesign-lightbox"] ~ .vm--modal'
        );
        if (modal) {
            modal.style.padding = '0';
        } else {
            document.documentElement.style.height = '100%';
            document.body.style.height = '100%';
        }

        return false;
    };

    LSSM.$store
        .dispatch('hook', {
            event: 'lightboxAdjust',
            abortOnFalse: true,
            callback: lightboxAdjust,
        })
        .then();

    LSSM.$store
        .dispatch('hook', {
            event: 'lightboxClose',
            callback() {
                LSSM.$modal.hide('redesign-lightbox');
            },
        })
        .then();

    if (window.parent === window && window.location.pathname !== '/') {
        const type = Object.entries(routeChecks).find(([regex]) =>
            window.location.pathname.match(regex)
        )?.[1];
        if (type) {
            import(
                /* webpackChunkName: "modules/redesign/lightbox" */ `./components/lightbox.vue`
            ).then(lightbox => {
                new LSSM.$vue({
                    store: LSSM.$store,
                    i18n: LSSM.$i18n,
                    render: h =>
                        h(lightbox.default, {
                            props: {
                                url: window.location.href,
                                $m: (
                                    key: string,
                                    args?: {
                                        [key: string]: unknown;
                                    }
                                ) =>
                                    LSSM.$t(
                                        `modules.${MODULE_ID}.${key}`,
                                        args
                                    ),
                                $mc: (
                                    key: string,
                                    amount: number,
                                    args?: {
                                        [key: string]: unknown;
                                    }
                                ) =>
                                    LSSM.$tc(
                                        `modules.${MODULE_ID}.${key}`,
                                        amount,
                                        args
                                    ),
                                routeChecks,
                                noModal: true,
                            },
                        }),
                }).$mount(
                    document.getElementById('iframe-inside-container') ??
                        document.body
                );
                lightboxAdjust();
            });
        }
    }
}) as ModuleMainFunction;
