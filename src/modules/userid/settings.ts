import type { ModuleSettingFunction } from 'typings/Module';
import type { Toggle } from 'typings/Setting';

export default (() => ({
    navbar: <Toggle>{
        type: 'toggle',
        default: false,
    },
})) as ModuleSettingFunction;
