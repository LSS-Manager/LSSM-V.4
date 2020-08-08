import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Token, QueryTree } from 'typings/modules/LSSMAQL/index';
import { APIState } from 'typings/store/api/State';

export interface LSSMAQL {
    faTerminal: IconDefinition;
    query: string;
    token_list: Token[];
    querytree: QueryTree | null;
}

export interface LSSMAQLMethods {
    execute(): void;
    tokenize(): void;
    parse(): void;
}

export interface LSSMAQLComputed {
    result:
        | APIState['vehicles']
        | APIState['buildings']
        | APIState['allianceinfo']
        | APIState['missions']
        | null;
    resultLength: number;
}
