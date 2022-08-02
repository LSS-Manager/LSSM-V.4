import type Vue from 'vue';

import type { APIState } from 'typings/store/api/State';
import type { CombinedVueInstance } from 'vue/types/vue';
import type { DefaultProps } from 'vue/types/options';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { useAPIStore } from '@stores/api';
import type { QueryTree, Token } from 'typings/modules/LSSMAQL/index';

export interface LSSMAQL {
    faTerminal: IconDefinition;
    query: string;
    token_list: Token[];
    querytree: QueryTree | null;
    apiStore: ReturnType<typeof useAPIStore>;
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

export type LSSMAQLVue = CombinedVueInstance<
    Vue,
    LSSMAQL,
    LSSMAQLMethods,
    LSSMAQLComputed,
    DefaultProps,
    unknown
>;
