import { TokenRegexes, QueryTokens, Token } from 'typings/modules/LSSMAQL';

const regexes = {
    getter_dot: /\./,
    getter_num: /\[\d+]/,
    where: /WHERE/,
    not_in: /NOT IN/,
    in: /IN/,
    and: /AND/,
    or: /OR/,
    greater_equal: />=/,
    smaller_equal: /<=/,
    equals: /=/,
    unequal: /!=/,
    greater: />/,
    smaller: /</,
    paran_open: /\(/,
    paran_close: /\)/,
    string: /"[^"]*"|'[^']*'/,
    number: /\d+/,
    boolean: /true|false/,
    identifier: /[a-z][a-z_]*/,
} as TokenRegexes;

const consume = (query: string, token_list: Token[]): string => {
    let newQuery = query;
    Object.entries(regexes).some(([token, regex]) => {
        const startRegex = new RegExp(
            `^(${regex.toString().replace(/^\/|\/$/g, '')})`
        );
        const match = query.match(startRegex);
        if (match) {
            newQuery = query.replace(startRegex, '');
            token_list.push({
                type: token as QueryTokens,
                value: match[0].replace(/^["']|["']$/g, ''),
            });
            return true;
        }
        return false;
    });
    return newQuery.trim();
};

export default (query: string): Token[] => {
    let newQuery = query.trim();
    const token_list = [] as Token[];
    while (newQuery.length) {
        const queryBefore = newQuery;
        newQuery = consume(newQuery, token_list);
        if (queryBefore === newQuery) break;
    }
    return token_list;
};
