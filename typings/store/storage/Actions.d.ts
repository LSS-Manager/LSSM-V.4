import type { ActionContext } from 'vuex';
import type { RootState } from '../RootState';
import type { StorageState } from './State';

export type StorageActionStoreParams = ActionContext<StorageState, RootState>;

export interface StorageGet {
    key: string;
    defaultValue: unknown;
}

export interface StorageSet {
    key: string;
    value: unknown;
}
