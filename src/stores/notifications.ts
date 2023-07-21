import type Vue from 'vue';

import { defineStore } from 'pinia';
import { useRootStore } from '@stores/index';

import type { NotificationsState } from 'typings/store/notifications/State';
import type {
    ClickHandler,
    NotificationsSend,
} from 'typings/store/notifications/Actions';

export const defineNotificationStore = defineStore('notifications', {
    state: () =>
        <NotificationsState>{
            groups: [],
            permission: Notification.permission,
        },
    actions: {
        _addGroup(group: NotificationsState['groups'][0]) {
            if (!this.groups.includes(group)) this.groups.push(group);
        },
        async getPermission() {
            const lssmLogo = useRootStore().lssmLogoUrl;
            if (this.permission === 'granted') return;
            if (this.permission === 'denied') {
                return this.sendNotification({
                    type: 'danger',
                    title: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.noPermission.title')
                        .toString(),
                    text: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.noPermission.text')
                        .toString(),
                    icon: lssmLogo,
                    duration: -1,
                    desktop: false,
                });
            } else {
                return this.sendNotification<Record<string, never>, false>({
                    title: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.permission.title')
                        .toString(),
                    text: (window[PREFIX] as Vue)
                        .$t('modules.notificationAlert.permission.text')
                        .toString(),
                    icon: lssmLogo,
                    duration: -1,
                    desktop: false,
                    clickHandler: async ({ close }) => {
                        const perm = await Notification.requestPermission();
                        this.permission = perm;
                        if (perm === 'granted') {
                            await this.sendNotification({
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
                                icon: lssmLogo,
                            });
                        }
                        close();
                    },
                });
            }
        },
        async sendNotification<
            Data extends Record<string, unknown> = Record<string, unknown>,
            Desktop extends boolean = true,
        >({
            group = 'bottom_right',
            type = 'info',
            title,
            text,
            icon = '',
            duration = 8000,
            speed = 300,
            data,
            clean = false,
            ingame = true,
            desktop,
            clickHandler = () => void null,
        }: NotificationsSend<Data, Desktop>) {
            const normalizedData: Data = data ?? ({} as Data);

            let computedGroup = group;
            let computedType = type;
            if (
                !computedGroup ||
                !computedGroup.match(/^(bottom|top)[ _](center|left|right)$/u)
            )
                computedGroup = 'bottom right';
            if (!this.groups.includes(computedGroup))
                this._addGroup(computedGroup);
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
                        data: { icon, clickHandler, ...normalizedData },
                        clean,
                    });
                });
            }
            if (desktop) {
                const lssmLogo = useRootStore().lssmLogoUrl;
                const titleElement = document.createElement('div');
                titleElement.innerHTML = title;
                const newTitle = titleElement.textContent || '';
                const body = document.createElement('body');
                body.innerHTML = text;
                const desktopText = body.textContent || '';
                await this.getPermission();
                const notification = new Notification(newTitle, {
                    badge: icon || lssmLogo,
                    body: desktopText,
                    data: normalizedData,
                    icon: icon || lssmLogo,
                    requireInteraction: duration <= 0,
                });
                if (clickHandler) {
                    notification.addEventListener('click', e =>
                        (clickHandler as ClickHandler<true, Data>)(
                            null,
                            e as MouseEvent
                        )
                    );
                }
                if (duration > 0)
                    window.setTimeout(() => notification.close(), duration);
            }
        },
    },
});

export const useNotificationStore: () => ReturnType<
    typeof defineNotificationStore
> = () =>
    (window[PREFIX] as Vue)?.$stores?.notifications ??
    defineNotificationStore();
