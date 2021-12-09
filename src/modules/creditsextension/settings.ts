import { ModuleSettingFunction } from 'typings/Module';
import {
    AppendableList,
    AppendableListSetting,
    NumberInput,
    Toggle,
} from 'typings/Setting';

export default <ModuleSettingFunction>(() => ({
    creditsInNavbar: <Toggle>{
        type: 'toggle',
        default: false,
    },
    showToplistPosition: <Toggle>{
        type: 'toggle',
        default: false,
    },
    alerts: <Omit<AppendableList, 'value' | 'isDisabled'>>{
        type: 'appendable-list',
        default: [],
        listItem: [
            <AppendableListSetting<NumberInput>>{
                name: 'credits',
                size: 0,
                setting: {
                    type: 'number',
                    step: 1,
                    min: 0,
                },
            },
        ],
        defaultItem: { credits: 0 },
        orderable: false,
        disableable: false,
    },
}));
