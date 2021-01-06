import Vue from 'vue';
import VueJSModal from 'vue-js-modal';
import ToggleButton from 'vue-js-toggle-button';
import * as Tabs from 'vue-slim-tabs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Notifications from 'vue-notification';
import LSSMV4 from './LSSMV4.vue';
import LSSMMenu from './LSSM-Menu.vue';
import store from './store';
import i18n from './i18n';
import utils from './utils';
import telemetry from './modules/telemetry/main';
import releasenotes from './modules/releasenotes/main';
import { BuildingMarkerAdd, RadioMessage } from '../typings/Ingame';
import { ModuleMainFunction, ModuleSettingFunction } from 'typings/Module';
import { Color, Toggle } from 'typings/Setting';
import { Building } from 'typings/Building';

require('./natives/navTabsClicker');
require('./natives/lightbox');
(async () => {
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

    if (window.location.pathname === '/') {
        window.console.info(
            `Running %cLSSM%c in Version %c${VERSION}%c`,
            'font-weight: bold;',
            'font-weight: normal;',
            'font-style: italic;'
        );

        const indicatorWrapper = document.createElement('li') as HTMLLIElement;
        document
            .querySelector('.navbar-default .navbar-right')
            ?.appendChild(indicatorWrapper);

        LSSM.$store
            .dispatch('settings/register', {
                moduleId: 'global',
                settings: {
                    labelInMenu: <Toggle>{
                        type: 'toggle',
                        default: false,
                    },
                    allowTelemetry: <Toggle>{
                        type: 'toggle',
                        default: true,
                    },
                    iconBg: <Color>{
                        type: 'color',
                        default: LSSM.$store.state.policechief
                            ? '#004997'
                            : '#C9302C',
                    },
                    iconBgAsNavBg: <Toggle>{
                        type: 'toggle',
                        default: false,
                    },
                },
            })
            .then(() => {
                new LSSM.$vue({
                    store: LSSM.$store,
                    i18n: LSSM.$i18n,
                    render: h => h(LSSMMenu),
                }).$mount(indicatorWrapper);
            });
    }

    if (window.location.pathname.match(/^\/users\//)) return;
    await LSSM.$store.dispatch(
        'api/setVehicleStates',
        'core-initialVehicleStates'
    );
    for (const moduleId of MODULES_OF_LOCALE[LSSM.$store.state.lang]) {
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
        telemetry(LSSM, settingId => {
            return LSSM.$store.dispatch('settings/getSetting', {
                moduleId: 'global',
                settingId,
            });
        });
        await releasenotes(LSSM);
        // TODO: Load core modules: [support] ← Will be done in a more efficient way than polling

        await LSSM.$store.dispatch('hook', {
            event: 'radioMessage',
            post: false,
            callback(radioMessage: RadioMessage) {
                if (
                    radioMessage.type !== 'vehicle_fms' ||
                    radioMessage.user_id !== window.user_id
                )
                    return;
                const { id, fms, fms_real, user_id, caption } = radioMessage;
                if (user_id === window.user_id) {
                    LSSM.$store.commit('api/setVehicleState', {
                        fms,
                        fms_real,
                        id,
                        caption,
                    });
                }
            },
        });

        await LSSM.$store.dispatch('hook', {
            event: 'buildingMarkerAdd',
            callback(buildingMarker: BuildingMarkerAdd) {
                const buildings = LSSM.$store.state.api.buildings as Building[];
                const building = buildings.find(
                    ({ id }) => id === buildingMarker.id
                );
                if (
                    !building ||
                    LSSM.$store.state.api.lastUpdates.buildings <
                        new Date().getTime() - 5 * 1000 * 60 ||
                    building.caption !== buildingMarker.name
                ) {
                    LSSM.$store
                        .dispatch('api/fetchBuilding', {
                            id: buildingMarker.id,
                            feature: 'core-buildingMarkerAdd',
                        })
                        .then(
                            async building =>
                                // LSSM.$store
                                //     .dispatch(
                                //         'api/fetchVehiclesAtBuilding',
                                //         building.id
                                //     )
                                //     .then(
                                //         async () =>
                                await LSSM.$store.dispatch(
                                    'event/dispatchEvent',
                                    await LSSM.$store.dispatch(
                                        'event/createEvent',
                                        {
                                            name: 'buildingMarkerAdd',
                                            detail: {
                                                marker: buildingMarker,
                                                building,
                                            },
                                        }
                                    )
                                )
                            // )
                        );
                }
            },
        });
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
