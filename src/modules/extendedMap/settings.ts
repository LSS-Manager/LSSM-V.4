import { ModuleSettingFunction } from 'typings/Module';
import { Select, Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>((_, __, $m) => {
    const positions = $m('positions');
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
    };
});
