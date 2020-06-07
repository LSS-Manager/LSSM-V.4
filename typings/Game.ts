export interface Game {
    flag: string;
    locale_fallback?: keyof Games;
    name: string;
    shortURL: string;
}

export interface Games {
    [locale: string]: Game;
}
