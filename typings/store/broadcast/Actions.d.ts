import { ActionContext } from 'vuex';
import { RootState } from '../RootState';

export type BroadcastActionStoreParams = ActionContext<RootState, RootState>;
