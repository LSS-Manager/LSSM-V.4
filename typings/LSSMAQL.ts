export interface Tokens {
    AND: '&&';
    OR: '||';
    AND_STR: 'and';
    OR_STR: 'or';
    NOT: '!';
    EQUAL: '=';
    LIKE: '~';
    NOTEQUAL: '!=';
    NOTLIKE: '!~';
    GT: '>';
    GE: '>=';
    LT: '<';
    LE: '<=';
    WILDCARD: '*';
    COMMA: ',';
    DELIMITER: '.';
    LEFT: '(';
    RIGHT: ')';
    WHERE: 'where';
}

export type Base =
    | 'vehicles'
    | 'buildings'
    // | 'allianceBuildings' // TODO: Implement allianceBuildings
    | 'credits'
    | 'allianceinfo'
    | 'missions'
    | 'settings';

export interface SyntaxTree {
    selector: {
        base: Base;
        attributes: string[];
    };
}

export type Parser = (query: string) => SyntaxTree;
