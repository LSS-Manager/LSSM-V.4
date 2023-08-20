import Vue from 'vue';

import * as Tabs from 'vue-slim-tabs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Notifications from 'vue-notification';
import ToggleButton from 'vue-js-toggle-button';
import { useAPIStore } from '@stores/api';
import { useBroadcastStore } from '@stores/broadcast';
import { useConsoleStore } from '@stores/console';
import { useEventStore } from '@stores/event';
import { useModulesStore } from '@stores/modules';
import { useNotificationStore } from '@stores/notifications';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';
import { useStorageStore } from '@stores/storage';
import { useTranslationStore } from '@stores/translationUtilities';
import VueJSModal from 'vue-js-modal';
import { createPinia, PiniaVuePlugin } from 'pinia';

import checkUserscript from './core/checkUserscript';
import debugMode from './core/debugMode';
import i18n from './i18n';
import loadAndExecuteModule from './core/loadAndExecuteModule';
import loadCoreModuleTranslations from './core/loadCoreModuleTranslations';
import loadingIndicatorStorageKey from '../build/plugins/LoadingProgressPluginStorageKey';
import LSSMV4 from './LSSMV4.vue';
import registerGlobalSettings from './core/registerGlobalSettings';
import utils from './utils';

import './sass/main.sass';

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
Vue.use(PiniaVuePlugin);

Vue.component('font-awesome-icon', FontAwesomeIcon);
utils(Vue);

(async () => {
    if (window.hasOwnProperty(PREFIX)) return;

    let couldNotLoadI18n = false;

    const pinia = createPinia();

    const LSSM = new Vue({
        pinia,
        i18n: await i18n(Vue).catch(() => {
            couldNotLoadI18n = true;
            return undefined;
        }),
        render: h => h(LSSMV4),
    }).$mount(appContainer);

    const rootStore = useRootStore();

    if (couldNotLoadI18n) {
        if (window.location.pathname === '/') {
            import('./core/showRootI18nError').then(
                ({ default: showRootI18nError }) =>
                    showRootI18nError(LSSM, rootStore)
            );
        }
        return;
    }

    window[PREFIX] = LSSM;

    LSSM.$stores = {
        root: rootStore,
        api: useAPIStore(),
        broadcast: useBroadcastStore(),
        console: useConsoleStore(),
        event: useEventStore(),
        modules: useModulesStore(),
        notifications: useNotificationStore(),
        settings: useSettingsStore(),
        storage: useStorageStore(),
        translations: useTranslationStore(),
    };

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

    // show a dialog if userscript is out of date
    let userScriptValid = false;
    await checkUserscript(LSSM).then(() => (userScriptValid = true));

    if (!userScriptValid) return;

    registerGlobalSettings(LSSM).then(() => debugMode(LSSM));

    const locale = LSSM.$stores.root.locale;

    LSSM.$stores.api._initAPIsFromBroadcast().then();

    import('./natives/checkboxMultiSelect').then(({ default: multiSelect }) =>
        multiSelect(LSSM)
    );

    if (
        !localStorage.hasOwnProperty(loadingIndicatorStorageKey) ||
        localStorage.getItem(loadingIndicatorStorageKey) === 'true'
    ) {
        import(
            /* webpackChunkName: "components/loadingIndicator" */ './components/LoadingIndicator.vue'
        ).then(({ default: LoadingIndicator }) => {
            const wrapper = document.createElement('div');
            document.body.append(wrapper);
            new LSSM.$vue({
                pinia: LSSM.$pinia,
                i18n: LSSM.$i18n,
                render: h => h(LoadingIndicator),
            }).$mount(wrapper);
        });
    }

    await loadCoreModuleTranslations(LSSM, locale);

    if (window.location.pathname === '/') {
        import(/* webpackChunkName: "mainpageCore" */ './mainpageCore').then(
            core => core.default(LSSM)
        );
    } else if (
        window.location.pathname.match(/^\/(buildings|schoolings)\/\d+\/?/u)
    ) {
        LSSM.$stores.api.getSchoolings('core-update-schoolings').then();
    }

    import(
        /* webpackChunkName: "fontawesome" */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '@fortawesome/fontawesome-free/js/all.min.js'
    );

    LSSM.$stores.storage
        .get<string[]>({
            key: 'activeModules',
            defaultValue: [],
        })
        .then(activeModules => {
            if (!Array.isArray(activeModules)) {
                return LSSM.$stores.storage.set({
                    key: 'activeModules',
                    value: [],
                });
            }
            let filteredActiveModules = activeModules.filter(module =>
                LSSM.$stores.modules.modules.hasOwnProperty(module)
            );
            if (LSSM.$stores.root.mapkit) {
                filteredActiveModules = filteredActiveModules.filter(
                    module =>
                        !LSSM.$stores.modules.noMapkitModuleIds.includes(module)
                );
            }
            Object.entries(LSSM.$stores.modules.modules)
                .filter(
                    ([, { location }]) =>
                        window.location.pathname === '/' ||
                        window.location.pathname.match(location)
                )
                .forEach(([moduleId, { location, settings }]) =>
                    loadAndExecuteModule(
                        LSSM,
                        filteredActiveModules,
                        locale,
                        moduleId,
                        location,
                        settings
                    )
                );
        });
})();
