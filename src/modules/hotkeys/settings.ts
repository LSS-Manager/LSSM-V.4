import { ModuleSettingFunction } from 'typings/Module';
import {
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
    ].sort();
    const labels: string[] = commands.map(
        command =>
            `${command
                .split('.')
                .slice(0, -1)
                .map((_, index, path) =>
                    $m(
                        `commands.${path.slice(0, index + 1).join('.')}.title`
                    ).toString()
                )
                .join(' – ')}: ${$m(`commands.${command}`).toString()}`
    );

    return {
        hotkeys: <Omit<AppendableList, 'value' | 'isDisabled'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'command',
                    title: $m('settings.command'),
                    size: 5,
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
