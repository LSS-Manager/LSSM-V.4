export interface StorageGet<ValueType = unknown> {
    key: string;
    defaultValue: ValueType;
}

export interface StorageSet<ValueType = unknown> {
    key: string;
    value: ValueType;
}
