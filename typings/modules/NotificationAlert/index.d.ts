import type {
    NotificationPosition,
    NotificationType,
} from '@stores/notifications';

export interface NotificationSetting {
    events: string[];
    alertStyle: NotificationType;
    duration: number;
    ingame: boolean;
    desktop: boolean;
    position: NotificationPosition;
}
