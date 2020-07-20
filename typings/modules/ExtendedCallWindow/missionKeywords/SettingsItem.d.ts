interface item {
    keyword: string;
    color: string;
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
    updateMissions: Option[];
    selectableMissions: Option[];
}
