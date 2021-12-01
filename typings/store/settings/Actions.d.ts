import { ActionContext } from 'vuex';
import { RootState } from '../RootState';
import { SettingsState } from './State';
import { ModuleSettings, Settings } from '../../Setting';

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
