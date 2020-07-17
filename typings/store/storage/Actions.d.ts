import { RootState } from '../RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';
import { StorageState } from './State';

export interface StorageActionStoreParams {
    state: StorageState;
    rootState: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<StorageState, RootState>;
    rootGetters: GetterTree<RootState, RootState>;
}

export interface StorageGet {
    key: string;
    defaultValue: unknown;
}

export interface StorageSet {
    key: string;
    value: unknown;
}
