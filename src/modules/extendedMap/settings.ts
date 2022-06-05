import type { ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    Hidden,
    Location,
    MultiSelect,
    Select,
    Text,
    Toggle,
} from 'typings/Setting';
import type { Building, InternalBuilding } from 'typings/Building';

export default <ModuleSettingFunction>(async (MODULE_ID, LSSM, $m) => {
    const positions = $m('positions');

    const buildingTypes: Record<number, InternalBuilding> =
        LSSM.$store.getters.$tBuildings;

    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: `${MODULE_ID}-settings`,
    });
    const userBuildings = LSSM.$store.state.api.buildings as Building[];
    const userBuildingIds: string[] = [];
    const userBuildingLabels: string[] = [];

    userBuildings
        .map(({ id, caption, building_type }) => [
            id.toString(),
            `[${buildingTypes[building_type].caption}] ${caption}`,
        ])
        .sort(([, labelA], [, labelB]) => labelA.localeCompare(labelB))
        .forEach(([id, label]) => {
            userBuildingIds.push(id);
            userBuildingLabels.push(label);
        });

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
        markerNewWindow: <Toggle>{
            type: 'toggle',
            default: true,
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
        buildingComplexes: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Text>>{
                    name: 'name',
                    title: $m('settings.buildingComplexes.name'),
                    size: 2,
                    setting: {
                        type: 'text',
                    },
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'buildings',
                    title: $m('settings.buildingComplexes.buildings'),
                    size: 0,
                    unique: true,
                    setting: {
                        type: 'multiSelect',
                        values: userBuildingIds,
                        labels: userBuildingLabels,
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'allianceBuildings',
                    setting: {
                        type: 'hidden',
                    },
                },
                <AppendableListSetting<Location>>{
                    name: 'position',
                    title: $m('settings.buildingComplexes.position'),
                    size: 2,
                    setting: {
                        type: 'location',
                        default: [0, 0],
                        zoom: false,
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'icon',
                    setting: {
                        type: 'hidden',
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'showMarkers',
                    setting: {
                        type: 'hidden',
                    },
                },
            ],
            defaultItem: {
                name: '',
                buildings: [],
                allianceBuildings: [],
                position: [0, 0],
                icon: '/images/building_complex.png',
                showMarkers: false,
            },
            orderable: false,
            disableable: false,
        },
    };
});
