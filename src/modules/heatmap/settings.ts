import { Hidden } from 'typings/Setting';
import { ModuleSettingFunction } from 'typings/Module';

export default <ModuleSettingFunction>(() => ({
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
}));
