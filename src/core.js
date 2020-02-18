import Vue from 'vue';
import store from './store';
import i18n from './i18n';
import App from './LSSMV4.vue';
import mainWindow from './main-window.vue';

import VueJSModal from 'vue-js-modal';
import ToggleButton from 'vue-js-toggle-button';
import * as Tabs from 'vue-slim-tabs';

Vue.use(VueJSModal, {
    dynamic: true,
    dynamicDefaults: {
        adaptive: true,
        scrollable: true,
        clickToClose: false,
    },
    dialog: true,
});
Vue.use(ToggleButton);
Vue.use(Tabs);

let lssm = document.createElement('div');
document.querySelector('body').appendChild(lssm);

i18n.locale = store.state.lang;

window[store.state.prefix] = new Vue({
    store,
    i18n,
    render: h => h(App),
}).$mount(lssm);

let consoleError = window.console.error;

window.console.error = (...args) => {
    args.forEach(err =>
        store.dispatch('error', { vm: window[store.state.prefix], err })
    );
    consoleError(...args);
};
window.console.exception = window.console.error;

store.dispatch('hook', {
    event: 'lightboxOpen',
    callback(e) {
        if (e.startsWith(`${store.state.server}docs`)) {
            document.getElementById('lightbox_close').style.display = 'none';
            document.querySelector(
                '#lightbox_box .lightbox_iframe'
            ).style.height = '100%';
        }
    },
});

if (window.location.pathname === '/') {
    window.console.info(
        `Running the %cLSSM%c in Version %c${store.state.version}%c`,
        'font-weight: bold;',
        'font-weight: normal;',
        'font-style: italic;'
    );

    let indicator = document.createElement('li');
    document
        .querySelector('.navbar-default .navbar-right')
        .appendChild(indicator);

    new Vue({
        store,
        i18n,
        render: h => h(mainWindow),
    }).$mount(indicator);
}

(async () => {
    if (window.location.pathname.match(/^\/users\//)) return;
    await store.dispatch('api/buildings');
    await store.dispatch('api/vehicles');

    await store.dispatch('hook', {
        event: 'radioMessage',
        post: false,
        callback({ fms, fms_real, id }) {
            store.commit('api/setVehicleState', { fms, fms_real, id });
        },
    });

    store.dispatch('storage/get', 'active').then(activeModules => {
        if (!activeModules) {
            activeModules = Object.keys(store.state.modules).filter(
                m => store.state.modules[m].active
            );
            store.dispatch('storage/set', {
                key: 'active',
                val: activeModules,
            });
        }
        activeModules = [...new Set(activeModules)];
        if (typeof mapkit !== 'undefined') {
            activeModules = activeModules.filter(
                x => !store.state.modules[x].noMapkit
            );
        }
        activeModules.forEach(module => {
            store.commit('setModuleActive', module);
            if (
                window.location.pathname.match(
                    store.state.modules[module].location
                )
            )
                store.dispatch('loadModule', { module });
        });
    });
})();
