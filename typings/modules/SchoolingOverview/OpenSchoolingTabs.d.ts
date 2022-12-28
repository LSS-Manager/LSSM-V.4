import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { OpenSchoolings } from 'typings/modules/SchoolingOverview/main';
import type { useRootStore } from '@stores/index';
import type { useSettingsStore } from '@stores/settings';

export interface OpenSchooling {
    end: number;
    id: string;
    name: string;
    owner: string;
    price: string;
    seats: number;
}

export interface OpenSchoolingTabs {
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
    sort: 'end' | 'name' | 'owner' | 'price' | 'seats';
    sortDir: string;
    all: string;
    collapsed: boolean;
    rootStore: ReturnType<typeof useRootStore>;
    settingsStore: ReturnType<typeof useSettingsStore>;
}

export interface OpenSchoolingTabsComputed {
    schoolings: OpenSchooling[];
}

export interface OpenSchoolingTabsMethods {
    setTab(_: unknown, tab: number): void;
    setSorting(s: OpenSchoolingTabs['sort']): void;
    toggleCollapse(): void;
    getCountdownId(schooling: OpenSchooling): string;
    initCountdowns(): void;
}

export interface OpenSchoolingTabsProps {
    tabs: OpenSchoolings['tabs'];
}
