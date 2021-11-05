export interface NumberMethods {
    normalize(num: string | number): number;
}

export interface NumberProps {
    name: string;
    placeholder: string;
    value: number;
    min: number;
    max: number;
    step: number;
    float: boolean;
    disabled: boolean;
}

export interface NumberComputed {
    updateValue: number;
}
