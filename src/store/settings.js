export default {
    namespaced: true,
    state: {
        settings: {},
        settingsUpdated: false,
        settingsReload: false,
    },
    mutations: {
        register(state, { moduleId, module }) {
            if (!state.settings.hasOwnProperty(moduleId))
                state.settings[moduleId] = {};
            state.settings[moduleId] = module;
        },
        save(state, { settings }) {
            state.settings = settings;
        },
        settingsState(state, mode) {
            state.settingsUpdated = mode;
        },
        settingsReload(state, val) {
            state.settingsReload = val;
        },
    },
    actions: {
        save({ commit, dispatch }, { settings }) {
            commit('save', { settings });
            Object.keys(settings).forEach(module => {
                let moduleSettings = {};
                Object.keys(settings[module].settings).forEach(settingId => {
                    moduleSettings[settingId] =
                        settings[module].settings[settingId].value ||
                        settings[module].settings[settingId].default;
                });
                dispatch(
                    'storage/set',
                    {
                        key: `settings_${module}`,
                        val: moduleSettings,
                    },
                    { root: true }
                );
            });
        },
        setModule({ dispatch }, { moduleId, settings }) {
            dispatch(
                'storage/set',
                {
                    key: `settings_${moduleId}`,
                    val: settings,
                },
                { root: true }
            );
        },
        setSetting({ dispatch }, { moduleId, settingId, value }) {
            return new Promise(resolve =>
                dispatch('getModule', moduleId).then(settings => {
                    settings[settingId] = value;
                    resolve(dispatch('setModule', { moduleId, settings }));
                })
            );
        },
        register({ commit, dispatch }, { moduleId, settings }) {
            dispatch(
                'storage/get',
                { key: `settings_${moduleId}`, defaultValue: {} },
                {
                    root: true,
                }
            ).then(value => {
                let module = {
                    settings,
                };
                if (value)
                    Object.keys(value).forEach(setting => {
                        if (module.settings.hasOwnProperty(setting))
                            module.settings[setting].value = value[setting];
                    });
                commit('register', { moduleId, module });
            });
        },
        getModule({ dispatch }, moduleId) {
            return dispatch(
                'storage/get',
                { key: `settings_${moduleId}`, defaultValue: {} },
                {
                    root: true,
                }
            );
        },
        getSetting({ dispatch }, { moduleId, settingId, defaultValue = null }) {
            return new Promise(resolve => {
                dispatch(
                    'storage/get',
                    { key: `settings_${moduleId}`, defaultValue: {} },
                    {
                        root: true,
                    }
                ).then(value => {
                    if (!value.hasOwnProperty(settingId))
                        return resolve(defaultValue);
                    return resolve(value[settingId] || defaultValue);
                });
            });
        },
    },
};
