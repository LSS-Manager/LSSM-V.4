import localforage from 'localforage';
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
        get({ state }, { key, defaultValue = null }) {
            return new Promise(resolve => {
                state.localforage
                    .getItem(key)
                    .then(value => resolve(value ?? defaultValue));
            });
        },
        set({ state }, { key, value }) {
            return state.localforage.setItem(key, value);
        },
    },
};
//# sourceMappingURL=storage.js.map