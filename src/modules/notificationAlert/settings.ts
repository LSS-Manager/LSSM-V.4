import settingsItem from './components/settings-item.vue';
import settingTitles from './components/settings-titles.vue';
import { ModuleSettingFunction } from 'typings/Module';
import { AppendableList } from 'typings/Setting';

export default (() => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    alerts: <Omit<AppendableList, 'value' | 'isDisabled'>>{
        type: 'appendable-list',
        default: [],
        listItemComponent: settingsItem,
        titleComponent: settingTitles,
        defaultItem: {
            events: [],
            alertStyle: 'success',
            duration: 8000,
            ingame: true,
            desktop: true,
            position: 'bottom right',
        },
    },
})) as ModuleSettingFunction;
