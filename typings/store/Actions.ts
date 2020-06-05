import { RootState } from './RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';

export interface ActionStoreParams {
    state: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<RootState, RootState>;
}

export interface Hook {
    post: boolean;
    event: string;
    callback: (...args: unknown[]) => void;
}
