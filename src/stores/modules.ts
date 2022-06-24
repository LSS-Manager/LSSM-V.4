import { defineStore } from 'pinia';

import config from '../config';

import type { Modules } from 'typings/Module';

export const useModulesStore = defineStore('modules', {
    state: () => ({
        modules: MODULE_REGISTER_FILES as Modules,
        appstore: {
            changes: false,
            reload: false,
        },
    }),
    getters: {
        coreModuleIds: (): string[] => config.modules['core-modules'],
        noMapkitModuleIds: (state): string[] =>
            Object.keys(state.modules).filter(
                moduleId => state.modules[moduleId].noMapkit
            ),
        appModuleIds: (state): string[] =>
            Object.entries(state.modules)
                .filter(
                    ([, module]) =>
                        !(
                            module.noapp ||
                            (module.alpha && MODE !== 'beta') ||
                            (module.locales?.length &&
                                !module.locales.includes(window.I18n.locale))
                        )
                )
                .map(([moduleId]) => moduleId),
    },
    actions: {
        setActive(moduleId: string) {
            if (this.modules.hasOwnProperty(moduleId))
                this.modules[moduleId].active = true;
        },
    },
});
