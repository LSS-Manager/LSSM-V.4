<template>
    <div>
        <enhanced-table
            :head="{
                category: { title: '', noSort: true },
                building: { title: $sm('building'), noSort: true },
                extension: { title: $sm('extension'), noSort: true },
                current: { title: $sm('current'), noSort: true },
                unavailable: { title: $sm('unavailable'), noSort: true },
                maximum: { title: $sm('maximum'), noSort: true },
            }"
            :table-attrs="{ class: 'table table-striped' }"
            :no-search="true"
            :no-body="true"
        >
            <tbody v-for="(category, title) in groups" :key="title">
                <tr v-for="(row, caption, index) in category.rows" :key="index">
                    <td
                        v-if="!index"
                        :rowspan="Object.keys(category.rows).length"
                    >
                        <b :style="`color: ${category.color};`">
                            {{ title }}
                        </b>
                    </td>
                    <td
                        v-if="row.type === 'building'"
                        :rowspan="row.children + 1"
                    >
                        {{ caption }}
                    </td>
                    <td>
                        <span v-if="row.type === 'extension'">
                            {{ caption.replace(/^\d+_/, '') }}
                        </span>
                    </td>
                    <td>{{ row.current }} ({{ row.enabled }})</td>
                    <td>{{ row.unavailable }}</td>
                    <td>{{ row.maximum }}</td>
                </tr>
            </tbody>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../../components/enhanced-table.vue';
import {
    BuildingTypes,
    BuildingTypesMethods,
} from 'typings/modules/Dashboard/BuildingTypes';
import { DefaultProps, DefaultComputed } from 'vue/types/options';
import { InternalBuilding, BuildingCategory } from 'typings/Building';

export default Vue.extend<
    BuildingTypes,
    BuildingTypesMethods,
    DefaultComputed,
    DefaultProps
>({
    name: 'building-types',
    components: { EnhancedTable },
    data() {
        const buildingTypes = Object.values(
            this.$t('buildings')
        ) as InternalBuilding[];
        const categories = (this.$t('buildingCategories') as unknown) as {
            [category: string]: BuildingCategory;
        };
        const categoryColors = Object.fromEntries(
            Object.entries(categories).map(([category, { color }]) => [
                category,
                color,
            ])
        ) as {
            [category: string]: string;
        };
        const groups = {} as BuildingTypes['groups'];
        Object.entries(categories).forEach(
            ([category, { buildings, color }]) => {
                groups[category] = {
                    color,
                    rows: Object.fromEntries(
                        Object.values(buildings).flatMap(buildingType => [
                            [
                                buildingTypes[buildingType].caption,
                                {
                                    type: 'building',
                                    children: [
                                        ...new Set(
                                            Object.values(
                                                buildingTypes[buildingType]
                                                    .extensions
                                            )
                                                .filter(e => !!e)
                                                .map(e => e.caption)
                                        ),
                                    ].length,
                                    total: 0,
                                    enabled: 0,
                                    unavailable: 0,
                                    maximum: 0,
                                },
                            ],
                            ...Object.values(
                                buildingTypes[buildingType].extensions
                            )
                                .filter(e => !!e)
                                .map(({ caption }) => [
                                    `${buildingType}_${caption}`,
                                    {
                                        type: 'extension',
                                        total: 0,
                                        enabled: 0,
                                        unavailable: 0,
                                        maximum: 0,
                                    },
                                ]),
                        ])
                    ),
                };
            }
        );
        return {
            buildingTypes,
            categoryColors,
            groups,
        };
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
