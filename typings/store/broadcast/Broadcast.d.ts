/**
 * @file - Types for the broadcast store.
 */

interface BroadcastMessage<
    Type extends
        | 'custom'
        | 'generic'
        | 'name_request'
        | 'name_response' = 'generic',
    Data extends string | unknown | null = unknown,
> {
    type: Type;
    sender: string;
    receiver: string;
    data: Data;
}

export type NameRequestBroadcastMessage = BroadcastMessage<
    'name_request',
    null
>;
type NameResponseBroadcastMessage = BroadcastMessage<'name_response', string>;

export type CustomBroadcastMessage<Data> = BroadcastMessage<'custom', Data> & {
    name: string;
    handler: string;
};

export type GenericBroadcastMessageType =
    | CustomBroadcastMessage<unknown>
    | NameRequestBroadcastMessage
    | NameResponseBroadcastMessage;
