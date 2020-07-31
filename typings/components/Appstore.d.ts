import { Modules } from '../Module';
import VueI18n from 'vue-i18n';

export interface AppstoreData {
    modules: Modules;
    modulesSorted: string[];
    activeStart: string[];
    moduleSearch: string;
}

export interface AppstoreComputed {
    active: string[];
    changes: boolean;
    modulesFiltered: string[];
}

export interface AppstoreMethods {
    hasMapkitConflict(moduleId: string): boolean;
    toggleModule(moduleId: string, event: { value: boolean }): void;
    save(): void;
    reset(): void;
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
}
