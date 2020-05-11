import Vue from 'vue';
import VueI18n from 'vue-i18n';

const fallbacks = { FALLBACK_LOCALES };

Vue.use(VueI18n);
export default new VueI18n({
    locale: BUILD_LANG,
    fallbackLocale: Object.keys(fallbacks),
    messages: {
        [BUILD_LANG]: require('./i18n/' + BUILD_LANG),
        ...fallbacks,
    },
});
