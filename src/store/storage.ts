import { ActionTree, Module } from 'vuex';
import { StorageState } from '../../typings/store/storage/State';
import { RootState } from '../../typings/store/RootState';
import localforage from 'localforage';
import {
    StorageActionStoreParams,
    StorageGet,
    StorageSet,
} from '../../typings/store/storage/Actions';

localforage.config({
    name: PREFIX,
    storeName: `${PREFIX}Storage`,
});

export default {
    namespaced: true,
    state: {
        localforage: localforage,
    },
    actions: {
        get(
            { state }: StorageActionStoreParams,
            { key, defaultValue = null }: StorageGet
        ): Promise<unknown> {
            return new Promise<unknown>(resolve => {
                state.localforage
                    .getItem(key)
                    .then(value => resolve(value ?? defaultValue));
            });
        },
        set(
            { state }: StorageActionStoreParams,
            { key, value }: StorageSet
        ): Promise<typeof value> {
            return state.localforage.setItem(key, value);
        },
    } as ActionTree<StorageState, RootState>,
} as Module<StorageState, RootState>;
