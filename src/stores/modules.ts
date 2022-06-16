import { defineStore } from 'pinia';

import config from '../config';

import type { Modules } from 'typings/Module';

export const useModulesStore = defineStore('modules', {
    state: () => ({
        modules: MODULE_REGISTER_FILES as Modules,
    }),
    getters: {
        coreModuleIds: (): string[] => config.modules['core-modules'],
        noMapkitModuleIds: (state): string[] =>
            Object.keys(state.modules).filter(
                moduleId => state.modules[moduleId].noMapkit
            ),
    },
    actions: {
        setActive(moduleId: string) {
            if (this.modules.hasOwnProperty(moduleId))
                this.modules[moduleId].active = true;
        },
    },
});
