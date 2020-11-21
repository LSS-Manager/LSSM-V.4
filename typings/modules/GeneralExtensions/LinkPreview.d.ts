import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { InternalVehicle, Vehicle } from 'typings/Vehicle';
import { Building } from 'typings/Building';

export interface LinkPreview {
    faParking: IconDefinition;
    faCar: IconDefinition;
    faUsers: IconDefinition;
    faProcedures: IconDefinition;
    faChalkboardTeacher: IconDefinition;
    faBorderAll: IconDefinition;
    icon: string;
    type: string;
    id: number;
    title: string;
    additional: string;
    mouse: {
        x: number;
        y: number;
    };
    vehicleTypes: { [id: number]: InternalVehicle };
    vehicleBuildings: number[];
    cellBuildings: number[];
    cellExtensions: string[];
    bedBuildings: number[];
    schoolBuildings: number[];
    building: Building | null;
    vehicle: Vehicle | null;
}

export interface LinkPreviewMethods {
    _resetAll(): void;
    _setIcon(icon?: string): void;
    _setType(type: string): void;
    _setTitle(title: string): void;
    _setId(id: number): void;
    _setAdditional(additional: string): void;

    setMousePosition(x: number, y: number): void;

    setBuilding(building: Building, icon: string): void;
    setVehicle(vehicle: Vehicle): void;
    setUser(id: number): void;
    setMission(id: number): void;
}

export interface LinkPreviewComputed {
    link: string;
    parent: HTMLElement | null;
    buildings: Building[];
    vehicles: { [buildingId: number]: Vehicle[] };
    buildingVehicles: Vehicle[];
    buildingCells: number[];
}

export interface LinkPreviewProps {
    previewLinkClass: string;
}
