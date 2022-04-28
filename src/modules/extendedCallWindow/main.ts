import type { ModuleMainFunction } from 'typings/Module';

interface AppendableListSetting<valueType> {
    value: valueType;
    enabled: boolean;
}

export default (async ({ LSSM, MODULE_ID, $m, $mc, getSetting }) => {
    const defaultTailoredTabs = Object.values(
        $m('tailoredTabs.defaultTabs')
    ).map(({ name, vehicleTypes }) => ({
        name,
        vehicleTypes: (Object.values(vehicleTypes) as (number | string)[]).map(
            t => t.toString()
        ),
    })) as {
        name: string;
        vehicleTypes: string[];
    }[];

    if (
        !window.location.pathname.match(/^\/(buildings|missions)\/\d+$\/?/u) ||
        document.querySelector<HTMLDivElement>('.missionNotFound')
    )
        return;

    const stagingMode = !!window.location.pathname.match(
        /^\/buildings\/\d+\/?$/u
    );
    if (stagingMode && !document.querySelector('#education_schooling_-1'))
        return;

    if (!stagingMode) {
        await LSSM.$store.dispatch('addStyle', {
            selectorText: '.vehicle_prisoner_select a.btn-danger',
            style: {
                'pointer-events': 'none',
                'opacity': '0.65',
            },
        });

        if (await getSetting('vehicleTypeInList')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/vehicleTypeInList" */ './assets/vehicleTypeInList'
            ).then(({ default: vehicleTypeInList }) => vehicleTypeInList());
        }
        if (await getSetting('generationDate')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/generationDate" */ './assets/generationDate'
            ).then(async ({ default: generationDate }) =>
                generationDate(
                    LSSM,
                    await getSetting<number>('yellowBorder'),
                    await getSetting('redBorder')
                )
            );
        }
        if (await getSetting('enhancedMissingVehicles')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/enhancedMissingVehicles" */ './assets/enhancedMissingVehicles'
            ).then(({ default: emv }) => emv(LSSM, MODULE_ID, $m));
        }
        if (await getSetting('patientSummary')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/patientSummary" */ './assets/patientSummary'
            ).then(({ default: patientSummary }) => patientSummary(LSSM, $m));
        }
        if (await getSetting('collapsablePatients')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/collapsablePatients" */ './assets/collapsablePatients'
            ).then(async ({ default: collapsablePatients }) =>
                collapsablePatients(
                    LSSM,
                    MODULE_ID,
                    await getSetting<number>('collapsablePatientsMinPatients'),
                    $m
                )
            );
        }
        if (
            (await getSetting('arrCounter')) ||
            (await getSetting('arrClickHighlight')) ||
            (await getSetting('arrCounterResetSelection'))
        ) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/arrCounter" */ './assets/arrCounter'
            ).then(({ default: arrCounter }) =>
                arrCounter(LSSM, getSetting, $m)
            );
        }

        const missionKeywordsSettings = await getSetting<
            AppendableListSetting<
                {
                    keyword: string;
                    color: string;
                    autotextcolor: boolean;
                    textcolor: string;
                    prefix: boolean;
                    missions: number[];
                }[]
            >
        >('missionKeywords');

        if (missionKeywordsSettings.value.length) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/missionKeywords" */ './assets/missionKeywords'
            ).then(({ default: missionKeywords }) =>
                missionKeywords(LSSM, missionKeywordsSettings.value)
            );
        }

        if (await getSetting('arrMatchHighlight')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/arrMatchHighlight" */ './assets/arrMatchHighlight'
            ).then(({ default: arrMatchHighlight }) => arrMatchHighlight(LSSM));
        }
        if (await getSetting('alarmTime')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/alarmTime" */ './assets/alarmTime'
            ).then(({ default: alarmTime }) => alarmTime(LSSM));
        }

        const alarmIconsSettings = await getSetting<
            AppendableListSetting<
                {
                    icon: string;
                    type: 'fab' | 'far' | 'fas';
                    vehicleTypes: (number | string)[];
                }[]
            >
        >('alarmIcons');
        if (alarmIconsSettings.value.length) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/alarmIcons" */ './assets/alarmIcons'
            ).then(({ default: alarmIcons }) =>
                alarmIcons(LSSM, alarmIconsSettings.value)
            );
        }

        const arrSpecs = await getSetting('arrSpecs');
        const arrTime = await getSetting('arrTime');
        if (arrSpecs || arrTime) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/arrHover" */ './assets/arrHover'
            ).then(({ default: arrHover }) =>
                arrHover(LSSM, arrSpecs, arrTime, MODULE_ID, $m)
            );
        }

        const stickyHeader = await getSetting('stickyHeader');
        const loadMoreVehiclesInHeader = await getSetting(
            'loadMoreVehiclesInHeader'
        );
        if (stickyHeader || loadMoreVehiclesInHeader) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/enhancedHeader" */ './assets/enhancedHeader'
            ).then(({ default: enhancedHeader }) =>
                enhancedHeader(LSSM, stickyHeader, loadMoreVehiclesInHeader)
            );
        }
        if (await getSetting('hideVehicleList')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/hideVehicleList" */ './assets/hideVehicleList'
            ).then(({ default: hideVehicleList }) =>
                hideVehicleList(LSSM, MODULE_ID, $m)
            );
        }
        if (await getSetting('centerMap')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/centerMap" */ './assets/centerMap'
            ).then(({ default: centerMap }) => centerMap(LSSM));
        }
        if (await getSetting('remainingPatientTime')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/remainingPatientTime" */ './assets/remainingPatientTime'
            ).then(({ default: remainingPatientTime }) =>
                remainingPatientTime(LSSM)
            );
        }

        const vehicleCounter = await getSetting('vehicleCounter');
        const playerCounter = await getSetting('playerCounter');
        if (vehicleCounter || playerCounter) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/vehiclePlayerCounter" */ './assets/vehiclePlayerCounter'
            ).then(async ({ default: vehiclePlayerCounter }) =>
                vehiclePlayerCounter(LSSM, $m, vehicleCounter, playerCounter, {
                    players: await getSetting<string>('playerCounterColor'),
                    vehicles: await getSetting<string>('vehicleCounterColor'),
                })
            );
        }

        if (await getSetting('arrSearch')) {
            import(
                /* webpackChunkName: "modules/extendedCallWindow/arrSearch" */ './assets/arrSearch'
            ).then(async ({ default: arrSearch }) =>
                arrSearch(
                    LSSM,
                    await getSetting('arrSearchAutoFocus'),
                    await getSetting('arrSearchDropdown'),
                    await getSetting('arrSearchDissolveCategories'),
                    await getSetting('arrSearchCloseDropdownOnSelect'),
                    $m
                )
            );
        }
    }

    const tailoredTabSettings = await getSetting<
        AppendableListSetting<
            {
                name: string;
                vehicleTypes: (number | string)[];
                color: `#${string}`;
            }[]
        >
    >('tailoredTabs');
    tailoredTabSettings.value = tailoredTabSettings.value.map(
        ({ name, vehicleTypes, color }) => ({
            name,
            vehicleTypes: vehicleTypes.map(t => t.toString()),
            color,
        })
    );
    if (
        (tailoredTabSettings.enabled &&
            !(await import('lodash/isEqual')).default(
                tailoredTabSettings.value,
                defaultTailoredTabs
            )) ||
        stagingMode
    ) {
        import(
            /* webpackChunkName: "modules/extendedCallWindow/tailoredTabs" */ './assets/tailoredTabs'
        ).then(({ default: tailoredTabs }) =>
            tailoredTabs(LSSM, tailoredTabSettings.value, stagingMode, $m, $mc)
        );
    }
    if (
        stagingMode &&
        (await getSetting<boolean>('stagingAreaSelectedCounter'))
    ) {
        import(
            /* webpackChunkName: "modules/extendedCallWindow/stagingAreaSelectedCounter" */ './assets/stagingAreaSelectedCounter'
        ).then(({ default: stagingAreaSelectedCounter }) =>
            stagingAreaSelectedCounter(LSSM)
        );
    }
}) as ModuleMainFunction;
