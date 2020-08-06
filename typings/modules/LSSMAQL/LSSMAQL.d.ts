import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Token } from 'typings/modules/LSSMAQL/index';

export interface LSSMAQL {
    faTerminal: IconDefinition;
    query: string;
    token_list: Token[];
}

export interface LSSMAQLMethods {
    tokenize(): void;
}
