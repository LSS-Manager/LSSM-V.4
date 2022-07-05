import type { ModuleSettingFunction } from 'typings/Module';
import type { Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>(() => ({
    autoClickSuccessBtns: <Toggle>{
        type: 'toggle',
        default: true,
    },
}));
