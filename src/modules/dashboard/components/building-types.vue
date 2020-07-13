<template>
    <enhanced-table
        :head="{
            extension: { title: $sm('extension'), noSort: true },
            current: { title: $sm('current'), noSort: true },
            unavailable: { title: $sm('unavailable'), noSort: true },
            maximum: { title: $sm('maximum'), noSort: true },
        }"
        :table-attrs="{ class: 'table table-striped' }"
        :search="search"
        @search="s => (search = s)"
    >
        <tr v-for="(buildings, category) in rows" :key="category">
            <td>
                <b :style="`color: ${categoryColors[category]};`">{{
                    category
                }}</b>
            </td>
            <td>
                <pre>{{ buildings }}</pre>
            </td>
        </tr>
    </enhanced-table>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../../components/enhanced-table.vue';
import {
    BuildingTypes,
    BuildingTypesMethods,
    BuildingTypesComputed,
    Extension,
    BuildingType,
} from 'typings/modules/Dashboard/BuildingTypes';
import { DefaultProps } from 'vue/types/options';
import { InternalBuilding, Building, BuildingCategory } from 'typings/Building';
import cloneDeep from 'lodash/cloneDeep';

export default Vue.extend<
    BuildingTypes,
    BuildingTypesMethods,
    BuildingTypesComputed,
    DefaultProps
>({
    name: 'building-types',
    components: { EnhancedTable },
    data() {
        const buildingTypes = Object.values(
            this.$t('buildings')
        ) as InternalBuilding[];
        const extensionList = [] as BuildingTypes['extensionList'];
        buildingTypes.forEach(({ caption, color, extensions }, type) => {
            extensionList.push({
                caption,
                color,
                type,
                amount: 0,
            });
            Object.values(extensions).forEach((extension, index) => {
                if (!extension) return;
                const e = extensionList.find(
                    e =>
                        e.caption === extension.caption &&
                        e.hasOwnProperty('parent') &&
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        e.parent === caption
                ) as Extension;
                if (!e)
                    extensionList.push({
                        caption: extension.caption,
                        parent: caption,
                        maximal: 1,
                        types: [`${type}_${index}`],
                    });
                else {
                    e.maximal++;
                    e.types.push(`${type}_${index}`);
                }
            });
        });
        const categoryColors = Object.fromEntries(
            Object.entries(
                (this.$t('buildingCategories') as unknown) as {
                    [category: string]: BuildingCategory;
                }
            ).map(([category, { color }]) => [category, color])
        ) as {
            [category: string]: string;
        };
        return {
            search: '',
            sort: 'title',
            sortDir: 'asc',
            buildingTypes,
            extensionList,
            categoryColors,
        };
    },
    computed: {
        rows() {
            const buildingCategories = this.$store.getters[
                'api/buildingsByCategory'
            ] as {
                [category: string]: Building[];
            };
            const categories = {} as {
                [category: string]: (BuildingType & {
                    extensions: { [caption: string]: number };
                })[];
            };
            Object.entries(buildingCategories).forEach(
                ([category, buildings]) => {
                    categories[category] = [];
                    buildings.forEach(({ building_type, extensions }) => {
                        const tracked = categories[category].find(
                            t =>
                                t.hasOwnProperty('type') &&
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                t.type === building_type
                        ) as BuildingType;
                        if (tracked) tracked.amount++;
                        else {
                            const building = cloneDeep(
                                this.extensionList.find(
                                    e =>
                                        e.hasOwnProperty('type') &&
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        e.type === building_type
                                )
                            ) as BuildingType & {
                                extensions: { [caption: string]: number };
                            };
                            if (building) {
                                building.amount++;
                                building.extensions = {};
                                categories[category].push(building);
                            }
                        }
                        const building = categories[category].find(
                            b => b.type === building_type
                        );
                        building &&
                            extensions.forEach(extension => {
                                const tracked =
                                    building.extensions[
                                        Object.keys(building.extensions).find(
                                            c => c === extension.caption
                                        ) || ''
                                    ];
                                if (!tracked)
                                    building.extensions[extension.caption]++;
                                else {
                                    const extensionType = cloneDeep(
                                        this.extensionList.find(
                                            e =>
                                                e.hasOwnProperty('types') &&
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                // @ts-ignore
                                                e.types.includes(
                                                    `${building_type}_${extension.type_id}`
                                                )
                                        )
                                    ) as Extension;
                                    if (extensionType)
                                        building.extensions[
                                            extension.caption
                                        ]++;
                                }
                            });
                    });
                }
            );
            return categories;
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.${key}`, args);
        },
        $sm(key, args) {
            return this.$m(`building-types.${key}`, args);
        },
    },
});
</script>

<style scoped lang="sass"></style>
