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
            :table-attrs="{ class: 'table' }"
            :no-search="true"
            :no-body="true"
        >
            <tbody v-for="(category, title) in coloredGroups" :key="title">
                <tr
                    v-for="(row, caption, index) in category.rows"
                    :key="index"
                    :class="`${row.type}-${row.color || 'bright'}`"
                >
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
                        <button
                            v-if="row.type === 'building'"
                            class="btn btn-default btn-xs building-btn"
                            @click="
                                showBuildings(
                                    'building',
                                    caption,
                                    row.buildings
                                )
                            "
                        >
                            <font-awesome-icon
                                :icon="faBuilding"
                            ></font-awesome-icon>
                        </button>
                    </td>
                    <td>
                        <span v-if="row.type === 'extension'">
                            {{ caption.replace(/^\d+_/, '') }}
                        </span>
                        <button
                            v-if="row.type === 'extension'"
                            class="btn btn-default btn-xs building-btn"
                            @click="
                                showBuildings(
                                    'extension',
                                    caption.replace(/^\d+_/, ''),
                                    row.buildings
                                )
                            "
                        >
                            <font-awesome-icon
                                :icon="faBuilding"
                            ></font-awesome-icon>
                        </button>
                    </td>
                    <td>
                        {{ row.total.toLocaleString() }} ({{
                            row.enabled.toLocaleString()
                        }})
                    </td>
                    <td>{{ row.unavailable.toLocaleString() }}</td>
                    <td>{{ row.maximum.toLocaleString() }}</td>
                </tr>
            </tbody>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import buildingList from './building-list.vue';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import {
    buildingWithExtension,
    BuildingTypes,
    BuildingTypesMethods,
    BuildingTypesComputed,
} from 'typings/modules/Dashboard/BuildingTypes';
import { DefaultProps } from 'vue/types/options';
import {
    InternalBuilding,
    BuildingCategory,
    Building,
    Extension,
} from 'typings/Building';
import cloneDeep from 'lodash/cloneDeep';

export default Vue.extend<
    BuildingTypes,
    BuildingTypesMethods,
    BuildingTypesComputed,
    DefaultProps
