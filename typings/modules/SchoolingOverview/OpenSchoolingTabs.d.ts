import { OpenSchoolings } from 'typings/modules/SchoolingOverview/main';

export interface OpenSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;
    price: string;
    seats: number;
}

export interface OpenSchoolingTabs {
    heads: {
        [key: string]: {
            title: string;
        };
    };
    tabTitles: string[];
    currentTab: string;
    search: string;
    sort: 'name' | 'seats' | 'price' | 'end' | 'owner';
    sortDir: string;
    all: string;
}

export interface OpenSchoolingTabsComputed {
    schoolings: OpenSchooling[];
}

export interface OpenSchoolingTabsMethods {
    setSorting(s: OpenSchoolingTabs['sort']): void;
}

export interface OpenSchoolingTabsProps {
    tabs: OpenSchoolings['tabs'];
}
