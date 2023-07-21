/**
 * @file - Type definitions for settings files for modules.
 */

import type { ExtendedVue } from 'vue/types/vue';
import type {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

interface SettingTemplate {
    type: string;
    dependsOn?: string;
    noMapkit?: boolean;
    disabled?: (() => boolean) | ((settings: ModuleSettings) => boolean);

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

interface Slider extends SettingTemplate {
    type: 'slider';
    default: number;
    value: number;
    min?: number;
    max?: number;
    step?: number | 'any';
    unit?: string;
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

interface LocationWithoutZoom extends SettingTemplate {
    type: 'location';
    default: [number, number];
    value: [number, number];
    zoom?: false;
}
interface LocationWithZoom extends SettingTemplate {
    type: 'location';
    default: [number, number, number];
    value: [number, number, number];
    zoom: true;
}
type Location = LocationWithoutZoom | LocationWithZoom;

type CustomProps<
    ModuleOrAList extends Record<string, unknown> = Record<string, unknown>,
    AListKey extends keyof ModuleOrAList = keyof ModuleOrAList,
> = DefaultProps &
    Partial<
        | {
              value: ModuleOrAList[AListKey];
              values: ModuleOrAList[];
              row: { index: number; value: ModuleOrAList };
          }
        | { module: ModuleOrAList }
    >;

interface Custom<
    Data = unknown,
    Properties extends Record<string, unknown> = Record<string, never>,
    ComponentData extends DefaultData<Vue> = DefaultData<Vue>,
    ComponentMethods extends DefaultMethods<Vue> = DefaultMethods<Vue>,
    ComponentComputed extends DefaultComputed = DefaultComputed,
    ComponentProps extends CustomProps = DefaultProps,
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
        ComponentProps & { value: Data },
        unknown
    >;
}

interface Hidden<Type = boolean> extends SettingTemplate {
    type: 'hidden';
    default: Type;
    value: Type;
}

type AppendableListItem = Record<string, unknown>;

interface AppendableListSetting<Type extends SettingType = SettingType> {
    setting: Omit<Type, 'isDisabled' | 'value'>;
    size: number;
    name: string;
    title: string;
    unique?:
        | boolean
        | (<Row extends Record<string, unknown>>(
              row: Row,
              rowIndex: number,
              settings: Row[]
          ) => string | false);
}

export interface PreviewElement<Component = undefined>
    extends Omit<AppendableListSetting, 'name' | 'setting'> {
    type: 'preview';
    component: Component extends undefined
        ? ExtendedVue<Vue, unknown, unknown, unknown, unknown, unknown>
        : Component;
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
    CustomComponentProps extends DefaultProps = DefaultProps,
> =
    | AppendableList
    | Color
    | Custom<
          CustomData,
          CustomProperties,
          CustomComponentData,
          CustomComponentMethods,
          CustomComponentComputed,
          CustomComponentProps
      >
    | Hidden
    | HotKey
    | Location
    | MultiSelect
    | NumberInput
    | Select
    | Slider
    | Text
    | Textarea
    | Toggle;

export type Setting<Type extends SettingType = SettingType> = Type;

export type Settings = Record<string, Setting>;

export type RegisterSettings = Record<
    string,
    Omit<Setting, 'isDisabled' | 'value'>
>;

export type ModuleSettings = Record<string, Settings>;
