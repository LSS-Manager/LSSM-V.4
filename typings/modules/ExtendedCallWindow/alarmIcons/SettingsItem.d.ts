interface item {
    icon: string;
    type: 'fas' | 'far' | 'fab';
    vehicleTypes: (number | string)[];
}

interface Option<value = number> {
    value: value;
    label: string;
}

export interface SettingsItem {
    vehicleTypes: Option[];
    styles: Option<string>[];
}

export interface SettingsItemProps {
    value: item;
}

export interface SettingsItemComputed {
    updateIcon: item['icon'];
    updateType: Option<string>;
    updateTypes: Option[];
    selectableTypes: Option[];
}
