import { ModuleSettingFunction } from 'typings/Module';
import { Toggle } from 'typings/Setting';

export default (() => ({
    remainingTime: <Toggle>{
        type: 'toggle',
        default: false,
    },
})) as ModuleSettingFunction;
