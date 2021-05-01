import { Base, Parser, Tokens } from 'typings/LSSMAQL';

const BASES: Base[] = [
    'vehicles',
    'settings',
    'buildings',
    'credits',
    'allianceinfo',
    'missions',
];

const TOKENS: Tokens = {
    AND: '&&',
    OR: '||',
    AND_STR: 'and',
    OR_STR: 'or',
    NOT: '!',
    EQUAL: '=',
    LIKE: '~',
    NOTEQUAL: '!=',
    NOTLIKE: '!~',
    GT: '>',
    GE: '>=',
    LT: '<',
    LE: '<=',
    WILDCARD: '*',
    COMMA: ',',
    DELIMITER: '.',
    LEFT: '(',
    RIGHT: ')',
    WHERE: 'where',
};

const splitter = (token: keyof Tokens): RegExp =>
    new RegExp(TOKENS[token].replace(/[[\\^$.|?*+()]/g, '\\$&'), 'i');

const parser: Parser = query => {
    const [selector, filter] = query
        .split(splitter('WHERE'))
        .map(t => t.trim());
    const [selectorBase, ...selectorAttributes] = selector.split(
        splitter('DELIMITER')
    );
    if (!BASES.includes(<Base>selectorBase)) {
        throw new SyntaxError(
            `base "${selectorBase}" is not a valid base! Valid bases are: ${JSON.stringify(
                BASES
            )}`
        );
    }
    return {
        selector: {
            base: <Base>selectorBase,
            attributes: selectorAttributes,
        },
    };
};

export default parser;
