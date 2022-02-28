import type { CreditsDailyWindow } from 'modules/redesign/parsers/credits/daily';
import type { CreditsTypes } from './main';
import type VueI18n from 'vue-i18n';

interface BasicChartOptions {
    chart: {
        type: 'pie';
        backgroundColor: string;
        margin: number;
        spacing: number[];
        height: string;
        borderRadius: string;
    };
    tooltip: {
        pointFormat: string;
    };
    plotOptions: {
        pie: {
            cursor: 'pointer';
            dataLabels: {
                enabled: true;
                format: string;
            };
        };
    };
}

interface ChartOptions extends BasicChartOptions {
    title: { text: string; align: string };
    series: [
        {
            name: string;
            data: { name: string; y: number }[];
        }
    ];
}

export interface DailyCreditsSummary {
    hidden: boolean;
    sort: 'amount' | 'desc' | 'total';
    sortDir: 'asc' | 'desc';
    search: '';
    showAverage: boolean;
    basicChartOptions: BasicChartOptions;
}

export interface Category {
    desc: string;
    total: number;
    amount: number;
    backgroundColor: string;
    textColor: string;
}

export interface DailyCreditsSummaryComputed {
    sorted: Category[];
    filtered: Category[];
    creditsTypeSum: Category[];
    incomeChartOptions: ChartOptions;
    expensesChartOptions: ChartOptions;
}

export interface DailyCreditsSummaryMethods {
    setSort(s: DailyCreditsSummary['sort']): void;
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
}

export interface DailyCreditsSummaryProps {
    entries: CreditsDailyWindow['entries'];
    creditsTypes: CreditsTypes;
}
