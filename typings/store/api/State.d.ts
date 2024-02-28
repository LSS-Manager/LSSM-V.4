/**
 * @file - Types for the state of API store.
 */

import type { Building } from '../../Building';
// import type { SchoolingAPI } from 'typings/api/Schoolings';
import type { Vehicle } from '../../Vehicle';

export interface StorageAPIs {
    buildings: Building[];
    vehicles: Vehicle[];
    alliance_buildings: Building[];
    // schoolings: SchoolingAPI;
    // alliance_schoolings: SchoolingAPI;
}

export type StorageAPIKey = keyof StorageAPIs;

export interface APIGetter<T extends StorageAPIKey> {
    value: StorageAPIs[T] | null;
    lastUpdate: number;
}

export interface EnsuredAPIGetter<API extends StorageAPIKey> {
    value: Exclude<StorageAPIs[API], null>;
    lastUpdate: number;
}

export interface APIState extends StorageAPIs {
    autoUpdates: StorageAPIKey[];
    currentlyUpdating: StorageAPIKey[];
    secretKey: string | null;
    lastUpdates: Partial<Record<StorageAPIKey | 'missions', number>>;
    debounce: {
        vehicles: {
            timeout: number | null;
            updates: Map<
                number, // represents the vehicleID
                {
                    caption: string;
                    fms_show: number;
                    fms_real: number;
                }
            >;
        };
    };
    initialBroadcastUpdateFinished: boolean;
}
