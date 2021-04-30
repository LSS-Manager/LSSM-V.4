import { ModuleSettingFunction } from 'typings/Module';
import { Hidden, Toggle } from 'typings/Setting';

export default (() => ({
    remainingTime: <Toggle>{
        type: 'toggle',
        default: false,
    },
    remainingTimeGreenOnly: <Toggle>{
        type: 'toggle',
        default: true,
        dependsOn: '.remainingTime',
    },
    starrableMissions: <Toggle>{
        type: 'toggle',
        default: false,
    },
    starredMissions: <Hidden>{
        type: 'hidden',
    },
})) as ModuleSettingFunction;
