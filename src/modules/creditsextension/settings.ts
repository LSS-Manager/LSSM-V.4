import type { ModuleSettingFunction } from 'typings/Module';
import type {
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
    coinsInNavbar: <Toggle>{
        type: 'toggle',
        default: false,
    },
    showToplistPosition: <Toggle>{
        type: 'toggle',
        default: false,
    },
    showSales: <Toggle>{
        type: 'toggle',
        default: true,
    },
    highlightSales: <Toggle>{
        type: 'toggle',
        default: true,
        dependsOn: '.showSales',
    },
    alerts: <Omit<AppendableList, 'isDisabled' | 'value'>>{
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
