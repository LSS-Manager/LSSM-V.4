export interface OpenSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;
    price: string;
    seats: number;

    // General
    [key: string]: number | string;
}

export interface OpenSchoolingTabs {
    heads: {
        [key: string]: {
            title: string;
        };
    };
    tabTitles: string[];
    currentTab: string;
    tabs: {
        [tab: string]: OpenSchooling[];
    };
    search: string;
    sort: string;
    sortDir: string;
    all: string;
}

export interface OpenSchoolingTabsComputed {
    schoolings: OpenSchooling[];
}

export interface OpenSchoolingTabsMethods {
    setSorting(s: string): void;
}
