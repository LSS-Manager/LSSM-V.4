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
    };
    sort: string;
    sortDir: string;
    noSearch: boolean;
    search: string;
    tableAttrs: {
        [key: string]: unknown;
    };
}
