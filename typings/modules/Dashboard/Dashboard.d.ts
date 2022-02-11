import type VueI18n from 'vue-i18n';

export interface DashboardMethods {
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
}
