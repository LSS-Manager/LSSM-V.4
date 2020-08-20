import { Games } from './Game';

interface Browser {
    latest: number;
    supported: number;
}

export interface Config {
    admins: string[];
    browser: {
        [browser: string]: Browser;
    };
    discord: string;
    discord_support: string;
    games: Games;
    github: {
        repo: string;
    };
    modules: {
        'core-modules': string[];
    };
    prefix: string;
    server: string;
}
