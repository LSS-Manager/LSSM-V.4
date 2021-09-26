import { VueConstructor } from 'vue/types/vue';
import VueI18n from 'vue-i18n';

export default async (Vue: VueConstructor): Promise<VueI18n> => {
    Vue.use(VueI18n);

    const { locale } = window.I18n;

    let highcharts = null;
    try {
        highcharts = (
            await import(
                /* webpackChunkName: `i18n/highcharts/[request]` */
                /* webpackInclude: /[\\/]+i18n[\\/]+[a-z]{2}_[A-Z]{2}[\\/]+highcharts.json$/ */
                `./i18n/${locale}/highcharts.json`
            )
        ).default;
    } catch (e) {
        // do nothing. Appears when highcharts-translations do not exist
    }

    const i18n = new VueI18n({
        locale,
        messages: {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            [locale]: {
                ...(
                    await import(
                        /* webpackChunkName: "i18n/[request]" */
                        /* webpackInclude: /[\\/]+i18n[\\/]+[^\\/]*?$/ */
                        `./i18n/${locale}`
                    )
                ).default,
                ...(highcharts ? { highcharts } : {}),
            },
        },
    });

    i18n.locale = locale;

    return i18n;
};
