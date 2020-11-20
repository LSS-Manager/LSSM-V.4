export interface SelectProps {
    name: string;
    placeholder: string;
    value: string;
    options: {
        label: string;
        value: string;
    }[];
    disabled: boolean;
}

export interface SelectComputed {
    updateValue: { label: string; value: string };
}
