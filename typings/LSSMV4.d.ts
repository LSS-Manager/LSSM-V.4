import { NotificationsState } from './store/notifications/State';

export interface LSSMV4Data {
    id: string;
}

export interface LSSMV4Computed {
    notificationGroups: NotificationsState['groups'];
}
