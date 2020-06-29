import VueI18n from 'vue-i18n';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Mission } from 'typings/Mission';

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
    isReloading: boolean;
    isDiyMission: boolean;
    missionSpecs: Mission | undefined;
    missionId: number;
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
    };
    noVehicleRequirements: string[];
}

export interface MissionHelperComputed {
    currentPatients: number;
    currentPrisoners: number;
    showPatients: boolean;
    vehicles: VehicleRequirements;
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
    getMission(id: number): Mission | undefined;
}
