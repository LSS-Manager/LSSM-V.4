/**
 * @file - Type definitions used in the in game application.js.
 */

import type { Marker } from 'leaflet';

export interface BuildingMarker extends Marker {
    building_id: number;
}

export interface MissionMarker extends Marker {
    mission_id: number;
    user_id: number;
    vehicle_state: 0 | 1 | 2; // red | yellow | green
    krankentransport: boolean;
    sicherheitswache: boolean;
    involved: true; // why static? idk!
}

export interface POIMarker extends Marker {
    id: number;
}

export interface AllianceChatMessage {
    alliance_admin: string; // Yes, a stringified boolean
    alliance_coadmin: string; // Also a stringified boolean…
    alliance_owner: string; // Also a stringified boolean…
    date: string; // Actually the time (for example: 17:23)
    date_hidden: string; // Datetime in a readable format
    iso_timestamp: string; //Time in ISO-Format
    message: string; // Which is raw HTML
    mission_caption: string;
    mission_id: number;
    user_id: number;
    username: string;
    whisper: number; // The id of whisper-target
}

interface BasicRadioMessage {
    user_id: number;
}

interface VehicleRadioMessage extends BasicRadioMessage {
    type: 'vehicle_fms';
    additionalText: string;
    caption: string;
    fms: number;
    fms_real: number;
    fms_text: string;
    id: number;
    mission_id: number;
    target_building_id: number;
}

interface SicherheitswacheRadioMessage extends BasicRadioMessage {
    type: 'sicherheitswache';
    success: boolean;
    caption: string;
    credits: number;
}

export type RadioMessage = SicherheitswacheRadioMessage | VehicleRadioMessage;

interface MissionMarkerAddBase {
    address: string;
    alliance_id: number | null;
    caption: string;
    captionOld: string;
    date_end: number;
    date_now: number;
    filter_id: string;
    finish_url: string;
    icon: string;
    id: number;
    kt: boolean;
    latitude: number;
    longitude: number;
    live_current_value: number;
    missing_text: string;
    missing_text_short: string;
    patients_count: number;
    prisoners_count: number;
    sw: boolean;
    sw_start_in: number;
    tlat: number | null;
    tlng: number | null;
    tv: number; // target progress
    user_id: number;
    vehicle_state: 0 | 1 | 2; // red | yellow | green
    overlay_index: number | null;
    additive_overlays: string | null;
    pumping_mission_value: number;
    pumping_date_start: number;
    pumping_date_end: number;
}

interface RegularMissionMarkerAdd extends MissionMarkerAddBase {
    mission_type: null;
    mtid: number; // mtid = mission type id
}

interface GenericMissionMarkerAdd extends MissionMarkerAddBase {
    mission_type: keyof MissionGraphicsLookup['generic'];
    mtid: null;
}

export type MissionMarkerAdd =
    | GenericMissionMarkerAdd
    | RegularMissionMarkerAdd;

export type MissionTimer = MissionMarkerAdd & {
    date_end_calc: number;
};

export interface PatientMarkerAdd {
    id: number;
    live_current_value: number;
    miliseconds_by_percent: number;
    missing_text: string | null;
    mission_id: number;
    name: string;
    target_percent: number;
}

export interface PatientMarkerAddCombined {
    mission_id: number;
    count: number;
    untouched: number;
    errors: Record<string, number>;
}

export interface PrisonerMarkerAdd {
    id: number;
    mission_id: number;
    name: string;
}

export interface PatientTimer {
    miliseconds_by_percent: number;
    patient_id: number;
    params: PatientMarkerAdd;
}

export interface ProgressbarTimer {
    $element: JQuery<HTMLDivElement>;
    missionValue: MissionMarkerAdd['pumping_mission_value'];
    startTime: MissionMarkerAdd['pumping_date_start'];
    endTime: MissionMarkerAdd['pumping_date_end'];
}

export interface BuildingMarkerAdd {
    id: number;
    user_id: number;
    name: string;
    longitude: number;
    latitude: number;
    icon: string;
    vgi: number | null; // ID of assigned vehicle graphic set
    lbid: number;
    show_vehicles_at_startpage: boolean;
    level: number;
    personal_count: number;
    building_type: number;
    filter_id: string;
    detail_button: string;
}

export interface MissionGraphicsLookup {
    regular: [string, string, string][]; // red, yellow, green
    generic: Partial<
        Record<'alliance_custom' | 'handoff', [string, string, string]>
    >;
}
