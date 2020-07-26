import { ActionTree, Module, MutationTree } from 'vuex';
import { NotificationsState } from 'typings/store/notifications/State';
import { RootState } from 'typings/store/RootState';
import {
    NotificationsActionStoreParams,
    NotificationsSend,
} from 'typings/store/notifications/Actions';
import lssm_logo from '../img/lssm_logo';

export default {
    namespaced: true,
    state: {
        groups: [],
        permission: 'default',
    },
    mutations: {
        addGroup(
            state: NotificationsState,
            group: NotificationsState['groups'][0]
        ) {
            if (!state.groups.includes(group)) state.groups.push(group);
        },
        setPermission(
            state: NotificationsState,
            permission: NotificationsState['permission']
        ) {
            state.permission = permission;
        },
    } as MutationTree<NotificationsState>,
    actions: {
        async sendNotification(
            { state, commit }: NotificationsActionStoreParams,
            {
                group,
                type,
                title,
                text,
                icon,
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
            if (!type || !type.match(/^(warning|danger|success|info)$/))
                type = 'info';
            if (icon) data = { icon, ...data };
            if (ingame)
                (window[PREFIX] as Vue).$nextTick().then(() => {
                    (window[PREFIX] as Vue).$notify({
                        group: group.replace(/ /g, '_'),
                        type,
                        title,
                        text,
                        duration,
                        speed,
                        data: { icon, ...data },
                        clean,
                    });
                });
            if (desktop) {
                if (state.permission !== 'granted') {
                    const perm = await Notification.requestPermission();
                    commit('setPermission', perm);
                    if (perm !== 'granted') return;
                    new Notification(
                        (window[PREFIX] as Vue)
                            .$t('modules.notificationAlert.initializing')
                            .toString(),
                        {
                            badge: lssm_logo.toString(),
                            body: (window[PREFIX] as Vue)
                                .$t('modules.notificationAlert.initialized')
                                .toString(),
                            icon: lssm_logo.toString(),
                        }
                    );
                }

                new Notification(title);
            }
        },
    } as ActionTree<NotificationsState, RootState>,
} as Module<NotificationsState, RootState>;
