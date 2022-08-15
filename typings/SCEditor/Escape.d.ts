/**
 * @file - Types for SCEditor {@link https://www.sceditor.com/}, the WYSIWYG Editor used in game.
 */

export interface Escape {
    regex(str: string): string;
    entities(str: string, noQuotes?: boolean): string;
    uriScheme(url: string): string;
}
