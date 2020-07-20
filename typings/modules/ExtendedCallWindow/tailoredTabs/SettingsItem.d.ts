interface item {
    name: string;
    vehicleTypes: number[];
}

interface Option {
    value: number;
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
