/**
 * @file - Type definitions for the LSSM config file.
 */

import type { Games } from './Game';

interface Browser {
    latest: number;
    supported: number;
    download: string;
}

export interface Config {
    admins: string[];
    browser: Record<string, Browser>;
    discord: {
        invite: string;
        id: string;
        channels: Record<string, string>; // string because are too big for numbers
    };
    games: Games;
    github: {
        repo: string;
    };
    modules: {
        'core-modules': string[];
    };
    loadScript: {
        start: string;
        end: string;
    };
    userscript_latest_update: string;
    prefix: typeof PREFIX;
    urls: {
        server: string;
        docs: string;
        statuspage: string;
        donations: string;
        fontAwesomeIconSearch: string;
    };
}
