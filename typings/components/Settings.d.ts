import { Modules } from '../Module';
import { ModuleSettings, MultiSelect, Select, Setting } from '../Setting';
import VueI18n from 'vue-i18n';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
    save(): void;
    discard(): void;
    reset(): void;
    disabled(moduleId: string, settingId: string): boolean;
    getExportData(): void;
    importSettings(): void;
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    getSelectOptions(
        module: string,
        setting: Select | MultiSelect,
        settingId: string
    ): { label: string; value: string }[];
}

export interface SettingsComputed {
    liveValueMap: {
        [module: string]: {
            [setting: string]: Setting['value'];
        };
    };
    savedValueMap: {
        [module: string]: {
            [setting: string]: Setting['value'];
        };
    };
    changeList: {
        [module: string]: {
            [setting: string]: {
                saved: Setting['value'];
                current: Setting['value'];
            };
        };
    };
}
