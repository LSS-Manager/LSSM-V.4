import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface EnhancedTableData {
    faSort: IconDefinition;
    faSortUp: IconDefinition;
    faSortDown: IconDefinition;
    faSlidersH: IconDefinition;
}

export interface EnhancedTableProps {
    head: {
        attrs: Record<string, unknown>;
        title: string;
        titleAttr?: string;
        noSort?: boolean;
    }[];
    sort: string;
    sortDir: string;
    noSearch: boolean;
    search: string;
    searchPlaceholder: string;
    tableAttrs: Record<string, unknown>;
    noBody: boolean;
}

export interface EnhancedTableMethods {
    titleAttr(i: EnhancedTableProps['head'][0]): string;
}
