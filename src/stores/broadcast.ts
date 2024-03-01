import type Vue from 'vue';

import { defineStore } from 'pinia';
import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';

import type {
    CustomBroadcastMessage,
    GenericBroadcastMessageType,
    NameRequestBroadcastMessage,
} from 'typings/store/broadcast/Broadcast';

const BROADCAST_GETTER_WAITING_TIME = 500;
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
    if (msg.type === 'custom') {
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
        }, BROADCAST_GETTER_WAITING_TIME);
    });
}

export const defineBroadcastStore = defineStore('broadcast', {
    state: () => ({}),
    actions: {
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
    },
});

export const useBroadcastStore: () => ReturnType<
    typeof defineBroadcastStore
> = () => (window[PREFIX] as Vue)?.$stores?.broadcast ?? defineBroadcastStore();
