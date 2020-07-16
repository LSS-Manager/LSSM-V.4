interface item {
    name: string;
    vehicleTypes: string[];
}

interface option {
    value: string;
    label: string;
}

export interface SettingsItem {
    vehicleTypes: option[];
}

export interface SettingsItemProps {
    value: item;
}

export interface SettingsItemComputed {
    updateName: item['name'];
    updateTypes: item['vehicleTypes'];
    selectableTypes: option[];
}
