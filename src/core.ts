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
import { RadioMessage } from '../typings/Ingame';
import { Credits } from 'typings/Credits';
import { ModuleMainFunction } from 'typings/Module';

require('./natives/navTabsClicker');

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

window[PREFIX] = new Vue({
    store: store(Vue),
    i18n: i18n(Vue),
    render: h => h(LSSMV4),
}).$mount(appContainer);

console.log('Und der LSSM wurde einmal gemounted :)');

export const LSSM = window[PREFIX] as Vue;

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
                labelInMenu: {
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

(async () => {
    if (window.location.pathname.match(/^\/users\//)) return;
    LSSM.$store.commit(
        'setRegisteredState',
        !((await LSSM.$store
            .dispatch('api/request', {
                url: '/api/credits',
            })
            .then(res => res.json())) as Credits).user_directplay_registered
    );
    LSSM.$store.commit(
        'api/setVehicleStates',
        await LSSM.$store
            .dispatch('api/request', { url: '/api/vehicle_states' })
            .then(res => res.json())
    );
    if (window.location.pathname === '/') {
        telemetry(LSSM);
        releasenotes(LSSM);
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
                if (user_id === window.user_id)
                    LSSM.$store.commit('api/setVehicleState', {
                        fms,
                        fms_real,
                        id,
                        caption,
                    });
            },
        });
    }
    LSSM.$store
        .dispatch('storage/get', {
            key: 'activeModules',
            defaultValue: [],
        })
        .then((activeModules: string[]) => {
            activeModules = activeModules.filter(module =>
                LSSM.$store.state.modules.hasOwnProperty(module)
            );
            if (LSSM.$store.state.mapkit)
                activeModules = activeModules.filter(
                    module => !LSSM.$store.state.modules[module].noMapkit
                );
            activeModules.forEach(async moduleId => {
                LSSM.$store.commit('setModuleActive', moduleId);
                const $m = (key: string, args?: { [key: string]: unknown }) =>
                    LSSM.$t(`modules.${moduleId}.${key}`, args);
                const $mc = (
                    key: string,
                    amount?: number,
                    args?: { [key: string]: unknown }
                ) => LSSM.$tc(`modules.${moduleId}.${key}`, amount, args);
                if (LSSM.$store.state.modules[moduleId].settings) {
                    await LSSM.$store.dispatch('settings/register', {
                        moduleId,
                        settings: (
                            await import(
                                /* webpackChunkName: "modules/settings/[request]" */
                                /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+settings\.ts/ */
                                /* webpackExclude: /[\\/]+modules[\\/]+(telemetry|releasenotes|support)[\\/]+/ */
                                `./modules/${moduleId}/settings`
                            )
                        ).default(moduleId, LSSM),
                    });
                }
                if (
                    window.location.pathname.match(
                        LSSM.$store.state.modules[moduleId].location
                    )
                )
                    Promise.all(
                        [BUILD_LANG, ...FALLBACK_LOCALES].map(async locale => {
                            try {
                                return LSSM.$i18n.mergeLocaleMessage(locale, {
                                    modules: {
                                        [moduleId]: (
                                            await import(
                                                /* webpackChunkName: "modules/i18n/[request]" */
                                                /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+/ */
                                                /* webpackExclude: /(telemetry|releasenotes|support)|\.root\./ */
                                                `./modules/${moduleId}/i18n/${locale}`
                                            )
                                        ).default,
                                    },
                                });
                            } catch {
                                return;
                            }
                        })
                    ).then(() =>
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
                        )
                    );
            });
        });
})();
