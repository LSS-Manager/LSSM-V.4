import { Vehicle } from 'typings/Vehicle';

export interface LinkPreview {
    icon: string;
    type: string;
    id: number;
    title: string;
    additional: string;
    vehicle: Vehicle | null;
}

export interface LinkPreviewMethods {
    _setIcon(icon?: string): void;
    _setType(type: string): void;
    _setTitle(title: string): void;
    _setId(id: number): void;
    _setAdditional(additional: string): void;

    setVehicle(vehicle: Vehicle): void;
}

export interface LinkPreviewComputed {
    link: string;
}
