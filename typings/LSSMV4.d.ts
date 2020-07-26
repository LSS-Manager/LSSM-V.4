import { NotificationsState } from './store/notifications/State';

export interface LSSMV4Data {
    id: string;
}

export interface LSSMV4Computed {
    notificationGroups: NotificationsState['groups'];
}

export interface LSSMV4Methods {
    getHandler(props: unknown, $event: MouseEvent): () => void;
}
