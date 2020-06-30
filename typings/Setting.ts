import { ExtendedVue } from 'vue/types/vue';

interface SettingTemplate {
    type: string;
    dependsOn?: string;
    disabled?(settings: ModuleSettings): boolean;
}

interface Toggle extends SettingTemplate {
    default: boolean;
    value: boolean;
}

interface Text extends SettingTemplate {
    default: string;
    value: string;
}

interface Select extends SettingTemplate {
    default: string;
    value: string;
    values: string[];
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

export type Setting = Toggle | Text | AppendableList | Select;

export interface Settings {
    [key: string]: Setting;
}

export interface ModuleSettings {
    [moduleId: string]: Settings;
}
