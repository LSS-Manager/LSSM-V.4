export interface OwnSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;

    // General
    [key: string]: number | string;
}

export interface OwnSchoolingTabs {
    heads: {
        [key: string]: {
            title: string;
        };
    };
    tabTitles: string[];
    currentTab: string;
    tabs: {
        [tab: string]: OwnSchooling[];
    };
    search: string;
    sort: string;
    sortDir: string;
    all: string;
}

export interface OwnSchoolingTabsComputed {
    schoolings: OwnSchooling[];
}

export interface OwnSchoolingTabsMethods {
    setSorting(s: string): void;
}
