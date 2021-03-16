import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface EnhancedTableData {
    faSort: IconDefinition;
    faSortUp: IconDefinition;
    faSortDown: IconDefinition;
}

export interface EnhancedTableProps {
    head: {
        attrs: {
            [key: string]: unknown;
        };
        title: string;
        titleAttr?: string;
        noSort?: boolean;
    }[];
    sort: string;
    sortDir: string;
    noSearch: boolean;
    search: string;
    searchPlaceholder: string;
    tableAttrs: {
        [key: string]: unknown;
    };
    noBody: boolean;
}

export interface EnhancedTableMethods {
    titleAttr(i: EnhancedTableProps['head'][0]): string;
}
