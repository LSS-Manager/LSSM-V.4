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
        permission: Notification.permission,
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
        async getPermission({
            state,
            dispatch,
            commit,
        }: NotificationsActionStoreParams) {
            if (state.permission === 'default') {
                await dispatch('sendNotification', {
                    title: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.permission.title')
                        .toString(),
                    text: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.permission.text')
                        .toString(),
                    icon: lssm_logo.toString(),
                    duration: -1,
                    desktop: false,
                    async clickHandler({ close }: { close(): void }) {
                        const perm = await Notification.requestPermission();
                        commit('setPermission', perm);
                        if (perm === 'granted') {
                            await dispatch('sendNotification', {
                                title: (window[PREFIX] as Vue)
                                    .$t(
                                        'modules.notificationAlert.desktopTest.title'
                                    )
                                    .toString(),
                                text: (window[PREFIX] as Vue)
                                    .$t(
                                        'modules.notificationAlert.desktopTest.text'
                                    )
                                    .toString(),
                                icon: lssm_logo.toString(),
                            });
                        }
                        close();
                    },
                });
            } else if (state.permission === 'denied')
                await dispatch('sendNotification', {
                    type: 'danger',
                    title: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.noPermission.title')
                        .toString(),
                    text: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.noPermission.text')
                        .toString(),
                    icon: lssm_logo.toString(),
                    duration: -1,
                    desktop: false,
                });
        },
        async sendNotification(
            { state, dispatch, commit }: NotificationsActionStoreParams,
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
                clickHandler,
            }: NotificationsSend
        ) {
            if (!group || !group.match(/^(top|bottom)[ _](left|center|right)$/))
                group = 'bottom right';
            if (!state.groups.includes(group)) commit('addGroup', group);
            if (!type || !type.match(/^(warning|danger|success|info)$/))
                type = 'info';
            if (ingame)
                (window[PREFIX] as Vue).$nextTick().then(() => {
                    (window[PREFIX] as Vue).$notify({
                        group: group.replace(/ /g, '_'),
                        type,
                        title,
                        text,
                        duration,
                        speed,
                        data: { icon, clickHandler, ...data },
                        clean,
                    });
                });
            if (desktop) {
                await dispatch('getPermission');
                const notification = new Notification(title, {
                    badge: icon || lssm_logo.toString(),
                    body: text,
                    data,
                    icon: icon || lssm_logo.toString(),
                    requireInteraction: duration <= 0,
                });
                if (clickHandler)
                    notification.onclick = e =>
                        clickHandler(null, e as MouseEvent);
                if (duration > 0)
                    window.setTimeout(() => notification.close(), duration);
            }
        },
    } as ActionTree<NotificationsState, RootState>,
} as Module<NotificationsState, RootState>;
