import VueI18n from 'vue-i18n';
import { createI18n, useI18n as useI18nHelper } from 'vue-i18n-composable';

import type { VueConstructor } from 'vue/types/vue';

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

    const extraFileNames = [
        'buildings',
        'equipment',
        'global',
        'schoolings',
        'vehicles',
    ];
    const extraFiles: Record<string, unknown> = {};

    for (const extraFile of extraFileNames) {
        try {
            extraFiles[extraFile] = (
                await import(
                    /* webpackChunkName: `i18n/[request]` */
                    `./i18n/${locale}/${extraFile}.ts`
                )
            ).default;
        } catch (e) {
            // do nothing. Appears when extra file does not exist
        }
    }

    const i18n = createI18n({
        locale,
        messages: {
            [locale]: {
                ...(
                    await import(
                        /* webpackChunkName: "i18n/[request]" */
                        /* webpackInclude: /[\\/]+i18n[\\/]+[a-z]{2}_[A-Z]{2}\.ts$/ */
                        `./i18n/${locale}.ts`
                    )
                ).default,
                ...(highcharts ? { highcharts } : {}),
                ...extraFiles,
            },
        },
    });

    i18n.locale = locale;

    return i18n;
};

const useI18n = (scope?: string) => {
    const { t, tc } = useI18nHelper();
    return {
        $t: t,
        $tc: tc,
        $m: scope
            ? (key: VueI18n.Path, args?: VueI18n.Values) =>
                  t(`${scope}.${key}`, args)
            : t,
        $mc: scope
            ? (
                  key: VueI18n.Path,
                  choice?: VueI18n.Choice,
                  args?: VueI18n.Values
              ) => tc(`${scope}.${key}`, choice, args)
            : tc,
    };
};

const useI18nModule = (module: string) => useI18n(`modules.${module}`);

export { useI18n, useI18nModule };
