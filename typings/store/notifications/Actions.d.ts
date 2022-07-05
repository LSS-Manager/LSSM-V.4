import type { NotificationsState, NotificationType } from './State';

export interface NotificationsSend {
    group?: NotificationsState['groups'][0];
    type?: NotificationType;
    title: string;
    text: string;
    icon?: string;
    duration?: number;
    speed?: number;
    data?: Record<string, unknown>;
    clean?: boolean;
    ingame?: boolean;
    desktop?: boolean;
    clickHandler?(props: unknown, event?: MouseEvent): unknown;
}
