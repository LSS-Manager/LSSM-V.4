import { ActionTree, Module, MutationTree } from 'vuex';
import { NotificationsState } from 'typings/store/notifications/State';
import { RootState } from 'typings/store/RootState';

export default {
    namespaced: true,
    state: {
        groups: [],
    },
    mutations: {
        addGroup(
            state: NotificationsState,
            group: NotificationsState['groups'][0]
        ) {
            if (!state.groups.includes(group)) state.groups.push(group);
        },
    } as MutationTree<NotificationsState>,
    actions: {} as ActionTree<NotificationsState, RootState>,
} as Module<NotificationsState, RootState>;
