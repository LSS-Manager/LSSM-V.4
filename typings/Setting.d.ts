import { ExtendedVue } from 'vue/types/vue';
import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

interface SettingTemplate {
    type: string;
    dependsOn?: string;
    noMapkit?: boolean;
    disabled?: ((settings: ModuleSettings) => boolean) | (() => boolean);

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

interface Textarea extends SettingTemplate {
    type: 'textarea';
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
    float?: boolean;
}

interface Select extends SettingTemplate {
    type: 'select';
    default: string;
    value: string;
    values: string[];
    labels?: string[];
    noLabelTranslation?: boolean;
}
interface MultiSelect extends SettingTemplate {
    type: 'multiSelect';
    default: string[];
    value: string[];
    values: string[];
    labels?: string[];
    noLabelTranslation?: boolean;
}

interface HotKey extends SettingTemplate {
    type: 'hotkey';
    default: string;
    value: string;
}

interface Location extends SettingTemplate {
    type: 'location';
    default: [number, number, number];
    value: [number, number, number];
    zoom?: boolean;
}

interface Custom<
    Data = unknown,
    Properties extends Record<string, unknown> = Record<string, never>,
    ComponentData extends DefaultData<Vue> = DefaultData<Vue>,
    ComponentMethods extends DefaultMethods<Vue> = DefaultMethods<Vue>,
    ComponentComputed extends DefaultComputed = DefaultComputed,
    ComponentProps extends DefaultProps = DefaultProps
> extends SettingTemplate {
    type: 'custom';
    default: Data;
    value: Data;
    properties: Properties;
    component: ExtendedVue<
        Vue,
        ComponentData,
        ComponentMethods,
        ComponentComputed,
        ComponentProps & { value: Data }
    >;
}

interface Hidden<Type = boolean> extends SettingTemplate {
    type: 'hidden';
    default: Type;
    value: Type;
}

interface AppendableListItem {
    [key: string]: unknown;
}

interface AppendableListSetting<Type extends SettingType = SettingType> {
    setting: Omit<Type, 'value' | 'isDisabled'>;
    size: number;
    name: string;
    title: string;
    unique?: boolean;
}

export interface PreviewElement
    extends Omit<AppendableListSetting, 'setting' | 'name'> {
    type: 'preview';
    component: ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
}

export interface AppendableList extends SettingTemplate {
    type: 'appendable-list';
    default: AppendableListItem[];
    value: {
        value: AppendableListItem[];
        enabled: boolean;
    };
    listItem: (AppendableListSetting | PreviewElement)[];
    defaultItem: AppendableListItem;
    disableable: boolean;
    orderable?: boolean;
}

type SettingType<
    CustomData = unknown,
    CustomProperties extends Record<string, unknown> = Record<string, never>,
    CustomComponentData extends DefaultData<Vue> = DefaultData<Vue>,
    CustomComponentMethods extends DefaultMethods<Vue> = DefaultMethods<Vue>,
    CustomComponentComputed extends DefaultComputed = DefaultComputed,
    CustomComponentProps extends DefaultProps = DefaultProps
> =
    | Toggle
    | Text
    | Textarea
    | AppendableList
    | Select
    | MultiSelect
    | Color
    | NumberInput
    | HotKey
    | Location
    | Custom<
          CustomData,
          CustomProperties,
          CustomComponentData,
          CustomComponentMethods,
          CustomComponentComputed,
          CustomComponentProps
      >
    | Hidden;

export type Setting<Type extends SettingType = SettingType> = Type;

export interface Settings {
    [key: string]: Setting;
}

export interface RegisterSettings {
    [key: string]: Omit<Setting, 'value' | 'isDisabled'>;
}

export interface ModuleSettings {
    [moduleId: string]: Settings;
}
