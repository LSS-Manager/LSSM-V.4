import { VueConstructor } from 'vue/types/vue';
import VueI18n from 'vue-i18n';

export default (Vue: VueConstructor): VueI18n => {
    Vue.use(VueI18n);

    const i18n = new VueI18n({
        locale: BUILD_LANG,
        messages: {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            [BUILD_LANG]: require(`./i18n/${BUILD_LANG}`).default,
        },
    });

    i18n.locale = BUILD_LANG;

    return i18n;
};
