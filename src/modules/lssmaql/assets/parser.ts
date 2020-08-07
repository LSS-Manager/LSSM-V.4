import { ObjectTree, Token, Tree, FunctionTree } from 'typings/modules/LSSMAQL';

const baseObjects = ['allianceinfo', 'buildings', 'vehicles'];
const functions = ['len', 'sum', 'min', 'max'];

const parser = (tokens: Token[]): Tree => {
    let tree = {} as Tree;
    const token = tokens.shift();
    if (!token || token.type !== 'identifier') return tree;
    if (baseObjects.includes(token.value)) {
        tree = {
            base: token.value as ObjectTree['base'],
            attributes: [],
        };
        while (
            tokens.length &&
            ['getter_dot', 'getter_num'].includes(tokens[0].type)
        ) {
            if (tokens[0].type === 'getter_num')
                tree.attributes.push(
                    parseInt(
                        tokens.shift()?.value.replace(/^\[|]$/g, '') || '-1'
                    )
                );
            else if (tokens.length >= 2 && tokens[1].type === 'identifier') {
                tokens.shift();
                tree.attributes.push(tokens.shift()?.value || -1);
            } else break;
        }
    } else if (functions.includes(token.value)) {
        tree = {
            function: token.value as FunctionTree['function'],
            body: null,
        };
    }
    return tree;
};

export default parser;
