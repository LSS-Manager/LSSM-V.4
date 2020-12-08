import Vuex, {
    ActionTree,
    GetterTree,
    ModuleTree,
    MutationTree,
    Store,
    StoreOptions,
} from 'vuex';
import { RootState } from '../typings/store/RootState';
import { VueConstructor } from 'vue/types/vue';
import config from './config';
import {
    ActionStoreParams,
    addStyle,
    Hook,
    HookPrototype,
    ObserveAsyncTab,
    premodifyParams,
} from '../typings/store/Actions';
import { LSSMEvent, returnTypeFunction } from '../typings/helpers';
import storage from './store/storage';
import settings from './store/settings';
import api from './store/api';
import console from './store/console';
import notifications from './store/notifications';
import broadcast from './store/broadcast';
import modules from './registerModules';
import { Modules } from '../typings/Module';
import { LSSM } from './core';

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
        } as ModuleTree<RootState>,
        state: {
            prefix: PREFIX,
            version: VERSION,
            mode: MODE,
            lang: window.I18n.locale,
            discord: config.discord,
            games: config.games,
            server: config.server,
            hooks: {},
            prototypeHooks: {},
            mapkit: 'undefined' !== typeof window.mapkit,
            darkmode: document.body.classList.contains('dark'),
            premium: window.user_premium,
            policechief: window.gameFlavour === 'policechief',
            isRegistered: false,
            modules,
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
            addPrototypeHookBase(state: RootState, base: string) {
                state.prototypeHooks[base] = {};
            },
            addPrototypeHook(
                state: RootState,
                {
                    base,
                    event,
                    trueEvent,
                }: {
                    base: string;
                    event: string;
                    trueEvent: returnTypeFunction;
                }
            ) {
                state.prototypeHooks[base][event] = trueEvent;
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
                document.head.appendChild(state.styles.styleSheet);
                state.styles.inserted = true;
            },
            useFontAwesome(state: RootState) {
                if (state.fontAwesome.inserted) return;
                const fa = document.createElement('script');
                fa.src =
                    'https://use.fontawesome.com/releases/v5.13.0/js/all.js';
                document.head.appendChild(fa);
                state.fontAwesome.inserted = true;
            },
            setRegisteredState(state: RootState, isRegistered: boolean) {
                state.isRegistered = isRegistered;
            },
            addOSMBar(
                state: RootState,
                {
                    position,
                    bar,
                }: {
                    position:
                        | 'top-left'
                        | 'top-right'
                        | 'bottom-left'
                        | 'bottom-right';
                    bar: HTMLDivElement;
                }
            ) {
                state.osmBars[position] = bar;
            },
        } as MutationTree<RootState>,
        getters: {
            nodeAttribute: (state: RootState) => (
                attr: string,
                id = false
            ): string => {
                const res = `${state.prefix}-${attr}`;
                if (id)
                    return res
                        .replace(/ /g, '_')
                        .replace(/["']/g, '')
                        .replace(/[^a-zA-Z0-9_\-.]/g, '-');
                return res;
            },
            wiki: (state: RootState): string =>
                `${config.server}docs/${state.lang}/`,
            moduleWiki: (_, getters: GetterTree<RootState, RootState>) => (
                moduleId: keyof Modules
            ): string => `${getters.wiki}modules/${moduleId}.html`,
            appModules: (state: RootState) =>
                Object.fromEntries(
                    Object.entries(state.modules).filter(
                        module => !module[1].noapp
                    )
                ),
            modulesSorted(_, getters: GetterTree<RootState, RootState>) {
                return Object.keys(getters.appModules).sort((a, b) => {
                    a = LSSM.$t(`modules.${a}.name`).toString();
                    b = LSSM.$t(`modules.${b}.name`).toString();
                    return a < b ? -1 : a > b ? 1 : 0;
                });
            },
        } as GetterTree<RootState, RootState>,
        actions: {
            hook(
                { state, commit }: ActionStoreParams,
                { post = true, event, callback = () => null }: Hook
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
                        document.dispatchEvent(
                            new CustomEvent(`${PREFIX}_${event}_before`, {
                                detail: args,
                            })
                        );
                        state.hooks[event](...args);
                        document.dispatchEvent(
                            new CustomEvent(`${PREFIX}_${event}_after`, {
                                detail: args,
                            })
                        );
                    };
                }
                document.addEventListener(
                    `${PREFIX}_${event}_${post ? 'after' : 'before'}`,
                    event =>
                        callback(...((event as unknown) as LSSMEvent).detail)
                );
            },
            hookPrototype(
                { state, commit }: ActionStoreParams,
                {
                    post = true,
                    base,
                    event,
                    callback = () => null,
                }: HookPrototype
            ) {
                const eventString = `${base}.${event}`;
                const trueBase = base.split('.').reduce(
                    (previousValue, currentValue) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (previousValue || window)[currentValue],
                    window
                ) as unknown;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const trueEvent = trueBase.__proto__[
                    event
                ] as returnTypeFunction;
                if (!state.prototypeHooks.hasOwnProperty(base))
                    commit('addPrototypeHookBase', base);
                if (!state.prototypeHooks[base].hasOwnProperty(event)) {
                    commit('addPrototypeHook', { base, event, trueEvent });
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    trueBase.__proto__[event] = (...args: unknown[]) => {
                        document.dispatchEvent(
                            new CustomEvent(`${PREFIX}_${eventString}_before`, {
                                detail: args,
                            })
                        );
                        state.prototypeHooks[base][event].call(
                            trueBase,
                            ...args
                        );
                        document.dispatchEvent(
                            new CustomEvent(`${PREFIX}_${eventString}_after`, {
                                detail: args,
                            })
                        );
                    };
                }
                document.addEventListener(
                    `${PREFIX}_${eventString}_${post ? 'after' : 'before'}`,
                    event =>
                        callback(...((event as unknown) as LSSMEvent).detail)
                );
            },
            loadModule({ state }: ActionStoreParams, module: keyof Modules) {
                const script = document.createElement('script');
                script.src = `${config.server}${state.lang}/modules/${module}/main.js?uid=${state.lang}-${window.user_id}&v=${state.version}`;
                document.body.appendChild(script);
            },
            addMenuItem({ commit }: ActionStoreParams, text: string) {
                const menuItem = document.createElement('a');
                menuItem.href = '#';
                menuItem.innerText = text;
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
                state.styles.styleSheet &&
                    (state.styles.styleSheet.innerHTML += `${selectorText} {\n${Object.entries(
                        style
                    )
                        .map(([rule, value]) => `\t${rule}: ${value};\n`)
                        .join('')}\n}`);
            },
            premodifyParams(
                _,
                { event, callback = undefined }: premodifyParams
            ) {
                const originalEvent = window[event];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window[event] = (...args) => {
                    callback && callback(...args);
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
                        Array.from(record.addedNodes).find(
                            node => node.nodeName === 'SCRIPT'
                        ) && callback();
                    });
                });
                observer.observe(tab, {
                    childList: true,
                });
            },
            addOSMControl(
                { state, commit }: ActionStoreParams,
                position:
                    | 'top-left'
                    | 'top-right'
                    | 'bottom-left'
                    | 'bottom-right'
            ) {
                return new Promise(resolve => {
                    if (!state.osmBars.hasOwnProperty(position)) {
                        const bar = document.createElement('div');
                        bar.classList.add('leaflet-bar', 'leaflet-control');
                        document
                            .querySelector(
                                `#map .leaflet-control-container ${position
                                    .split('-')
                                    .map(p => `.leaflet-${p}`)
                                    .join('')}`
                            )
                            ?.appendChild(bar);
                        commit('addOSMBar', { position, bar });
                    }
                    const control = document.createElement('a');
                    state.osmBars[position].appendChild(control);
                    resolve(control);
                });
            },
        } as ActionTree<RootState, RootState>,
    } as StoreOptions<RootState>);
};
