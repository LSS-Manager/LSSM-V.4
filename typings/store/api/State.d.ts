import { Building } from '../../Building';
import { Vehicle } from '../../Vehicle';
import { Mission } from 'typings/Mission';
import { AllianceInfo } from 'typings/api/AllianceInfo';

export interface StorageAPIs {
    buildings: Building[];
    vehicles: Vehicle[];
    missions: Mission[];
    // eslint-disable-next-line @typescript-eslint/ban-types
    allianceinfo: AllianceInfo | {};
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
    currentlyUpdating: StorageAPIKey[];
    key: string | null;
    lastUpdates: {
        [key in StorageAPIKey]?: number;
    };
}
