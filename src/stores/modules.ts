import { ref } from 'vue';
// well, we cannot set default type import + non-default non-type import
// eslint-disable-next-line no-duplicate-imports
import type Vue from 'vue';

import { defineStore } from 'pinia';

import config from '../config';

import type { Modules } from 'typings/Module';

const defineModulesStore = defineStore('modules', () => {
    const modules = MODULE_REGISTER_FILES as Modules;

    const appstore = ref({
        changes: false,
        reload: false,
    });

    const coreModuleIds = config.modules['core-modules'];
    const noMapkitModuleIds = Object.keys(modules).filter(
        moduleId => modules[moduleId].noMapkit
    );
    const appModuleIds = Object.entries(modules)
        .filter(
            ([, module]) =>
                !(
                    module.noapp ||
                    (module.alpha && MODE !== 'beta') ||
                    (module.locales?.length &&
                        !module.locales.includes(window.I18n.locale))
                )
        )
        .map(([moduleId]) => moduleId);

    const setActive = (moduleId: string) => {
        if (modules.hasOwnProperty(moduleId)) modules[moduleId].active = true;
    };

    return {
        modules,
        appstore,
        coreModuleIds,
        noMapkitModuleIds,
        appModuleIds,
        setActive,
    };
});

export const useModulesStore: () => ReturnType<
    typeof defineModulesStore
> = () => (window[PREFIX] as Vue)?.$stores?.modules ?? defineModulesStore();
