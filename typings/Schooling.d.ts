export interface Schooling {
    caption: string;
    needed_for: string[];
    duration: string;

    // general
    [key: string]: 
        | string
        | string[];
}
