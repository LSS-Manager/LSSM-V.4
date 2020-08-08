export interface TokenRegexes {
    identifier: RegExp;
    getter_dot: RegExp;
    getter_num: RegExp;
    where: RegExp;
    in: RegExp;
    and: RegExp;
    or: RegExp;
    greater_equal: RegExp;
    smaller_equal: RegExp;
    equals: RegExp;
    greater: RegExp;
    smaller: RegExp;
    paran_open: RegExp;
    paran_close: RegExp;
    string: RegExp;
    number: RegExp;
}

export type QueryTokens = keyof TokenRegexes;

export interface Token {
    type: QueryTokens;
    value: string;
}

export interface ObjectTree {
    type: 'object';
    base: 'allianceinfo' | 'buildings' | 'vehicles';
    attributes: (string | number)[];
}

export interface FunctionTree {
    type: 'function';
    function: 'len' | 'sum' | 'min' | 'max';
    body: Tree | null;
}

export type Tree = ObjectTree | FunctionTree;
