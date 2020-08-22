import { RootState } from '../RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';

export interface BroadcastActionStoreParams {
    state: RootState;
    rootState: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<RootState, RootState>;
    rootGetters: GetterTree<RootState, RootState>;
}
