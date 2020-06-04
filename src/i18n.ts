import { VueConstructor } from 'vue/types/vue';
import VueI18n from 'vue-i18n';

const fallbacks = FALLBACK_LOCALES;

export default (Vue: VueConstructor): VueI18n => {
    Vue.use(VueI18n);

    const i18n = new VueI18n({
        locale: BUILD_LANG,
        fallbackLocale: Object.keys(fallbacks),
        messages: {
            [BUILD_LANG]: require('./i18n/' + BUILD_LANG),
            ...fallbacks,
        },
    });

    i18n.locale = BUILD_LANG;

    return i18n;
};
