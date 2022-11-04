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

export const predefinedFilters = {
    dark1: 'brightness(60%) invert(100%) contrast(300%) hue-rotate(200deg) saturate(30%) brightness(50%) contrast(125%) saturate(500%)',
    dark2: 'invert(1) grayscale(.5) hue-rotate(180deg)',
    dark3: 'invert(1) grayscale(.7)',
    gray: 'grayscale(100%) brightness(40%)',
};

export type FilterFunction = keyof typeof sliders;
export type PresetFilter = `preset.${keyof typeof predefinedFilters}`;

export type Filter = FilterFunction | PresetFilter;

export const getFilter = (
    settings: { filterFunction: Filter; filterValue: number }[]
) =>
    settings
        .map(({ filterFunction, filterValue }) =>
            filterFunction.startsWith('preset.')
                ? predefinedFilters[
                      filterFunction.replace(
                          /^preset\./gu,
                          ''
                      ) as keyof typeof predefinedFilters
                  ]
                : `${filterFunction.replace(
                      /[A-Z]/gu,
                      $0 => `-${$0.toLowerCase()}`
                  )}(${filterValue}${
                      sliders[filterFunction as FilterFunction].unit
                  })`
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
