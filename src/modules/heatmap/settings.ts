import { ModuleSettingFunction } from 'typings/Module';
import { Hidden, Select } from 'typings/Setting';

export default <ModuleSettingFunction>((_, __, $m) => {
    const positions = $m('positions');
    return {
        position: <Select>{
            type: 'select',
            values: Object.keys(positions),
            labels: Object.values(positions),
            default: 'bottom-left',
        },
        heatmapMode: <Hidden>{
            type: 'hidden',
        },
        buildingsStaticRadius: <Hidden>{
            type: 'hidden',
        },
        buildingsRadiusM: <Hidden>{
            type: 'hidden',
        },
        buildingsRadiusPx: <Hidden>{
            type: 'hidden',
        },
        buildingsIntensityMaxZoom: <Hidden>{
            type: 'hidden',
        },
        buildingsIncludes: <Hidden>{
            type: 'hidden',
        },
        vehiclesStaticRadius: <Hidden>{
            type: 'hidden',
        },
        vehiclesRadiusM: <Hidden>{
            type: 'hidden',
        },
        vehiclesRadiusPx: <Hidden>{
            type: 'hidden',
        },
        vehiclesIntensityMaxZoom: <Hidden>{
            type: 'hidden',
        },
        vehiclesIncludes: <Hidden>{
            type: 'hidden',
        },
    };
});
