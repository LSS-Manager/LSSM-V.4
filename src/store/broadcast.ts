import { RootState } from '../../typings/store/RootState';
import { ActionTree, Module } from 'vuex';
import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';

const STORAGE_NAME_KEY = `${PREFIX}_windowname`;

const getBCName = (name: string): string => `${PREFIX}_broadcast_${name}`;

const channel = new BroadcastChannel<BroadcastMessageType>(getBCName('main'));
const leader_elector = createLeaderElection(channel);
leader_elector
    .awaitLeadership()
    .then(() => sessionStorage.setItem(STORAGE_NAME_KEY, 'leader'));

channel.addEventListener('message', msg => {
    console.log(`channel{${channel.name}}<${channel.type}> received msg:`, msg);
});

channel
    .postMessage({
        type: 'var_request',
        sender: sessionStorage.getItem(STORAGE_NAME_KEY) || 'dummy',
        receiver: '*',
        data: {
            variablePath: `sessionStorage.${STORAGE_NAME_KEY}`,
        },
    })
    .then();

export default {
    namespaced: true,
    actions: {} as ActionTree<RootState, RootState>,
} as Module<RootState, RootState>;
