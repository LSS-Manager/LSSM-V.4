/**
 * @file - Types for the actions of notification store.
 */

import type { NotificationOptions } from 'vue-notification';
import type { NotificationsState, NotificationType } from './State';

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
    props: AcceptsNullProp extends true
        ? ClickHandlerProp<Data> | null
        : ClickHandlerProp<Data>,
    $event: MouseEvent
) => unknown;

export interface NotificationsSend<
    Data extends Record<string, unknown> = Record<string, unknown>,
    Desktop extends boolean = boolean,
> {
    group?: NotificationsState['groups'][0];
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
