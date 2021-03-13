import { RootState } from '../RootState';
import { ActionContext } from 'vuex';

export type EventActionStoreParams = ActionContext<RootState, RootState>;

export interface CreateEvent {
    name: string;
    detail?: unknown;
    init?: EventInit;
}
