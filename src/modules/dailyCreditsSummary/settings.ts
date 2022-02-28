import type { ModuleSettingFunction } from 'typings/Module';
import type { Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>(() => ({
    showAverage: <Toggle>{
        type: 'toggle',
        default: true,
    },
}));
