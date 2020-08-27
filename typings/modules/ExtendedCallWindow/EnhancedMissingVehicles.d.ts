import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
    faAngleDoubleUp: IconDefinition;
    faAngleDoubleDown: IconDefinition;
    faArrowsAlt: IconDefinition;
    faCompressAlt: IconDefinition;
    faExpandAlt: IconDefinition;
    missingRequirementsSearch: string;
    sort: string;
    sortDir: string;
    requirements: Requirement[];
    overlay: boolean | undefined;
    minified: boolean | undefined;
    drag: {
        active: boolean;
        top: number;
        left: number;
        offset: {
            x: number;
            y: number;
        };
    };
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
    toggleOverlay(): void;
    toggleMinified(): void;
    dragStart(e: MouseEvent): void;
    dragEnd(): void;
    dragging(e: MouseEvent): void;
}
