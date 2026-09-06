/**
 * @file - Type definitions for a game in LSSM config file.
 */

export interface Game {
    flag: string;
    locale_fallback?: string;
    name: string;
    shortURL: string;
    police?: string;
    noWWW?: boolean;
}

export type Games = Record<string, Game>;
