interface Item {
    events: string[];
    alertStyle: string;
    duration: number;
    ingame: boolean;
    desktop: boolean;
}

interface Option<values = string> {
    value: values;
    label: string;
}

export interface SettingsItem {
    eventOptions: Option[];
    styleOptions: Option[];
}

export interface SettingsItemProps {
    value: Item;
}

export interface SettingsItemComputed {
    updateEvents: Option[];
    selectableEvents: Option[];
    updateStyle: Option;
    updateDuration: Item['duration'];
    updateIngame: Item['ingame'];
    updateDesktop: Item['desktop'];
}
