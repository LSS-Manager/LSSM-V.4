import Vue from 'vue';
import VueI18n from 'vue-i18n';

const t = require('./i18n/' + BUILD_LANG);
const de = require('./i18n/de');

Vue.use(VueI18n);
export default new VueI18n({
    locale: BUILD_LANG,
    fallbackLocale: 'de',
    messages: {
        [BUILD_LANG]: t,
        de,
    },
});
