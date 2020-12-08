import { VueConstructor } from 'vue/types/vue';
import VueI18n from 'vue-i18n';

export default (Vue: VueConstructor): VueI18n => {
    Vue.use(VueI18n);

    const locale = window.I18n.locale;
    const i18n = new VueI18n({
        locale: locale,
        messages: {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            [locale]: require(`./i18n/${locale}`).default,
        },
    });

    i18n.locale = locale;

    return i18n;
};
