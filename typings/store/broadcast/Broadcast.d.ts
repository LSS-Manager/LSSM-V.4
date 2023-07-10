/**
 * @file - Types for the broadcast store.
 */

import type { Mission } from 'typings/Mission';
import type { EnsuredAPIGetter, StorageAPIKey } from 'typings/store/api/State';

interface BroadcastMessage<
    Type extends
        | 'api_broadcast'
        | 'api_request'
        | 'api_response'
        | 'custom'
        | 'generic'
        | 'mission_api_broadcast'
        | 'mission_api_request'
        | 'mission_api_response'
        | 'name_request'
        | 'name_response' = 'generic',
    Data extends
        | APIBroadcastData<StorageAPIKey>
        | APIRequestData<StorageAPIKey>
        | APIResponseData<StorageAPIKey>
        | string
        | unknown
        | null = unknown,
> {
    type: Type;
    sender: string;
    receiver: string;
    data: Data;
}

interface APIRequestData<API extends StorageAPIKey> {
    api: API;
}
type APIRequestBroadcastMessage<API extends StorageAPIKey> = BroadcastMessage<
    'api_request',
    APIRequestData<API>
>;

interface APIResponseData<API extends StorageAPIKey> {
    api: API;
    value: EnsuredAPIGetter<API>;
}
type APIResponseBroadcastMessage<API extends StorageAPIKey> = BroadcastMessage<
    'api_response',
    APIResponseData<API>
>;

interface APIBroadcastData<API extends StorageAPIKey> {
    api: API;
    value: EnsuredAPIGetter<API>;
}
type APIBroadcastMessage<API extends StorageAPIKey> = BroadcastMessage<
    'api_broadcast',
    APIBroadcastData<API>
>;

type MissionAPIBroadcastMessage = BroadcastMessage<
    'mission_api_broadcast',
    Record<string, Mission>
>;

type MissionAPIRequestBroadcastMessage = BroadcastMessage<
    'mission_api_request',
    null
>;

interface MissionAPIResponseData {
    missions: Record<string, Mission>;
    lastUpdate: number;
}
type MissionAPIResponseBroadcastMessage = BroadcastMessage<
    'mission_api_response',
    MissionAPIResponseData
>;

type NameRequestBroadcastMessage = BroadcastMessage<'name_request', null>;
type NameResponseBroadcastMessage = BroadcastMessage<'name_response', string>;

type CustomBroadcastMessage<Data> = BroadcastMessage<'custom', Data> & {
    name: string;
    handler: string;
};

type GenericBroadcastMessageType =
    | APIBroadcastMessage<StorageAPIKey>
    | APIRequestBroadcastMessage<StorageAPIKey>
    | APIResponseBroadcastMessage<StorageAPIKey>
    | CustomBroadcastMessage<unknown>
    | MissionAPIBroadcastMessage
    | MissionAPIRequestBroadcastMessage
    | MissionAPIResponseBroadcastMessage
    | NameRequestBroadcastMessage
    | NameResponseBroadcastMessage;
