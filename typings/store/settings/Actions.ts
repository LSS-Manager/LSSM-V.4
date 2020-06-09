import { RootState } from '../RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';
import { SettingsState } from './State';
import { Settings } from 'typings/Setting';

export interface SettingsActionStoreParams {
    state: SettingsState;
    rootState: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<SettingsState, RootState>;
    rootGetters: GetterTree<RootState, RootState>;
}

export interface SettingsRegister {
    moduleId: string;
    settings: Settings;
}

export interface SettingsGet {
    moduleId: string;
    settingId: string;
    defaultValue: unknown;
}
