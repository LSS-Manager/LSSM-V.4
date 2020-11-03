import tailoredTabsItem from './components/tailoredTabs/settings-item.vue';
import tailoredTabsTitle from './components/tailoredTabs/settings-titles.vue';

import missionKeywordsItem from './components/missionKeywords/settings-item.vue';
import missionKeywordsTitle from './components/missionKeywords/settings-titles.vue';

import alarmIconsItem from './components/alarmIcons/settings-item.vue';
import alarmIconsTitle from './components/alarmIcons/settings-titles.vue';

import { $m } from 'typings/Module';

export default ($m: $m): unknown => {
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
        generationDate: {
            type: 'toggle',
            default: true,
        },
        yellowBorder: {
            type: 'number',
            default: 0,
            min: 0,
            max: 48,
            dependsOn: '.generationDate',
        },
        redBorder: {
            type: 'toggle',
            default: false,
            dependsOn: '.generationDate',
        },
        enhancedMissingVehicles: {
            type: 'toggle',
            default: false,
        },
        patientSummary: {
            type: 'toggle',
            default: true,
        },
        arrCounter: {
            type: 'toggle',
            default: false,
        },
        arrClickHighlight: {
            type: 'toggle',
            default: false,
        },
        arrClickHighlightColor: {
            type: 'color',
            default: '#008000',
            dependsOn: '.arrClickHighlight',
        },
        arrClickHighlightWidth: {
            type: 'number',
            default: 2,
            dependsOn: '.arrClickHighlight',
        },
        arrCounterResetSelection: {
            type: 'toggle',
            default: false,
        },
        arrMatchHighlight: {
            type: 'toggle',
            default: false,
        },
        arrTime: {
            type: 'toggle',
            default: false,
        },
        arrSpecs: {
            type: 'toggle',
            default: false,
        },
        alarmTime: {
            type: 'toggle',
            default: false,
        },
        stickyHeader: {
            type: 'toggle',
            default: false,
        },
        loadMoreVehiclesInHeader: {
            type: 'toggle',
            default: false,
        },
        hideVehicleList: {
            type: 'toggle',
            default: false,
        },
        centerMap: {
            type: 'toggle',
            default: false,
        },
        tailoredTabs: {
            type: 'appendable-list',
            default: defaultTailoredTabs,
            listItemComponent: tailoredTabsItem,
            titleComponent: tailoredTabsTitle,
            defaultItem: {
                name: '',
                vehicleTypes: [],
            },
        },
        missionKeywords: {
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
        alarmIcons: {
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
        overlay: {
            type: 'hidden',
            default: false,
        },
        minified: {
            type: 'hidden',
            default: false,
        },
        textMode: {
            type: 'hidden',
            default: false,
        },
    };
};
