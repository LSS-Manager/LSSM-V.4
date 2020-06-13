import { Marker } from 'leaflet';

export interface BuildingMarker extends Marker {
    building_id: number;
}
