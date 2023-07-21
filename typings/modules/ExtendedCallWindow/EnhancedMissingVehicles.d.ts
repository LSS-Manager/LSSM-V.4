import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type VueI18n from 'vue-i18n';

export interface Requirement {
    missing: number;
    driving: number;
    total: number;
    vehicle: string;
    selected: number | { min: number; max: number };

    // General
    [key: string]: number | string | { min: number; max: number };
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
    id: string;
    collapseBtnId: string;
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
    calcMaxStaff: boolean;
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
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    setSort(s: string): void;
    getSetting<T = boolean>(settingId: string): Promise<T>;
    setSetting<T>(settingId: string, value: T): Promise<T>;
    toggleOverlay(): void;
    toggleMinified(): void;
    toggleTextMode(): void;
    dragStart(e: MouseEvent): void;
    dragEnd(): void;
    dragging(e: MouseEvent): void;
    toggleRight(): void;
}
