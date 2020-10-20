interface item {
    keyword: string;
    color: string;
    prefix: boolean;
    missions: number[];
}

interface Option {
    value: number;
    label: string;
}

export interface SettingsItem {
    missions: Option[];
}

export interface SettingsItemProps {
    value: item;
}

export interface SettingsItemComputed {
    updateName: item['keyword'];
    updateColor: item['color'];
    updatePrefix: item['prefix'];
    updateMissions: Option[];
    selectableMissions: Option[];
}
