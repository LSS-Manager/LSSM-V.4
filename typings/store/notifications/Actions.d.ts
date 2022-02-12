import type { ActionContext } from 'vuex';
import type { NotificationsState } from './State';
import type { RootState } from '../RootState';

export type NotificationsActionStoreParams = ActionContext<
    NotificationsState,
    RootState
>;

export interface NotificationsSend {
    group: NotificationsState['groups'][0];
    type: 'danger' | 'info' | 'success' | 'unimportant' | 'warning';
    title: string;
    text: string;
    icon?: string;
    duration: number;
    speed: number;
    data: Record<string, unknown>;
    clean: boolean;
    ingame: boolean;
    desktop: boolean;
    clickHandler?(props: unknown, event?: MouseEvent): unknown;
}
