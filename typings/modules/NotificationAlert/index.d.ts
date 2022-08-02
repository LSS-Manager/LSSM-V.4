import type {
    NotificationsState,
    NotificationType,
} from 'typings/store/notifications/State';

export interface NotificationSetting {
    events: string[];
    alertStyle: NotificationType;
    duration: number;
    ingame: boolean;
    desktop: boolean;
    position: NotificationsState['groups'][0];
}
