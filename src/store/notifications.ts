import lssm_logo from '../img/lssm_logo';

import type { NotificationsState } from 'typings/store/notifications/State';
import type { RootState } from 'typings/store/RootState';
import type { ActionTree, Module, MutationTree } from 'vuex';
import type {
    NotificationsActionStoreParams,
    NotificationsSend,
} from 'typings/store/notifications/Actions';

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
            } else if (state.permission === 'denied') {
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
            }
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
            let computedGroup = group;
            let computedType = type;
            if (
                !computedGroup ||
                !computedGroup.match(/^(bottom|top)[ _](center|left|right)$/u)
            )
                computedGroup = 'bottom right';
            if (!state.groups.includes(computedGroup))
                commit('addGroup', computedGroup);
            if (
                !computedType ||
                !computedType.match(
                    /^(danger|info|success|unimportant|warning)$/u
                )
            )
                computedType = 'info';
            if (ingame) {
                (window[PREFIX] as Vue).$nextTick().then(() => {
                    (window[PREFIX] as Vue).$notify({
                        group: computedGroup.replace(/ /gu, '_'),
                        type: computedType,
                        title,
                        text,
                        duration,
                        speed,
                        data: { icon, clickHandler, ...data },
                        clean,
                    });
                });
            }
            if (desktop) {
                const titleElement = document.createElement('div');
                titleElement.innerHTML = title;
                const newTitle = titleElement.textContent || '';
                const body = document.createElement('body');
                body.innerHTML = text;
                const desktopText = body.textContent || '';
                await dispatch('getPermission');
                const notification = new Notification(newTitle, {
                    badge: icon || lssm_logo.toString(),
                    body: desktopText,
                    data,
                    icon: icon || lssm_logo.toString(),
                    requireInteraction: duration <= 0,
                });
                if (clickHandler) {
                    notification.addEventListener('click', e =>
                        clickHandler(null, e as MouseEvent)
                    );
                }
                if (duration > 0)
                    window.setTimeout(() => notification.close(), duration);
            }
        },
    } as ActionTree<NotificationsState, RootState>,
} as Module<NotificationsState, RootState>;
