import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import VueI18n from 'vue-i18n';

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
    faAngleDoubleLeft: IconDefinition;
    faAngleDoubleRight: IconDefinition;
    faArrowsAlt: IconDefinition;
    faCompressAlt: IconDefinition;
    faExpandAlt: IconDefinition;
    faTable: IconDefinition;
    faParagraph: IconDefinition;
    missingRequirementsSearch: string;
    sort: string;
    sortDir: string;
    requirements: Requirement[];
    overlay: boolean | undefined;
    minified: boolean | undefined;
    textMode: boolean | undefined;
    pushedRight: boolean | undefined;
    hoverTip: boolean;
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
    missingText: string;
}

export interface EnhancedMissingVehiclesComputed {
    missingRequirementsFiltered: Requirement[];
    missingRequirementsSorted: Requirement[];
    missingRequirementsCheck: boolean;
}

export interface EnhancedMissingVehiclesMethods {
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    setSort(s: string): void;
    toggleOverlay(): void;
    toggleMinified(): void;
    toggleTextMode(): void;
    dragStart(e: MouseEvent): void;
    dragEnd(): void;
    dragging(e: MouseEvent): void;
    toggleRight(): void;
}
