import { VueConstructor } from 'vue/types/vue';
import VueI18n from 'vue-i18n';

export default async (Vue: VueConstructor): Promise<VueI18n> => {
    Vue.use(VueI18n);

    const { locale } = window.I18n;
    const i18n = new VueI18n({
        locale,
        messages: {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            [locale]: (
                await import(
                    /* webpackChunkName: "i18n/[request]" */
                    /* webpackInclude: /[\\/]+i18n[\\/]+[^\\/]*?$/ */
                    `./i18n/${locale}`
                )
            ).default,
        },
    });

    i18n.locale = locale;

    return i18n;
};
