export interface MultiSelectProps {
    name: string;
    placeholder: string;
    value: string[];
    options: Option[];
    disabled: boolean;
    allOnNone: boolean;
}

interface Option {
    label: string;
    value: string;
}

export interface MultiSelectComputed {
    updateValue: Option[];
    filteredOptions: Option[];
}
