export interface Requirement {
    missing: number;
    driving: number;
    total: number;
    vehicle: string;
    selected: number;

    // General
    [key: string]: number | string;
}

export interface EnhancedMissingVehicles {
    missingRequirementsSearch: string;
    sort: string;
    sortDir: string;
    requirements: Requirement[];
}

export interface EnhancedMissingVehiclesProps {
    missingRequirements: Requirement[];
    extras: string;
}

export interface EnhancedMissingVehiclesComputed {
    missingRequirementsFiltered: Requirement[];
    missingRequirementsSorted: Requirement[];
}

export interface EnhancedMissingVehiclesMethods {
    setSort(s: string): void;
}
