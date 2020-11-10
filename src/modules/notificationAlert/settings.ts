// import settingsItem from './components/settings-item.vue';
// import settingTitles from './components/settings-titles.vue';
import { ModuleSettingFunction } from 'typings/Module';
import {
    AppendableListSetting,
    MultiSelect,
    NewAppendableList,
    NumberInput,
    Select,
    Toggle,
} from 'typings/Setting';
export default ((_, __, $m) => {
    const events = $m('events');
    const alertStyles = $m('alertStyles');
    const positions = $m('positions');
    return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        alerts: <NewAppendableList>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<MultiSelect>>{
                    name: 'events',
                    title: $m('settings.eventTypes'),
                    size: 2,
                    setting: {
                        type: 'multiSelect',
                        values: Object.keys(events),
                        labels: Object.values(events),
                    },
                },
                <AppendableListSetting<Select>>{
                    name: 'alertStyle',
                    title: $m('settings.alertStyle'),
                    size: 0,
                    setting: {
                        type: 'select',
                        values: Object.keys(alertStyles),
                        labels: Object.values(alertStyles),
                    },
                },
                <AppendableListSetting<NumberInput>>{
                    name: 'duration',
                    title: $m('settings.duration'),
                    size: 0,
                    setting: {
                        type: 'number',
                        min: 0,
                    },
                },
                <AppendableListSetting<Toggle>>{
                    name: 'ingame',
                    title: $m('settings.ingame'),
                    size: 0,
                    setting: {
                        type: 'toggle',
                    },
                },
                <AppendableListSetting<Toggle>>{
                    name: 'desktop',
                    title: $m('settings.desktop'),
                    size: 0,
                    setting: {
                        type: 'toggle',
                    },
                },
                <AppendableListSetting<Select>>{
                    name: 'position',
                    title: $m('settings.position'),
                    size: 0,
                    setting: {
                        type: 'select',
                        values: Object.keys(positions),
                        labels: Object.values(positions),
                    },
                },
            ],
            defaultItem: {
                events: [],
                alertStyle: 'success',
                duration: 8000,
                ingame: true,
                desktop: true,
                position: 'bottom right',
            },
        },
    };
}) as ModuleSettingFunction;
