export default {
    namespaced: true,
    actions: {
        get({ rootState }, { key, defaultValue = null }) {
            return new Promise(resolve =>
                rootState.localforage
                    .getItem(key)
                    .then(value => resolve(value || defaultValue))
            );
        },
        set({ rootState }, { key, val }) {
            return rootState.localforage.setItem(key, val);
        },
    },
};
