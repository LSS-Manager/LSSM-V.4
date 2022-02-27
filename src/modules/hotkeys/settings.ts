import getCommandName from './assets/getCommandName';

import type { ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    HotKey,
    Select,
} from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => {
    const commands: string[] = [
        'main.chat.focus',
        'main.map.search.focus',
        'main.missionlist.search.focus',
        'main.lssm.menu.toggle',
        '*.credits.open',
        '*.credits.daily',
        '*.credits.overview',
        '*.tasks.open',
        '*.profile.open',
        '*.profile.level',
        '*.profile.awards',
        '*.profile.notes',
        '*.alliance.open',
        '*.alliance.members',
        '*.alliance.onlineMembers',
        '*.alliance.buildings',
        '*.alliance.funds',
        '*.alliance.forum',
        '*.alliance.schoolings',
        '*.alliance.messages',
        '*.alliance.applications',
        '*.alliance.logfiles',
        '*.protocol',
        'mission.sorted.alert_next',
        'mission.sorted.prev',
        'mission.sorted.next',
        'mission.sorted.alert_share_next',
    ].sort();
    const labels: string[] = commands.map(command =>
        getCommandName(command, $m)
    );

    return {
        hotkeys: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'command',
                    title: $m('settings.command'),
                    size: 5,
                    unique: true,
                    setting: {
                        type: 'select',
                        values: commands,
                        labels,
                    },
                },
                <AppendableListSetting<HotKey>>{
                    name: 'hotkey',
                    title: $m('settings.hotkey'),
                    size: 0,
                    unique: true,
                    setting: {
                        type: 'hotkey',
                    },
                },
            ],
            defaultItem: {
                command: '',
                hotkey: '',
            },
            orderable: false,
            disableable: false,
        },
    };
});
