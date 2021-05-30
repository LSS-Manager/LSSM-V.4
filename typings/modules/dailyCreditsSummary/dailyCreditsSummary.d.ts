import { CreditsDailyWindow } from 'modules/redesign/parsers/credits/daily';
import VueI18n from 'vue-i18n';
import { CreditsTypes } from './main';

export interface DailyCreditsSummary {
    hidden: boolean;
    sort: 'desc' | 'total' | 'amount';
    sortDir: 'asc' | 'desc';
}

export interface DailyCreditsSummaryComputed {
    sorted: {
        desc: string;
        total: number;
        amount: number;
    }[];
    creditsTypeSum: {
        desc: string;
        total: number;
        amount: number;
    }[];
}

export interface DailyCreditsSummaryMethods {
    setSort(s: DailyCreditsSummary['sort']): void;
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
}

export interface DailyCreditsSummaryProps {
    entries: CreditsDailyWindow['entries'];
    creditsTypes: CreditsTypes;
}
