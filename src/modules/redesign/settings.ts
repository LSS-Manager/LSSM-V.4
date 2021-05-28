import { ModuleSettingFunction } from 'typings/Module';
import { Hidden, Toggle } from 'typings/Setting';

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
    'verband/protokoll': <Hidden>{
        type: 'hidden',
        default: {},
    },
    'category.alliance': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'category.credits': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'category.profile': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'category.vehicles': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'category.einsaetze': <Hidden>{
        type: 'hidden',
        default: true,
    },
    'category.toplist': <Toggle>{
        type: 'toggle',
        default: true,
    },
})) as ModuleSettingFunction;
