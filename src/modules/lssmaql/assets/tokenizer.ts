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
    greater: />/,
    smaller: /</,
    paran_open: /\(/,
    paran_close: /\)/,
    string: /"[^"]*"|'[^']*'/,
    number: /\d+/,
    identifier: /[a-z][a-z_]*/,
} as TokenRegexes;

const consume = (query: string, token_list: Token[]): string => {
    Object.entries(regexes).some(([token, regex]) => {
        const startRegex = new RegExp(
            `^(${regex.toString().replace(/^\/|\/$/g, '')})`
        );
        const match = query.match(startRegex);
        if (match) {
            query = query.replace(startRegex, '');
            token_list.push({
                type: token as QueryTokens,
                value: match[0].replace(/^["']|["']$/g, ''),
            });
            return true;
        }
        return false;
    });
    return query.trim();
};

export default (query: string): Token[] => {
    query = query.trim();
    const token_list = [] as Token[];
    while (query.length) {
        const queryBefore = query;
        query = consume(query, token_list);
        if (queryBefore === query) break;
    }
    return token_list;
};
