interface item {
    name: string;
    vehicleTypes: string[];
}

interface Option {
    value: string;
    label: string;
}

export interface SettingsItem {
    vehicleTypes: Option[];
}

export interface SettingsItemProps {
    value: item;
}

export interface SettingsItemComputed {
    updateName: item['name'];
    updateTypes: Option[];
    selectableTypes: Option[];
}
