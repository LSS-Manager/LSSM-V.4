import { mapFilterInitializer } from './assets/getMapFilterInitializer';

import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    const dynamic: boolean = await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'dynamic',
    });
    const dynamicFilters: string[] = await LSSM.$store.dispatch(
        'settings/getSetting',
        {
            moduleId: MODULE_ID,
            settingId: 'dynamicFilters',
        }
    );

    if (dynamic) {
        const mapFilterLayers = window.map_filters_service.getMapFiltersLayers();
        const group = window.L.featureGroup(
            dynamicFilters.flatMap(filter_id =>
                mapFilterLayers[filter_id].getLayers()
            )
        );
        console.log(dynamicFilters, group);
    }
});
