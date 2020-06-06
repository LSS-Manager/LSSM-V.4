import { VueConstructor } from 'vue/types/vue';
import VueI18n from 'vue-i18n';

export default (Vue: VueConstructor): VueI18n => {
    Vue.use(VueI18n);

    const i18n = new VueI18n({
        locale: BUILD_LANG,
        fallbackLocale: FALLBACK_LOCALES,
        messages: {
            ...Object.fromEntries(
                [BUILD_LANG, ...FALLBACK_LOCALES].map(locale => [
                    locale,
                    require(`./i18n/${locale}`),
                ])
            ),
        },
    });

    i18n.locale = BUILD_LANG;

    return i18n;
};
