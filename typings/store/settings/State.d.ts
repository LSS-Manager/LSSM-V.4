/**
 * @file - Types for the state of settings store.
 */

import type { ModuleSettings } from '../../Setting';

export interface SettingsState {
    settings: ModuleSettings;
    changes: boolean;
    reload: boolean;
}
