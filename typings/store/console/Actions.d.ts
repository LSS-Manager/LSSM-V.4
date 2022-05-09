import type { ActionContext } from 'vuex';
import type { RootState } from '../RootState';

export type ConsoleActionStoreParams = ActionContext<RootState, RootState>;
