/**
 * @file - Type definitions for in game vehicles & internal vehicles (translations).
 */

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { IconName } from '@fortawesome/free-solid-svg-icons';

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
    equipments: Equipments[]; // Equipment only visible when the car is approaching and the RCs are assigned.
    assigned_equipments: AEquipments[]; // Equipment only visible when the car is approaching and the RCs are assigned.
    faPencilAlt: IconDefinition;
    faUsers: IconDefinition;
}
interface Equipments {
    // Only visible when the car is approaching and the RCs are assigned.
    equipment_type: string;
    size: number; // Only in V2
    caption: string; //Only in V2
    id: number;
}
interface AEquipments {
    // Only visible when the car is approaching and the RCs are assigned.
    equipment_type: string;
    id: number;
}
export interface VehicleCategory {
    color: string;
    vehicles: Record<string, number[]>;
}

interface captionedVehicleSchooling extends VehicleSchooling {
    caption: string;
}

export interface ResolvedVehicleCategory {
    color: string;
    vehicles: Record<
        string,
        (InternalVehicle & {
            staff: BaseVehicle['staff'] & {
                training: Record<
                    string,
                    Record<string, captionedVehicleSchooling>
                >;
            };
        })[]
    >;
}

export type VehicleSchooling = Partial<{
    all: boolean;
    min: number;
}>;

interface BaseVehicle {
    caption: string;
    color: string;
    credits: number;
    coins: number;
    staff: {
        min: number;
        max: number;
        training?: Record<string, Record<string, VehicleSchooling>>;
    };
    icon: IconName;
    possibleBuildings: number[];

    // tank
    waterTank?: number;
    foamTank?: number;

    // bonus on water or foam
    waterBonus?: number;
    foamBonus?: number;

    // equipment
    equipmentCapacity?: number;

    // special information, freetext
    special?: string;
}

interface BackwardsCompatibilityAttributes {
    minPersonnel: number;
    maxPersonnel: number;
    wtank?: number;
    pumpcap?: number;
    ftank?: number;
    schooling?: Record<string, Record<string, VehicleSchooling>>;
}

type TrailerVehicleAttributes =
    | {
          isTrailer: true;
          tractiveVehicles: number[];
      }
    | {
          isTrailer?: false;
      };

type PumpVehicleAttributes =
    | {
          pumpCapacity: number;
          pumpType: 'fire' | 'sewage'; // Feuerlöschpumpe | Schmutzwasserpumpe
      }
    | { pumpCapacity?: null };

export type InternalVehicle = BaseVehicle &
    PumpVehicleAttributes &
    TrailerVehicleAttributes;

export type BackwardsCompatibilityVehicle = BackwardsCompatibilityAttributes &
    InternalVehicle;
