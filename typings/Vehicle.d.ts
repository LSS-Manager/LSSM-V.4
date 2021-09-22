import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
    target_type: 'mission' | 'building' | null; // Where the vehicle is currently driving to
    target_id: number | null; // The ID of where the vehicle is currently driving to
    tractive_vehicle_id: number | null;
    faPencilAlt: IconDefinition;
    faUsers: IconDefinition;
    [key: string]:
        | number
        | string
        | null
        | IconDefinition
        | boolean
        | undefined;
}

export interface VehicleCategory {
    color: string;
    vehicles: {
        [group: string]: number[];
    };
}

export interface ResolvedVehicleCategory {
    color: string;
    vehicles: {
        [group: string]: InternalVehicle[];
    };
}

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
    schooling?: string;
    shownSchooling?: string;
    special?: string;
    icon: string;
    [key: string]: string | number | undefined;
}
