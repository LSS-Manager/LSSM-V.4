type NotificationPosition =
    | 'bottom center'
    | 'bottom left'
    | 'bottom right'
    | 'top center'
    | 'top left'
    | 'top right';

export interface NotificationsState {
    groups: NotificationPosition[];
    permission: NotificationPermission;
}
