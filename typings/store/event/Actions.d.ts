import type { ActionContext } from 'vuex';
import type { RootState } from '../RootState';

export type EventActionStoreParams = ActionContext<RootState, RootState>;

export interface CreateEvent {
    name: string;
    detail?: unknown;
    init?: EventInit;
}
