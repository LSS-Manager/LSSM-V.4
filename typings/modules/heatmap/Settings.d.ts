export type Mode = 'buildings' | 'vehicles';

export type Subsetting<Scope extends Mode | ''> = Record<
    `${Scope}IntensityMaxZoom` | `${Scope}RadiusM` | `${Scope}RadiusPx`,
    number
> &
    Record<`${Scope}Includes`, { value: number | string; label: string }[]> &
    Record<`${Scope}StaticRadius`, boolean>;

export type Settings = Subsetting<'buildings'> &
    Subsetting<'vehicles'> & {
        position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
        active: boolean;
        livePreview: boolean;
        heatmapMode: Mode;
    };

export type UpdateSettings = (updated: Omit<Settings, 'active'>) => void;
