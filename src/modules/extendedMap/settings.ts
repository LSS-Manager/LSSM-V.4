// import { InternalBuilding } from 'typings/Building';
import { ModuleSettingFunction } from 'typings/Module';
import { Location, NumberInput, Select, Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => {
    const positions = $m('positions');
    // const buildings = LSSM.$t('buildings') as Record<number, InternalBuilding>;

    // const dynamics = [
    //     ...Object.entries(buildings).map(([type, { caption }]) => [
    //         `building_${type}`,
    //         `${$m('dynamic.titles.buildings')}: ${caption}`,
    //     ]),
    // ];
    return {
        mapScale: <Toggle>{
            type: 'toggle',
            default: false,
        },
        mapScalePosition: <Select>{
            type: 'select',
            values: Object.keys(positions),
            labels: Object.values(positions),
            default: 'bottomright',
            dependsOn: '.mapScale',
        },
        centerMap: <Toggle>{
            type: 'toggle',
            default: true,
        },
        centerMapType: <Select>{
            type: 'select',
            values: [/*'dynamic',*/ 'static'],
            labels: [
                // $m('settings.centerMapType.dynamic'),
                $m('settings.centerMapType.static'),
            ],
            default: 'static',
            dependsOn: '.centerMap',
        },
        centerMapStaticLocation: <Location>{
            type: 'location',
            default: [0, 0, 0],
            zoom: true,
            disabled: ({ [MODULE_ID]: settings }) =>
                !(
                    settings.centerMap.value &&
                    settings.centerMapType.value === 'static'
                ),
        },
        // centerMapStaticZoom: <NumberInput>{
        //     type: 'number',
        //     min: 0,
        //     max: 17,
        //     step: 0.1,
        //     float: true,
        //     default: 13,
        // },
        // centerMapDynamics: <Omit<MultiSelect, 'value' | 'isDisabled'>>{
        //     type: 'multiSelect',
        //     values: [...Object.keys(buildings).map(type => `building_${type}`)],
        //     labels: [
        //         ...Object.values(buildings).map(
        //             ({ caption }) =>
        //                 `${$m('dynamic.titles.buildings')}: ${caption}`
        //         ),
        //     ],
        //     default: [],
        // },
    };
});
