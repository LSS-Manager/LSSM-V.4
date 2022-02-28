import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Modules } from '../Module';
import type VueI18n from 'vue-i18n';
import type { ModuleSettings, MultiSelect, Select, Setting } from '../Setting';

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
}
