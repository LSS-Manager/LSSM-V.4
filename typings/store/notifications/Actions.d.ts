import { ActionContext } from 'vuex';
import { NotificationsState } from './State';
import { RootState } from '../RootState';

export type NotificationsActionStoreParams = ActionContext<
    NotificationsState,
    RootState
>;

export interface NotificationsSend {
    group: NotificationsState['groups'][0];
    type: 'warning' | 'danger' | 'success' | 'info';
    title: string;
    text: string;
    icon?: string;
    duration: number;
    speed: number;
    data: {
        [key: string]: unknown;
    };
    clean: boolean;
    ingame: boolean;
    desktop: boolean;
    clickHandler?(props: unknown, event?: MouseEvent): unknown;
}
