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

import alarmIconsTitle from './components/alarmIcons/settings-titles.vue';
import alarmIconsItem from './components/alarmIcons/settings-item.vue';

import isEqual from 'lodash/isEqual';
import tailoredTabs from './assets/tailoredTabs';
import missionKeywords from './assets/missionKeywords';
import alarmIcons from './assets/alarmIcons';
import arrHover from './assets/arrHover';
import stickyHeader from './assets/stickyHeader';

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
        },
    });

    if (
        !window.location.pathname.match(/^\/(missions|buildings)\/\d+$/) ||
        document.querySelector('.missionNotFound')
    )
        return;
    const missionMode = !!window.location.pathname.match(/^\/buildings\/\d+$/);
    if (missionMode && !document.getElementById('bereitstellungsraumReset'))
        return;
    const getSetting = <returnType = boolean>(
        settingId: string
    ): Promise<returnType> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (!missionMode) {
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

        const missionKeywordsSettings = await getSetting<
            { keyword: string; color: string; missions: number[] }[]
        >('missionKeywords');

        if (missionKeywordsSettings.length)
            missionKeywords(LSSM, missionKeywordsSettings);

        if (await getSetting('arrMatchHighlight')) arrMatchHighlight(LSSM);
        if (await getSetting('alarmTime')) alarmTime(LSSM);

        const alarmIconsSettings = await getSetting<
            {
                icon: string;
                type: 'fas' | 'far' | 'fab';
                vehicleTypes: (number | string)[];
            }[]
        >('alarmIcons');
        if (alarmIconsSettings.length) alarmIcons(LSSM, alarmIconsSettings);

        const arrSpecs = await getSetting('arrSpecs');
        const arrTime = await getSetting('arrTime');
        if (arrSpecs || arrTime) arrHover(LSSM, arrSpecs, arrTime);

        if (await getSetting('stickyHeader')) stickyHeader();
    }

    const tailoredTabSettings = await getSetting<typeof defaultTailoredTabs>(
        'tailoredTabs'
    );
    if (!isEqual(tailoredTabSettings, defaultTailoredTabs) || missionMode)
        tailoredTabs(LSSM, tailoredTabSettings, missionMode);
})(window[PREFIX] as Vue);
