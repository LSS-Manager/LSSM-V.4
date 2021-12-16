import { Hidden } from 'typings/Setting';
import { ModuleSettingFunction } from 'typings/Module';

export default <ModuleSettingFunction>(() => ({
    radiusM: <Hidden>{
        type: 'hidden',
    },
}));
