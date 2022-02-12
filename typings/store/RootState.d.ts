import type { Games } from '../Game';
import type { Modules } from '../Module';
import type { returnTypeFunction } from 'typings/helpers';

export interface RootState {
    readonly prefix: string;
    readonly version: string;
    readonly mode: string;
    readonly lang: string;
    readonly discord: string;
    readonly games: Games;
    readonly server: string;
    readonly fontAwesomeIconSearch: string;
    readonly hooks: Record<string, returnTypeFunction>;
    readonly mapkit: boolean;
    readonly darkmode: boolean;
    readonly premium: boolean;
    readonly policechief: boolean;
    isRegistered: boolean;
    readonly modules: Modules;
    readonly coreModules: string[];
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
    credits: number;
    coins: number;
    osmBars: Record<string, Record<string, HTMLDivElement>>;
}
