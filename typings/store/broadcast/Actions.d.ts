import type { ActionContext } from 'vuex';
import type { RootState } from '../RootState';

export type BroadcastActionStoreParams = ActionContext<RootState, RootState>;
