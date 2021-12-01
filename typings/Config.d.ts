import { Games } from './Game';

interface Browser {
    latest: number;
    supported: number;
    download: string;
}

export interface Config {
    admins: string[];
    browser: {
        [browser: string]: Browser;
    };
    discord: {
        invite: string;
        id: string;
        channels: Record<string, string>; // string because are to big for numbers
    };
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
