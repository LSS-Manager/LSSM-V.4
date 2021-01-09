import { RootState } from '../RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';

export interface EventActionStoreParams {
    state: RootState;
    rootState: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<RootState, RootState>;
    rootGetters: GetterTree<RootState, RootState>;
}

export interface CreateEvent {
    name: string;
    detail?: unknown;
    init?: EventInit;
}
