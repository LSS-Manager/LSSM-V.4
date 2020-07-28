import { Marker } from 'leaflet';

export interface BuildingMarker extends Marker {
    building_id: number;
}

export interface POIMarker extends Marker {
    id: number;
}

export interface MissionPositionMarkerParam {
    caption: string;
    id: number;
    longitude: number;
    latitude: number;
    icon_path: string;
}

export interface AllianceChatMessage {
    alliance_admin: string; // Yes, a stringified boolean
    alliance_coadmin: string; // Also a stringified boolean…
    date: string; // Actually the time (for example: 17:23)
    date_hidden: string; // Datetime in a readble format
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
