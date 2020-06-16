export interface VehicleTypes {
    vehicleTypeNames: string[];
    statuses: number[];
    statusHeads: {
        [status: string]: {
            title: string;
        };
    };
    search: string;
    sort: string;
    sortDir: string;
}

export interface VehicleTypesMethods {
    setSort(type: string): void;
}

export interface TypeList {
    [vehicleType: string]: {
        title: string;
        sum: number;
        [status: string]: number | string;
    };
}

export interface VehicleTypesComputed {
    vehicleTypes: TypeList;
    vehicleTypesFiltered: TypeList;
    vehicleTypesSorted: string[];
    sum: {
        [state: number]: number;
    };
}
