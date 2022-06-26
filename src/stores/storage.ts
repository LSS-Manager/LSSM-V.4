import type Vue from 'vue';

import { defineStore } from 'pinia';
import localforage from 'localforage';
import { useConsoleStore } from '@stores/console';

import type { StorageGet, StorageSet } from 'typings/store/storage/Actions';

localforage.config({
    name: PREFIX,
    storeName: `${PREFIX}Storage`,
});

const storageStore = defineStore('storage', {
    state: () => ({}),
    actions: {
        get<ValueType = unknown>({ key, defaultValue }: StorageGet<ValueType>) {
            return localforage
                .getItem<ValueType>(key)
                .then(value => value ?? defaultValue);
        },
        set<ValueType>({ key, value }: StorageSet<ValueType>) {
            if (typeof key === 'undefined' || typeof value === 'undefined') {
                useConsoleStore().error({
                    messages: [
                        'Trying to store a value for LSSM but one of the following Parameters is not defined: key:',
                        key,
                        'value:',
                        value,
                    ],
                });
                return new Promise((_, reject) => reject());
            } else {
                return localforage.setItem(key, value);
            }
        },
        getAllItems() {
            const fullStorage: Record<string, unknown> = {};
            return localforage
                .iterate((value, key) => (fullStorage[key] = value))
                .then(() => fullStorage);
        },
    },
});

export const useStorageStore: () => ReturnType<typeof storageStore> = () =>
    (window[PREFIX] as Vue)?.$stores?.storage ?? storageStore();
