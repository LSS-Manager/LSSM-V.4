import cloneDeep from 'lodash/cloneDeep';
import {
    Setting,
    AppendableList as AppendableListSetting,
} from 'typings/Setting';

export interface AppendableList {
    cloneDeep: typeof cloneDeep;
}

export interface AppendableListMethods {
    addItem(): void;
    removeItem(index: number): void;
    changeValue(index: number, values: unknown[]): void;
    // emit(): void;
}

export interface AppendableListProps {
    setting: Setting<AppendableListSetting>;
    value: AppendableListSetting['value'];
}
