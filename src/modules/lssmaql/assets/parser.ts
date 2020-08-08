import {
    ObjectTree,
    Token,
    QueryTree,
    FunctionTree,
    Condition,
} from 'typings/modules/LSSMAQL';

const baseObjects = ['allianceinfo', 'buildings', 'vehicles'];
const functions = ['len', 'sum', 'min', 'max'];
const comparisons = ['>', '<', '<=', '>=', '=', 'IN', 'NOT IN'];

const parser = (tokens: Token[], base?: ObjectTree['base']): QueryTree => {
    let tree = {} as QueryTree;
    const token = tokens.shift();
    if (
        !token ||
        (!base && token.type !== 'identifier') ||
        (base && token.type !== 'getter_dot')
    )
        return tree;
    if ((token && baseObjects.includes(token.value)) || base) {
        tree = {
            type: 'object',
            base: base ?? (token?.value as ObjectTree['base']),
            attributes: [],
            filter: [],
        };
        while (
            tokens.length &&
            [base ? 'identifier' : 'getter_dot', 'getter_num'].includes(
                tokens[0].type
            )
        ) {
            if (tokens[0].type === 'getter_num')
                tree.attributes.push(
                    parseInt(
                        tokens.shift()?.value.replace(/^\[|]$/g, '') || '-1'
                    )
                );
            else if (
                tokens.length >= (base ? 1 : 2) &&
                tokens[base ? 0 : 1].type === 'identifier'
            ) {
                !base && tokens.shift();
                tree.attributes.push(tokens.shift()?.value || -1);
            } else break;
        }
        if (tokens.length >= 2 && tokens[0].type === 'where') {
            tokens.shift();
            const left = [] as Token[];
            while (tokens.length && !comparisons.includes(tokens[0].value)) {
                const token = tokens.shift();
                if (!token) break;
                left.push(token);
            }
            const token = tokens.shift();
            if (!token) return tree;
            const comparison = token.value as Condition['comparison'];
            const right = [] as Token[];
            while (tokens.length && !['AND', 'OR'].includes(tokens[0].value)) {
                const token = tokens.shift();
                if (!token) break;
                right.push(token);
            }
            tree.filter.push({ left, comparison, right });
        }
    } else if (token && functions.includes(token.value)) {
        tree = {
            type: 'function',
            function: token.value as FunctionTree['function'],
            base: base ?? '',
            body: null,
        };
    }
    return tree;
};

export default parser;
