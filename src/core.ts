import Vue from 'vue';

import * as Tabs from 'vue-slim-tabs';
import coerce from 'semver/functions/coerce';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Notifications from 'vue-notification';
import semverLt from 'semver/functions/lt';
import ToggleButton from 'vue-js-toggle-button';
import { useConsoleStore } from '@stores/console';
import { useEventStore } from '@stores/event';
import { useNotificationStore } from '@stores/notifications';
import { useSettingsStore } from '@stores/settings';
import { useStorageStore } from '@stores/storage';
import VueJSModal from 'vue-js-modal';
import { createPinia, PiniaVuePlugin } from 'pinia';

import config from './config';
import i18n from './i18n';
import loadingIndicatorStorageKey from '../build/plugins/LoadingProgressPluginStorageKey';
import LSSMV4 from './LSSMV4.vue';
import store from './store';
import utils from './utils';

import type {
    ModuleMainFunction,
    Modules,
    ModuleSettingFunction,
} from 'typings/Module';

require('./natives/navTabsClicker');
require('./natives/lightbox');

// a 20% chance for april fool
if (
    new Date().getMonth() === 3 &&
    new Date().getDate() === 1 &&
    Math.random() < 0.2
)
    require('./natives/cursors');

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
        store: store(Vue),
        pinia,
        i18n: await i18n(Vue).catch(() => {
            couldNotLoadI18n = true;
            return undefined;
        }),
        render: h => h(LSSMV4),
    }).$mount(appContainer);

    if (couldNotLoadI18n) {
        if (window.location.pathname === '/') {
            LSSM.$modal.show('dialog', {
                title: 'LSSM V.4: Language not supported',
                text: `Thank you for using LSSM V.4!<br>
unfortunately your language <code>${LSSM.$store.state.lang}</code> is not yet supported. Why? The translations simply don't exist.<br>
V.4 is too big for LSSM-Team to maintain all translations, so we need to rely on volunteer translators. You can find information on this at:
<ul>
    <li style='list-style: unset !important;'>
        <a href='${LSSM.$store.state.server}docs/en_US/faq' target='_blank'>
            FAQ
        </a>
    </li>
    <li style='list-style: unset !important;'>
        <a href='${LSSM.$store.state.server}docs/en_US/contributing' target='_blank'>
            Contribution guide
        </a>
    </li>
    <li style='list-style: unset !important;'>
        <a href='${LSSM.$store.state.discord}' target='_blank'>
            LSSM Discord Server
        </a>
    </li>
</ul>
We would be happy if you help to make LSSM available in this language version!<br>
<br>
Yours<br>
LSSM-Team`,
                options: {},
                buttons: [
                    {
                        title: 'OK',
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                ],
            });
        }

        return;
    }

    LSSM.$stores = {
        console: useConsoleStore(),
        event: useEventStore(),
        notifications: useNotificationStore(),
        settings: useSettingsStore(),
        storage: useStorageStore(),
    };

    window[PREFIX] = LSSM;

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
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h => h(LoadingIndicator),
            }).$mount(wrapper);
        });
    }

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

    // show a dialog if userscript is out of date
    await (async () => {
        // this feature was introduced during this version
        if (VERSION.startsWith('4.5.9')) return;

        const userscript_latest_update = coerce(
            config.userscript_latest_update
        );
        const userscript_version = coerce(
            window['lssmv4-GM_Info']?.script.version
        );
        if (
            !userscript_latest_update ||
            !userscript_version ||
            (userscript_latest_update &&
                userscript_version &&
                semverLt(userscript_version, userscript_latest_update))
        ) {
            return new Promise<void>(resolve => {
                const userscriptLink =
                    MODE === 'stable'
                        ? `${config.server}lssm-v4.user.js`
                        : `https://github.com/${config.github.repo}/raw/dev/static/lssm-v4.user.js`;
                LSSM.$modal.show('dialog', {
                    title: LSSM.$t('updateUserscript.title'),
                    text: LSSM.$t('updateUserscript.text', {
                        minVersion: `<b>${userscript_latest_update}</b>`,
                        updateLink: `<a href="${userscriptLink}" target='_blank'>lssm-v4.user.js</a>`,
                        bypassLink: `<a href="${userscriptLink}#bypass=true" target='_blank'>lssm-v4.user.js</a>`,
                    }),
                    options: {},
                    buttons: [
                        {
                            title: LSSM.$t('updateUserscript.close'),
                            handler() {
                                LSSM.$modal.hide('dialog');
                                resolve();
                            },
                        },
                    ],
                });
            });
        }
    })();

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
                LSSM.$store.state.modules.hasOwnProperty(module)
            );
            if (LSSM.$store.state.mapkit) {
                filteredActiveModules = filteredActiveModules.filter(
                    module => !LSSM.$store.state.modules[module].noMapkit
                );
            }
            Object.entries(LSSM.$store.state.modules as Modules)
                .filter(
                    ([, { location }]) =>
                        window.location.pathname === '/' ||
                        window.location.pathname.match(location)
                )
                .forEach(([moduleId, { location, settings }]) =>
                    import(
                        /* webpackChunkName: "modules/i18n/[request]" */
                        /* webpackInclude: /[\\/]+modules[\\/]+.*?[\\/]+i18n[\\/]+.*?\.root/ */
                        `./modules/${moduleId}/i18n/${LSSM.$store.state.lang}.root`
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
                        .catch(() =>
                            LSSM.$stores?.console.warn(
                                `[core] root translation »${moduleId}/${LSSM.$store.state.lang}.root« could not be imported. The file is probably nonexistent`
                            )
                        )
                        .finally(async () => {
                            if (filteredActiveModules.includes(moduleId)) {
                                LSSM.$store.commit('setModuleActive', moduleId);
                                const $m = (
                                    key: string,
                                    args?: Record<string, unknown>
                                ) =>
                                    LSSM.$t(`modules.${moduleId}.${key}`, args);
                                const $mc = (
                                    key: string,
                                    amount?: number,
                                    args?: Record<string, unknown>
                                ) =>
                                    LSSM.$tc(
                                        `modules.${moduleId}.${key}`,
                                        amount,
                                        args
                                    );

                                if (settings) {
                                    await LSSM.$stores.settings.registerModule({
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

                                if (window.location.pathname.match(location)) {
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
                                                (
                                                    module.default as ModuleMainFunction
                                                )({
                                                    LSSM,
                                                    MODULE_ID: moduleId,
                                                    $m,
                                                    $mc,
                                                    getSetting: (
                                                        settingId,
                                                        defaultValue
                                                    ) =>
                                                        LSSM.$stores.settings.getSetting(
                                                            {
                                                                moduleId,
                                                                settingId,
                                                                defaultValue,
                                                            }
                                                        ),
                                                    setSetting: (
                                                        settingId,
                                                        value
                                                    ) =>
                                                        LSSM.$stores.settings.setSetting(
                                                            {
                                                                moduleId,
                                                                settingId,
                                                                value,
                                                            }
                                                        ),
                                                })
                                            )
                                        );
                                }
                            }
                        })
                );
        });
})();
