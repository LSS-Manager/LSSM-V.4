import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { OwnSchoolings } from 'typings/modules/SchoolingOverview/main';
import type { useRootStore } from '@stores/index';
import type { useSettingsStore } from '@stores/settings';

export interface OwnSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;
}

export interface OwnSchoolingTabs {
    faCompressAlt: IconDefinition;
    faExpandAlt: IconDefinition;
    heads: Record<
        string,
        {
            title: string;
        }
    >;
    tabTitles: string[];
    currentTab: string;
    search: string;
    sort: 'end' | 'name' | 'owner';
    sortDir: string;
    all: string;
    collapsed: boolean;
    rootStore: ReturnType<typeof useRootStore>;
    settingsStore: ReturnType<typeof useSettingsStore>;
}

export interface OwnSchoolingTabsComputed {
    schoolings: OwnSchooling[];
}

export interface OwnSchoolingTabsMethods {
    setTab(_: unknown, tab: number): void;
    setSorting(s: OwnSchoolingTabs['sort']): void;
    toggleCollapse(): void;
    getCountdownId(schooling: OwnSchooling): string;
    initCountdowns(): void;
}

export interface OwnSchoolingTabsProps {
    tabs: OwnSchoolings['tabs'];
}
