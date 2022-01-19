import { ModuleSettingFunction } from 'typings/Module';
import {
    AppendableList,
    AppendableListSetting,
    Text,
    Toggle,
} from 'typings/Setting';

export default (async (MODULE_ID, LSSM, $m) => {
    const activeModules: string[] = await LSSM.$store.dispatch('storage/get', {
        key: 'activeModules',
        defaultValue: [],
    });
    return {
        enableCallList: <Toggle>{
            type: 'toggle',
            default: true,
            disabled: settings =>
                !activeModules.includes('extendedCallList') ||
                !settings.extendedCallList.shareMissions.value,
        },
        messages: <Omit<AppendableList, 'value' | 'isDisabled'>>{
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
                    name: 'message',
                    title: $m('settings.message'),
                    size: 0,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<Toggle>>{
                    name: 'postInChat',
                    title: $m('settings.postInChat'),
                    size: 2,
                    setting: {
                        type: 'toggle',
                    },
                },
            ],
            defaultItem: {
                name: '',
                message: '',
                postInChat: true,
            },
            orderable: true,
            disableable: false,
        },
    };
}) as ModuleSettingFunction;
