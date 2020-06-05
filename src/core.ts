import Vue from 'vue';
import LSSMV4 from './LSSMV4.vue';
import LSSMMenu from './LSSM-Menu.vue';
import store from './store';
import i18n from './i18n';
import utils from './utils';
import browserTitle from './natives/browserTitle';
import { ExtendedWindow, IndexedExtendedWindow } from '../typings/helpers';

Vue.config.productionTip = false;

const appContainer = document.createElement('div') as HTMLDivElement;
document.body.appendChild(appContainer);

((window as unknown) as ExtendedWindow).keepAlive = true;

utils(Vue);

((window as unknown) as IndexedExtendedWindow)[PREFIX] = new Vue({
    store: store(Vue),
    i18n: i18n(Vue),
    render: h => h(LSSMV4),
}).$mount(appContainer);

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
// TODO: Implement Native Stuff: Browsertitle & tab clicker

(async () => {
    // TODO: Load active Modules
})();
