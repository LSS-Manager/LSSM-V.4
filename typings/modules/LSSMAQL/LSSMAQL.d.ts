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

export type LSSMAQLResultIsMapped =
    | [LSSMAQLResult[], true]
    | [LSSMAQLResult, false];

interface LSSMAQLFunction {
    type: 'function';
    function: 'len' | 'sum' | 'min' | 'max';
    parameter: LSSMAQLQuery;
}

type LSSMAQLComparisonSide =
    | LSSMAQLSelector
    | LSSMAQLFunction
    | string
    | number;

interface LSSMAQLComparison {
    type: 'comparison';
    operator: '>' | '<' | '<=' | '>=' | '=' | '!=' | 'in' | 'not in';
    left: LSSMAQLComparisonSide;
    right: LSSMAQLComparisonSide;
}

interface LSSMAQLQueryAnd {
    type: 'and';
    left: LSSMAQLComparison;
    right: LSSMAQLComparison;
}

interface LSSMAQLQueryOr {
    type: 'or';
    left: LSSMAQLComparison;
    right: LSSMAQLComparison;
}

interface LSSMAQLSelector {
    type: 'selector';
    base: string;
    selector: (string | number)[];
}

type LSSMAQLFilter = LSSMAQLComparison | LSSMAQLQueryAnd | LSSMAQLQueryOr;

export interface LSSMAQLQuery {
    type: 'query';
    base: string;
    selector: (string | number)[];
    filter?: LSSMAQLFilter;
}
