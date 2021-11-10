import { ModuleSettingFunction } from 'typings/Module';
import { Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>(() => ({
    creditsInNavbar: <Toggle>{
        type: 'toggle',
        default: false,
    },
}));
