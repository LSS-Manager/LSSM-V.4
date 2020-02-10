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
        register({ commit, dispatch }, { moduleId, settings, sidebar }) {
            dispatch('storage/get', `settings_${moduleId}`, {
                root: true,
            }).then(value => {
                let module = {
                    settings,
                    sidebar,
                };
                if (value)
                    Object.keys(value).forEach(setting => {
                        if (module.settings.hasOwnProperty(setting))
                            module.settings[setting].value = value[setting];
                    });
                commit('register', { moduleId, module });
            });
        },
        getSetting({ dispatch }, { moduleId, settingId }) {
            return new Promise(resolve => {
                dispatch('storage/get', `settings_${moduleId}`, {
                    root: true,
                }).then(value => {
                    if (!value) return resolve(null);
                    if (!value.hasOwnProperty(settingId)) return resolve(null);
                    return resolve(value[settingId]);
                });
            });
        },
    },
};
