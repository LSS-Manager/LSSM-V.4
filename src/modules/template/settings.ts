import { ModuleSettingFunction } from 'typings/Module';
import { Toggle } from 'typings/Setting';

// The exported function may be async if required. Parameters are available (see Type-Declarations)
export default (() => ({
    // Key is the ID of the setting. The value is a Object with the matching type (see Type-Declarations for more info on the possibilities)
    aToggleSetting: <Toggle>{
        type: 'toggle',
        default: false,
    },
})) as ModuleSettingFunction;
