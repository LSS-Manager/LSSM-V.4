import { ActionTree, Module, MutationTree } from 'vuex';
import { SettingsState } from '../../typings/store/settings/State';
import { RootState } from '../../typings/store/RootState';
import { Setting, Settings } from 'typings/Setting';
import {
    SettingsActionStoreParams,
    SettingsRegister,
    SettingsGet,
} from '../../typings/store/settings/Actions';

export default {
    namespaced: true,
    state: {
        settings: {},
    },
    mutations: {
        register(
            state: SettingsState,
            { moduleId, settings }: { moduleId: string; settings: Settings }
        ) {
            state.settings[moduleId] = settings;
        },
    } as MutationTree<SettingsState>,
    actions: {
        register(
            { commit, dispatch }: SettingsActionStoreParams,
            { moduleId, settings }: SettingsRegister
        ) {
            return new Promise(resolve =>
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
        getSetting(
            { state }: SettingsActionStoreParams,
            { moduleId, settingId, defaultValue = null }: SettingsGet
        ) {
            return (
                state.settings[moduleId]?.[settingId]?.value ??
                state.settings[moduleId]?.[settingId]?.default ??
                defaultValue
            );
        },
    } as ActionTree<SettingsState, RootState>,
} as Module<SettingsState, RootState>;
