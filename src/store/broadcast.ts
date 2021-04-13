import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';

import { BroadcastActionStoreParams } from 'typings/store/broadcast/Actions';
import { RootState } from '../../typings/store/RootState';
import { ActionTree, Module } from 'vuex';

const STORAGE_NAME_KEY = `${PREFIX}_windowname`;

sessionStorage.removeItem(STORAGE_NAME_KEY);

const getBCName = (name: string): string => `${PREFIX}_broadcast_${name}`;
const getWindowName = () => sessionStorage.getItem(STORAGE_NAME_KEY) || 'dummy';

const channel = new BroadcastChannel<BroadcastMessageType>(getBCName('main'));
const leader_elector = createLeaderElection(channel);
leader_elector
    .awaitLeadership()
    .then(() => sessionStorage.setItem(STORAGE_NAME_KEY, 'leader'));

channel.addEventListener('message', msg => {
    if (msg.receiver !== getWindowName() && msg.receiver !== '*') return;
    if (msg.type === 'var_request') {
        return channel.postMessage({
            type: 'var_response',
            sender: getWindowName(),
            receiver: msg.sender,
            data: {
                variablePath: msg.data.variablePath,
                value: msg.data.variablePath.split('.').reduce(
                    (previousValue, currentValue) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (previousValue || window)[currentValue],
                    window
                ),
            },
        });
    } else if (msg.type === 'vuex_request') {
        let value = msg.data.statePath.split('.').reduce(
            (previousValue, currentValue) =>
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (previousValue || window[PREFIX].$store.state)[currentValue],
            (window[PREFIX] as Vue).$store.state
        );
        if (
            msg.data.statePath.match(
                /^api\.(buildings|vehicles|missions|allianceinfo)$/
            )
        ) {
            const key = msg.data.statePath.match(
                /(buildings|vehicles|missions|allianceinfo)$/
            )?.[0];
            if (!key) return;
            value = {
                value,
                lastUpdate: (window[PREFIX] as Vue).$store.state.api
                    .lastUpdates[key],
                user_id: window.user_id,
            };
        }
        return channel.postMessage({
            type: 'vuex_response',
            sender: getWindowName(),
            receiver: msg.sender,
            data: {
                statePath: msg.data.statePath,
                value,
            },
        });
    } else if (msg.type === 'vuex_broadcast') {
        (window[PREFIX] as Vue).$store.commit(
            msg.data.mutationPath,
            msg.data.payload,
            { root: true }
        );
    } else if (msg.type === 'custom') {
        // eslint-disable-next-line no-eval
        eval(msg.handler)?.(msg);
    }
});

const sendRequest = <T extends BroadcastRequestMessageType>(
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

const broadcast = (data: VuexBroadcastMessage['data']) =>
    channel.postMessage({
        type: 'vuex_broadcast',
        sender: getWindowName(),
        receiver: '*',
        data,
    } as VuexBroadcastMessage);

if (getWindowName() !== 'leader') {
    const collected_names = [] as string[];
    const name_receiver_handler = (msg: BroadcastMessageType) =>
        msg.receiver === getWindowName() &&
        msg.type === 'var_response' &&
        msg.data.variablePath === `sessionStorage.${STORAGE_NAME_KEY}` &&
        collected_names.push(
            (msg as VarResponseBroadcastMessage<string>).data.value
        );
    channel.addEventListener('message', name_receiver_handler);

    sendRequest('var_request', {
        variablePath: `sessionStorage.${STORAGE_NAME_KEY}`,
    }).then(() => {
        window.setTimeout(() => {
            channel.removeEventListener('message', name_receiver_handler);
            sessionStorage.setItem(
                STORAGE_NAME_KEY,
                `unnamed_${Math.max(
                    0,
                    ...collected_names
                        .map(n => parseInt(n?.replace(/^unnamed_/, '') ?? '-1'))
                        .filter(n => !Number.isNaN(n))
                ) + 1}`
            );
        }, 1000);
    });
}

export default {
    namespaced: true,
    actions: {
        broadcast(
            _: BroadcastActionStoreParams,
            { mutationPath, payload }: VuexBroadcastMessage['data']
        ) {
            return broadcast({ mutationPath, payload });
        },
        send_custom_message(
            _: BroadcastActionStoreParams,
            {
                name,
                handler,
                receiver = '*',
                ...data
            }: {
                name: CustomBroadcastMessage['name'];
                handler: CustomBroadcastMessage['handler'];
                receiver: CustomBroadcastMessage['receiver'];
            }
        ) {
            return channel.postMessage({
                type: 'custom',
                sender: getWindowName(),
                receiver,
                name,
                handler: `(${handler.toString()})`,
                ...data,
            } as CustomBroadcastMessage);
        },
        request_var(
            _: BroadcastActionStoreParams,
            {
                variablePath,
                receiver,
            }: VarRequestBroadcastMessage['data'] & { receiver: string }
        ) {
            return new Promise(resolve => {
                const collected_values = [] as unknown[];
                const receiver_handler = (msg: BroadcastMessageType) =>
                    msg.receiver === getWindowName() &&
                    msg.type === 'var_response' &&
                    msg.data.variablePath === variablePath &&
                    collected_values.push(
                        (msg as VarResponseBroadcastMessage<string>).data.value
                    );
                channel.addEventListener('message', receiver_handler);
                sendRequest(
                    'var_request',
                    {
                        variablePath,
                    },
                    receiver
                ).then(() => {
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
        request_state(
            _: BroadcastActionStoreParams,
            {
                statePath,
                receiver,
            }: VuexRequestBroadcastMessage['data'] & { receiver: string }
        ) {
            return new Promise(resolve => {
                const collected_values = [] as unknown[];
                const receiver_handler = (msg: BroadcastMessageType) =>
                    msg.receiver === getWindowName() &&
                    msg.type === 'vuex_response' &&
                    msg.data.statePath === statePath &&
                    collected_values.push(
                        (msg as VuexResponseBroadcastMessage).data.value
                    );
                channel.addEventListener('message', receiver_handler);
                sendRequest(
                    'vuex_request',
                    {
                        statePath,
                    },
                    receiver
                ).then(() => {
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
    } as ActionTree<RootState, RootState>,
} as Module<RootState, RootState>;
