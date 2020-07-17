export interface NumberProps {
    name: string;
    placeholder: string;
    value: number;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
}

export interface NumberComputed {
    updateValue: number;
}
