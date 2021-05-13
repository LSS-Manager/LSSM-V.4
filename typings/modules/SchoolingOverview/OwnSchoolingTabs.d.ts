import { OwnSchoolings } from 'typings/modules/SchoolingOverview/main';

export interface OwnSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;
}

export interface OwnSchoolingTabs {
    heads: {
        [key: string]: {
            title: string;
        };
    };
    tabTitles: string[];
    currentTab: string;
    search: string;
    sort: 'name' | 'end' | 'owner';
    sortDir: string;
    all: string;
}

export interface OwnSchoolingTabsComputed {
    schoolings: OwnSchooling[];
}

export interface OwnSchoolingTabsMethods {
    setSorting(s: OwnSchoolingTabs['sort']): void;
}

export interface OwnSchoolingTabsProps {
    tabs: OwnSchoolings['tabs'];
}
