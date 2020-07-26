type NotificationPosition =
    | 'top left'
    | 'top center'
    | 'top right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right';

export interface NotificationsState {
    groups: NotificationPosition[];
    permission: NotificationPermission;
}
