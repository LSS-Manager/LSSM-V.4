import type { APIState } from 'typings/store/api/State';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { QueryTree, Token } from 'typings/modules/LSSMAQL/index';

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
        | APIState['allianceinfo']
        | APIState['buildings']
        | APIState['missions']
        | APIState['vehicles']
        | null;
    resultLength: number;
}
