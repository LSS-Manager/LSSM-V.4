import cloneDeep from 'lodash/cloneDeep';
import {
    Setting,
    AppendableList as AppendableListSetting,
} from 'typings/Setting';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface AppendableList {
    faUndoAlt: IconDefinition;
    cloneDeep: typeof cloneDeep;
}

export interface AppendableListComputed {
    updateValues: AppendableListSetting['value'];
}

export interface AppendableListMethods {
    addItem(): void;
    removeItem(index: number): void;
    changeValue(
        index: number,
        value: AppendableListSetting['defaultItem']
    ): void;
    reset(): void;
}

export interface AppendableListProps {
    setting: Setting<AppendableListSetting>;
    value: AppendableListSetting['value'];
}
