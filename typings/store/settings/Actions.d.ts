import type { ActionContext } from 'vuex';
import type { RootState } from '../RootState';
import type { SettingsState } from './State';
import type { ModuleSettings, Settings } from '../../Setting';

export type SettingsActionStoreParams = ActionContext<SettingsState, RootState>;

export interface SettingsRegister {
    moduleId: string;
    settings: Settings;
}

export interface SettingsSet {
    moduleId: string;
    settingId: string;
    value: unknown;
}

export interface SettingsGet {
    moduleId: string;
    settingId: string;
    defaultValue: unknown;
}

export interface SettingsSave {
    settings: ModuleSettings;
}
