import { RootState } from '../../typings/store/RootState';
import { ActionTree, Module } from 'vuex';
import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';

const STORAGE_NAME_KEY = `${PREFIX}_windowname`;

const getBCName = (name: string): string => `${PREFIX}_broadcast_${name}`;
const getWindowName = () => sessionStorage.getItem(STORAGE_NAME_KEY) || 'dummy';

const channel = new BroadcastChannel<BroadcastMessageType>(getBCName('main'));
const leader_elector = createLeaderElection(channel);
leader_elector
    .awaitLeadership()
    .then(() => sessionStorage.setItem(STORAGE_NAME_KEY, 'leader'));

console.log(channel);

channel.addEventListener('message', msg => {
    console.log(`channel{${channel.name}}<${channel.type}> received msg:`, msg);
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
    }
});

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

    channel
        .postMessage({
            type: 'var_request',
            sender: getWindowName(),
            receiver: '*',
            data: {
                variablePath: `sessionStorage.${STORAGE_NAME_KEY}`,
            },
        })
        .then(() => {
            window.setTimeout(() => {
                channel.removeEventListener('message', name_receiver_handler);
                sessionStorage.setItem(
                    STORAGE_NAME_KEY,
                    `unnamed_${Math.max(
                        0,
                        ...collected_names
                            .map(n => parseInt(n.replace(/^unnamed_/, '')))
                            .filter(n => !Number.isNaN(n))
                    ) + 1}`
                );
            }, 1000);
        });
}

export default {
    namespaced: true,
    actions: {} as ActionTree<RootState, RootState>,
} as Module<RootState, RootState>;
