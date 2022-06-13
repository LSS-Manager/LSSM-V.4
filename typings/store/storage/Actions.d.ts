import type { ActionContext } from 'vuex';
import type { RootState } from '../RootState';
import type { StorageState } from './State';

export type StorageActionStoreParams = ActionContext<StorageState, RootState>;

export interface StorageGet<ValueType = unknown> {
    key: string;
    defaultValue: ValueType;
}

export interface StorageSet<ValueType = unknown> {
    key: string;
    value: ValueType;
}
