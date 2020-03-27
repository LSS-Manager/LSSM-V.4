export default {
    namespaced: true,
    getters: {
        prefixed: (_s, _g, rootState) => params => [
            `%cLSSM V.${rootState.version}%c:`,
            'font-weight: bold;',
            'font-weight: normal;',
            ...params,
        ],
    },
    actions: {
        warn({ getters }, params) {
            console.warn(...getters.prefixed(params));
        },
    },
};
