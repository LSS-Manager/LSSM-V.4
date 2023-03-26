/**
 * @file - Type definitions for schooling translations.
 */

export interface Schooling {
    caption: string;
    duration: string;
    staffList: string;
    key: string;

    // general
    [key: string]: string;
}

export type SchoolingsBySchool = Record<string, Schooling[]>;
