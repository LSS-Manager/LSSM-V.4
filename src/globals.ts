declare const PREFIX: string;
declare const BUILD_LANG: string;

interface FallbackLocales {
    [lang: string]: {
        [key: string]: unknown;
    };
}

declare const FALLBACK_LOCALES: FallbackLocales;
