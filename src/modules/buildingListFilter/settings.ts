import preview from './components/preview.vue';

import { InternalBuilding } from 'typings/Building';
import { ModuleSettingFunction } from 'typings/Module';
import {
    AppendableList,
    AppendableListSetting,
    Hidden,
    MultiSelect,
    PreviewElement,
    Select,
    Text,
} from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => {
    const defaultFilters = Object.values(
        ($m('default') as unknown) as Record<
            number,
            {
                ids: Record<number, number>;
                name: string;
            }
        >
    ).map(({ name, ids }) => ({
        contentType: 'text',
        title: name,
        buildings: Object.values(ids),
    }));

    const buildingCaptions = [] as string[];
    const buildingIds = [] as string[];
    Object.entries(
        LSSM.$t('buildings') as { [id: number]: InternalBuilding }
    ).forEach(([id, { caption }]) => {
        buildingCaptions.push(caption);
        buildingIds.push(id);
    });

    return {
        filters: <Omit<AppendableList, 'value' | 'isDisabled'>>{
            type: 'appendable-list',
            default: defaultFilters,
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'contentType',
                    title: $m('settings.contentType.title'),
                    size: 1,
                    setting: {
                        type: 'select',
                        values: ['text', 'icon'],
                        labels: Object.values(
                            $m('settings.contentType.labels')
                        ),
                    },
                },
                <AppendableListSetting<Select>>{
                    name: 'icon_style',
                    title: $m('settings.icon_style'),
                    size: 1,
                    setting: {
                        type: 'select',
                        values: ['fas', 'far', 'fab'],
                        labels: ['solid', 'regular', 'brand'],
                    },
                },
                <AppendableListSetting<Text>>{
                    name: 'title',
                    title: $m('settings.title'),
                    size: 2,
                    setting: {
                        type: 'text',
                    },
                },
                <PreviewElement>{
                    type: 'preview',
                    component: preview,
                    title: $m('settings.preview'),
                    size: 1,
                },
                <AppendableListSetting<MultiSelect>>{
                    name: 'buildings',
                    title: $m('settings.buildings'),
                    size: 0,
                    setting: {
                        type: 'multiSelect',
                        values: buildingIds,
                        labels: buildingCaptions,
                    },
                },
                <AppendableListSetting<Hidden>>{
                    name: 'state',
                    setting: {
                        type: 'hidden',
                    },
                },
            ],
            defaultItem: {
                contentType: 'text',
                icon_style: 'fas',
                title: '',
                buildings: [],
                state: 'enabled',
            },
            orderable: true,
        },
    };
});
