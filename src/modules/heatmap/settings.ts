import { Hidden } from 'typings/Setting';
import { ModuleSettingFunction } from 'typings/Module';

export default <ModuleSettingFunction>(() => ({
    'heatmapMode': <Hidden>{
        type: 'hidden',
    },
    'buildings.staticRadius': <Hidden>{
        type: 'hidden',
    },
    'buildings.radiusM': <Hidden>{
        type: 'hidden',
    },
    'buildings.radiusPx': <Hidden>{
        type: 'hidden',
    },
    'vehicles.staticRadius': <Hidden>{
        type: 'hidden',
    },
    'vehicles.radiusM': <Hidden>{
        type: 'hidden',
    },
    'vehicles.radiusPx': <Hidden>{
        type: 'hidden',
    },
}));
