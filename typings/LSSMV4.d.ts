import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { NotificationsState } from './store/notifications/State';

export interface LSSMV4Data {
    id: string;
    faTimes: IconDefinition;
}

export interface LSSMV4Computed {
    notificationGroups: NotificationsState['groups'];
}

export interface LSSMV4Methods {
    getHandler(props: unknown, $event: MouseEvent): () => void;
}
