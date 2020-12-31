import cloneDeep from 'lodash/cloneDeep';
import {
    Setting,
    AppendableList as AppendableListSetting,
    Select,
    MultiSelect,
} from 'typings/Setting';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface AppendableList {
    faUndoAlt: IconDefinition;
    faMinus: IconDefinition;
    faLongArrowAltUp: IconDefinition;
    faLongArrowAltDown: IconDefinition;
    faPlus: IconDefinition;
    cloneDeep: typeof cloneDeep;
}

export interface AppendableListComputed {
    layout: number[];
    updateValues: AppendableListSetting['value']['value'];
}

export interface AppendableListMethods {
    addItem(): void;
    removeItem(index: number): void;
    changeValue(
        index: number,
        value: AppendableListSetting['defaultItem']
    ): void;
    getOptions(
        setting: Select | MultiSelect
    ): { label: string; value: string }[];
    moveUp(index: number): void;
    moveDown(index: number): void;
    reset(): void;
}

export interface AppendableListProps {
    setting: Setting<AppendableListSetting>;
    value: AppendableListSetting['value']['value'];
    moduleId: string;
    settingId: string;
    orderable: boolean;
    enabled: boolean;
}
