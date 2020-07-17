import cloneDeep from 'lodash/cloneDeep';
import {
    Setting,
    AppendableList as AppendableListSetting,
} from 'typings/Setting';

export interface AppendableList {
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
}

export interface AppendableListProps {
    setting: Setting<AppendableListSetting>;
    value: AppendableListSetting['value'];
}
