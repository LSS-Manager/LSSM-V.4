import { ActionContext } from 'vuex';
import { RootState } from '../RootState';

export type ConsoleActionStoreParams = ActionContext<RootState, RootState>;
