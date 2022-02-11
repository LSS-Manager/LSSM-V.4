import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Vehicle {
    id: number;
    caption: string;
    building_id: number;
    vehicle_type: number;
    fms_real: number;
    fms_show: number;
    vehicle_type_caption: string | null;
    working_hour_start: number;
    working_hour_end: number;
    alarm_delay: number;
    max_personnel_override: number | null;
    assigned_personnel_count: number;
    ignore_aao: boolean;
    target_type: 'building' | 'mission' | null; // Where the vehicle is currently driving to
    target_id: number | null; // The ID of where the vehicle is currently driving to
    tractive_vehicle_id: number | null;
    queued_mission_id: number | null;
    faPencilAlt: IconDefinition;
    faUsers: IconDefinition;
    [key: string]:
        | IconDefinition
        | boolean
        | number
        | string
        | null
        | undefined;
}

export interface VehicleCategory {
    color: string;
    vehicles: Record<string, number[]>;
}

export interface ResolvedVehicleCategory {
    color: string;
    vehicles: Record<string, InternalVehicle[]>;
}

export type VehicleSchooling = Partial<{
    all: boolean;
    min: number;
}>;

export interface InternalVehicle {
    caption: string;
    color: string;
    coins: number;
    credits: number;
    minPersonnel: number;
    maxPersonnel: number;
    wtank?: number;
    pumpcap?: number;
    ftank?: number;
    schooling?: Record<string, Record<string, VehicleSchooling>>;
    special?: string;
    icon: string;
    possibleBuildings: number[];

    // general
    [key: string]:
        | number[]
        | Record<string, Record<string, VehicleSchooling>>
        | number
        | string
        | undefined;
}
