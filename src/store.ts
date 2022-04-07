import Vuex from 'vuex';

import api from './store/api';
import broadcast from './store/broadcast';
import config from './config';
import console from './store/console';
import event from './store/event';
import notifications from './store/notifications';
import settings from './store/settings';
import storage from './store/storage';

import type { LSSMEvent } from 'typings/helpers';
import type { Modules } from 'typings/Module';
import type { RootState } from 'typings/store/RootState';
import type { VueConstructor } from 'vue/types/vue';
import type {
    ActionStoreParams,
    addStyle,
    Hook,
    ObserveAsyncTab,
    premodifyParams,
    ProxyParams,
} from 'typings/store/Actions';
// to seperate typings
// eslint-disable-next-line no-duplicate-imports
import type {
    ActionTree,
    GetterTree,
    ModuleTree,
    MutationTree,
    Store,
    StoreOptions,
} from 'vuex';

export default (Vue: VueConstructor): Store<RootState> => {
    Vue.use(Vuex);

    return new Vuex.Store<RootState>({
        modules: {
            storage,
            settings,
            api,
            console,
            notifications,
            broadcast,
            event,
        } as ModuleTree<RootState>,
        state: {
            prefix: PREFIX,
            version: VERSION,
            mode: MODE,
            lang: window.I18n.locale,
            discord: `https://discord.gg/${config.discord.invite}`,
            games: config.games,
            server: config.server,
            fontAwesomeIconSearch: config.fontAwesomeIconSearch,
            hooks: {},
            mapkit: typeof window.mapkit !== 'undefined',
            darkmode: document.body.classList.contains('dark'),
            premium: window.user_premium,
            policechief: window.gameFlavour === 'policechief',
            isRegistered: false,
            modules: <Modules>MODULE_REGISTER_FILES,
            coreModules: config.modules['core-modules'],
            appstore: {
                changes: false,
                reload: false,
            },
            menuItems: [],
            styles: {
                styleSheet: null,
                inserted: false,
            },
            fontAwesome: {
                inserted: false,
            },
            credits: 0,
            coins: 0,
            osmBars: {},
        },
        mutations: {
            addHook(
                state: RootState,
                [base, event, fullname]: [unknown, string, string]
            ) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.hooks[fullname] = base[event];
            },
            setModuleActive(state: RootState, moduleId: keyof Modules) {
                state.modules[moduleId].active = true;
            },
            setAppstoreChanges(state: RootState, changes: boolean) {
                state.appstore.changes = changes;
            },
            setAppstoreReload(state: RootState) {
                state.appstore.reload = true;
            },
            addMenuItem(state: RootState, element: HTMLAnchorElement) {
                state.menuItems.push(element);
            },
            insertStyleSheet(state: RootState) {
                state.styles.styleSheet = document.createElement('style');
                document.head.append(state.styles.styleSheet);
                state.styles.inserted = true;
            },
            useFontAwesome(state: RootState) {
                if (state.fontAwesome.inserted) return;
                const fa = document.createElement('script');
                fa.src = `${state.server}static/fontawesome_free_6.1.1_all.min.js?uid=${state.lang}-${window.user_id}`;
                fa.crossOrigin = 'anonymous';
                document.head.append(fa);
                state.fontAwesome.inserted = true;
            },
            addOSMBar(
                state: RootState,
                {
                    position,
                    bar,
                    mapId,
                }: {
                    position:
                        | 'bottom-left'
                        | 'bottom-right'
                        | 'top-left'
                        | 'top-right';
                    bar: HTMLDivElement;
                    mapId: string;
                }
            ) {
                if (!state.osmBars.hasOwnProperty(mapId))
                    state.osmBars[mapId] = {};
                state.osmBars[mapId][position] = bar;
            },
            updateCredits(state: RootState, value: number) {
                const old = state.credits;
                state.credits = value;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.api.credits.credits_user_current = value;
                const diff = value - old;
                window.dispatchEvent(
                    new CustomEvent(`${PREFIX}_credits_update`, {
                        detail: { old, new: value, diff },
                    })
                );
                if (diff > 0) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.state.api.credits.credits_user_total =
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        this.state.api.credits.credits_user_total + diff;
                }
            },
            updateCoins(state: RootState, value: number) {
                state.coins = value;
            },
        } as MutationTree<RootState>,
        getters: {
            nodeAttribute:
                (state: RootState) =>
                (attr: string, id = false): string => {
                    const res = `${state.prefix}-${attr}`;
                    if (id) {
                        return res
                            .replace(/ /gu, '_')
                            .replace(/["']/gu, '')
                            .replace(/[^\w-]/gu, '-');
                    }
                    return res;
                },
            wiki: (state: RootState): string =>
                `${config.server}docs/${state.lang}/`,
            moduleWiki:
                (_, getters: GetterTree<RootState, RootState>) =>
                (moduleId: keyof Modules): string =>
                    `${getters.wiki}modules/${moduleId}/`,
            appModules: (state: RootState) =>
                Object.fromEntries(
                    Object.entries(state.modules).filter(
                        ([, module]) =>
                            !(
                                module.noapp ||
                                (module.alpha && MODE !== 'beta') ||
                                (module.locales?.length &&
                                    !module.locales.includes(state.lang))
                            )
                    )
                ),
            modulesSorted(_, getters: GetterTree<RootState, RootState>) {
                return Object.keys(getters.appModules).sort((a, b) => {
                    const left = (window[PREFIX] as Vue)
                        .$t(`modules.${a}.name`)
                        .toString();
                    const right = (window[PREFIX] as Vue)
                        .$t(`modules.${b}.name`)
                        .toString();
                    return left < right ? -1 : left > right ? 1 : 0;
                });
            },
        } as GetterTree<RootState, RootState>,
        actions: {
            hook(
                { state, commit }: ActionStoreParams,
                {
                    post = true,
                    event,
                    callback = () => null,
                    abortOnFalse = false,
                }: Hook
            ) {
                if (!state.hooks.hasOwnProperty(event)) {
                    const split = event.split('.');
                    const trueEvent = split.pop();
                    const trueBase = split.reduce(
                        (previousValue, currentValue) =>
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            (previousValue || window)[currentValue],
                        window
                    ) as unknown;
                    commit('addHook', [trueBase, trueEvent, event]);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    trueBase[trueEvent] = (...args: unknown[]) => {
                        if (!abortOnFalse) {
                            document.dispatchEvent(
                                new CustomEvent(`${PREFIX}_${event}_before`, {
                                    detail: args,
                                })
                            );
                        } else if (!callback(...args)) {
                            return;
                        }

                        const result = state.hooks[event](...args);
                        document.dispatchEvent(
                            new CustomEvent(`${PREFIX}_${event}_after`, {
                                detail: args,
                            })
                        );
                        return result;
                    };
                }
                document.addEventListener(
                    `${PREFIX}_${event}_${post ? 'after' : 'before'}`,
                    event => callback(...(event as unknown as LSSMEvent).detail)
                );
            },
            proxy(_, { post = true, name, callback, trap }: ProxyParams) {
                const split = name.split('.');
                const trueProp = split.pop();
                const trueBase = split.reduce(
                    (previousValue, currentValue) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (previousValue || window)[currentValue],
                    window
                ) as unknown;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                trueBase[trueProp] = new Proxy(trueBase[trueProp], {
                    [trap](...args: unknown[]) {
                        if (!post) callback(...args);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const result = Reflect[trap](...args);
                        if (post) callback(...args);
                        return result;
                    },
                });
            },
            loadModule({ state }: ActionStoreParams, module: keyof Modules) {
                const script = document.createElement('script');
                script.src = `${config.server}${state.lang}/modules/${module}/main.js?uid=${state.lang}-${window.user_id}&v=${state.version}`;
                document.body.append(script);
            },
            addMenuItem({ commit }: ActionStoreParams, text: string) {
                const menuItem = document.createElement('a');
                menuItem.href = '#';
                menuItem.textContent = text;
                commit('addMenuItem', menuItem);
                return menuItem;
            },
            addStyles({ dispatch }: ActionStoreParams, styles: addStyle[]) {
                styles.forEach(
                    async style => await dispatch('addStyle', style)
                );
            },
            addStyle(
                { state, commit }: ActionStoreParams,
                { selectorText, style }: addStyle
            ) {
                if (!state.styles.inserted) commit('insertStyleSheet');
                if (state.styles.styleSheet) {
                    state.styles.styleSheet.innerHTML += `${selectorText} {\n${Object.entries(
                        style
                    )
                        .map(([rule, value]) => `\t${rule}: ${value};\n`)
                        .join('')}\n}`;
                }
            },
            premodifyParams(
                _,
                { event, callback = undefined }: premodifyParams
            ) {
                const originalEvent = window[event];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window[event] = (...args) => {
                    callback?.(...args);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    originalEvent(...args);
                };
            },
            observeAsyncTab(_, { tabSelector, callback }: ObserveAsyncTab) {
                const tab = document.querySelector(tabSelector);
                if (!tab) return;
                const observer = new MutationObserver(mutations => {
                    mutations.forEach(record => {
                        if (
                            Array.from(record.addedNodes).some(
                                node => node.nodeName === 'SCRIPT'
                            )
                        )
                            callback();
                    });
                });
                observer.observe(tab, {
                    childList: true,
                });
            },
            addOSMControl(
                { state, commit }: ActionStoreParams,
                {
                    position,
                    mapId = 'map',
                }: {
                    position:
                        | 'bottom-left'
                        | 'bottom-right'
                        | 'top-left'
                        | 'top-right';
                    mapId: string;
                }
            ) {
                return new Promise(resolve => {
                    const positionSelector = `#${mapId} .leaflet-control-container ${position
                        .split('-')
                        .map(p => `.leaflet-${p}`)
                        .join('')}`;
                    if (
                        !state.osmBars.hasOwnProperty(mapId) ||
                        !state.osmBars[mapId].hasOwnProperty(position) ||
                        !document.querySelector(
                            `${positionSelector} .leaflet-bar.leaflet-control`
                        )
                    ) {
                        const bar = document.createElement('div');
                        bar.classList.add('leaflet-bar', 'leaflet-control');
                        document
                            .querySelector(positionSelector)
                            ?.[
                                position.match(/bottom/u) ? 'prepend' : 'append'
                            ](bar);
                        commit('addOSMBar', { position, bar, mapId });
                    }
                    const control = document.createElement('a');
                    state.osmBars[mapId][position][
                        position.match(/bottom/u) ? 'prepend' : 'append'
                    ](control);
                    resolve(control);
                });
            },
        } as ActionTree<RootState, RootState>,
    } as StoreOptions<RootState>);
};
