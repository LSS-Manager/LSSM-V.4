import Vue from 'vue';
import LSSMV4 from './LSSMV4.vue';
import store from './store';
import i18n from './i18n';
import { ExtendedWindow } from '../types/helpers';

Vue.config.productionTip = false;

const appContainer = document.createElement('div') as HTMLDivElement;
document.body.appendChild(appContainer);

((window as unknown) as ExtendedWindow)[PREFIX] = new Vue({
    store: store(Vue),
    i18n: i18n(Vue),
    render: h => h(LSSMV4),
}).$mount(appContainer);

// TODO: Create Vue-LSSM Instance
// TODO: Load active Modules
// TODO: Implement Native Stuff: Browsertitle & tab clicker
