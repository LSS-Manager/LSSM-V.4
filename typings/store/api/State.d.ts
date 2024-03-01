/**
 * @file - Types for the state of API store.
 */

import type { Building } from '../../Building';

export interface StorageAPIs {
    buildings: Building[];
    alliance_buildings: Building[];
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
    lastUpdates: Partial<Record<StorageAPIKey, number>>;
    initialBroadcastUpdateFinished: boolean;
}
