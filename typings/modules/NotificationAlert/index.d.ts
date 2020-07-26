import { NotificationsState } from 'typings/store/notifications/State';

export interface NotificationSetting {
    events: string[];
    alertStyle: string;
    duration: number;
    ingame: boolean;
    desktop: boolean;
    position: NotificationsState['groups'][0];
}
