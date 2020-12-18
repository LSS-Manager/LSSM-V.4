import { ActionTree, Module, MutationTree } from 'vuex';
import { SettingsState } from '../../typings/store/settings/State';
import { RootState } from '../../typings/store/RootState';
import { ModuleSettings, Setting, Settings } from '../../typings/Setting';
import {
    SettingsActionStoreParams,
    SettingsRegister,
    SettingsGet,
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
            return new Promise<void>(resolve => {
                commit('save', settings);
                Object.entries(settings).forEach(
                    async ([module, settings]) =>
                        await dispatch(
                            'storage/set',
                            {
                                key: `settings_${module}`,
                                value: Object.fromEntries(
                                    Object.entries(
                                        settings
                                    ).map(([setting, { value }]) => [
                                        setting,
                                        value,
                                    ])
                                ),
                            },
                            { root: true }
                        )
                );
                commit('setSettingsReload');
                resolve();
            });
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
                ).then(storage => {
                    if (storage)
                        Object.entries(storage).forEach(([key, value]) => {
                            if (settings.hasOwnProperty(key)) {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                settings[key].value = value;
                            }
                        });
                    Object.values(settings).forEach(value => {
                        value.value = value.value ?? (value as Setting).default;
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
            dispatch('getModule', moduleId).then(async module => {
                await dispatch(
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
                );
            });
        },
        async getSetting(
            { state, dispatch }: SettingsActionStoreParams,
            { moduleId, settingId, defaultValue = null }: SettingsGet
        ) {
            const setting = state.settings[moduleId]?.[settingId];
            return (
                (setting?.type === 'appendable-list'
                    ? setting?.value.map(v => ({
                          ...setting.defaultItem,
                          ...v,
                      }))
                    : setting?.value) ??
                setting?.default ??
                (await dispatch('getModule', moduleId))[settingId] ??
                defaultValue
            );
        },
    } as ActionTree<SettingsState, RootState>,
} as Module<SettingsState, RootState>;
