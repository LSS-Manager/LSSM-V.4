import { Building } from '../../Building';
import { Vehicle } from '../../Vehicle';
import { Mission } from 'typings/Mission';

export interface StorageAPIs {
    buildings: Building[];
    vehicles: Vehicle[];
    missions: Mission[];
}

export type StorageAPIKey = keyof StorageAPIs;

export type StorageGetterReturn<T extends StorageAPIKey> = {
    value: StorageAPIs[T] | null;
    lastUpdate: number;
};

export interface APIState extends StorageAPIs {
    vehicleStates: {
        [state: number]: number;
    };
    autoUpdates: StorageAPIKey[];
    key: string | null;
    lastUpdates: {
        [key in StorageAPIKey]?: number;
    };
}
