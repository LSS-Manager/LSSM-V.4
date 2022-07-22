import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface LocationData {
    faMapMarkedAlt: IconDefinition;
}

export interface LocationMethods {
    openMap(): void;
}

export interface LocationProps {
    name: string;
    placeholder: string;
    value: number[];
    zoom: boolean;
    disabled: boolean;
    markers: { icon: string; location: [number, number] }[];
}

export interface LocationComputed {
    updateValue: number[];
}
