import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Modules } from '../Module';
import type { useRootStore } from '@stores/index';
import type { useSettingsStore } from '@stores/settings';
import type { useStorageStore } from '@stores/storage';
import type VueI18n from 'vue-i18n';
import type { ModuleSettings, MultiSelect, Select, Setting } from '../Setting';

interface Branch {
    type: 'beta' | 'stable';
    version: string;
    date: {
        date: string;
        timezone_type: 3;
        timezone: 'Europe/Berlin';
    };
}
interface BranchToDelete extends Branch {
    delete: Branch['date'];
}

export interface SettingsData {
    faHistory: IconDefinition;
    settings: ModuleSettings;
    startSettings: ModuleSettings;
    modulesSorted: (keyof Modules)[];
    wideGrids: string[];
    settingsBeforeDescription: string[];
    key: number;
    changes: boolean;
    tab: number;
    exportData: string;
    storageStore: ReturnType<typeof useStorageStore>;
    settingsStore: ReturnType<typeof useSettingsStore>;
    rootStore: ReturnType<typeof useRootStore>;
    branches: Record<string, Branch | BranchToDelete>;
}

export interface SettingsMethods {
    update(moduleId?: string, settingId?: string): void;
    updateAppendableList(
        state: boolean,
        moduleId: string,
        settingId: string
    ): void;
    save(): Promise<void>;
    discard(): void;
    reset(): void;
    disabled(moduleId: string, settingId: string): boolean;
    getExportData(): void;
    importSettings(): void;
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    getSelectOptions(
        module: string,
        setting: MultiSelect | Select,
        settingId: string
    ): { label: string; value: string }[];
}

export interface SettingsComputed {
    liveValueMap: Record<string, Record<string, Setting['value']>>;
    savedValueMap: Record<string, Record<string, Setting['value']>>;
    changeList: Record<
        string,
        Record<
            string,
            {
                saved: Setting['value'];
                current: Setting['value'];
            }
        >
    >;
    branchSelection: Record<'labels' | 'values', string[]>;
}
