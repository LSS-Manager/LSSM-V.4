import { Modules } from '../Module';

export interface AppstoreData {
    modules: Modules;
    modulesSorted: (keyof Modules)[];
    activeStart: (keyof Modules)[];
    active: (keyof Modules)[];
    moduleSearch: string;
}
