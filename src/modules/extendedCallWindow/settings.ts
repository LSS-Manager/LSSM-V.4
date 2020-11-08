import tailoredTabsItem from './components/tailoredTabs/settings-item.vue';
import tailoredTabsTitle from './components/tailoredTabs/settings-titles.vue';

import missionKeywordsItem from './components/missionKeywords/settings-item.vue';
import missionKeywordsTitle from './components/missionKeywords/settings-titles.vue';

import alarmIconsItem from './components/alarmIcons/settings-item.vue';
import alarmIconsTitle from './components/alarmIcons/settings-titles.vue';

import { $m, ModuleSettingFunction } from 'typings/Module';
import {
    AppendableList,
    Color,
    Hidden,
    NumberInput,
    Toggle,
} from 'typings/Setting';

export default ((_: string, __: Vue, $m: $m) => {
    const defaultTailoredTabs = Object.values(
        $m('tailoredTabs.defaultTabs')
    ).map(({ name, vehicleTypes }) => ({
        name,
        vehicleTypes: Object.values(vehicleTypes),
    })) as {
        name: string;
        vehicleTypes: number[];
    }[];

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
            listItemComponent: tailoredTabsItem,
            titleComponent: tailoredTabsTitle,
            defaultItem: {
                name: '',
                vehicleTypes: [],
            },
        },
        missionKeywords: <Omit<AppendableList, 'value' | 'isDisabled'>>{
            type: 'appendable-list',
            default: [],
            listItemComponent: missionKeywordsItem,
            titleComponent: missionKeywordsTitle,
            defaultItem: {
                keyword: '',
                color: '#777777',
                prefix: false,
                missions: [],
            },
        },
        alarmIcons: <Omit<AppendableList, 'value' | 'isDisabled'>>{
            type: 'appendable-list',
            default: [],
            listItemComponent: alarmIconsItem,
            titleComponent: alarmIconsTitle,
            defaultItem: {
                icon: '',
                type: 'fas',
                vehicleTypes: [],
            },
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
    };
}) as ModuleSettingFunction;
