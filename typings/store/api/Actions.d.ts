import { Commit, Dispatch, GetterTree } from 'vuex';
import { RootState } from '../RootState';
import { APIState } from './State';

export interface APIActionStoreParams {
    state: APIState;
    rootState: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<APIState, RootState>;
    rootGetters: GetterTree<RootState, RootState>;
}
