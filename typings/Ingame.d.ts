import { Marker } from 'leaflet';

export interface BuildingMarker extends Marker {
    building_id: number;
}

export interface POIMarker extends Marker {
    id: number;
}

export interface AllianceChatMessage {
    alliance_admin: string; // Yes, a stringified boolean
    alliance_coadmin: string; // Also a stringified boolean…
    date: string; // Actually the time (for example: 17:23)
    date_hidden: string; // Datetime in a readble format
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

export type RadioMessage = VehicleRadioMessage | SicherheitswacheRadioMessage;

export interface MissionMarkerAdd {
    address: string;
    alliance_id: null | number;
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
    mtid: null | number; // mission type id (null => diy mission)
    patients_count: number;
    prisoners_count: number;
    sw: boolean;
    sw_start_in: number;
    tlat: null | number;
    tlng: null | number;
    tv: number; // target progress
    user_id: number;
    vehicle_state: 0 | 1 | 2; // red | yellow | green
}

export interface MissionTimer extends MissionMarkerAdd {
    date_end_calc: number;
}
