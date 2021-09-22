import cloneDeep from 'lodash/cloneDeep';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    AppendableList as AppendableListSetting,
    AppendableListSetting as AppendableListSettingSetting,
    MultiSelect,
    Select,
    Setting,
} from 'typings/Setting';

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
    uniqueColumns: string[];
}

export interface AppendableListMethods {
    addItem(): void;
    removeItem(index: number): void;
    changeValue(
        index: number,
        value: AppendableListSetting['defaultItem'],
        item: AppendableListSettingSetting
    ): void;
    getOptions(
        setting: AppendableListSettingSetting<Select | MultiSelect>,
        currentValue: string
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
