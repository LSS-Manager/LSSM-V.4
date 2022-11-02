import type { ModuleMainFunction } from 'typings/Module';

const filters = {
    brightness: '%' as const,
    contrast: '%' as const,
    grayscale: '%' as const,
    hueRotate: 'deg' as const,
    invert: '%' as const,
    saturate: '%' as const,
    sepia: '%' as const,
};

type Settings = {
    [key in keyof typeof filters]: `${number}${typeof filters[key]}`;
};

const getSettings = async (
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting']
): Promise<Settings> =>
    Object.fromEntries(
        await Promise.all(
            Object.entries(filters).map(([key, unit]) =>
                getSetting<number, typeof unit>(
                    `mapStyleFilter${key[0].toUpperCase()}${key.slice(1)}`,
                    undefined,
                    true
                )
                    .then()
                    .then(value => [key, value])
            )
        )
    ) as Settings;

const getFilter = ({
    brightness,
    contrast,
    grayscale,
    hueRotate,
    invert,
    saturate,
    sepia,
}: Settings) =>
    `brightness(${brightness}) contrast(${contrast}) grayscale(${grayscale}) hue-rotate(${hueRotate}) invert(${invert}) saturate(${saturate}) sepia(${sepia})`;

export default async (
    LSSM: Vue,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting']
) => {
    LSSM.$stores.root.addStyle({
        selectorText: '.leaflet-tile-pane',
        style: {
            filter: getFilter(await getSettings(getSetting)),
        },
    });
};
