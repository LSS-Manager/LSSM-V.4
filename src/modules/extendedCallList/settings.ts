import { $m, ModuleSettingFunction } from 'typings/Module';
import {
    AppendableList,
    AppendableListSetting,
    Hidden,
    MultiSelect,
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
        ($m('eventMissions.default') as unknown) as Record<
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

    const locale = LSSM.$store.state.lang;

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
        ...(['de_DE'].includes(locale)
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
        eventMissions: <Omit<AppendableList, 'value' | 'isDisabled'>>{
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
