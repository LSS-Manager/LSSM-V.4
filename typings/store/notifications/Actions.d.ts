import { RootState } from '../RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';
import { NotificationsState } from './State';

export interface NotificationsActionStoreParams {
    state: NotificationsState;
    rootState: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<NotificationsState, RootState>;
    rootGetters: GetterTree<RootState, RootState>;
}

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
}
