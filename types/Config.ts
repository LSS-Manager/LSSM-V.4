import { Games } from './games/Game';

export interface Config {
    admins: string[];
    discord: string;
    discord_support: string;
    games: Games;
    github: {
        repo: string;
    };
    modules: {
        'core-modules': string[];
    };
    server: string;
}
