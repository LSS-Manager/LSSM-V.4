import { ModuleSettingFunction } from 'typings/Module';
import { Text } from 'typings/Setting';

export default (() => ({
    format: <Text>{
        type: 'text',
        default: 'DD.MM LTS',
    },
})) as ModuleSettingFunction;
