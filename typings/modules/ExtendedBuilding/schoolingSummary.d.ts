import type VueI18n from 'vue-i18n';

interface Schooling {
    amount: number;
    bound: number;
}

interface EachSchooling extends Schooling {
    min: number;
    max: number;
}

export type SchoolingSummaryObject<schooling> = Record<string, schooling>;

export interface SchoolingSummary {
    hidden: boolean;
    sortAll: 'amount' | 'bound' | 'schooling';
    sortAllDir: 'asc' | 'desc';
    allSchoolingsSearch: string;
    sortEach: 'amount' | 'bound' | 'schooling';
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
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    $sm(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    setSortAll(s: string): void;
    setSortEach(s: string): void;
}

export interface SchoolingSummaryProps {
    allSchoolings: SchoolingSummaryObject;
    eachSchoolings: SchoolingSummaryObject<EachSchooling>;
}
