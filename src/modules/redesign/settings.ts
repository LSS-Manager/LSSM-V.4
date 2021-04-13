import { Hidden } from 'typings/Setting';
import { ModuleSettingFunction } from 'typings/Module';

export default (() => ({
    'alliances': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'credits/daily': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'freunde': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'profile': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'toplist': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'vehicle': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'verband/mitglieder': <Hidden>{
        type: 'hidden',
        default: {},
    },
})) as ModuleSettingFunction;
