import { Games } from '../Game';
import { returnTypeFunction } from 'typings/helpers';
import { Modules } from '../Module';

export interface RootState {
    readonly prefix: string;
    readonly version: string;
    readonly mode: string;
    readonly lang: string;
    readonly discord: string;
    readonly games: Games;
    readonly server: string;
    readonly hooks: {
        [event: string]: returnTypeFunction;
    };
    readonly mapkit: boolean;
    readonly darkmode: boolean;
    readonly modules: Modules;
    readonly appstore: {
        changes: boolean;
        reload: boolean;
    };
    readonly menuItems: HTMLAnchorElement[];
    readonly styles: {
        styleSheet: HTMLStyleElement | null;
        inserted: boolean;
    };
    readonly fontAwesome: {
        inserted: boolean;
    };
}
