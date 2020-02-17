import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';

import storage from './store/storage';
import settings from './store/settings';
import api from './store/api';

import error from './components/error.vue';

const config = require('./config');

Vue.use(Vuex);

localforage.config({
    name: 'lssmv4',
    storeName: 'lssmv4Storage',
});

export default new Vuex.Store({
    modules: {
        storage,
        settings,
        api,
    },
    state: {
        discord: config.discord,
        game: window.location.host.replace(/www\./, ''),
        version: VERSION,
        lang: window.I18n.locale,
        prefix: 'lssmv4',
        server: config.server,
        lssm: {},
        localforage,
        appstoreUpdate: false,
        appstoreReload: false,
        modules: require('./registerModules'),
        hooks: {},
    },
    mutations: {
        appStoreState(state, mode) {
            state.appstoreUpdate = mode;
        },
        appStoreReload(state, val) {
            state.appstoreReload = val;
        },
        addHook(state, event) {
            state.hooks[event] = window[event];
        },
        setModuleActive(state, moduleId) {
            state.modules[moduleId].active = true;
        },
    },
    getters: {
        nodeId: state => id => {
            return `${state.prefix}-${id}`;
        },
        wiki: state => {
            return `${config.server}docs/${state.lang}`;
        },
        wikiModul: (_, getters) => module => {
            return `${getters['wiki']}/modules/${module}.html`;
        },
        appModules: state => {
            let modules = {};
            Object.keys(state.modules).forEach(
                key =>
                    !state.modules[key].noapp &&
                    (modules[key] = state.modules[key])
            );
            return modules;
        },
        modulesSorted: state => ({ modules = state.modules }) =>
            Object.keys(modules).sort((a, b) => {
                a = window[state.prefix].$t(`modules.${a}.name`);
                b = window[state.prefix].$t(`modules.${b}.name`);
                return a < b ? -1 : a > b ? 1 : 0;
            }),
    },
    actions: {
        error(_, { vm, err }) {
            vm.$modal.show(
                error,
                {
                    err,
                },
                {}
            );
        },
        addMenuItem({ getters }, { menuItem }) {
            let splitter = document.getElementById(
                getters.nodeId('indicator_menu-modules')
            );
            splitter.style.display = null;
            let li = document.createElement('li');
            li.setAttribute('role', 'presentation');
            li.appendChild(menuItem);
            splitter.insertAdjacentElement('beforebegin', li);
        },
        hook({ state, commit }, { post = true, event, callback = () => {} }) {
            if (!state.hooks.hasOwnProperty(event)) {
                commit('addHook', event);
                window[event] = (...args) => {
                    document.dispatchEvent(
                        new CustomEvent(`lssm_${event}_before`, {
                            detail: args,
                        })
                    );
                    state.hooks[event](...args);
                    document.dispatchEvent(
                        new CustomEvent(`lssm_${event}_after`, {
                            detail: args,
                        })
                    );
                };
            }
            document.addEventListener(
                `lssm_${event}_${post ? 'after' : 'before'}`,
                event => callback(...event.detail)
            );
        },
        loadModule({ state }, { module, async = true }) {
            const script = document.createElement('script');
            script.src = `${state.server}modules/${module}/main.js`;
            async && script.setAttribute('async', '');
            document.querySelector('body').appendChild(script);
        },
    },
});
