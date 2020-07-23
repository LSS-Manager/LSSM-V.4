import { ActionTree, Module } from 'vuex';
import { NotificationsState } from 'typings/store/notifications/State';
import { RootState } from 'typings/store/RootState';

export default {
    namespaced: true,
    state: {
        groups: [],
    },
    actions: {} as ActionTree<NotificationsState, RootState>,
} as Module<NotificationsState, RootState>;
