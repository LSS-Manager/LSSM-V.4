import * as localForage from 'localforage';

export interface StorageState {
    localforage: typeof localForage;
}
