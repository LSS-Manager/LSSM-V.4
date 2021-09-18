import { HotKey } from 'typings/Setting';
import { ModuleSettingFunction } from 'typings/Module';

export default (() => ({
    exampleHotkey: <HotKey>{
        type: 'hotkey',
        default: '',
    },
})) as ModuleSettingFunction;
