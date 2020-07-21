import VueI18n from 'vue-i18n';

interface Schooling {
    amount: number;
    bound: number;
}

interface EachSchooling extends Schooling {
    min: number;
    max: number;
}

export interface SchoolingSummaryObject<schooling = Schooling> {
    [schooling: string]: schooling;
}

export interface SchoolingSummary {
    hidden: boolean;
    sortAll: 'schooling' | 'amount' | 'bound';
    sortAllDir: 'asc' | 'desc';
    allSchoolingsSearch: string;
    sortEach: 'schooling' | 'amount' | 'bound';
    sortEachDir: 'asc' | 'desc';
    eachSchoolingsSearch: string;
}

export interface SchoolingSummaryComputed {
    sortedAll: {
        schooling: string;
        amount: number;
        bound: number;
    }[];
    sortedEach: {
        schooling: string;
        amount: number;
        bound: number;
    }[];
}

export interface SchoolingSummaryMethods {
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    $sm(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    setSortAll(s: string): void;
    setSortEach(s: string): void;
}

export interface SchoolingSummaryProps {
    allSchoolings: SchoolingSummaryObject;
    eachSchoolings: SchoolingSummaryObject<EachSchooling>;
}
