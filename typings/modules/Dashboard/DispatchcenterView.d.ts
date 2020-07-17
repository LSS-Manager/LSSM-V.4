import { Building, InternalBuilding } from 'typings/Building';
import { Vehicle } from 'typings/Vehicle';

interface Title {
    id?: string;
    title?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

interface Column {
    building?: number;
    id?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

interface BuildingSelection {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

interface Board {
    id: string;
    title: string;
    columns: Column[];
    buildingTypes: number[];
    dispatchBuildings: number[];
    buildingSelection: BuildingSelection;
    titles: Title[];
}

export interface DispatchcenterView {
    buildings: Building[];
    selectedBuilding: number | null;
    boards: Board[];
    buildingLimit: number;
    buildingListOffset: number;
    buildingListSearch: string;
    newBoardTitle: string;
    buildingTypes: InternalBuilding[];
    currentBoard: number;
    vehiclesByBuilding: {
        [building: number]: Vehicle[];
    };
    vehicleBuildings: {
        type: number;
        caption: string;
    }[];
    dispatchBuildings: Building[];
}

export interface DispatchcenterViewComputed {
    board: Board;
    columns: Column[];
    buildingSelection: BuildingSelection;
    buildingsById: {
        [id: number]: Building;
    };
    buildingList: Building[];
    buildingListFiltered: Building[];
    buildingListHasPrevPage: boolean;
    buildingListHasNextPage: boolean;
}

interface MoveBoard {
    id: string;
    y: number;
}

interface Selection {
    width: number;
    x: number;
    y: number;
}

export interface DispatchcenterViewMethods {
    moveBoard(moving: MoveBoard): void;
    setBoardName(id: number): void;
    addBoard(): void;
    removeBoard(id: number): void;
    addColumn(): void;
    bulkAddColumn(): void;
    removeBuilding(id: number): void;
    removeTitle(id: string): void;
    modifyBuilding(building: Column): void;
    modifyTitle(building: Title): void;
    saveBoards(): void;
    saveSelection(slection: Selection): void;
    switchTab(): void;
}
