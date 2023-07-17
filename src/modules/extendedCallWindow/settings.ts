import aiPreview from './components/alarmIcons/aiPreview.vue';
import mkPreview from './components/missionKeywords/mkPreview.vue';

import type { $m, ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    Color,
    Hidden,
    MultiSelect,
    NumberInput,
    PreviewElement,
    Select,
    Text,
    Toggle,
} from 'typings/Setting';

export default (async (MODULE_ID: string, LSSM: Vue, $m: $m) => {
    const defaultTailoredTabs = Object.values(
        $m('tailoredTabs.defaultTabs')
    ).map(({ name, vehicleTypes }) => ({
        name,
        vehicleTypes: Object.values(vehicleTypes),
    })) as {
        name: string;
        vehicleTypes: (number | string)[];
    }[];

    const vehicles = LSSM.$stores.translations.vehicles;
    const vehicleValues: { id: string; caption: string }[] = [];
    Object.entries(vehicles).forEach(([id, { caption }]) =>
        vehicleValues.push({ id, caption })
    );

    (await LSSM.$stores.api.getVehicles(`${MODULE_ID}_settings`)).value
        .filter(v => v.vehicle_type_caption && vehicles[v.vehicle_type])
        .forEach(({ vehicle_type, vehicle_type_caption = '' }) => {
            const caption = `[${vehicles[vehicle_type].caption}] ${vehicle_type_caption}`;
            if (
                !vehicle_type_caption ||
                vehicleValues.some(v => v.caption === caption)
            )
                return;
            vehicleValues.push({
                caption,
                id: `${vehicle_type}-${vehicle_type_caption}`,
            });

            const noCustomsType = `${vehicle_type}*`;
            if (!vehicleValues.some(v => v.id === noCustomsType)) {
                vehicleValues.push({
                    caption: `${vehicles[vehicle_type].caption} [${$m(
                        'tailoredTabs.noCustoms'
                    )}]`,
                    id: noCustomsType,
                });
            }
        });

    const vehicleValuesSorted = [...vehicleValues].sort(
        ({ caption: a }, { caption: b }) => {
            if (a.startsWith('[') && !b.startsWith('[')) return 1;
            if (!a.startsWith('[') && b.startsWith('[')) return -1;
            return a.toLowerCase().localeCompare(b.toLowerCase());
        }
    );
    const vehicleIdsSorted = vehicleValuesSorted.map(({ id }) => id);
    const vehicleCaptionsSorted = vehicleValuesSorted.map(
        ({ caption }) => caption
    );

    const { missionIds, missionNames } = await LSSM.$utils.getMissionOptions(
        LSSM,
        MODULE_ID,
        'settings'
    );

    const bootsTrapColors = [
        'success',
        'warning',
        'danger',
        'primary',
        'info',
        'default',
    ];
    const bootsTrapColorLabels = bootsTrapColors.map(color =>
        $m(`settings.vehicleCounterColor.${color}`).toString()
    );

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
        emvMaxStaff: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.enhancedMissingVehicles',
        },
        hoverTip: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.enhancedMissingVehicles',
        },
        patientSummary: <Toggle>{
            type: 'toggle',
            default: true,
        },
        collapsablePatients: <Toggle>{
            type: 'toggle',
            default: false,
        },
        collapsablePatientsMinPatients: <NumberInput>{
            type: 'number',
            default: 7,
            dependsOn: '.collapsablePatients',
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
        arrMatchHighlightAllWords: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.arrMatchHighlight',
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
        stagingAreaSelectedCounter: <Toggle>{
            type: 'toggle',
            default: true,
        },
        vehicleTypeInList: <Toggle>{
            type: 'toggle',
            default: false,
        },
        remainingPatientTime: <Toggle>{
            type: 'toggle',
            default: true,
        },
        vehicleCounter: <Toggle>{
            type: 'toggle',
            default: false,
        },
        vehicleCounterColor: <Select>{
            type: 'select',
            default: 'info',
            values: bootsTrapColors,
            labels: bootsTrapColorLabels,
            dependsOn: '.vehicleCounter',
        },
        vehicleListPermanentSearch: <Toggle>{
            type: 'toggle',
            default: false,
        },
        playerCounter: <Toggle>{
            type: 'toggle',
            default: false,
        },
        playerCounterColor: <Select>{
            type: 'select',
            default: 'danger',
            values: bootsTrapColors,
            labels: bootsTrapColorLabels,
            dependsOn: '.playerCounter',
        },
        selectedVehicleCounter: <Toggle>{
            type: 'toggle',
            default: false,
        },
        selectedVehicleCounterBtnVehicles: <MultiSelect>{
            type: 'multiSelect',
            values: vehicleIdsSorted,
            labels: vehicleCaptionsSorted,
            default: [] as string[],
            dependsOn: '.selectedVehicleCounter',
        },
        arrSearch: <Toggle>{
            type: 'toggle',
            default: false,
        },
        arrSearchDissolveCategories: <Toggle>{
            type: 'toggle',
            default: false,
            disabled: settings =>
                !settings[MODULE_ID].arrSearch.value ||
                settings[MODULE_ID].arrSearchDropdown.value,
        },
        arrSearchCompactResults: <Toggle>{
            type: 'toggle',
            default: false,
            disabled: settings =>
                !settings[MODULE_ID].arrSearch.value ||
                settings[MODULE_ID].arrSearchDropdown.value,
        },
        arrSearchSelectOnEnter: <Toggle>{
            type: 'toggle',
            default: false,
            disabled: settings =>
                !settings[MODULE_ID].arrSearch.value ||
                settings[MODULE_ID].arrSearchDropdown.value,
        },
        arrSearchClearOnEnter: <Toggle>{
            type: 'toggle',
            default: false,
            disabled: settings =>
                !settings[MODULE_ID].arrSearch.value ||
                settings[MODULE_ID].arrSearchDropdown.value,
        },
        arrSearchAutoFocus: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.arrSearch',
        },
        arrSearchDropdown: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.arrSearch',
        },
        arrSearchCloseDropdownOnSelect: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.arrSearchDropdown',
        },
        moreReleasePatientButtons: <Toggle>{
            type: 'toggle',
            default: false,
        },
        tailoredTabs: <Omit<AppendableList, 'isDisabled' | 'value'>>{
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
                <AppendableListSetting<Color>>{
                    name: 'color',
                    title: $m('settings.tailoredTabs.color'),
                    size: 1,
                    setting: {
                        type: 'color',
                    },
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'vehicleTypes',
                    title: $m('settings.tailoredTabs.vehicles'),
                    size: 0,
                    setting: {
                        type: 'multiSelect',
                        values: vehicleIdsSorted,
                        labels: vehicleCaptionsSorted,
                    },
                },
            ],
            defaultItem: {
                name: '',
                color: LSSM.$stores.root.isDarkMode ? '#505050' : '#fff',
                vehicleTypes: [],
            },
            orderable: true,
            disableable: true,
        },
        missionKeywords: <Omit<AppendableList, 'isDisabled' | 'value'>>{
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
                    size: 2,
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
                <PreviewElement<typeof mkPreview>>{
                    type: 'preview',
                    component: mkPreview,
                    title: $m('settings.missionKeywords.preview').toString(),
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
                        values: [-1, ...missionIds],
                        labels: [
                            $m('settings.missionKeywords.allMissions'),
                            ...missionNames,
                        ],
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
            disableable: false,
        },
        alarmIcons: <Omit<AppendableList, 'isDisabled' | 'value'>>{
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
                <PreviewElement<typeof aiPreview>>{
                    type: 'preview',
                    component: aiPreview,
                    title: $m('settings.alarmIcons.preview'),
                    size: 1,
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'vehicleTypes',
                    title: $m('settings.alarmIcons.vehicles'),
                    size: 0,
                    setting: {
                        type: 'multiSelect',
                        values: vehicleIdsSorted,
                        labels: vehicleCaptionsSorted,
                    },
                },
            ],
            defaultItem: {
                icon: '',
                type: 'fas',
                vehicleTypes: [],
            },
            orderable: true,
            disableable: false,
        },
        arrCategoryColors: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Text>>{
                    name: 'categoryName',
                    title: $m('settings.arrCategoryColors.category'),
                    size: 3,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<Color>>{
                    name: 'bgColor',
                    title: $m('settings.arrCategoryColors.bgColor'),
                    size: 3,
                    setting: {
                        type: 'color',
                    },
                },
                <AppendableListSetting<Color>>{
                    name: 'color',
                    title: $m('settings.arrCategoryColors.color'),
                    size: 3,
                    setting: {
                        type: 'color',
                    },
                },
            ],
            defaultItem: {
                categoryName: '',
                bgColor: LSSM.$stores.root.isDarkMode ? '#505050' : '#ffffff',
                color: LSSM.$stores.root.isDarkMode ? '#ffffff' : '#337ab7',
            },
            orderable: false,
            disableable: false,
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
