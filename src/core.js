import Vue from 'vue';
import LSSMV4 from './LSSMV4.vue';
import LSSMMenu from './LSSM-Menu.vue';
import VueJSModal from 'vue-js-modal';
import store from './store';
import i18n from './i18n';
import utils from './utils';
import browserTitle from './natives/browserTitle';
import telemetry from './modules/telemetry/main';
require('./natives/navTabsClicker');
Vue.config.productionTip = false;
const appContainer = document.createElement('div');
document.body.appendChild(appContainer);
window.keepAlive = true;
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
window[PREFIX] = new Vue({
    store: store(Vue),
    i18n: i18n(Vue),
    render: h => h(LSSMV4),
}).$mount(appContainer);
export const LSSM = window[PREFIX];
browserTitle(LSSM);
if (window.location.pathname === '/') {
    window.console.info(
        `Running %cLSSM%c in Version %c${VERSION}%c`,
        'font-weight: bold;',
        'font-weight: normal;',
        'font-style: italic;'
    );
    const indicatorWrapper = document.createElement('li');
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
//# sourceMappingURL=core.js.map
