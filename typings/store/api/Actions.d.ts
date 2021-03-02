import { ActionContext } from 'vuex';
import { RootState } from '../RootState';
import { APIState } from './State';

export type APIActionStoreParams = ActionContext<APIState, RootState>;
