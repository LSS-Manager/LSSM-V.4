export interface Escape {
    regex(str: string): string;
    entities(str: string, noQuotes?: boolean): string;
    uriScheme(url: string): string;
}
