import { ModuleSettingFunction } from 'typings/Module';
import { Hidden } from 'typings/Setting';

export default (() => ({
    'vehicle': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'credits/daily': <Hidden>{
        type: 'hidden',
        default: {},
    },
})) as ModuleSettingFunction;
