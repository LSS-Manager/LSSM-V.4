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
