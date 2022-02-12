import type { ModuleSettingFunction } from 'typings/Module';
import type { Toggle } from 'typings/Setting';

export default (() => ({
    buildingTax: <Toggle>{
        type: 'toggle',
        default: true,
    },
    missionPrisoners: <Toggle>{
        type: 'toggle',
        default: true,
    },
    missionReply: <Toggle>{
        type: 'toggle',
        default: false,
    },
    memberlistManageUser: <Toggle>{
        type: 'toggle',
        default: false,
    },
    deleteForumPost: <Toggle>{
        type: 'toggle',
        default: false,
    },
    deleteARR: <Toggle>{
        type: 'toggle',
        default: true,
    },
    switchExtensionState: <Toggle>{
        type: 'toggle',
        default: true,
    },
    buildingPersonal: <Toggle>{
        type: 'toggle',
        default: true,
    },
})) as ModuleSettingFunction;
