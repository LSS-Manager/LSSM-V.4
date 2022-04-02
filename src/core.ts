import Vue from 'vue';

import * as Tabs from 'vue-slim-tabs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Notifications from 'vue-notification';
import ToggleButton from 'vue-js-toggle-button';
import VueJSModal from 'vue-js-modal';

import i18n from './i18n';
import LSSMV4 from './LSSMV4.vue';
import store from './store';
import utils from './utils';

import type { ModuleMainFunction, ModuleSettingFunction } from 'typings/Module';

require('./natives/navTabsClicker');
require('./natives/lightbox');

Vue.config.productionTip = false;

const appContainer = document.createElement('div') as HTMLDivElement;
document.body.append(appContainer);

window.keepAlive = true;

Vue.use(VueJSModal, {
    dynamic: true,
    dynamicDefaults: {
        adaptive: true,
        scrollable: true,
        clickToClose: true,
    },
    dialog: true,
});
Vue.use(ToggleButton);
Vue.use(Tabs);
Vue.use(Notifications);

Vue.component('font-awesome-icon', FontAwesomeIcon);
utils(Vue);

(async () => {
    if (window.hasOwnProperty(PREFIX)) return;

    const LSSM = new Vue({
        store: store(Vue),
        i18n: await i18n(Vue),
        render: h => h(LSSMV4),
    }).$mount(appContainer);

    window[PREFIX] = LSSM;

    window.addEventListener('pagehide', () => {
        LSSM.$destroy();
        window[PREFIX] = null;
        const readonly = ['$attrs', '$listeners'];
        Object.keys(LSSM).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (key in LSSM && !readonly.includes(key)) LSSM[key] = null;
        });
    });

    await LSSM.$store.dispatch(
        'api/setVehicleStates',
        'core-initialVehicleStates'
    );
    for (const moduleId of LSSM.$store.state.coreModules) {
        try {
            LSSM.$i18n.mergeLocaleMessage(LSSM.$store.state.lang, {
                modules: {
                    [moduleId]: (
                        await import(
                            /* webpackChunkName: "modules/i18n/[request]" */
                            /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+.*?\.root/ */
                            `./modules/${moduleId}/i18n/${LSSM.$store.state.lang}.root`
                        )
                    ).default,
                },
            });
        } catch {
            // if no i18n exists, do nothing
        }
    }
    if (window.location.pathname === '/') {
        import(/* webpackChunkName: "mainpageCore" */ './mainpageCore').then(
            core => core.default(LSSM)
        );
    }

    LSSM.$store
        .dispatch('storage/get', {
            key: 'activeModules',
            defaultValue: [],
        })
        .then((activeModules: string[]) => {
            let filteredActiveModules = activeModules.filter(module =>
                LSSM.$store.state.modules.hasOwnProperty(module)
            );
            if (LSSM.$store.state.mapkit) {
                filteredActiveModules = filteredActiveModules.filter(
                    module => !LSSM.$store.state.modules[module].noMapkit
                );
            }
            filteredActiveModules.forEach(async moduleId => {
                LSSM.$store.commit('setModuleActive', moduleId);
                const $m = (key: string, args?: Record<string, unknown>) =>
                    LSSM.$t(`modules.${moduleId}.${key}`, args);
                const $mc = (
                    key: string,
                    amount?: number,
                    args?: Record<string, unknown>
                ) => LSSM.$tc(`modules.${moduleId}.${key}`, amount, args);

                const locationMatches = window.location.pathname.match(
                    LSSM.$store.state.modules[moduleId].location
                );

                if (locationMatches || window.location.pathname === '/') {
                    try {
                        LSSM.$i18n.mergeLocaleMessage(LSSM.$store.state.lang, {
                            modules: {
                                [moduleId]: (
                                    await import(
                                        /* webpackChunkName: "modules/i18n/[request]" */
                                        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+.*?\.root/ */
                                        `./modules/${moduleId}/i18n/${LSSM.$store.state.lang}.root`
                                    )
                                ).default,
                            },
                        });
                    } catch {
                        // if no i18n exists, do nothing
                    }
                }

                if (
                    LSSM.$store.state.modules[moduleId].settings &&
                    (locationMatches || window.location.pathname === '/')
                ) {
                    await LSSM.$store.dispatch('settings/register', {
                        moduleId,
                        settings: await (
                            (
                                await import(
                                    /* webpackChunkName: "modules/settings/[request]" */
                                    /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+settings\.ts/ */
                                    /* webpackExclude: /[\\/]+modules[\\/]+(telemetry|releasenotes|support)[\\/]+/ */
                                    `./modules/${moduleId}/settings`
                                )
                            ).default as ModuleSettingFunction
                        )(moduleId, LSSM, $m),
                    });
                }

                if (locationMatches) {
                    if (moduleId === 'redesign') {
                        document
                            .querySelector<HTMLButtonElement>(
                                '#lightbox_close_inside'
                            )
                            ?.remove();
                    }
                    import(
                        /* webpackChunkName: "modules/i18n/[request]" */
                        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+/ */
                        /* webpackExclude: /(telemetry|releasenotes|support)|\.root\./ */
                        `./modules/${moduleId}/i18n/${LSSM.$store.state.lang}`
                    )
                        .then(({ default: i18n }) =>
                            LSSM.$i18n.mergeLocaleMessage(
                                LSSM.$store.state.lang,
                                {
                                    modules: {
                                        [moduleId]: i18n,
                                    },
                                }
                            )
                        )
                        .catch(() => {
                            // if no i18n exists, do nothing
                        })
                        .finally(() =>
                            import(
                                /* webpackChunkName: "modules/mains/[request]" */
                                /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+main\.ts/ */
                                /* webpackExclude: /[\\/]+modules[\\/]+(telemetry|releasenotes|support)[\\/]+/ */
                                `./modules/${moduleId}/main`
                            ).then(module =>
                                (module.default as ModuleMainFunction)({
                                    LSSM,
                                    MODULE_ID: moduleId,
                                    $m,
                                    $mc,
                                    getSetting: (settingId, defaultValue) =>
                                        LSSM.$store.dispatch(
                                            'settings/getSetting',
                                            {
                                                moduleId,
                                                settingId,
                                                defaultValue,
                                            }
                                        ),
                                })
                            )
                        );
                }
            });
        });
})();
