import { ActionContext } from 'vuex';
import { RootState } from '../RootState';

export type EventActionStoreParams = ActionContext<RootState, RootState>;

export interface CreateEvent {
    name: string;
    detail?: unknown;
    init?: EventInit;
}
