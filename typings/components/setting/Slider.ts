import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface SliderData {
    faSlidersH: IconDefinition;
    rangeMode: boolean;
}

export interface SliderMethods {
    normalize(num: number | string): number;
}

export interface SliderProps {
    name: string;
    placeholder: string;
    value: number;
    min: number;
    max: number;
    step: number | 'any';
    disabled: boolean;
}

export interface SliderComputed {
    updateValue: number;
    float: boolean;
    datalistId: string;
}
