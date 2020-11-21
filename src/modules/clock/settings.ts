import { ModuleSettingFunction } from 'typings/Module';
import { Text, Toggle } from 'typings/Setting';

export default (() => ({
    displayNav: <Toggle>{
        type: 'toggle',
        default: true,
    },
    navFormat: <Text>{
        type: 'text',
        default: 'LTS',
        dependsOn: '.displayNav',
    },
    displayOverlay: <Toggle>{
        type: 'toggle',
        default: false,
    },
    overlayFormat: <Text>{
        type: 'text',
        default: 'LTS',
        dependsOn: '.displayOverlay',
    },
})) as ModuleSettingFunction;
