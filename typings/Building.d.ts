interface Extension {
    caption: string;
    available: boolean;
    enabled: boolean;
    type_id: number;
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
    leitstelle_building_id: number;
    small_building: boolean;
    enabled: boolean;
    generate_own_missions: boolean;
    personal_count_target: number;
    hiring_phase: 0 | 1 | 2 | 3;
    hiring_automatic: boolean;
    custom_icon_url?: string;
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
    maxExtensionsFunction?(
        buildingsByType?: Record<number, Building[]>
    ): number;
    canBuyByAmount?(
        boughtExtensionsAmountByType: Record<number, Record<number, number>>,
        maxExtensions: number
    ): boolean;
    requiredExtensions?: number[];
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

type InternalExtension =
    | BaseExtension
    | CellExtension
    | ClassroomExtension
    | VehicleExtension;

interface BaseBuilding {
    caption: string;
    color: string;
    credits: number;
    coins: number;
    extensions: (InternalExtension | null)[]; // null if extension is not available
    levelcost: string[];
    maxBuildings: number | string;
    maxLevel: number;
    special: string;
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
    BaseBuildingType extends BaseBuilding | InternalBuilding
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
