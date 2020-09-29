import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface LSSMAQL {
    faTerminal: IconDefinition;
    query: string;
    querytree: LSSMAQLQuery | null;
    result: LSSMAQLResult;
}

export interface LSSMAQLMethods {
    execute(): void;
    parse(): void;
}

export interface LSSMAQLComputed {
    resultLength: number;
}

export type LSSMAQLResult =
    | Record<string, unknown>
    | string
    | LSSMAQLResult[]
    | number
    | undefined
    | null;

type LSSMAQLComparisonSide = LSSMAQLQuery & { filter: null };

interface LSSMAQLComparison {
    type: 'comparison';
    operator: '>' | '<' | '<=' | '>=' | '=' | '!=' | 'in' | 'not in';
    left: LSSMAQLComparisonSide;
    right: LSSMAQLComparisonSide;
}

interface LSSMAQLFunction {
    type: 'function';
    function: 'len' | 'sum' | 'min' | 'max';
    parameter: LSSMAQLQuery;
}

type LSSMAQLFilter = LSSMAQLComparison | LSSMAQLFunction;

export interface LSSMAQLQuery {
    type: 'query';
    base: string;
    selector: (string | number)[];
    filter?: LSSMAQLFilter;
}
