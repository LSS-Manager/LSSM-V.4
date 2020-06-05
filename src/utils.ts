import { VueConstructor } from 'vue/types/vue';

export default (Vue: VueConstructor): void => {
    Vue.prototype.$vue = Vue;
    // Vue.prototype.$utils = {};
};
