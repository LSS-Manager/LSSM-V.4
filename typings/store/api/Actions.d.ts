import { ActionContext } from 'vuex';
import { APIState } from './State';
import { RootState } from '../RootState';

export type APIActionStoreParams = ActionContext<APIState, RootState>;
