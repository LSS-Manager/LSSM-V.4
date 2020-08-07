import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Token, Tree } from 'typings/modules/LSSMAQL/index';

export interface LSSMAQL {
    faTerminal: IconDefinition;
    query: string;
    token_list: Token[];
    tree: Tree | null;
}

export interface LSSMAQLMethods {
    execute(): void;
    tokenize(): void;
    parse(): void;
}
