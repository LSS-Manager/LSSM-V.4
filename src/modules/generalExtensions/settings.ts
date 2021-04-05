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
    ownMapMarkers: <Toggle>{
        type: 'toggle',
        default: false,
        noMapkit: true,
    },
    savedOwnMapMarkers: <Hidden<{ lat: number; lng: number; zoom: number }[]>>{
        type: 'hidden',
    },
    mapMarkerPinned: <Hidden>{
        type: 'hidden',
        default: false,
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
    lastSavedBuildingType: <Hidden<string>>{
        type: 'hidden',
    },
    saveLastDispatchCenter: <Toggle>{
        type: 'toggle',
        default: true,
    },
    lastSavedDispatchCenter: <Hidden<string>>{
        type: 'hidden',
    },
    deleteSingleProtocolEntry: <Hidden>{
        type: 'hidden',
    },
    extensionCloseCall: <Toggle>{
        type: 'toggle',
        default: true,
    },
})) as ModuleSettingFunction;
