import { ModuleSettingFunction } from 'typings/Module';
import { HotKey, Toggle } from 'typings/Setting';

export default (() => ({
    prevNextElement: <Toggle>{
        type: 'toggle',
        default: false,
    },
    prevElementKey: <HotKey>{
        type: 'hotkey',
        default: 'left',
        dependsOn: '.prevNextElement',
    },
    nextElementKey: <HotKey>{
        type: 'hotkey',
        default: 'right',
        dependsOn: '.prevNextElement',
    },
})) as ModuleSettingFunction;
