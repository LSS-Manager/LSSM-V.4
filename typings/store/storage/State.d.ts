/**
 * @file - Types for the state of storage store.
 */

import type * as localForage from 'localforage';

export interface StorageState {
    localforage: typeof localForage;
}
