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

import { ModuleMainFunction, ModuleSettingFunction } from 'typings/Module';

require('./natives/navTabsClicker');
require('./natives/lightbox');
(async () => {
    if (window.location.pathname.match(/^\/users\//)) return;
    Vue.config.productionTip = false;

    const appContainer = document.createElement('div') as HTMLDivElement;
    document.body.appendChild(appContainer);

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

    const LSSM = new Vue({
        store: store(Vue),
        i18n: await i18n(Vue),
        render: h => h(LSSMV4),
    }).$mount(appContainer);

    window[PREFIX] = LSSM;

    await LSSM.$store.dispatch(
        'api/setVehicleStates',
        'core-initialVehicleStates'
    );
    for (const moduleId of [
        ...Object.keys(LSSM.$store.state.modules),
        ...LSSM.$store.state.coreModules,
    ]) {
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
        import(
            /* webpackChunkName: "mainpageCore" */ './mainpageCore'
        ).then(core => core.default(LSSM));
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
                const $m = (key: string, args?: { [key: string]: unknown }) =>
                    LSSM.$t(`modules.${moduleId}.${key}`, args);
                const $mc = (
                    key: string,
                    amount?: number,
                    args?: { [key: string]: unknown }
                ) => LSSM.$tc(`modules.${moduleId}.${key}`, amount, args);
                if (
                    LSSM.$store.state.modules[moduleId].settings &&
                    (window.location.pathname.match(
                        LSSM.$store.state.modules[moduleId].location
                    ) ||
                        window.location.pathname === '/')
                ) {
                    await LSSM.$store.dispatch('settings/register', {
                        moduleId,
                        settings: await ((
                            await import(
                                /* webpackChunkName: "modules/settings/[request]" */
                                /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+settings\.ts/ */
                                /* webpackExclude: /[\\/]+modules[\\/]+(telemetry|releasenotes|support)[\\/]+/ */
                                `./modules/${moduleId}/settings`
                            )
                        ).default as ModuleSettingFunction)(moduleId, LSSM, $m),
                    });
                }
                if (
                    window.location.pathname.match(
                        LSSM.$store.state.modules[moduleId].location
                    )
                ) {
                    try {
                        LSSM.$i18n.mergeLocaleMessage(LSSM.$store.state.lang, {
                            modules: {
                                [moduleId]: (
                                    await import(
                                        /* webpackChunkName: "modules/i18n/[request]" */
                                        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+/ */
                                        /* webpackExclude: /(telemetry|releasenotes|support)|\.root\./ */
                                        `./modules/${moduleId}/i18n/${LSSM.$store.state.lang}`
                                    )
                                ).default,
                            },
                        });
                    } catch {
                        // if no i18n exists, do nothing
                    }
                    import(
                        /* webpackChunkName: "modules/mains/[request]" */
                        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+main\.ts/ */
                        /* webpackExclude: /[\\/]+modules[\\/]+(telemetry|releasenotes|support)[\\/]+/ */
                        `./modules/${moduleId}/main`
                    ).then(module =>
                        (module.default as ModuleMainFunction)(
                            LSSM,
                            moduleId,
                            $m,
                            $mc
                        )
                    );
                }
            });
        });
})();
