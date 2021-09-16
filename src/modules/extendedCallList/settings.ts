import { Mission } from 'typings/Mission';
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
    const missions = (await LSSM.$store.dispatch('api/getMissions', {
        force: false,
        feature: `${MODULE_ID}-settings`,
    })) as Mission[];
    const missionIds = [] as string[];
    const missionNames = [] as string[];
    const idLength = (missions.length - 1).toString().length;

    const numToLength = (length: number, num: number): string => {
        let numString = num.toString();
        while (numString.length < length) numString = `0${numString}`;
        return numString;
    };

    missions.forEach(({ id, name }) => {
        missionIds.push(id.toString());
        missionNames.push(`${numToLength(idLength, id)}: ${name}`);
    });

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
