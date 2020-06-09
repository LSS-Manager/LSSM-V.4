import { Games } from './Game';

export interface Module {
    active: boolean;
    location: RegExp | string;
    locales: null | (keyof Games)[];
    collisions: null | (keyof Modules)[];
    noapp: boolean;
    noMapkit: boolean;
    description: string;
}

export interface Modules {
    [moduleId: string]: Module;
}
