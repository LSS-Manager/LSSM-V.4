export interface Game {
    flag: string;
    locale_fallback?: keyof Games;
    name: string;
    shortUrl: string;
}

export interface Games {
    [locale: string]: Game;
}
