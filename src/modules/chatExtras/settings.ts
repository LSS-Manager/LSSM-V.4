import { ModuleSettingFunction } from 'typings/Module';
import { Text, Toggle } from 'typings/Setting';

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
})) as ModuleSettingFunction;
