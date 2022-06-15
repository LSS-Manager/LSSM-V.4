import { defineStore } from 'pinia';
import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';
import { useAPIStore } from '@stores/api';

import type {
    APIBroadcastMessage,
    APIRequestBroadcastMessage,
    APIResponseBroadcastMessage,
    CustomBroadcastMessage,
    GenericBroadcastMessageType,
    NameRequestBroadcastMessage,
} from 'typings/store/broadcast/Broadcast';
import type {
    APIGetter,
    EnsuredAPIGetter,
    StorageAPIKey,
} from 'typings/store/api/State';

const STORAGE_NAME_KEY = `${PREFIX}_windowName`;
sessionStorage.removeItem(STORAGE_NAME_KEY);

const getBCName = (name: string): string => `${PREFIX}_broadcast_${name}`;
const getWindowName = () => sessionStorage.getItem(STORAGE_NAME_KEY) || 'dummy';

const channel = new BroadcastChannel<GenericBroadcastMessageType>(
    getBCName('main')
);
const leader_elector = createLeaderElection(channel);
leader_elector
    .awaitLeadership()
    .then(() => sessionStorage.setItem(STORAGE_NAME_KEY, 'leader'));

channel.addEventListener('message', msg => {
    if (msg.receiver !== getWindowName() && msg.receiver !== '*') return;
    if (msg.type === 'api_broadcast') {
        useAPIStore()._setAPI(msg.data.api, msg.data.value);
    } else if (msg.type === 'api_request') {
        const apiStore = useAPIStore();
        const apiValue = apiStore[msg.data.api];
        if (apiValue) {
            sendRequest<APIResponseBroadcastMessage<StorageAPIKey>>(
                'api_response',
                {
                    api: msg.data.api,
                    value: {
                        value: apiValue,
                        lastUpdate: apiStore.lastUpdates[msg.data.api] ?? 0,
                    },
                },
                msg.sender
            ).then();
        }
    } else if (msg.type === 'custom') {
        // TODO: find a better solution than eval
        // eslint-disable-next-line no-eval
        eval(msg.handler)?.(msg);
    }
});

const sendRequest = <T extends GenericBroadcastMessageType>(
    type: T['type'],
    data: T['data'],
    receiver = '*'
) =>
    channel.postMessage({
        type,
        sender: getWindowName(),
        receiver,
        data,
    } as T);

if (getWindowName() !== 'leader') {
    const collected_names = [] as string[];
    const name_receiver_handler = (msg: GenericBroadcastMessageType) =>
        msg.receiver === getWindowName() &&
        msg.type === 'name_response' &&
        collected_names.push(msg.data);
    channel.addEventListener('message', name_receiver_handler);

    sendRequest<NameRequestBroadcastMessage>('name_request', null).then(() => {
        window.setTimeout(() => {
            channel.removeEventListener('message', name_receiver_handler);
            sessionStorage.setItem(
                STORAGE_NAME_KEY,
                `unnamed_${
                    Math.max(
                        0,
                        ...collected_names
                            .map(n =>
                                parseInt(n?.replace(/^unnamed_/u, '') ?? '-1')
                            )
                            .filter(n => !Number.isNaN(n))
                    ) + 1
                }`
            );
        }, 1000);
    });
}

export const useBroadcastStore = defineStore('broadcast', {
    state: () => ({}),
    actions: {
        apiBroadcast<API extends StorageAPIKey>(
            api: API,
            value: EnsuredAPIGetter<API>
        ) {
            return sendRequest<APIBroadcastMessage<API>>('api_broadcast', {
                api,
                value,
            }).then(() => value);
        },
        sendCustomMessage<Data>({
            name,
            handler,
            receiver = '*',
            data,
        }: {
            name: string;
            handler(msg: CustomBroadcastMessage<Data>): void;
            receiver?: string;
            data: Data;
        }) {
            return channel.postMessage({
                type: 'custom',
                sender: getWindowName(),
                receiver,
                name,
                handler: `(${handler
                    .toString()
                    .replace(/^.*?(?=\()/u, 'function')})`,
                data,
            });
        },
        requestAPI<API extends StorageAPIKey>(api: API) {
            return new Promise<APIGetter<API>[]>(resolve => {
                const collected_values: APIGetter<API>[] = [];
                const receiver_handler = (msg: GenericBroadcastMessageType) =>
                    msg.receiver === getWindowName() &&
                    msg.type === 'api_response' &&
                    msg.data.api === api &&
                    collected_values.push(
                        (msg as APIResponseBroadcastMessage<API>).data.value
                    );
                channel.addEventListener('message', receiver_handler);
                sendRequest<APIRequestBroadcastMessage<API>>('api_request', {
                    api,
                }).then(() => {
                    window.setTimeout(() => {
                        channel.removeEventListener(
                            'message',
                            receiver_handler
                        );
                        resolve(collected_values);
                    }, 1000);
                });
            });
        },
    },
});
