import type { ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    Text,
    Textarea,
} from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => ({
    chatTemplates: <Omit<AppendableList, 'isDisabled' | 'value'>>{
        type: 'appendable-list',
        default: [],
        listItem: [
            <AppendableListSetting<Text>>{
                name: 'name',
                title: $m('settings.chatTemplates.name'),
                size: 2,
                setting: {
                    type: 'text',
                },
            },
            <AppendableListSetting<Text>>{
                name: 'text',
                title: $m('settings.chatTemplates.text'),
                size: 0,
                setting: {
                    type: 'text',
                },
            },
        ],
        defaultItem: {
            name: '',
            text: '',
        },
        orderable: true,
        disableable: false,
    },
    templates: <Omit<AppendableList, 'isDisabled' | 'value'>>{
        type: 'appendable-list',
        default: [],
        listItem: [
            <AppendableListSetting<Text>>{
                name: 'name',
                title: $m('settings.templates.name'),
                size: 2,
                setting: {
                    type: 'text',
                },
            },
            <AppendableListSetting<Text>>{
                name: 'subject',
                title: $m('settings.templates.subject'),
                size: 2,
                setting: {
                    type: 'text',
                },
            },
            <AppendableListSetting<Textarea>>{
                name: 'template',
                title: $m('settings.templates.template'),
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
