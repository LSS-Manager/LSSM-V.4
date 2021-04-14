import { AllianceInfo } from 'typings/api/AllianceInfo';
import { Building } from '../../Building';
import { CreditsInfo } from 'typings/api/Credits';
import { Mission } from 'typings/Mission';
import { Settings } from 'typings/api/Settings';
import { Vehicle } from '../../Vehicle';

export interface StorageAPIs {
    buildings: Building[];
    vehicles: Vehicle[];
    missions: Mission[];
    // eslint-disable-next-line @typescript-eslint/ban-types
    allianceinfo: AllianceInfo | {};
    // eslint-disable-next-line @typescript-eslint/ban-types
    settings: Settings | {};
    // eslint-disable-next-line @typescript-eslint/ban-types
    credits: CreditsInfo | {};
}

export type StorageAPIKey = keyof StorageAPIs;

export type StorageGetterReturn<T extends StorageAPIKey> = {
    value: StorageAPIs[T] | null;
    lastUpdate: number;
    user_id: number;
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
