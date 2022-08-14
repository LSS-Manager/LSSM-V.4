/**
 * @file - Type definitions for the libraries JSON.
 */

export interface Library {
    url?: string;
    version: string;
    icon?: string;
}

export type Libraries = Record<string, Library>;
