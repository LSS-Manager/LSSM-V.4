import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Mission } from 'typings/Mission';
import type { ModuleMainFunction } from 'typings/Module';
import type { useAPIStore } from '@stores/api';

export type VehicleRequirements = Record<
    string,
    {
        amount: number;
        caption: string;
        old?: number;
        percentage?: number;
        additionalText?: string;

        // General
        [key: string]: number | string | undefined;
    }
>;

export interface MissionHelper {
    faSyncAlt: IconDefinition;
    faAngleDoubleUp: IconDefinition;
    faAngleDoubleDown: IconDefinition;
    faArrowsAlt: IconDefinition;
    faCompressAlt: IconDefinition;
    faExpandAlt: IconDefinition;
    faSuperscript: IconDefinition;
    faSubscript: IconDefinition;
    id: string;
    collapseBtnId: string;
    isReloading: boolean;
    isDiyMission: boolean;
    missionSpecs: Mission | undefined;
    maxMissionSpecs: Mission | undefined;
    maxMissionToggleCache: Mission | undefined;
    maxState: boolean;
    missionId: number;
    overlay: boolean | undefined;
    minified: boolean | undefined;
    apiStore: ReturnType<typeof useAPIStore>;
    settings: {
        title: boolean;
        id: boolean;
        type: boolean;
        prerequisites: boolean;
        place: boolean;
        vehicles: {
            title: boolean;
            content: boolean;
            patient_additionals: boolean;
            sort: string;
            sortDesc: boolean;
            xAfterNumber: boolean;
        };
        chances: {
            normal: boolean;
            100: boolean;
        };
        multifunctionals: Record<string, boolean>;
        optionalAlternatives: Record<string, boolean>;
        patients: {
            title: boolean;
            content: boolean;
            critical_care: boolean;
            code_possible: boolean;
            live: boolean;
            hideWhenNoNeed: boolean;
            patient_allow_first_responder_chance: boolean;
        };
        prisoners: {
            title: boolean;
            content: boolean;
            live: boolean;
        };
        generatedBy: boolean;
        credits: boolean;
        expansions: boolean;
        followup: boolean;
        k9_only_if_needed: boolean;
        bucket_only_if_needed: boolean;
        max_civil_patrol_replace_police_cars: boolean;
        noVehicleRequirements: string[];
        hoverTip: boolean;

        // General
        [key: string]: boolean | unknown;
    };
    noVehicleRequirements: string[];
    drag: {
        active: boolean;
        top: number;
        right: number;
        offset: {
            x: number;
            y: number;
        };
    };
}

export interface MissionHelperComputed {
    currentPatients: number;
    currentPrisoners: number;
    showPatients: boolean;
    vehicles: VehicleRequirements;
    specialRequirements: { badge: string[]; nonbadge: string[] };
}
export interface MissionHelperMethods {
    reloadSpecs(force?: boolean): void;
    getMission(id: string): Promise<Mission | undefined>;
    loadSetting(
        id: string,
        base: Record<string, unknown>,
        base_string?: string
    ): void;
    toggleOverlay(): void;
    toggleMinified(): void;
    dragStart(e: MouseEvent): void;
    dragEnd(): void;
    dragging(e: MouseEvent): void;
    getVehicles(
        missionSpecs: MissionHelper['missionSpecs'],
        isMaxReq: boolean
    ): VehicleRequirements;
    getMaxVehicles(currentSpecs: MissionHelper['missionSpecs']): void;
    toggleMaximum(): void;
}

export interface MissionHelperProps {
    $m: Parameters<ModuleMainFunction>[0]['$m'];
    $mc: Parameters<ModuleMainFunction>[0]['$mc'];
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'];
    setSetting: Parameters<ModuleMainFunction>[0]['setSetting'];
}
