import { CreditsDailyWindow } from 'modules/redesign/parsers/credits/daily';
import { CreditsTypes } from './main';
import VueI18n from 'vue-i18n';

export interface DailyCreditsSummary {
    hidden: boolean;
    sort: 'desc' | 'total' | 'amount';
    sortDir: 'asc' | 'desc';
    search: '';
}

interface Category {
    desc: string;
    total: number;
    amount: number;
}

export interface DailyCreditsSummaryComputed {
    sorted: Category[];
    filtered: Category[];
    creditsTypeSum: Category[];
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
