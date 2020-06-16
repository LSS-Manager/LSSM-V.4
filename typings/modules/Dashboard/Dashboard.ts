import VueI18n from 'vue-i18n';

export interface DashboardMethods {
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
}
