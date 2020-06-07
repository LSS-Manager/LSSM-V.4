import Vue from 'vue';
import VueJSModal from 'vue-js-modal';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import LSSMV4 from './LSSMV4.vue';
import LSSMMenu from './LSSM-Menu.vue';
import store from './store';
import i18n from './i18n';
import utils from './utils';
import browserTitle from './natives/browserTitle';
import telemetry from './modules/telemetry/main';
import { ExtendedWindow, IndexedExtendedWindow } from '../typings/helpers';

require('./natives/navTabsClicker');

Vue.config.productionTip = false;

const appContainer = document.createElement('div') as HTMLDivElement;
document.body.appendChild(appContainer);

((window as unknown) as ExtendedWindow).keepAlive = true;

utils(Vue);
Vue.use(VueJSModal, {
    dynamic: true,
    dynamicDefaults: {
        adaptive: true,
        scrollable: true,
        clickToClose: true,
    },
    dialog: true,
});

Vue.component('font-awesome-icon', FontAwesomeIcon);

((window as unknown) as IndexedExtendedWindow)[PREFIX] = new Vue({
    store: store(Vue),
    i18n: i18n(Vue),
    render: h => h(LSSMV4),
}).$mount(appContainer);

console.log('Und der LSSM wurde einmal gemounted :)');

export const LSSM = ((window as unknown) as IndexedExtendedWindow)[PREFIX];

browserTitle(LSSM);

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

    new LSSM.$vue({
        store: LSSM.$store,
        i18n: LSSM.$i18n,
        render: h => h(LSSMMenu),
    }).$mount(indicatorWrapper);
}

(async () => {
    if (window.location.pathname.match(/^\/users\//)) return;
    if (window.location.pathname === '/') {
        telemetry(LSSM);
        // TODO: Load core modules releasenotes, support
    }
    // TODO: Load active Modules
})();
