import cloneDeep from 'lodash/cloneDeep';
import {
    Setting,
    AppendableList as AppendableListSetting,
    Select,
} from 'typings/Setting';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface AppendableList {
    faUndoAlt: IconDefinition;
    faMinus: IconDefinition;
    faPlus: IconDefinition;
    cloneDeep: typeof cloneDeep;
}

export interface AppendableListComputed {
    layout: number[];
    updateValues: AppendableListSetting['value'];
}

export interface AppendableListMethods {
    addItem(): void;
    removeItem(index: number): void;
    changeValue(
        index: number,
        value: AppendableListSetting['defaultItem']
    ): void;
    getOptions(setting: Select): { label: string; value: string }[];
    reset(): void;
}

export interface AppendableListProps {
    setting: Setting<AppendableListSetting>;
    value: AppendableListSetting['value'];
    moduleId: string;
    settingId: string;
}
