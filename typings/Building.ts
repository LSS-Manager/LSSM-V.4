interface Extension {
    caption: string;
    available: boolean;
    enabled: boolean;
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
}

export interface BuildingCategory {
    buildings: number[];
    color: string;
}

export interface ResolvedBuildingCategory {
    color: string;
    buildings: InternalBuilding[];
}

interface InternalExtension {
    caption: string;
    credits: number;
    coins: number;
    duration: number;
}

export interface InternalBuilding {
    caption: string;
    color: string;
    coins: number;
    credits: number;
    extensions: InternalExtension[];
    levelcost: string[];
    maxBuildings: number | string;
    maxLevel: number;
    special: string;
    startPersonnel: number;
    startVehicles: string[];
    [key: string]: string | number | string[] | InternalExtension[];
}
