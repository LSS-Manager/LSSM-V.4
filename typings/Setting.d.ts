import { ExtendedVue } from 'vue/types/vue';

interface SettingTemplate {
    type: string;
    dependsOn?: string;
    noMapkit?: boolean;
    disabled?(): boolean;
    disabled?(settings: ModuleSettings): boolean;

    // Will be generated in Settings
    isDisabled: boolean;
}

interface Toggle extends SettingTemplate {
    type: 'toggle';
    default: boolean;
    value: boolean;
}

interface Text extends SettingTemplate {
    type: 'text';
    default: string;
    value: string;
}

interface Color extends SettingTemplate {
    type: 'color';
    default: string;
    value: string;
}

interface NumberInput extends SettingTemplate {
    type: 'number';
    default: number;
    value: number;
    min?: number;
    max?: number;
    step?: number;
}

interface Select extends SettingTemplate {
    type: 'select';
    default: string;
    value: string;
    values: string[];
    noLabelTranslation?: boolean;
}
interface MultiSelect extends SettingTemplate {
    type: 'multiSelect';
    default: string[];
    value: string[];
    values: string[];
    noLabelTranslation?: boolean;
}

interface HotKey extends SettingTemplate {
    type: 'hotkey';
    default: string;
    value: string;
}

interface Hidden extends SettingTemplate {
    type: 'hidden';
    default: false;
    value: false;
}

interface AppendableListItem {
    [key: string]: unknown;
}

export interface AppendableList extends SettingTemplate {
    default: AppendableListItem[];
    value: AppendableListItem[];
    listItemComponent: ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
    titleComponent: ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
    defaultItem: AppendableListItem;
}

interface AppendableListSetting<type = SettingType> {
    setting: Omit<type, 'value' | 'isDisabled'>;
    size: number;
    name: string;
    title: string;
}

export interface NewAppendableList extends SettingTemplate {
    default: AppendableListItem[];
    value: AppendableListItem[];
    listItem: AppendableListSetting[];
    defaultItem: AppendableListItem;
}

type SettingType =
    | Toggle
    | Text
    | AppendableList
    | NewAppendableList
    | Select
    | MultiSelect
    | Color
    | NumberInput
    | HotKey
    | Hidden;

export type Setting<type = SettingType> = type;

export interface Settings {
    [key: string]: Setting;
}

export interface RegisterSettings {
    [key: string]: Omit<Setting, 'value' | 'isDisabled'>;
}

export interface ModuleSettings {
    [moduleId: string]: Settings;
}
