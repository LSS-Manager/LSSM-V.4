import type { ActionContext } from 'vuex';
import type { RootState } from '../RootState';
import type { SettingsState } from './State';
import type { ModuleSettings, RegisterSettings } from '../../Setting';

export type SettingsActionStoreParams = ActionContext<SettingsState, RootState>;

export interface SettingsRegister {
    moduleId: string;
    settings: RegisterSettings;
}

export interface SettingsSet<SettingType> {
    moduleId: string;
    settingId: string;
    value: SettingType;
}

export interface SettingsGet<SettingType> {
    moduleId: string;
    settingId: string;
    defaultValue?: SettingType;
}

export interface SettingsSave {
    settings: ModuleSettings;
}
