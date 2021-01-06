import mkpreview from './components/missionKeywords/preview.vue';
import aipreview from './components/alarmIcons/preview.vue';

import { $m, ModuleSettingFunction } from 'typings/Module';
import {
    AppendableList,
    AppendableListSetting,
    Color,
    Hidden,
    NumberInput,
    Toggle,
    Text,
    MultiSelect,
    Select,
    PreviewElement,
} from 'typings/Setting';
import { InternalVehicle } from 'typings/Vehicle';
import { Mission } from 'typings/Mission';

export default (async (MODULE_ID: string, LSSM: Vue, $m: $m) => {
    const defaultTailoredTabs = Object.values(
        $m('tailoredTabs.defaultTabs')
    ).map(({ name, vehicleTypes }) => ({
        name,
        vehicleTypes: Object.values(vehicleTypes),
    })) as {
        name: string;
        vehicleTypes: number[];
    }[];

    const vehicles = LSSM.$t('vehicles') as { [id: number]: InternalVehicle };
    const vehicleCaptions = [] as string[];
    const vehicleIds = [] as string[];
    Object.entries(vehicles).forEach(([id, { caption }]) => {
        vehicleCaptions.push(caption);
        vehicleIds.push(id);
    });

    const missions = (await LSSM.$store.dispatch('api/getMissions', {
        force: false,
        feature: `${MODULE_ID}-settings`,
    })) as Mission[];
    const missionIds = [] as string[];
    const missionNames = [] as string[];
    missions.forEach(({ id, name }) => {
        missionIds.push(id.toString());
        missionNames.push(`${id}: ${name}`);
    });

    return {
        generationDate: <Toggle>{
            type: 'toggle',
            default: true,
        },
        yellowBorder: <NumberInput>{
            type: 'number',
            default: 0,
            min: 0,
            max: 48,
            dependsOn: '.generationDate',
        },
        redBorder: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.generationDate',
        },
        enhancedMissingVehicles: <Toggle>{
            type: 'toggle',
            default: false,
        },
        patientSummary: <Toggle>{
            type: 'toggle',
            default: true,
        },
        arrCounter: <Toggle>{
            type: 'toggle',
            default: false,
        },
        arrCounterAsBadge: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.arrCounter',
        },
        arrClickHighlight: <Toggle>{
            type: 'toggle',
            default: false,
        },
        arrClickHighlightColor: <Color>{
            type: 'color',
            default: '#008000',
            dependsOn: '.arrClickHighlight',
        },
        arrClickHighlightWidth: <NumberInput>{
            type: 'number',
            default: 2,
            dependsOn: '.arrClickHighlight',
        },
        arrCounterResetSelection: <Toggle>{
            type: 'toggle',
            default: false,
        },
        arrMatchHighlight: <Toggle>{
            type: 'toggle',
            default: false,
        },
        arrTime: <Toggle>{
            type: 'toggle',
            default: false,
        },
        arrSpecs: <Toggle>{
            type: 'toggle',
            default: false,
        },
        alarmTime: <Toggle>{
            type: 'toggle',
            default: false,
        },
        stickyHeader: <Toggle>{
            type: 'toggle',
            default: false,
        },
        loadMoreVehiclesInHeader: <Toggle>{
            type: 'toggle',
            default: false,
        },
        hideVehicleList: <Toggle>{
            type: 'toggle',
            default: false,
        },
        centerMap: <Toggle>{
            type: 'toggle',
            default: false,
        },
        tailoredTabs: <Omit<AppendableList, 'value' | 'isDisabled'>>{
            type: 'appendable-list',
            default: defaultTailoredTabs,
            listItem: [
                <AppendableListSetting<Text>>{
                    name: 'name',
                    title: $m('settings.tailoredTabs.name'),
                    size: 2,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'vehicleTypes',
                    title: $m('settings.tailoredTabs.vehicles'),
                    size: 0,
                    setting: {
                        type: 'multiSelect',
                        values: vehicleIds,
                        labels: vehicleCaptions,
                    },
                },
            ],
            defaultItem: {
                name: '',
                vehicleTypes: [],
            },
            orderable: true,
            disableable: true,
        },
        missionKeywords: <Omit<AppendableList, 'value' | 'isDisabled'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Text>>{
                    name: 'keyword',
                    title: $m('settings.missionKeywords.keyword'),
                    size: 2,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<Color>>{
                    name: 'color',
                    title: $m('settings.missionKeywords.color'),
                    size: 1,
                    setting: {
                        type: 'color',
                    },
                },
                <AppendableListSetting<Toggle>>{
                    name: 'autotextcolor',
                    title: $m('settings.missionKeywords.autotextcolor'),
                    size: 2,
                    setting: {
                        type: 'toggle',
                    },
                },
                <AppendableListSetting<Color>>{
                    name: 'textcolor',
                    title: $m('settings.missionKeywords.textcolor'),
                    size: 1,
                    setting: {
                        type: 'color',
                    },
                },
                <PreviewElement>{
                    type: 'preview',
                    component: mkpreview,
                    title: $m('settings.missionKeywords.preview'),
                    size: 1,
                },
                <AppendableListSetting<Toggle>>{
                    name: 'prefix',
                    title: $m('settings.missionKeywords.prepend'),
                    size: 2,
                    setting: {
                        type: 'toggle',
                    },
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'missions',
                    title: $m('settings.missionKeywords.missions'),
                    size: 0,
                    setting: {
                        type: 'multiSelect',
                        values: missionIds,
                        labels: missionNames,
                    },
                },
            ],
            defaultItem: {
                keyword: '',
                color: '#777777',
                autotextcolor: true,
                textcolor: '#ffffff',
                prefix: false,
                missions: [],
            },
            orderable: true,
        },
        alarmIcons: <Omit<AppendableList, 'value' | 'isDisabled'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Text>>{
                    name: 'icon',
                    title: $m('settings.alarmIcons.icon'),
                    size: 2,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<Select>>{
                    name: 'type',
                    title: $m('settings.alarmIcons.style'),
                    size: 2,
                    setting: {
                        type: 'select',
                        values: ['fas', 'far', 'fab'],
                        labels: ['solid', 'regular', 'brand'],
                    },
                },
                <PreviewElement>{
                    type: 'preview',
                    component: aipreview,
                    title: $m('settings.alarmIcons.preview'),
                    size: 1,
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'vehicleTypes',
                    title: $m('settings.alarmIcons.vehicles'),
                    size: 0,
                    setting: {
                        type: 'multiSelect',
                        values: vehicleIds,
                        labels: vehicleCaptions,
                    },
                },
            ],
            defaultItem: {
                icon: '',
                type: 'fas',
                vehicleTypes: [],
            },
            orderable: true,
        },
        overlay: <Hidden>{
            type: 'hidden',
            default: false,
        },
        minified: <Hidden>{
            type: 'hidden',
            default: false,
        },
        textMode: <Hidden>{
            type: 'hidden',
            default: false,
        },
        pushRight: <Hidden>{
            type: 'hidden',
            default: false,
        },
        drag: <Hidden<unknown>>{
            type: 'hidden',
            default: {
                active: false,
                top: 60,
                left: window.innerWidth * 0.03,
                offset: {
                    x: 0,
                    y: 0,
                },
            },
        },
    };
}) as ModuleSettingFunction;
