import { Vehicle } from 'typings/Vehicle';
import { Building } from 'typings/Building';

export interface LinkPreview {
    icon: string;
    type: string;
    id: number;
    title: string;
    additional: string;
    mouse: {
        x: number;
        y: number;
    };
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
    show(): void;

    setBuilding(building: Building, icon: string): void;
    setVehicle(vehicle: Vehicle): void;
    setUser(id: number): void;
    setMission(id: number): void;
}

export interface LinkPreviewComputed {
    link: string;
    parent: HTMLElement | null;
}

export interface LinkPreviewProps {
    previewLinkClass: string;
}
