<template>
    <enhanced-table
        :head="{
            category: { title: '', noSort: true },
            extension: { title: $sm('extension'), noSort: true },
            current: { title: $sm('current'), noSort: true },
            unavailable: { title: $sm('unavailable'), noSort: true },
            maximum: { title: $sm('maximum'), noSort: true },
        }"
        :table-attrs="{ class: 'table table-striped' }"
        :no-search="true"
        :no-body="true"
    >
        <tbody v-for="(buildings, category) in rows" :key="category">
            <tr v-for="(building, index) in buildings" :key="index">
                <td v-if="building.type" :rowspan="buildings.length">
                    <b :style="`color: ${categoryColors[category]};`">{{
                        category
                    }}</b>
                </td>
                <td>{{ building.caption }}</td>
                <td>{{ building.amount.toLocaleString() }}</td>
                <td>0</td>
                <td>–</td>
            </tr>
        </tbody>
    </enhanced-table>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../../components/enhanced-table.vue';
import {
    BuildingTypes,
    BuildingTypesMethods,
    BuildingTypesComputed,
    BuildingType,
    Category,
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
        buildingTypes.forEach(({ caption, color }, type) => {
            extensionList.push({
                caption,
                color,
                type,
                amount: 0,
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
            const categories = {} as BuildingTypesComputed['rows'];
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
                            ) as Category;
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
                                if (
                                    !building.extensions.hasOwnProperty(
                                        extension.caption
                                    )
                                )
                                    building.extensions[extension.caption] = {
                                        total: 0,
                                        enabled: 0,
                                        unavailable: 0,
                                        maximum: 0,
                                    };
                                building.extensions[extension.caption].total++;
                                if (!extension.available)
                                    building.extensions[extension.caption]
                                        .unavailable++;
                                else if (extension.enabled)
                                    building.extensions[extension.caption]
                                        .enabled++;
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
