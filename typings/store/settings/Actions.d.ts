import type { ModuleSettings, RegisterSettings } from '../../Setting';

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
