import { ModuleSettingFunction } from 'typings/Module';
import {
    AppendableList,
    AppendableListSetting,
    Text,
    Textarea,
} from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => ({
    templates: <Omit<AppendableList, 'value' | 'isDisabled'>>{
        type: 'appendable-list',
        default: [],
        listItem: [
            <AppendableListSetting<Text>>{
                name: 'name',
                title: $m('settings.name'),
                size: 2,
                setting: {
                    type: 'text',
                },
            },
            <AppendableListSetting<Text>>{
                name: 'subject',
                title: $m('settings.subject'),
                size: 2,
                setting: {
                    type: 'text',
                },
            },
            <AppendableListSetting<Textarea>>{
                name: 'template',
                title: $m('settings.template'),
                size: 0,
                setting: {
                    type: 'textarea',
                },
            },
        ],
        defaultItem: {
            name: '',
            subject: '',
            template: '',
        },
        orderable: true,
        disableable: false,
    },
}));
