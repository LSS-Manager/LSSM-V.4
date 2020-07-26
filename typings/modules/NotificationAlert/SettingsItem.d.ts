import { NotificationSetting } from '.';

interface Option<values = string> {
    value: values;
    label: string;
}

export interface SettingsItem {
    eventOptions: Option[];
    styleOptions: Option[];
    positionOptions: Option<NotificationSetting['position']>[];
}

export interface SettingsItemProps {
    value: NotificationSetting;
}

export interface SettingsItemComputed {
    updateEvents: Option[];
    selectableEvents: Option[];
    updateStyle: Option;
    updateDuration: NotificationSetting['duration'];
    updateIngame: NotificationSetting['ingame'];
    updateDesktop: NotificationSetting['desktop'];
    updatePosition: Option<NotificationSetting['position']>;
}
