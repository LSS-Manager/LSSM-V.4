import type { $m, ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    Hidden,
    MultiSelect,
    NumberInput,
    Select,
    Text,
    Toggle,
} from 'typings/Setting';

export default (async (MODULE_ID: string, LSSM: Vue, $m: $m) => {
    const { missionIds, missionNames } = await LSSM.$utils.getMissionOptions(
        LSSM,
        MODULE_ID,
        'settings'
    );

    const defaultEventmissions = Object.entries(
        $m('eventMissions.default') as unknown as Record<
            string,
            Record<number, number>
        >
    ).map(([text, missions]) => ({
        text,
        missions: Object.values(missions),
    })) as {
        text: string;
        missions: number[];
    }[];

    const locale = LSSM.$stores.root.locale;

    const bootsTrapColors = [
        'success',
        'warning',
        'danger',
        'primary',
        'info',
        'default',
    ];
    const bootsTrapColorLabels = bootsTrapColors.map(color =>
        $m(`settings.shareMissionsButtonColor.${color}`).toString()
    );

    return {
        remainingTime: <Toggle>{
            type: 'toggle',
            default: false,
        },
        remainingTimeGreenOnly: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.remainingTime',
        },
        remainingPatientTime: <Toggle>{
            type: 'toggle',
            default: false,
        },
        ...(['de_DE', 'fr_FR'].includes(locale)
            ? {
                  remainingPumpingTime: <Toggle>{
                      type: 'toggle',
                      default: false,
                  },
              }
            : {}),
        starrableMissions: <Toggle>{
            type: 'toggle',
            default: false,
        },
        starredMissions: <Hidden>{
            type: 'hidden',
        },
        averageCredits: <Toggle>{
            type: 'toggle',
            default: true,
        },
        collapsableMissions: <Toggle>{
            type: 'toggle',
            default: false,
        },
        collapsableMissionsAllBtn: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.collapsableMissions',
        },
        collapsedMissions: <Hidden>{
            type: 'hidden',
        },
        allMissionsCollapsed: <Hidden>{
            type: 'hidden',
        },
        shareMissions: <Toggle>{
            type: 'toggle',
            default: false,
        },
        shareMissionsTypes: <Omit<MultiSelect, 'isDisabled' | 'value'>>{
            type: 'multiSelect',
            values: ['', 'sicherheitswache', 'alliance'],
            labels: [
                $m('settings.shareMissionsTypes.own'),
                $m('settings.shareMissionsTypes.sicherheitswache'),
                $m('settings.shareMissionsTypes.alliance'),
            ],
            default: ['', 'sicherheitswache'],
            dependsOn: '.shareMissions',
        },
        shareMissionsMinCredits: <NumberInput>{
            type: 'number',
            default: 0,
            min: 0,
            step: 1,
            dependsOn: '.shareMissions',
        },
        shareMissionsButtonColor: <Select>{
            type: 'select',
            default: 'success',
            values: bootsTrapColors,
            labels: bootsTrapColorLabels,
            dependsOn: '.shareMissions',
        },
        sortMissions: <Toggle>{
            type: 'toggle',
            default: false,
        },
        sortMissionsType: <Hidden>{
            type: 'hidden',
        },
        sortMissionsDirection: <Hidden>{
            type: 'hidden',
        },
        sortMissionsButtonColor: <Select>{
            type: 'select',
            default: 'default',
            values: bootsTrapColors,
            labels: bootsTrapColorLabels,
            dependsOn: '.sortMissions',
        },
        sortMissionsInMissionwindow: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.sortMissions',
        },
        sortMissionsInMissionwindowChecked: <Hidden>{
            type: 'hidden',
        },
        currentPatients: <Toggle>{
            type: 'toggle',
            default: false,
        },
        hide0CurrentPatients: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.currentPatients',
        },
        currentPatientsInTooltips: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.currentPatients',
        },
        currentPrisoners: <Toggle>{
            type: 'toggle',
            default: false,
        },
        hide0CurrentPrisoners: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.currentPrisoners',
        },
        currentPrisonersInTooltips: <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.currentPrisoners',
        },
        fixedEventInfo: <Toggle>{
            type: 'toggle',
            default: false,
        },
        eventMissions: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: defaultEventmissions,
            listItem: [
                <AppendableListSetting<Text>>{
                    name: 'text',
                    title: $m('settings.eventMissions.text'),
                    size: 2,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'missions',
                    title: $m('settings.eventMissions.missions'),
                    size: 0,
                    setting: {
                        type: 'multiSelect',
                        values: missionIds,
                        labels: missionNames,
                    },
                },
            ],
            defaultItem: {
                text: '',
                missions: [],
            },
            orderable: false,
            disableable: true,
        },
    };
}) as ModuleSettingFunction;
