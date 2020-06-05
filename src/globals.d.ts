declare const PREFIX: string;
declare const BUILD_LANG: string;
declare const VERSION: string;
declare const MODE: string;

interface FallbackLocales {
    [lang: string]: {
        [key: string]: unknown;
    };
}

declare const FALLBACK_LOCALES: FallbackLocales;
