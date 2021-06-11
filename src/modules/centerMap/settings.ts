import { mapFilterInitializer } from './assets/getMapFilterInitializer';

import { ModuleSettingFunction } from 'typings/Module';
import { MultiSelect, Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => {
    const filterValues: string[] = [];
    const defaultFilters: string[] = [];
    const filterLabels: string[] = [];
    mapFilterInitializer.sorted_map_filters.forEach(({ filter_id, text }) => {
        if (filter_id.startsWith('user_') || filter_id.startsWith('all_'))
            return;
        filterValues.push(filter_id);
        const isBuilding = Object.values(
            mapFilterInitializer.building_types_collection
        ).includes(filter_id);
        filterLabels.push(
            (mapFilterInitializer.mission_types_collection.includes(filter_id)
                ? `${$m('filters.missions')}: `
                : isBuilding
                ? `${$m('filters.buildings')}: `
                : '') + text
        );
        if (isBuilding) defaultFilters.push(filter_id);
    });
    return {
        dynamic: <Toggle>{
            type: 'toggle',
            default: false,
        },
        dynamicFilters: <MultiSelect>{
            type: 'multiSelect',
            values: filterValues,
            default: defaultFilters,
            labels: filterLabels,
            dependsOn: '.dynamic',
        },
    };
});