>({
    name: 'building-types',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        const buildingTypes = this.$t('buildings') as {
            [id: number]: InternalBuilding;
        };
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
        const buildingsByType = this.$store.getters['api/buildingsByType'] as {
            [type: number]: Building[];
        };
        const groups = {} as BuildingTypes['groups'];
        Object.entries(categories).forEach(
            ([category, { buildings, color }]) => {
                groups[category] = {
                    color,
                    rows: Object.fromEntries(
                        Object.values(buildings).flatMap(buildingType => {
                            const buildingsOfType =
                                buildingsByType[buildingType];
                            const extensionsOfType = {} as {
                                [caption: string]: Extension[];
                            };
                            const buildingsWithExtensionOfType = {} as {
                                [caption: string]: buildingWithExtension[];
                            };
                            [
                                ...new Set(
                                    Object.values(
                                        buildingTypes[buildingType].extensions
                                    )
                                        .filter(e => !!e)
                                        .map(({ caption }) => caption)
                                ),
                            ].forEach(caption => {
                                buildingsOfType?.forEach(building => {
                                    building?.extensions?.forEach(extension => {
                                        if (extension.caption !== caption)
                                            return;
                                        if (
                                            !extensionsOfType.hasOwnProperty(
                                                caption
                                            )
                                        )
                                            extensionsOfType[caption] = [];
                                        extensionsOfType[caption].push(
                                            extension
                                        );

                                        if (
                                            !buildingsWithExtensionOfType.hasOwnProperty(
                                                caption
                                            )
                                        )
                                            buildingsWithExtensionOfType[
                                                caption
                                            ] = [];
                                        if (
                                            buildingsWithExtensionOfType[
                                                caption
                                            ].find(
                                                b => b.id === building.id
                                            ) !== undefined
                                        )
                                            return;
                                        buildingsWithExtensionOfType[
                                            caption
                                        ].push({
                                            ...building,
                                            extension_available: building.extensions.filter(
                                                e =>
                                                    e.caption === caption &&
                                                    !!e.available
                                            ).length,
                                            extension_enabled: building.extensions.filter(
                                                e =>
                                                    e.caption === caption &&
                                                    !!e.enabled &&
                                                    !!e.available
                                            ).length,
                                            extension_unavailable: building.extensions.filter(
                                                e =>
                                                    e.caption === caption &&
                                                    !e.available
                                            ).length,
                                        });
                                    });
                                });
                            });
                            return [
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
                                        total: buildingsOfType?.length ?? 0,
                                        enabled:
                                            buildingsOfType?.filter(
                                                b => b.enabled
                                            )?.length ?? 0,
                                        unavailable: 0,
                                        maximum:
                                            buildingTypes[
                                                buildingType
                                            ].maxBuildingsFunction?.(
                                                this.$store.state.api.buildings
                                                    .length
                                            ) ?? '–',
                                        buildings: buildingsOfType,
                                    },
                                ],
                                ...Object.values(
                                    buildingTypes[buildingType].extensions
                                )
                                    .filter(e => !!e)
                                    .map(
                                        ({
                                            caption,
                                            maxExtensionsFunction,
                                        }) => {
                                            const builtExtensions =
                                                extensionsOfType[
                                                    caption
                                                ]?.filter(
                                                    ({ available }) => available
                                                ) ?? [];
                                            return [
                                                `${buildingType}_${caption}`,
                                                {
                                                    type: 'extension',
                                                    total:
                                                        builtExtensions.length,
                                                    enabled: builtExtensions.filter(
                                                        ({ enabled }) => enabled
                                                    ).length,
                                                    unavailable: (
                                                        extensionsOfType[
                                                            caption
                                                        ]?.filter(
                                                            ({ available }) =>
                                                                !available
                                                        ) ?? []
                                                    ).length,
                                                    maximum:
                                                        maxExtensionsFunction?.(
                                                            buildingsByType
                                                        ) ??
                                                        Object.values(
                                                            buildingTypes[
                                                                buildingType
                                                            ].extensions
                                                        ).filter(
                                                            e =>
                                                                e?.caption ===
                                                                caption
                                                        ).length *
                                                            (buildingsOfType?.length ??
                                                                0),
                                                    buildings:
                                                        buildingsWithExtensionOfType[
                                                            caption
                                                        ] ?? [],
                                                },
                                            ];
                                        }
                                    ),
                            ];
                        })
                    ),
                };
            }
        );
        return {
            buildingTypes,
            categoryColors,
            groups,
            faBuilding,
        };
    },
    computed: {
        coloredGroups() {
            const groups = cloneDeep(this.groups) as BuildingTypes['groups'];
            Object.values(groups).forEach(category => {
                let currentBuildingColor = 'dark' as 'bright' | 'dark';
                let currentExtensionColor = 'dark' as 'bright' | 'dark';
                Object.values(category.rows).forEach(row => {
                    if (row.type === 'building') {
                        if (currentBuildingColor === 'bright')
                            currentBuildingColor = 'dark';
                        else currentBuildingColor = 'bright';
                        row.color = currentBuildingColor;
                        currentExtensionColor = 'dark';
                    } else {
                        if (currentExtensionColor === 'bright')
                            currentExtensionColor = 'dark';
                        else currentExtensionColor = 'bright';
                        row.color = `${currentBuildingColor}-${currentExtensionColor}` as
                            | 'bright-bright'
                            | 'bright-dark'
                            | 'dark-bright'
                            | 'dark-dark';
                    }
                });
            });
            return groups;
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.${key}`, args);
        },
        $sm(key, args) {
            return this.$m(`building-types.${key}`, args);
        },
        $mc(key, amount, args) {
            return this.$tc(`modules.dashboard.${key}`, amount, args);
        },
        $smc(key, amount, args) {
            return this.$mc(`building-types.${key}`, amount, args);
        },
        showBuildings(listType, type, buildings) {
            this.$modal.show(
                buildingList,
                {
                    title: this.$smc('title', 0, { type: type }),
                    buildings,
                    listType,
                },
                { name: 'building-list', height: 'auto' }
            );
        },
    },
});
</script>

<style scoped lang="sass">
body:not(.dark)
    .building-dark
        background-color: #cccccc !important

    .extension-dark-bright
        background-color: #dddddd !important

    .extension-dark-dark
        background-color: #bbbbbb !important

    .building-bright
        background-color: #eeeeee !important

    .extension-bright-bright
        background-color: #ffffff !important

    .extension-bright-dark
        background-color: #dddddd !important
body.dark
    .building-dark
        background-color: #323232 !important

    .extension-dark-bright
        background-color: #424242 !important

    .extension-dark-dark
        background-color: #222222 !important

    .building-bright
        background-color: #505050 !important

    .extension-bright-bright
        background-color: #606060 !important

    .extension-bright-dark
        background-color: #404040 !important
</style>
