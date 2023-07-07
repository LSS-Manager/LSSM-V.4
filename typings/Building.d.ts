/**
 * @file - Type definitions for in game buildings & internal buildings (translations).
 */

import type { IconName } from '@fortawesome/free-solid-svg-icons';

type Extension = {
    caption: string;
    enabled: boolean;
    type_id: number;
} & (
    | {
          available: false;
          available_at: string;
      }
    | {
          available: true;
      }
);
interface Storage {
    upgrade_type: string;
    available: boolean;
    type_id: string;
}
interface Specialization {
    caption: string;
    type: string;
    active: boolean;
    available: boolean;
}

export interface Building {
    id: number;
    personal_count: number;
    level: number;
    building_type: number;
    caption: string;
    latitude: number;
    longitude: number;
    extensions: Extension[];
    storage_upgrades: Storage[];
    leitstelle_building_id: number | null;
    small_building: boolean;
    enabled: boolean;
    generate_own_missions: boolean;
    personal_count_target: number;
    hiring_phase: 0 | 1 | 2 | 3;
    hiring_automatic: boolean;
    custom_icon_url?: string;
    is_alliance_shared?: boolean;
    specialization: Specialization[];
    alliance_share_credits_percentage?: 0 | 10 | 20 | 30 | 40 | 50;
    generates_mission_categories: string[];
}

export interface BuildingCategory {
    buildings: number[];
    color: string;
}

export interface ResolvedBuildingCategory {
    color: string;
    buildings: InternalBuilding[];
}

interface BaseExtension {
    caption: string;
    credits: number;
    coins: number;
    duration: string;
    cannotDisable?: true;
    maxExtensionsFunction?(
        buildingsByType?: Record<number, Building[]>
    ): number;
    canBuyByAmount?(
        boughtExtensionsAmountByType: Record<number, Record<number, number>>,
        maxExtensions: number
    ): boolean;
    requiredExtensions?: number[];
    requiredRank?: number;
}

interface VehicleExtension extends BaseExtension {
    isVehicleExtension: true;
    givesParkingLots: number;
    givesParkingLotsPerLevel?: number;
    unlocksVehicleTypes?: number[];
    parkingLotReservations?: number[][];
    giftsVehicles?: number[];
}

interface ClassroomExtension extends BaseExtension {
    newClassrooms: number;
}

interface CellExtension extends BaseExtension {
    newCells: number;
}

interface BedExtension extends BaseExtension {
    newBeds: number;
}

type InternalExtension =
    | BaseExtension
    | BedExtension
    | CellExtension
    | ClassroomExtension
    | VehicleExtension;

interface StorageUpgrade {
    caption: string;
    duration: string;
    credits: number;
    coins: number;
    additionalStorage: number;
    requiredStorageUpgrades?: string[];
}

interface BaseBuilding {
    caption: string;
    color: string;
    credits: number;
    coins: number;
    extensions: (InternalExtension | null)[]; // null if extension is not available
    storageUpgrades?: Record<string, StorageUpgrade>;
    levelPrices: {
        credits: number[];
        coins: number[];
    };
    levelcost: string[];
    maxBuildings: number | string;
    maxLevel: number;
    special: string;
    icon: IconName; // There is unfortunately no way to say "names of free icons only"
    requiredRank?: number;
    maxBuildingsFunction?(buildingsAmountTotal?: number): number;
}

interface CellBuilding extends BaseBuilding {
    startCells: number;
}

interface HospitalBuilding extends BaseBuilding {
    startBeds: number;
}

interface SchoolBuilding extends BaseBuilding {
    startClassrooms: number;
}

interface DispatchCenterBuilding extends BaseBuilding {
    isDispatchCenter: true;
}

interface StagingAreaBuilding extends BaseBuilding {
    isStagingArea: true;
}

type CanHaveVehiclesBuilding<
    BaseBuildingType extends BaseBuilding | InternalBuilding,
> = BaseBuildingType & {
    schoolingTypes: string[];
    startPersonnel: number;
    startVehicles: string[];
    startParkingLots: number;
    startParkingLotReservations?: number[][];
    parkingLotsPerLevel?: number;
};

type BuildingTypes =
    | CellBuilding
    | DispatchCenterBuilding
    | HospitalBuilding
    | SchoolBuilding
    | StagingAreaBuilding;

export type InternalBuilding =
    | BuildingTypes
    | CanHaveVehiclesBuilding<BaseBuilding | BuildingTypes>;
