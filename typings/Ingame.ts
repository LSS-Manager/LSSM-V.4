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
