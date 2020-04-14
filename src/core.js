import Vue from 'vue';
import store from './store';
import i18n from './i18n';
import App from './LSSMV4.vue';
import mainWindow from './main-window.vue';

import VueJSModal from 'vue-js-modal';
import ToggleButton from 'vue-js-toggle-button';
import * as Tabs from 'vue-slim-tabs';

const config = require('./config');

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

let lssm = document.createElement('div');
document.querySelector('body').appendChild(lssm);

i18n.locale = store.state.lang;

window[store.state.prefix] = new Vue({
    store,
    i18n,
    render: h => h(App),
}).$mount(lssm);

window[store.state.prefix].Vue = Vue;

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

    const keyData = await store
        .dispatch('api/request', {
            url: `/profile/external_secret_key/${window.user_id}`,
        })
        .then(res => res.json());

    store.commit('setKey', keyData.code);

    if (window.location.pathname === '/') {
        (async () => {
            await require('./modules/telemetry/main')();
            require('./modules/releasenotes/main');
            require('./modules/support/main');
        })();
    }

    store.dispatch('storage/get', { key: 'active' }).then(activeModules => {
        if (!activeModules) activeModules = [];
        activeModules = [
            ...new Set([
                ...activeModules,
                ...Object.keys(store.state.modules).filter(
                    m => store.state.modules[m].active
                ),
            ]),
        ];
        store.dispatch('storage/set', {
            key: 'active',
            val: activeModules,
        });
        activeModules = [...new Set(activeModules)].filter(
            m => !config.modules['core-modules'].includes(m)
        );
        if (typeof mapkit !== 'undefined') {
            activeModules = activeModules.filter(
                x => !store.state.modules[x].noMapkit
            );
        }
        activeModules.forEach(module => {
            if (!store.state.modules.hasOwnProperty(module)) return;
            store.commit('setModuleActive', module);
            if (
                window.location.pathname.match(
                    store.state.modules[module].location
                )
            )
                store.dispatch('loadModule', { module });
        });
        store.dispatch('storage/set', {
            key: 'active',
            val: store.getters.activeModules,
        });
    });
})();
