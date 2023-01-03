import type { Modules } from '../Module';
import type { useModulesStore } from '@stores/modules';
import type { useRootStore } from '@stores/index';
import type VueI18n from 'vue-i18n';

export interface AppstoreData {
    modules: Modules;
    activeStart: string[];
    moduleSearch: string;
    moduleStore: ReturnType<typeof useModulesStore>;
    rootStore: ReturnType<typeof useRootStore>;
}

export interface AppstoreComputed {
    active: string[];
    changes: boolean;
    modulesSorted: string[];
    modulesFiltered: string[];
}

export interface AppstoreMethods {
    hasMapkitConflict(moduleId: string): boolean;
    toggleModule(moduleId: string, event: { value: boolean }): void;
    save(): void;
    reset(): void;
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
}
