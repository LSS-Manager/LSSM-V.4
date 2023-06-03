import type Vue from 'vue';

import mapCSSFilterFunctionSlider from './components/mapCSSFilter/functionSlider.vue';
import mapCSSFilterPreview from './components/mapCSSFilter/preview.vue';
import {
    type Filter,
    type FilterFunction,
    predefinedFilters,
} from './assets/mapCSSFilter';

import type { ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    Custom,
    Hidden,
    Location,
    MultiSelect,
    Select,
    Text,
    Toggle,
} from 'typings/Setting';
import type {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

export interface MapCSSFilterComponent {
    Data: DefaultData<Vue>;
    Methods: DefaultMethods<Vue>;
    Computed: DefaultComputed & {
        id: string;
    };
    Props: DefaultProps & {
        values: { filterFunction: Filter; filterValue: number }[];
        row: {
            index: number;
            value: { filterFunction: Filter; filterValue: number };
        };
    };
}
export type MapCSSFilterPreview = MapCSSFilterComponent & {
    Data: MapCSSFilterComponent['Data'] & Record<string, never>;
    Methods: MapCSSFilterComponent['Methods'] & {
        updateFilter(): void;
    };
};
export interface MapCSSFilterFunctionSlider {
    Data: {
        sliders: Record<
            FilterFunction,
            {
                min: number;
                max: number;
                default: number;
                step?: number | 'any';
                unit?: string;
            }
        >;
        predefinedFilters: Record<keyof typeof predefinedFilters, string>;
    };
    Computed: MapCSSFilterComponent['Computed'] & {
        updateValue: number;
        slider: {
            min: number;
            max: number;
            default: number;
            step: number | 'any';
            unit?: string;
        } | null;
    };
    Methods: MapCSSFilterComponent['Methods'] & Record<string, never>;
    Props: MapCSSFilterComponent['Props'] & {
        value: number;
    };
}

export default <ModuleSettingFunction>(async (MODULE_ID, LSSM, $m) => {
    const positions = $m('positions');

    const buildingTypes = LSSM.$stores.translations.buildings;

    await LSSM.$stores.api.getBuildings(`${MODULE_ID}-settings`);
    const userBuildings = LSSM.$stores.api.buildings;
    const userBuildingIds: string[] = [];
    const userBuildingLabels: string[] = [];

    userBuildings
        .map(({ id, caption, building_type }) => [
            id.toString(),
            `[${buildingTypes[building_type]?.caption ?? '🌈'}] ${caption}`,
        ])
        .sort(([, labelA], [, labelB]) => labelA.localeCompare(labelB))
        .forEach(([id, label]) => {
            userBuildingIds.push(id);
            userBuildingLabels.push(label);
        });

    const mapCSSFilters = $m('mapCSSFilter') as unknown as Record<
        string,
        string
    >;
    const mapCSSFilterValues = Object.keys(mapCSSFilters)
        .filter(k => k !== 'presets')
        .sort((a, b) => mapCSSFilters[a].localeCompare(mapCSSFilters[b]));
    const mapCSSFilterLabels = mapCSSFilterValues.map(
        value => mapCSSFilters[value]
    );

    Object.entries(predefinedFilters)
        .map(([preset]) => [
            preset,
            $m(`mapCSSFilter.presets.${preset}`).toString(),
        ])
        .sort(([, labelA], [, labelB]) => labelA.localeCompare(labelB))
        .forEach(([preset, label]) => {
            mapCSSFilterValues.push(`preset.${preset}`);
            mapCSSFilterLabels.push(`[${label}]`);
        });

    // const dynamics = [
    //     ...Object.entries(buildings).map(([type, { caption }]) => [
    //         `building_${type}`,
    //         `${$m('dynamic.titles.buildings')}: ${caption}`,
    //     ]),
    // ];
    return {
        mapScale: <Toggle>{
            type: 'toggle',
            default: false,
        },
        mapScalePosition: <Select>{
            type: 'select',
            values: Object.keys(positions),
            labels: Object.values(positions),
            default: 'bottomright',
            dependsOn: '.mapScale',
        },
        markerNewWindow: <Toggle>{
            type: 'toggle',
            default: true,
        },
        centerMap: <Toggle>{
            type: 'toggle',
            default: true,
        },
        centerMapType: <Select>{
            type: 'select',
            values: [/*'dynamic',*/ 'static'],
            labels: [
                // $m('settings.centerMapType.dynamic'),
                $m('settings.centerMapType.static'),
            ],
            default: 'static',
            dependsOn: '.centerMap',
        },
        centerMapStaticLocation: <Location>{
            type: 'location',
            default: [0, 0, 0],
            zoom: true,
            disabled: ({ [MODULE_ID]: settings }) =>
                !(
                    settings.centerMap.value &&
                    settings.centerMapType.value === 'static'
                ),
        },
        // centerMapDynamics: <Omit<MultiSelect, 'value' | 'isDisabled'>>{
        //     type: 'multiSelect',
        //     values: [...Object.keys(buildings).map(type => `building_${type}`)],
        //     labels: [
        //         ...Object.values(buildings).map(
        //             ({ caption }) =>
        //                 `${$m('dynamic.titles.buildings')}: ${caption}`
        //         ),
        //     ],
        //     default: [],
        // },
        buildingComplexes: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Text>>{
                    name: 'name',
                    title: $m('settings.buildingComplexes.name'),
                    size: 2,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'buildings',
                    title: $m('settings.buildingComplexes.buildings'),
                    size: 0,
                    unique: true,
                    setting: {
                        type: 'multiSelect',
                        values: userBuildingIds,
                        labels: userBuildingLabels,
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'allianceBuildings',
                    setting: {
                        type: 'hidden',
                    },
                },
                <AppendableListSetting<Location>>{
                    name: 'position',
                    title: $m('settings.buildingComplexes.position'),
                    size: 2,
                    setting: {
                        type: 'location',
                        default: [0, 0],
                        zoom: false,
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'icon',
                    setting: {
                        type: 'hidden',
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'showMarkers',
                    setting: {
                        type: 'hidden',
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'buildingsInList',
                    setting: {
                        type: 'hidden',
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'buildingTabs',
                    setting: {
                        type: 'hidden',
                    },
                },
            ],
            defaultItem: {
                name: '',
                buildings: [],
                allianceBuildings: [],
                position: [0, 0],
                icon: '/images/building_complex.png',
                showMarkers: false,
                buildingsInList: false,
                buildingTabs: true,
            },
            orderable: false,
            disableable: false,
        },
        mapCSSFilter: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'filterFunction',
                    title: $m('settings.mapCSSFilter.filterFunction'),
                    size: 2,
                    setting: {
                        type: 'select',
                        values: mapCSSFilterValues,
                        labels: mapCSSFilterLabels,
                    },
                },
                <
                    AppendableListSetting<
                        Custom<
                            Record<string, never>,
                            Record<string, never>,
                            MapCSSFilterFunctionSlider['Data'],
                            MapCSSFilterFunctionSlider['Methods'],
                            MapCSSFilterFunctionSlider['Computed'],
                            MapCSSFilterFunctionSlider['Props']
                        >
                    >
                >{
                    name: 'filterValue',
                    title: $m('settings.mapCSSFilter.filterValue'),
                    size: 0,
                    setting: {
                        type: 'custom',
                        properties: {},
                        component: mapCSSFilterFunctionSlider,
                    },
                },
                <
                    AppendableListSetting<
                        Custom<
                            Record<string, never>,
                            Record<string, never>,
                            MapCSSFilterPreview['Data'],
                            MapCSSFilterPreview['Methods'],
                            MapCSSFilterPreview['Computed'],
                            MapCSSFilterPreview['Props']
                        >
                    >
                >{
                    name: 'preview',
                    title: '',
                    size: 2,
                    setting: {
                        type: 'custom',
                        properties: {},
                        component: mapCSSFilterPreview,
                    },
                },
            ],
            defaultItem: {
                filterFunction: 'invert',
                filterValue: -1,
                preview: null,
            },
            orderable: true,
            disableable: false,
        },
    };
});
