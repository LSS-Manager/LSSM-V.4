interface item {
    name: string;
    vehicleTypes: number[];
}

export interface SettingsItemProps {
    value: item;
}

export interface SettingsItemComputed {
    updateName: item['name'];
    updateTypes: item['vehicleTypes'];
}
