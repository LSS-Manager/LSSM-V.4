import { Settings } from '../../Setting';

export interface SettingsState {
    settings: {
        [moduleId: string]: Settings;
    };
}
