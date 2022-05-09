import type { ModuleSettingFunction } from 'typings/Module';
import type { Text, Toggle } from 'typings/Setting';

export default (() => ({
    chatTime: <Toggle>{
        type: 'toggle',
        default: true,
    },
    chatTimeFormat: <Text>{
        type: 'text',
        default: 'DD.MM LTS',
        dependsOn: '.chatTime',
    },
    cloneHistoryBtnToHeader: <Toggle>{
        type: 'toggle',
        default: false,
    },
})) as ModuleSettingFunction;
