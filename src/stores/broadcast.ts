import type Vue from 'vue';

import { defineStore } from 'pinia';
import { useConsoleStore } from '@stores/console';
import { TypedMultiWorker, type WorkerSelf } from '@workers/TypedWorker';

// a message as it is sent between windows
interface BroadcastEnvelope {
    // the id of the sending window, so that it does not handle its own messages
    sender: string;
    data: unknown;
}

type BroadcastEvents = Record<`message:${string}`, BroadcastEnvelope>;

type Self = WorkerSelf<
    Record<never, never>,
    Record<never, never>,
    BroadcastEvents
>;

// CAVEAT: Each method is stringified (see TypedWorker), so it must not reference anything outside its own body!
const methods = {
    send: (self: Self, name: string, envelope: BroadcastEnvelope) =>
        self.publish(`message:${name}`, envelope),
};

// relays messages between all windows of the same user
const BroadcastWorker = new TypedMultiWorker<
    Record<never, never>,
    typeof methods,
    BroadcastEvents
>('broadcast', methods, {});

// identifies this window, so that it ignores its own messages
const windowId = crypto.randomUUID();
const handlers = new Map<string, Set<(data: unknown) => void>>();
const subscribedNames = new Set<string>();

/**
 * Calls the handlers of this window for a message sent by another window.
 * @param name - The name of the message.
 * @param envelope - The message.
 */
const deliver = (name: string, { sender, data }: BroadcastEnvelope) => {
    if (sender === windowId) return;
    handlers.get(name)?.forEach(handler => {
        try {
            handler(data);
        } catch (error) {
            useConsoleStore().error({
                messages: [`Handler of broadcast ${name} threw:`, error],
            });
        }
    });
};

// without a SharedWorker, messages are sent via a BroadcastChannel
let channel: BroadcastChannel | null = null;
let transport: Promise<boolean> | null = null;

/**
 * Decides once how messages are sent: via the SharedWorker if available, otherwise via a BroadcastChannel.
 * @returns A promise that resolves to true if the SharedWorker is used.
 */
const getTransport = () => {
    transport ??= BroadcastWorker.isShared().then(shared => {
        if (shared) return true;
        channel = new BroadcastChannel(`${PREFIX}_broadcast`);
        channel.addEventListener(
            'message',
            ({
                data,
            }: MessageEvent<{ name: string; envelope: BroadcastEnvelope }>) =>
                deliver(data.name, data.envelope)
        );
        return false;
    });
    return transport;
};

export const defineBroadcastStore = defineStore('broadcast', {
    state: () => ({}),
    actions: {
        /**
         * Sends a message to all other windows of this user.
         * Windows handle it if they have registered a handler for its name via `on`.
         * @param name - The name of the message.
         * @param data - The data of the message. It must be cloneable.
         * @returns A promise that resolves once the message has been sent.
         */
        send<Data>(name: string, data: Data) {
            const envelope: BroadcastEnvelope = { sender: windowId, data };
            return getTransport().then(shared =>
                shared
                    ? BroadcastWorker.call('send', name, envelope)
                    : channel?.postMessage({ name, envelope })
            );
        },
        /**
         * Handles messages with the given name that other windows send.
         * @param name - The name of the message.
         * @param handler - The function called with the data of each message.
         * @returns A function to stop handling these messages.
         */
        on<Data>(name: string, handler: (data: Data) => void) {
            const nameHandlers = handlers.get(name) ?? new Set();
            nameHandlers.add(handler as (data: unknown) => void);
            handlers.set(name, nameHandlers);

            if (!subscribedNames.has(name)) {
                subscribedNames.add(name);
                getTransport().then(shared => {
                    if (shared) {
                        BroadcastWorker.subscribe(`message:${name}`, envelope =>
                            deliver(name, envelope)
                        );
                    }
                });
            }

            return () => {
                nameHandlers.delete(handler as (data: unknown) => void);
            };
        },
    },
});

export const useBroadcastStore: () => ReturnType<
    typeof defineBroadcastStore
> = () => (window[PREFIX] as Vue)?.$stores?.broadcast ?? defineBroadcastStore();
