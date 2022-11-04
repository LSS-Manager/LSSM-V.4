const filters = {
    brightness: '%' as const,
    contrast: '%' as const,
    grayscale: '%' as const,
    hueRotate: 'deg' as const,
    invert: '%' as const,
    saturate: '%' as const,
    sepia: '%' as const,
};

export type Filter = keyof typeof filters;

export const sliders = {
    brightness: {
        min: 0,
        max: 500,
        default: 100,
        unit: '%',
    },
    contrast: {
        min: 0,
        max: 500,
        default: 100,
        unit: '%',
    },
    grayscale: {
        min: 0,
        max: 100,
        default: 0,
        unit: '%',
    },
    hueRotate: {
        min: 0,
        max: 360,
        default: 0,
        unit: 'deg',
    },
    invert: {
        min: 0,
        max: 100,
        default: 0,
        unit: '%',
    },
    saturate: {
        min: 0,
        max: 500,
        default: 100,
        unit: '%',
    },
    sepia: {
        min: 0,
        max: 100,
        default: 0,
        unit: '%',
    },
};

export const getFilter = (
    settings: { filterFunction: Filter; filterValue: number }[]
) =>
    settings
        .map(
            ({ filterFunction, filterValue }) =>
                `${filterFunction.replace(
                    /[A-Z]/gu,
                    $0 => `-${$0.toLowerCase()}`
                )}(${filterValue}${sliders[filterFunction].unit})`
        )
        .join(' ');

export default async (
    LSSM: Vue,
    value: { filterFunction: Filter; filterValue: number }[]
) => {
    LSSM.$stores.root.addStyle({
        selectorText: '.leaflet-tile-pane',
        style: {
            filter: getFilter(value),
        },
    });
};
