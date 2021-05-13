import { ModuleMainFunction } from 'typings/Module';
import { routeChecks } from 'typings/modules/Redesign';

const routeChecks: routeChecks = {
    '^/verband/avatar/?$': 'alliance_avatar',
    '^/alliances/?$': 'alliances',
    '^/avatar/?$': 'avatar',
    '^/auszeichnungen/?$': 'awards',
    '^/coins/list/?$': 'coins/list',
    '^/credits/daily/?$': 'credits/daily',
    '^/credits/?$': 'credits/list',
    '^/credits/overview/?$': 'credits/overview',
    '^/freunde/?$': 'freunde',
    '^/profile/\\d+/?$': 'profile',
    '^/profile/edit/?$': 'profile/edit',
    '^/schoolings/?$': 'schoolings',
    '^/toplist/?$': 'toplist',
    '^/vehicles/\\d+/?$': 'vehicle',
    '^/verband/bereitstellungsraume/?$': 'verband/bsr',
    '^/alliances/\\d+/edit/?$': 'verband/edit_name',
    '^/veband/text/edit/?$': 'verband/edit_text',
    '^/(verband|alliances/\\d+)/?$': 'verband/home',
    '^/verband/mitglieder(/\\d+)?/?$': 'verband/mitglieder',
    '^/alliance_newses/(new|\\d+/edit)/?$': 'verband/news/edit',
    '^/alliance_logfiles/?$': 'verband/protokoll',
    '^/verband/regeln/\\d+/?$': 'verband/regeln',
    // '^/vehicles/\\d+/(patient|gefangener)/\\d+/?': 'vehicle/nextfms',
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
                const creation = new Date().toISOString();
                const size =
                    96 -
                    2 *
                        document.querySelectorAll<HTMLDivElement>(
                            '#modals-container > .vm--container'
                        ).length;
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
                        creation,
                        size,
                    },
                    {
                        name: `redesign-lightbox-${creation}`,
                        height: `${size}%`,
                        width: `${size}%`,
                    },
                    {
                        closed() {
                            window.lightboxClose(creation);
                        },
                    }
                );
                return false;
            },
        })
        .then();

    const findIframes = (doc: Document | null): HTMLIFrameElement[] => {
        const frames = Array.from(
            doc?.querySelectorAll<HTMLIFrameElement>(
                `[name="${LSSM.$store.getters.nodeAttribute(
                    'redesign-lightbox-iframe'
                )}"]`
            ) ?? []
        );
        return [
            ...frames,
            ...frames.flatMap(frame => findIframes(frame.contentDocument)),
        ];
    };

    const lightboxAdjust = () => {
        const iframes = findIframes(document);
        if (!iframes || !iframes.length) return true;
        iframes.forEach(iframe => {
            const container = iframe.contentDocument?.getElementById(
                'iframe-inside-container'
            );
            if (!container) return true;
            container.style.width = '100%';
            container.style.height = '100%';
        });
        const modal = document.querySelector<HTMLDivElement>(
            '.vm--overlay[data-modal^="redesign-lightbox-"] ~ .vm--modal'
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
            callback(creation?: string) {
                if (creation) {
                    LSSM.$modal.hide(`redesign-lightbox-${creation}`);
                } else {
                    // $modal.hideAll actually exists but typedefs don't know…
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    LSSM.$modal.hideAll();
                }
            },
        })
        .then();

    if (window.parent === window && window.location.pathname !== '/') {
        const type = Object.entries(routeChecks).find(([regex]) =>
            window.location.pathname.match(regex)
        )?.[1];
        const nextVehicle =
            type === 'vehicle/nextfms'
                ? document
                      .querySelector<HTMLAnchorElement>(
                          'a.btn.btn-success[href^="/vehicles/"]'
                      )
                      ?.href?.match(/\d+$/)?.[0]
                : null;
        if (type && (nextVehicle || type !== 'vehicle/nextfms')) {
            import(
                /* webpackChunkName: "modules/redesign/lightbox" */ `./components/lightbox.vue`
            ).then(lightbox => {
                new LSSM.$vue({
                    store: LSSM.$store,
                    i18n: LSSM.$i18n,
                    render: h =>
                        h(lightbox.default, {
                            props: {
                                url: nextVehicle
                                    ? `/vehicles/${nextVehicle}`
                                    : window.location.href,
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
                                creation: new Date().toISOString(),
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
