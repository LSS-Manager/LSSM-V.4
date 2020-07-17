import { RootState } from '../RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';

export interface ConsoleActionStoreParams {
    state: RootState;
    rootState: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<RootState, RootState>;
    rootGetters: GetterTree<RootState, RootState>;
}
