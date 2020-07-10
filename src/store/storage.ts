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
            if ('undefined' === typeof key || 'undefined' === typeof value)
                throw new Error(
                    `Trying to store a value for LSSM but one of the following Parameters is not defined: key: ${key}, value: ${value}`
                );
            return state.localforage.setItem(key, value);
        },
        getAllItems({
            state,
        }: StorageActionStoreParams): Promise<{
            [key: string]: unknown;
        }> {
            return new Promise<{
                [key: string]: unknown;
            }>(resolve => {
                const storage = {} as {
                    [key: string]: unknown;
                };
                state.localforage
                    .iterate((value, key) => {
                        storage[key] = value;
                    })
                    .then(() => resolve(storage));
            });
        },
    } as ActionTree<StorageState, RootState>,
} as Module<StorageState, RootState>;
