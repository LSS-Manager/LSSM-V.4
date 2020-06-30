import { Modules } from '../Module';
import { ModuleSettings } from '../Setting';
import VueI18n from 'vue-i18n';

export interface SettingsData {
    settings: ModuleSettings;
    startSettings: ModuleSettings;
    modulesSorted: (keyof Modules)[];
    wideGrids: string[];
    settingsBeforeDescription: string[];
    key: number;
    changes: boolean;
    tab: number;
}

export interface SettingsMethods {
    update(moduleId?: string, settingId?: string): void;
    save(): void;
    discard(): void;
    reset(): void;
    disabled(moduleId: string, settingId: string): boolean;
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
}
