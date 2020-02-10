export default {
    namespaced: true,
    actions: {
        get({ rootState }, key) {
            return rootState.localforage.getItem(key);
        },
        set({ rootState }, { key, val }) {
            return rootState.localforage.setItem(key, val);
        },
    },
};
