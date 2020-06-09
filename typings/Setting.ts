import { ExtendedVue } from 'vue/types/vue';

interface SettingTemplate {
    type: string;
}

interface Toggle extends SettingTemplate {
    default: boolean;
    value: boolean;
}

interface Text extends SettingTemplate {
    default: string;
    value: string;
}

interface AppendableListItem {
    [key: string]: unknown;
}

interface AppendableList extends SettingTemplate {
    default: AppendableListItem[];
    value: AppendableListItem[];
    listItemComponent: ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
    titleComponent: ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
    defaultItem: AppendableListItem;
}

export type Setting = Toggle | Text | AppendableList;

export interface Settings {
    [key: string]: Setting;
}
