import VueI18n from 'vue-i18n';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Mission } from 'typings/Mission';
import cloneDeep from 'lodash/cloneDeep';

export interface VehicleRequirements {
    [vehicle: string]: {
        amount: number;
        caption: string;
        old?: number;
        percentage?: number;
        additionalText?: string;

        // General
        [key: string]: number | string | undefined;
    };
}

export interface MissionHelper {
    faSyncAlt: IconDefinition;
    faAngleDoubleUp: IconDefinition;
    faAngleDoubleDown: IconDefinition;
    faArrowsAlt: IconDefinition;
    faCompressAlt: IconDefinition;
    faExpandAlt: IconDefinition;
    isReloading: boolean;
    isDiyMission: boolean;
    missionSpecs: Mission | undefined;
    maxMissionSpecs: Mission | undefined;
    missionId: number;
    overlay: boolean | undefined;
    minified: boolean | undefined;
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
        };
        chances: {
            normal: boolean;
            100: boolean;
        };
        multifunctionals: {
            [setting: string]: boolean;
        };
        optionalAlternatives: {
            [setting: string]: boolean;
        };
        patients: {
            title: boolean;
            content: boolean;
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
    specialRequirements: string[];
}
export interface MissionHelperMethods {
    $m(
        key: string,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    $mc(
        key: string,
        amount: number,
        args?: {
            [key: string]: unknown;
        }
    ): VueI18n.TranslateResult;
    reloadSpecs(force?: boolean): void;
    getMission(id: number, force: boolean): Promise<Mission | undefined>;
    loadSetting(
        id: string,
        base: { [key: string]: unknown },
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
    getMaxVehicles(
        currentSpecs: MissionHelper['missionSpecs'],
        deep: boolean
    ): void;
}
