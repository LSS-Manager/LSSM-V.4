export interface MultiSelectProps {
    name: string;
    placeholder: string;
    value: string[];
    options: {
        label: string;
        value: string;
    }[];
    disabled: boolean;
}

export interface MultiSelectComputed {
    updateValue: string[];
}
