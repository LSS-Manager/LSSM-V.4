import Vue from 'vue';
import VueI18n from 'vue-i18n';
const config = require('./config');

const t = require('./i18n/' + BUILD_LANG);
const f = require('./i18n/' +
    (config.games[BUILD_LANG].locale_fallback || 'de_DE'));
const de_DE = require('./i18n/de_DE');

Vue.use(VueI18n);
export default new VueI18n({
    locale: BUILD_LANG,
    fallbackLocale: 'de_DE',
    messages: {
        [BUILD_LANG]: t,
        [config.games[BUILD_LANG].locale_fallback]: f,
        de_DE,
    },
});
