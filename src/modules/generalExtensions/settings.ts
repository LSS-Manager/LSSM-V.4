import type { ModuleSettingFunction } from 'typings/Module';
import type { Hidden, MultiSelect, Select, Toggle } from 'typings/Setting';

export default ((_, __, $m) => {
    const positions = $m('positions');
    return {
        clickableLinks: <Toggle>{
            type: 'toggle',
            default: true,
        },
        showImg: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.clickableLinks',
        },
        notePreview: <Toggle>{
            type: 'toggle',
            default: true,
            dependsOn: '.clickableLinks',
        },
        linkPreviews: <Omit<MultiSelect, 'isDisabled' | 'value'>>{
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
        savedOwnMapMarkers: <
            Hidden<{ lat: number; lng: number; zoom: number }[]>
        >{
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
        mapSearchOnMap: <Toggle>{
            type: 'toggle',
            default: false,
        },
        mapSearchOnMapPosition: <Select>{
            type: 'select',
            values: Object.keys(positions),
            labels: Object.values(positions),
            default: 'top-right',
            dependsOn: '.mapSearchOnMap',
        },
        aaoExportQr: <Toggle>{
            type: 'toggle',
            default: false,
        },
    };
}) as ModuleSettingFunction;
