import { RootState } from '../../typings/store/RootState';
import { SettingsState } from '../../typings/store/settings/State';
import { ActionTree, Module, MutationTree } from 'vuex';
import {
    AppendableList,
    ModuleSettings,
    Setting,
    Settings,
} from '../../typings/Setting';
import {
    SettingsActionStoreParams,
    SettingsGet,
    SettingsRegister,
    SettingsSave,
    SettingsSet,
} from '../../typings/store/settings/Actions';

export default {
    namespaced: true,
    state: {
        settings: {},
        changes: false,
        reload: false,
    },
    mutations: {
        register(
            state: SettingsState,
            { moduleId, settings }: { moduleId: string; settings: Settings }
        ) {
            state.settings[moduleId] = settings;
        },
        setSettingsChanges(state: SettingsState, changes: boolean) {
            state.changes = changes;
        },
        setSettingsReload(state: SettingsState) {
            state.reload = true;
        },
        save(state: SettingsState, settings: ModuleSettings) {
            state.settings = settings;
        },
        modifyValue(
            state: SettingsState,
            {
                moduleId,
                settingId,
                value,
            }: { moduleId: string; settingId: string; value: Setting['value'] }
        ) {
            const setting = state.settings[moduleId]?.[settingId];
            if (setting) state.settings[moduleId][settingId].value = value;
        },
    } as MutationTree<SettingsState>,
    actions: {
        saveSettings(
            { commit, dispatch }: SettingsActionStoreParams,
            { settings }: SettingsSave
        ) {
            commit('save', settings);
            commit('setSettingsReload');
        },
        register(
            { commit, dispatch }: SettingsActionStoreParams,
            { moduleId, settings }: SettingsRegister
        ) {
            return new Promise<void>(resolve =>
                dispatch(
                    'storage/get',
                    {
                        key: `settings_${moduleId}`,
                        defaultValue: {},
                    },
                    {
                        root: true,
                    }
                ).then((storage: Setting) => {
                    if (storage) {
                        Object.entries(storage).forEach(([key, value]) => {
                            if (settings.hasOwnProperty(key)) {
                                const setting = settings[key];
                                if (
                                    setting.type === 'appendable-list' &&
                                    Array.isArray(value)
                                ) {
                                    settings[key].value = {
                                        value,
                                        enabled: !setting.disableable,
                                    };
                                }
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                else {
                                    settings[key].value = value;
                                }
                            }
                        });
                    }
                    Object.values(settings).forEach(setting => {
                        if (setting.type === 'appendable-list') {
                            setting.value = setting.value ?? {
                                value: (setting as AppendableList).default,
                                enabled: !(setting as AppendableList)
                                    .disableable,
                            };
                        } else {
                            setting.value =
                                setting.value ?? (setting as Setting).default;
                        }
                    });
                    commit('register', { moduleId, settings });
                    resolve();
                })
            );
        },
        getModule({ dispatch }: SettingsActionStoreParams, moduleId: string) {
            return dispatch(
                'storage/get',
                { key: `settings_${moduleId}`, defaultValue: {} },
                {
                    root: true,
                }
            );
        },
        setSetting(
            { commit, dispatch }: SettingsActionStoreParams,
            { moduleId, settingId, value }: SettingsSet
        ) {
            commit('modifyValue', { moduleId, settingId, value });
            return new Promise(resolve =>
                dispatch('getModule', moduleId).then(module => {
                    dispatch(
                        'storage/set',
                        {
                            key: `settings_${moduleId}`,
                            value: {
                                ...module,
                                [settingId]: value,
                            },
                        },
                        {
                            root: true,
                        }
                    ).then(resolve);
                })
            );
        },
        async getSetting(
            { state, dispatch }: SettingsActionStoreParams,
            { moduleId, settingId, defaultValue = null }: SettingsGet
        ) {
            const setting = state.settings[moduleId]?.[settingId];
            if (
                setting?.type === 'appendable-list' &&
                !setting.hasOwnProperty('value')
            )
                setting.value = { value: [], enabled: true };
            return (
                (setting?.type === 'appendable-list'
                    ? {
                          enabled: setting?.value.enabled ?? true,
                          value: (setting?.value.value ?? []).map(v => ({
                              ...setting.defaultItem,
                              ...v,
                          })),
                      }
                    : setting?.value) ??
                setting?.default ??
                (await dispatch('getModule', moduleId))[settingId] ??
                defaultValue
            );
        },
    } as ActionTree<SettingsState, RootState>,
} as Module<SettingsState, RootState>;
