import { defineStore } from 'pinia';
import { useStorageStore } from '@stores/storage';

import type { SettingsState } from 'typings/store/settings/State';
import type { AppendableList, ModuleSettings, Setting } from 'typings/Setting';
import type {
    SettingsGet,
    SettingsRegister,
    SettingsSet,
} from 'typings/store/settings/Actions';

export const useSettingsStore = defineStore('settings', {
    state: () =>
        <SettingsState>{
            settings: {},
            changes: false,
            reload: false,
        },
    getters: {
        storageKey: () => (moduleId: string) => `settings_${moduleId}`,
    },
    actions: {
        setChangesStatus(changes: boolean) {
            this.$patch({ changes });
        },
        saveSettings(settings: ModuleSettings) {
            this.$patch({
                // TODO fix this TS problem
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                settings,
                reload: true,
            });
        },
        getModule<SettingsType = Record<string, unknown>>(moduleId: string) {
            const storageStore = useStorageStore();
            return storageStore
                .get<SettingsType | false>({
                    key: this.storageKey(moduleId),
                    defaultValue: false,
                })
                .then(
                    storage =>
                        <SettingsType>{
                            ...Object.fromEntries(
                                Object.entries(
                                    this.settings[moduleId] ?? {}
                                ).map(([key, { value, default: def }]) => [
                                    key,
                                    value ?? def,
                                ])
                            ),
                            ...(storage || {}),
                        }
                );
        },
        async getSetting<SettingType>({
            moduleId,
            settingId,
            defaultValue,
        }: SettingsGet<SettingType>) {
            const setting = this.settings[moduleId]?.[settingId];
            if (
                setting?.type === 'appendable-list' &&
                !setting.hasOwnProperty('value')
            )
                setting.value = { value: [], enabled: true };
            return ((setting?.type === 'appendable-list'
                ? {
                      enabled: setting?.value.enabled ?? true,
                      value: (setting?.value.value ?? []).map(v => ({
                          ...setting.defaultItem,
                          ...v,
                      })),
                  }
                : setting?.value) ??
                setting?.default ??
                (await this.getModule(moduleId))[settingId] ??
                defaultValue) as SettingType;
        },
        setSetting<SettingType>({
            moduleId,
            settingId,
            value,
        }: SettingsSet<SettingType>) {
            const storageStore = useStorageStore();
            if (this.settings[moduleId]?.[settingId])
                this.settings[moduleId][settingId].value = value;
            return this.getModule(moduleId)
                .then(module =>
                    storageStore.set({
                        key: this.storageKey(moduleId),
                        value: {
                            ...module,
                            [settingId]: value,
                        },
                    })
                )
                .then(() => value);
        },
        registerModule({ moduleId, settings }: SettingsRegister) {
            return this.getModule(moduleId).then(storage => {
                // TODO: Improve settings & settings types
                if (storage) {
                    Object.entries(storage).forEach(([key, value]) => {
                        if (settings.hasOwnProperty(key)) {
                            const setting = settings[key];
                            if (
                                setting.type === 'appendable-list' &&
                                Array.isArray(value)
                            ) {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                settings[key].value = {
                                    value,
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    enabled: !setting.disableable,
                                };
                            } else {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                settings[key].value = value;
                            }
                        }
                    });
                }
                Object.values(settings).forEach(setting => {
                    if (setting.type === 'appendable-list') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setting.value = setting.value ?? {
                            value: (setting as AppendableList).default,
                            enabled: !(setting as AppendableList).disableable,
                        };
                    } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setting.value =
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            setting.value ?? (setting as Setting).default;
                    }
                });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.settings[moduleId] = settings;
            });
        },
    },
});
