import { ModuleSettingFunction } from 'typings/Module';
import { Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>(() => ({
    showAverage: <Toggle>{
        type: 'toggle',
        default: true,
    },
}));
