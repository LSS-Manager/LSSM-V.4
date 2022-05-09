import type { ActionContext } from 'vuex';
import type { APIState } from './State';
import type { RootState } from '../RootState';

export type APIActionStoreParams = ActionContext<APIState, RootState>;
