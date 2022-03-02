import type { QueryTokens, Token, TokenRegexes } from 'typings/modules/LSSMAQL';

const regexes = {
    getter_dot: /\./u,
    getter_num: /\[\d+\]/u,
    where: /WHERE/u,
    not_in: /NOT IN/u,
    in: /IN/u,
    and: /AND/u,
    or: /OR/u,
    greater_equal: />=/u,
    smaller_equal: /<=/u,
    equals: /=/u,
    unequal: /!=/u,
    greater: />/u,
    smaller: /</u,
    paran_open: /\(/u,
    paran_close: /\)/u,
    string: /"[^"]*"|'[^']*'/u,
    number: /\d+/u,
    boolean: /false|true/u,
    identifier: /[a-z][_a-z]*/u,
} as TokenRegexes;

const consume = (query: string, token_list: Token[]): string => {
    let newQuery = query;
    Object.entries(regexes).some(([token, regex]) => {
        const startRegex = new RegExp(
            `^(${regex.toString().replace(/^\/|\/[ADJUgimux]*$/gu, '')})`
        );
        const match = query.match(startRegex);
        if (match) {
            newQuery = query.replace(startRegex, '');
            token_list.push({
                type: token as QueryTokens,
                value: match[0].replace(/^["']|["']$/gu, ''),
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
