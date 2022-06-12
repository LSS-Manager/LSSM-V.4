import type { ModuleSettingFunction } from 'typings/Module';
import type { Color, Text, Toggle } from 'typings/Setting';

export default (() => ({
    chatTime: <Toggle>{
        type: 'toggle',
        default: true,
    },
    chatTimeFormat: <Text>{
        type: 'text',
        default: 'DD.MM LTS',
        dependsOn: '.chatTime',
    },
    cloneHistoryBtnToHeader: <Toggle>{
        type: 'toggle',
        default: false,
    },
    selfHighlight: <Toggle>{
        type: 'toggle',
        default: false,
    },
    selfHighlightColor: <Color>{
        type: 'color',
        default: '#5cb85c',
        dependsOn: '.selfHighlight',
    },
})) as ModuleSettingFunction;
