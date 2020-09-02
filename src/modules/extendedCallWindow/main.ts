import tailoredTabsTitle from './components/tailoredTabs/settings-titles.vue';
import tailoredTabsItem from './components/tailoredTabs/settings-item.vue';

import missionKeywordsTitle from './components/missionKeywords/settings-titles.vue';
import missionKeywordsItem from './components/missionKeywords/settings-item.vue';

import alarmIconsTitle from './components/alarmIcons/settings-titles.vue';
import alarmIconsItem from './components/alarmIcons/settings-item.vue';

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
            loadMoreVehiclesInHeader: {
                type: 'toggle',
                default: false,
            },
            hideVehicleList: {
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
            textMode: {
                type: 'hidden',
                default: false,
            },
        },
    });

    if (
        !window.location.pathname.match(/^\/(missions|buildings)\/\d+$\/?/) ||
        document.querySelector('.missionNotFound')
    )
        return;
    const stagingMode = !!window.location.pathname.match(
        /^\/buildings\/\d+\/?$/
    );
    if (stagingMode && !document.getElementById('education_schooling_-1'))
        return;
    const getSetting = <returnType = boolean>(
        settingId: string
    ): Promise<returnType> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (!stagingMode) {
        await LSSM.$store.dispatch('addStyle', {
            selectorText: '.vehicle_prisoner_select a.btn-danger',
            style: {
                'pointer-events': 'none',
                'opacity': '0.65',
            },
        });

        if (await getSetting('generationDate'))
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/generationDate" */ './assets/generationDate'
                )
            ).default(LSSM);
        if (await getSetting('enhancedMissingVehicles'))
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/enhancedMissingVehicles" */ './assets/enhancedMissingVehicles'
                )
            ).default(LSSM);
        if (await getSetting('patientSummary'))
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/patientSummary" */ './assets/patientSummary'
                )
            ).default(LSSM);
        if (
            (await getSetting('arrCounter')) ||
            (await getSetting('arrClickHighlight')) ||
            (await getSetting('arrCounterResetSelection'))
        )
            await (
                await import(
                    /* webpackChunkName: "extendedCallWindow/arrCounter" */ './assets/arrCounter'
                )
            ).default(LSSM, getSetting);

        const missionKeywordsSettings = await getSetting<
            { keyword: string; color: string; missions: number[] }[]
        >('missionKeywords');

        if (missionKeywordsSettings.length)
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/missionKeywords" */ './assets/missionKeywords'
                )
            ).default(LSSM, missionKeywordsSettings);

        if (await getSetting('arrMatchHighlight'))
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/arrMatchHighlight" */ './assets/arrMatchHighlight'
                )
            ).default(LSSM);
        if (await getSetting('alarmTime'))
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/alarmTime" */ './assets/alarmTime'
                )
            ).default(LSSM);

        const alarmIconsSettings = await getSetting<
            {
                icon: string;
                type: 'fas' | 'far' | 'fab';
                vehicleTypes: (number | string)[];
            }[]
        >('alarmIcons');
        if (alarmIconsSettings.length)
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/alarmIcons" */ './assets/alarmIcons'
                )
            ).default(LSSM, alarmIconsSettings);

        const arrSpecs = await getSetting('arrSpecs');
        const arrTime = await getSetting('arrTime');
        if (arrSpecs || arrTime)
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/arrHover" */ './assets/arrHover'
                )
            ).default(LSSM, arrSpecs, arrTime);

        const stickyHeader = await getSetting('stickyHeader');
        const loadMoreVehiclesInHeader = await getSetting(
            'loadMoreVehiclesInHeader'
        );
        if (stickyHeader || loadMoreVehiclesInHeader)
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/enhancedHeader" */ './assets/enhancedHeader'
                )
            ).default(stickyHeader, loadMoreVehiclesInHeader);
        if (await getSetting('hideVehicleList'))
            (
                await import(
                    /* webpackChunkName: "extendedCallWindow/hideVehicleList" */ './assets/hideVehicleList'
                )
            ).default(LSSM);
    }

    const tailoredTabSettings = await getSetting<typeof defaultTailoredTabs>(
        'tailoredTabs'
    );
    if (
        !(
            await import(
                /* webpackChunkName: "node_modules/lodash/isEqual" */ 'lodash/isEqual'
            )
        ).default(tailoredTabSettings, defaultTailoredTabs) ||
        stagingMode
    )
        (
            await import(
                /* webpackChunkName: "extendedCallWindow/tailoredTabs" */ './assets/tailoredTabs'
            )
        ).default(LSSM, tailoredTabSettings, stagingMode);
})(window[PREFIX] as Vue);
