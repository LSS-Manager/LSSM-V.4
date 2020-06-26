export interface Library {
    url?: string;
    version: string;
    icon?: string;
}

export interface Libraries {
    [module: string]: Library;
}
