import { ModuleSettingFunction } from 'typings/Module';
import { Hidden, MultiSelect, Toggle } from 'typings/Setting';

export default (() => ({
    clickableLinks: <Toggle>{
        type: 'toggle',
        default: true,
    },
    showImg: <Toggle>{
        type: 'toggle',
        default: true,
        dependsOn: '.clickableLinks',
    },
    linkPreviews: <Omit<MultiSelect, 'value' | 'isDisabled'>>{
        type: 'multiSelect',
        default: [],
        values: ['buildings', 'missions', 'vehicles', 'profile'],
    },
    mapUndo: <Toggle>{
        type: 'toggle',
        default: false,
        noMapkit: true,
    },
    browserTitle: <Toggle>{
        type: 'toggle',
        default: true,
    },
    emojiPicker: <Toggle>{
        type: 'toggle',
        default: false,
    },
    saveLastBuildingType: <Toggle>{
        type: 'toggle',
        default: true,
    },
    lastSavedBuildingType: <Hidden>{
        type: 'hidden',
    },
    saveLastDispatchCenter: <Toggle>{
        type: 'toggle',
        default: true,
    },
    lastSavedDispatchCenter: <Hidden>{
        type: 'hidden',
    },
})) as ModuleSettingFunction;
