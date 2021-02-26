import { ModuleMainFunction } from 'typings/Module';

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
    LSSM.$store
        .dispatch('hook', {
            event: 'lightboxAdjust',
            abortOnFalse: true,
            callback() {
                const iframe = document.getElementById(
                    LSSM.$store.getters.nodeAttribute(
                        'redesign-lightbox-iframe'
                    )
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
                if (modal) modal.style.padding = '0';

                return false;
            },
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
}) as ModuleMainFunction;
