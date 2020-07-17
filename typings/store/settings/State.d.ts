import { ModuleSettings } from '../../Setting';

export interface SettingsState {
    settings: ModuleSettings;
    changes: boolean;
    reload: boolean;
}
