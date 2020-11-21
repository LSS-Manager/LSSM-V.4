import { ModuleSettingFunction } from 'typings/Module';
import { Text, Toggle } from 'typings/Setting';

export default (() => ({
    allowTelemetry: <Toggle>{
        type: 'toggle',
        default: false,
    },
})) as ModuleSettingFunction;
