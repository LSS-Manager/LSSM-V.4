import generationDate from './assets/generationDate';
import enhancedMissingVehicles from './assets/enhancedMissingVehicles';
import patientSummary from './assets/patientSummary';
import arrCounter from './assets/arrCounter';
import arrMatchHighlight from './assets/arrMatchHighlight';
import alarmTime from './assets/alarmTime';

import tailoredTabsTitle from './components/tailoredTabs/settings-titles.vue';
import tailoredTabsItem from './components/tailoredTabs/settings-item.vue';

import missionKeywordsTitle from './components/missionKeywords/settings-titles.vue';
import missionKeywordsItem from './components/missionKeywords/settings-item.vue';

import isEqual from 'lodash/isEqual';
import tailoredTabs from './assets/tailoredTabs';
import missionKeywords from './assets/missionKeywords';

(async (LSSM: Vue) => {
    const defaultTailoredTabs = Object.values(
        LSSM.$t(`modules.${MODULE_ID}.tailoredTabs.defaultTabs`)
    ).map(({ name, vehicleTypes }) => ({
        name,
        vehicleTypes: Object.values(vehicleTypes),
    })) as {
        name: string;
        vehicleTypes: number[];
    }[];

    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            generationDate: {
                type: 'toggle',
                default: true,
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
            alarmTime: {
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
                    missions: [],
                },
            },
        },
    });

    if (
        !window.location.pathname.match(/^\/missions\/\d+$/) ||
        document.querySelector('.missionNotFound')
    )
        return;

    const getSetting = <returnType = boolean>(
        settingId: string
    ): Promise<returnType> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    await LSSM.$store.dispatch('addStyle', {
        selectorText: '.vehicle_prisoner_select a.btn-danger',
        style: {
            'pointer-events': 'none',
            'opacity': '0.65',
        },
    });

    if (await getSetting('generationDate')) generationDate(LSSM);
    if (await getSetting('enhancedMissingVehicles'))
        enhancedMissingVehicles(LSSM);
    if (await getSetting('patientSummary')) patientSummary(LSSM);
    if (
        (await getSetting('arrCounter')) ||
        (await getSetting('arrClickHighlight')) ||
        (await getSetting('arrCounterResetSelection'))
    )
        await arrCounter(LSSM, getSetting);
    if (await getSetting('arrMatchHighlight')) arrMatchHighlight(LSSM);
    if (await getSetting('alarmTime')) alarmTime(LSSM);

    const tailoredTabSettings = await getSetting<typeof defaultTailoredTabs>(
        'tailoredTabs'
    );
    if (!isEqual(tailoredTabSettings, defaultTailoredTabs))
        tailoredTabs(LSSM, tailoredTabSettings);

    const missionKeywordsSettings = await getSetting<
        { keyword: string; color: string; missions: number[] }[]
    >('missionKeywords');

    if (missionKeywordsSettings.length)
        missionKeywords(LSSM, missionKeywordsSettings);
})(window[PREFIX] as Vue);
