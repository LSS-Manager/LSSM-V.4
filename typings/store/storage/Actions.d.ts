import { ActionContext } from 'vuex';
import { RootState } from '../RootState';
import { StorageState } from './State';

export type StorageActionStoreParams = ActionContext<StorageState, RootState>;

export interface StorageGet {
    key: string;
    defaultValue: unknown;
}

export interface StorageSet {
    key: string;
    value: unknown;
}
