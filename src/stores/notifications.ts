import { ref } from 'vue';
// well, we cannot set default type import + non-default non-type import
// eslint-disable-next-line no-duplicate-imports
import type Vue from 'vue';

import { defineStore } from 'pinia';
import { useRootStore } from '@stores/index';

import type { NotificationOptions } from 'vue-notification';

export type NotificationPosition = `${'bottom' | 'top'} ${
    | 'center'
    | 'left'
    | 'right'}`;

export type NotificationType =
    | 'danger'
    | 'info'
    | 'success'
    | 'unimportant'
    | 'warning';

interface ClickHandlerProp<
    Data extends Record<string, unknown> = Record<string, unknown>,
> {
    item: Required<NotificationOptions> & {
        data: Data & {
            icon: string;
            clickHandler?: ClickHandler;
        };
    };
    close(): void;
}

export type ClickHandler<
    AcceptsNullProp extends boolean = false,
    Data extends Record<string, unknown> = Record<string, unknown>,
> = (
    props: AcceptsNullProp extends true ? ClickHandlerProp<Data> | null
    :   ClickHandlerProp<Data>,
    $event: MouseEvent
) => unknown;

interface SendNotificationParam<
    Data extends Record<string, never> = Record<string, never>,
    Desktop extends boolean = boolean,
> {
    group?: NotificationPosition;
    type?: NotificationType;
    title: string;
    text: string;
    icon?: string;
    duration?: number;
    speed?: number;
    data?: Data;
    clean?: boolean;
    ingame?: boolean;
    desktop?: Desktop;
    clickHandler?: ClickHandler<Desktop extends true ? true : false, Data>;
}

const defineNotificationStore = defineStore('notifications', () => {
    const { lssmLogoUrl } = useRootStore();

    const groups = ref<NotificationPosition[]>([]);
    const permission = ref<NotificationPermission>(Notification.permission);

    const addGroup = (group: NotificationPosition) => {
        if (!groups.value.includes(group)) groups.value.push(group);
    };

    const requestDesktopPermission = () => {
        const LSSM = window[PREFIX] as Vue;

        if (permission.value === 'granted') return Promise.resolve();
        if (permission.value === 'denied') {
            sendNotification({
                type: 'danger',
                title: LSSM.$t(
                    'modules.notificationAlert.noPermission.title'
                ).toString(),
                text: LSSM.$t(
                    'modules.notificationAlert.noPermission.text'
                ).toString(),
                icon: lssmLogoUrl,
                duration: -1,
                desktop: false,
            });
            return Promise.resolve();
        }
        return new Promise<void>(resolve => {
            sendNotification({
                title: LSSM.$t(
                    'modules.notificationAlert.permission.title'
                ).toString(),
                text: LSSM.$t(
                    'modules.notificationAlert.permission.text'
                ).toString(),
                icon: lssmLogoUrl,
                duration: -1,
                desktop: false,
                clickHandler: async ({ close }) => {
                    const perm = await Notification.requestPermission();
                    permission.value = perm;
                    if (perm === 'granted') {
                        sendNotification({
                            title: LSSM.$t(
                                'modules.notificationAlert.desktopTest.title'
                            ).toString(),
                            text: LSSM.$t(
                                'modules.notificationAlert.desktopTest.text'
                            ).toString(),
                            icon: lssmLogoUrl,
                        });
                    }
                    close();
                    resolve();
                },
            });
        });
    };

    const sendNotification = <
        Data extends Record<string, never> = Record<string, never>,
        Desktop extends boolean = true,
    >({
        group = 'bottom right',
        type = 'info',
        title,
        text,
        icon = '',
        duration = 8000,
        speed = 300,
        data = {} as Data,
        clean = false,
        ingame = true,
        desktop,
        clickHandler = () => void null,
    }: SendNotificationParam<Data, Desktop>) => {
        if (!groups.value.includes(group)) addGroup(group);

        // send an ingame notification
        if (ingame) {
            const LSSM = window[PREFIX] as Vue;

            LSSM.$nextTick().then(() => {
                LSSM.$notify({
                    group,
                    type,
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
            // get text for this notification
            const titleElement = document.createElement('div');
            titleElement.innerHTML = title;
            const newTitle = titleElement.textContent || '';
            const body = document.createElement('body');
            body.innerHTML = text;
            const desktopText = body.textContent || '';

            requestDesktopPermission().then(() => {
                const notification = new Notification(newTitle, {
                    badge: icon || lssmLogoUrl,
                    body: desktopText,
                    data,
                    icon: icon || lssmLogoUrl,
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
            });
        }
    };

    return { groups, sendNotification };
});

export const useNotificationStore: () => ReturnType<
    typeof defineNotificationStore
> = () =>
    (window[PREFIX] as Vue)?.$stores?.notifications ??
    defineNotificationStore();
