export interface Requirement {
    missing: number;
    driving: number;
    total: number;
    vehicle: string;
    selected: number | { min: number; max: number };

    // General
    [key: string]: number | string | { min: number; max: number };
}
