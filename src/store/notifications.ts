import { ActionTree, Module, MutationTree } from 'vuex';
import { NotificationsState } from 'typings/store/notifications/State';
import { RootState } from 'typings/store/RootState';
import {
    NotificationsActionStoreParams,
    NotificationsSend,
} from 'typings/store/notifications/Actions';

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
    actions: {
        sendNotification(
            { state, commit }: NotificationsActionStoreParams,
            {
                group,
                type,
                title,
                text,
                duration = 8000,
                speed = 300,
                data = {},
                clean = false,
                ingame = true,
                desktop = true,
            }: NotificationsSend
        ) {
            if (!group || !group.match(/^(top|bottom)[ _](left|center|right)$/))
                group = 'bottom right';
            if (!state.groups.includes(group)) commit('addGroup', group);
            if (!type || type.match(/^warn|error|success$/)) type = 'success';
            if (ingame)
                (window[PREFIX] as Vue).$nextTick().then(() => {
                    (window[PREFIX] as Vue).$notify({
                        group: group.replace(/ /g, '_'),
                        type,
                        title,
                        text,
                        duration,
                        speed,
                        data,
                        clean,
                    });
                });
        },
    } as ActionTree<NotificationsState, RootState>,
} as Module<NotificationsState, RootState>;
