import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID, $m) => {
    const defaultTailoredTabs = Object.values(
        $m('tailoredTabs.defaultTabs')
    ).map(({ name, vehicleTypes }) => ({
        name,
        vehicleTypes: Object.values(vehicleTypes),
    })) as {
        name: string;
        vehicleTypes: number[];
    }[];

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
                    /* webpackChunkName: "modules/extendedCallWindow/generationDate" */ './assets/generationDate'
                )
            ).default(
                LSSM,
                await getSetting<number>('yellowBorder'),
                await getSetting('redBorder')
            );
        if (await getSetting('enhancedMissingVehicles'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/enhancedMissingVehicles" */ './assets/enhancedMissingVehicles'
                )
            ).default(LSSM, $m);
        if (await getSetting('patientSummary'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/patientSummary" */ './assets/patientSummary'
                )
            ).default(LSSM);
        if (
            (await getSetting('arrCounter')) ||
            (await getSetting('arrClickHighlight')) ||
            (await getSetting('arrCounterResetSelection'))
        )
            await (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/arrCounter" */ './assets/arrCounter'
                )
            ).default(LSSM, getSetting, $m);

        const missionKeywordsSettings = await getSetting<
            {
                keyword: string;
                color: string;
                prefix: boolean;
                missions: number[];
            }[]
        >('missionKeywords');

        if (missionKeywordsSettings.length)
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/missionKeywords" */ './assets/missionKeywords'
                )
            ).default(LSSM, missionKeywordsSettings);

        if (await getSetting('arrMatchHighlight'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/arrMatchHighlight" */ './assets/arrMatchHighlight'
                )
            ).default(LSSM);
        if (await getSetting('alarmTime'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/alarmTime" */ './assets/alarmTime'
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
                    /* webpackChunkName: "modules/extendedCallWindow/alarmIcons" */ './assets/alarmIcons'
                )
            ).default(LSSM, alarmIconsSettings);

        const arrSpecs = await getSetting('arrSpecs');
        const arrTime = await getSetting('arrTime');
        if (arrSpecs || arrTime)
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/arrHover" */ './assets/arrHover'
                )
            ).default(LSSM, arrSpecs, arrTime, MODULE_ID, $m);

        const stickyHeader = await getSetting('stickyHeader');
        const loadMoreVehiclesInHeader = await getSetting(
            'loadMoreVehiclesInHeader'
        );
        if (stickyHeader || loadMoreVehiclesInHeader)
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/enhancedHeader" */ './assets/enhancedHeader'
                )
            ).default(stickyHeader, loadMoreVehiclesInHeader);
        if (await getSetting('hideVehicleList'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/hideVehicleList" */ './assets/hideVehicleList'
                )
            ).default(LSSM, MODULE_ID, $m);
        if (await getSetting('centerMap'))
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallWindow/centerMap" */ './assets/centerMap'
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
                /* webpackChunkName: "modules/extendedCallWindow/tailoredTabs" */ './assets/tailoredTabs'
            )
        ).default(LSSM, tailoredTabSettings, stagingMode, $m);
}) as ModuleMainFunction;
