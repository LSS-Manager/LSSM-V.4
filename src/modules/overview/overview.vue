<template>
    <lightbox name="overview">
        <h1>{{ $m('name') }}</h1>
        <tabs :on-select="setType" :default-index="currentType">
            <tab :title="$m('tabs.vehicles')">
                <tabs
                    :on-select="setVehicleCategory"
                    :default-index="vehiclesTab.current.category"
                >
                    <tab
                        v-for="({ vehicles: groups },
                        title) in vehicleCategories"
                        :key="title"
                        :title="title"
                    >
                        <tabs
                            :on-select="setVehicleGroup"
                            :default-index="vehiclesTab.current.group"
                        >
                            <tab
                                v-for="(_, group) in groups"
                                :key="group"
                                :title="group"
                            >
                                <enhanced-table
                                    :head="vehiclesTab.head"
                                    :table-attrs="{
                                        class: 'table table-striped',
                                    }"
                                    @sort="setSortVehicles"
                                    :sort="vehiclesTab.sort"
                                    :sort-dir="vehiclesTab.sortDir"
                                    :search="vehiclesTab.search"
                                    @search="s => (vehiclesTab['search'] = s)"
                                >
                                    <tr
                                        v-for="vehicle in vehicleTypes"
                                        :key="vehicle.caption"
                                    >
                                        <td
                                            v-for="(_,
                                            attr) in vehiclesTab.head"
                                            :key="attr"
                                        >
                                            <span v-if="attr === 'cost'">
                                                {{
                                                    vehicle.hasOwnProperty(
                                                        'credits'
                                                    )
                                                        ? vehicle.credits.toLocaleString()
                                                        : NaN
                                                }}
                                                Credits /
                                                {{
                                                    vehicle.hasOwnProperty(
                                                        'coins'
                                                    )
                                                        ? vehicle.coins.toLocaleString()
                                                        : NaN
                                                }}
                                                Coins </span
                                            ><span
                                                v-else-if="
                                                    typeof vehicle[attr] ===
                                                        'object'
                                                "
                                                v-html="
                                                    Object.values(
                                                        vehicle[attr]
                                                    ).join(',<br>')
                                                "
                                            >
                                            </span>
                                            <span
                                                v-else
                                                v-html="
                                                    vehicle.hasOwnProperty(attr)
                                                        ? vehicle[
                                                              attr
                                                          ].toLocaleString()
                                                        : ''
                                                "
                                            ></span>
                                        </td>
                                    </tr>
                                </enhanced-table>
                            </tab>
                        </tabs>
                    </tab>
                </tabs>
            </tab>
            <tab :title="$m('tabs.buildings')">
                <tabs
                    :on-select="setBuildingCategory"
                    :default-index="buildingsTab.current.category"
                >
                    <tab
                        v-for="(_, title) in buildingCategories"
                        :key="title"
                        :title="title"
                    >
                        <enhanced-table
                            :head="buildingsTab.head"
                            :table-attrs="{ class: 'table table-striped' }"
                            @sort="setSortBuildings"
                            :sort="buildingsTab.sort"
                            :sort-dir="buildingsTab.sortDir"
                            :search="buildingsTab.search"
                            @search="s => (buildingsTab['search'] = s)"
                        >
                            <tr
                                v-for="building in buildingsSorted"
                                :key="building.caption"
                            >
                                <td
                                    v-for="(_, attr) in buildingsTab.head"
                                    :key="attr"
                                >
                                    <span v-if="attr === 'cost'">
                                        {{
                                            building.hasOwnProperty('credits')
                                                ? building.credits.toLocaleString()
                                                : NaN
                                        }}
                                        Credits /
                                        {{
                                            building.hasOwnProperty('coins')
                                                ? building.coins.toLocaleString()
                                                : NaN
                                        }}
                                        Coins
                                    </span>
                                    <dl v-else-if="attr === 'extensions'">
                                        <span
                                            v-for="(extension,
                                            index) in building['extensions']"
                                            :key="index"
                                        >
                                            <dt>{{ extension.caption }}:</dt>
                                            <dd>
                                                {{
                                                    extension.credits.toLocaleString()
                                                }}
                                                Credits /
                                                {{
                                                    extension.coins.toLocaleString()
                                                }}
                                                Coins; {{ extension.duration }}
                                            </dd>
                                        </span>
                                    </dl>
                                    <span
                                        v-else-if="
                                            typeof building[attr] === 'object'
                                        "
                                        v-html="
                                            Object.values(building[attr]).join(
                                                ',<br>'
                                            )
                                        "
                                    >
                                    </span>
                                    <span
                                        v-else
                                        v-html="
                                            building.hasOwnProperty(attr)
                                                ? building[
                                                      attr
                                                  ].toLocaleString()
                                                : ''
                                        "
                                    ></span>
                                </td>
                            </tr>
                        </enhanced-table>
                    </tab>
                </tabs>
            </tab>
            <tab :title="$m('tabs.schoolings')">
                <tabs
                    :on-select="setSchoolingCategory"
                    :default-index="schoolingsTab.current.category"
                >
                    <tab
                        v-for="(schoolings, title) in schoolingCategories"
                        :key="title"
                        :title="title"
                    >
                        <enhanced-table
                            :head="schoolingsTab.head"
                            :table-attrs="{ class: 'table table-striped' }"
                            @sort="setSortSchoolings"
                            :sort="schoolingsTab.sort"
                            :sort-dir="schoolingsTab.sortDir"
                            :search="schoolingsTab.search"
                            @search="s => (schoolingsTab['search'] = s)"
                        >
                            <tr
                                v-for="schooling in schoolingsSorted"
                                :key="schooling.caption"
                            >
                                <td
                                    v-for="(_, attr) in schoolingsTab.head"
                                    :key="attr"
                                >
                                    <span
                                        v-if="attr === 'required_for'"
                                        v-html="schooling[attr].join(',<br />')"
                                    ></span>
                                    <span v-else>{{ schooling[attr] }}</span>
                                </td>
                            </tr>
                        </enhanced-table>
                    </tab>
                </tabs>
            </tab>
        </tabs>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { DefaultProps } from 'vue/types/options';
import {
    Overview,
    OverviewMethods,
    OverviewComputed,
} from '../../../typings/modules/Overview';
import {
    InternalVehicle,
    ResolvedVehicleCategory,
    VehicleCategory,
} from '../../../typings/Vehicle';
import {
    BuildingCategory,
    InternalBuilding,
    ResolvedBuildingCategory,
} from 'typings/Building';
import cloneDeep from 'lodash/cloneDeep';
import { Schooling } from 'typings/Schooling';

export default Vue.extend<
    Overview,
    OverviewMethods,
    OverviewComputed,
    DefaultProps
>({
    name: 'overview',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../components/enhanced-table.vue'
            ),
    },
    data() {
        const vehicleCategories = cloneDeep(
            this.$t('vehicleCategories') as unknown
        ) as {
            [name: string]: VehicleCategory;
        };
        const vehicleTypes = this.$t('vehicles') as {
            [id: number]: InternalVehicle;
        };
        const resolvedVehicleCategories = {} as {
            [name: string]: ResolvedVehicleCategory;
        };
        const schoolings = (this.$t('schoolings') as unknown) as {
            [category: string]: Schooling[];
        };
        const resolvedSchoolings = {} as Overview['schoolingCategories'];
        Object.entries(schoolings).forEach(([school, schoolings]) => {
            resolvedSchoolings[school] = Object.values(schoolings).map(
                schooling => ({
                    ...schooling,
                    required_for: [] as string[],
                })
            );
        });
        Object.entries(vehicleCategories).forEach(
            ([category, { color, vehicles: groups }]) => {
                resolvedVehicleCategories[category] = { color, vehicles: {} };
                Object.entries(groups).forEach(
                    ([group, vehicles]) =>
                        (resolvedVehicleCategories[category].vehicles[
                            group
                        ] = Object.values(vehicles as number[]).map(type => {
                            const v = vehicleTypes[type];
                            if (v.schooling) {
                                const [, school, schooling] = v.schooling.match(
                                    /^(.*?) - (.*?)$/
                                ) ?? [null, null, null];
                                if (school && schooling) {
                                    resolvedSchoolings[school]
                                        .find(
                                            ({ caption }) =>
                                                caption === schooling
                                        )
                                        ?.required_for.push(v.caption);
                                }
                            }
                            return v;
                        }))
                );
            }
        );
        const buildingCategories = cloneDeep(
            this.$t('buildingCategories') as unknown
        ) as {
            [name: string]: BuildingCategory | ResolvedBuildingCategory;
        };
        const buildingTypes = Object.fromEntries(
            Object.entries(
                cloneDeep(
                    this.$t('buildings') as {
                        [id: number]: InternalBuilding;
                    }
                )
            ).map(([index, building]) => {
                const extensions = Object.values(building.extensions);
                const minifiedExtensions = [] as InternalBuilding['extensions'];
                const multipleExtensions = {} as {
                    [caption: string]: number;
                };
                extensions.forEach(extension => {
                    if (!extension) return;
                    const e = minifiedExtensions.find(
                        e => extension.caption === e.caption
                    );
                    if (e) {
                        if (!multipleExtensions.hasOwnProperty(e.caption))
                            multipleExtensions[e.caption] = 1;
                        multipleExtensions[e.caption]++;
                    } else {
                        minifiedExtensions.push(extension);
                    }
                });
                Object.entries(multipleExtensions).forEach(
                    ([caption, amount]) => {
                        const e = minifiedExtensions.find(
                            e => e.caption === caption
                        );
                        if (e) {
                            e.caption = this.$tc(
                                `modules.overview.extensionTitle`,
                                amount,
                                { caption }
                            );
                        }
                    }
                );
                return [
                    index,
                    {
                        ...building,
                        extensions: minifiedExtensions,
                    },
                ];
            })
        );
        Object.entries(
            buildingCategories
        ).forEach(([category, { buildings }]) =>
            Object.values(buildings).forEach(
                (building, index) =>
                    (buildingCategories[category].buildings[index] =
                        buildingTypes[building])
            )
        );
        return {
            vehicles: Object.values(vehicleTypes),
            vehicleCategories: (resolvedVehicleCategories as unknown) as {
                [name: string]: ResolvedVehicleCategory;
            },
            vehiclesTab: {
                head: {
                    caption: { title: this.$m('titles.vehicles.caption') },
                    minPersonnel: {
                        title: this.$m('titles.vehicles.minPersonnel'),
                    },
                    maxPersonnel: {
                        title: this.$m('titles.vehicles.maxPersonnel'),
                    },
                    cost: { title: this.$m('titles.vehicles.cost') },
                    schooling: { title: this.$m('titles.vehicles.schooling') },
                    ...(['de_DE', 'en_US', 'pl_PL', 'nl_NL', 'sv_SE'].includes(
                        this.$store.state.lang
                    )
                        ? {
                              wtank: {
                                  title: this.$m('titles.vehicles.wtank'),
                              },
                          }
                        : null),
                    special: { title: this.$m('titles.vehicles.special') },
                },
                search: '',
                sort: 'caption',
                sortDir: 'asc',
                current: {
                    category: 0,
                    group: 0,
                },
            },
            buildings: Object.values(buildingTypes),
            buildingCategories: (buildingCategories as unknown) as {
                [name: string]: ResolvedBuildingCategory;
            },
            buildingsTab: {
                head: {
                    caption: { title: this.$m('titles.buildings.caption') },
                    cost: { title: this.$m('titles.buildings.cost') },
                    maxLevel: { title: this.$m('titles.buildings.maxLevel') },
                    levelcost: { title: this.$m('titles.buildings.levelcost') },
                    startPersonnel: {
                        title: this.$m('titles.buildings.startPersonnel'),
                    },
                    startVehicles: {
                        title: this.$m('titles.buildings.startVehicles'),
                    },
                    maxBuildings: {
                        title: this.$m('titles.buildings.maxBuildings'),
                    },
                    extensions: {
                        title: this.$m('titles.buildings.extensions'),
                    },
                    special: { title: this.$m('titles.buildings.special') },
                },
                search: '',
                sort: 'caption',
                sortDir: 'asc',
                current: {
                    category: 0,
                },
            },
            schoolingCategories: resolvedSchoolings,
            schoolingsTab: {
                head: {
                    caption: { title: this.$m('titles.schoolings.caption') },
                    required_for: {
                        title: this.$m('titles.schoolings.required_for'),
                    },
                    duration: { title: this.$m('titles.schoolings.duration') },
                },
                search: '',
                sort: 'caption',
                sortDir: 'asc',
                current: {
                    category: 0,
                },
            },
            currentType: 0,
        } as Overview;
    },
    computed: {
        currentBuildings() {
            return this.currentType === 1
                ? this.buildingCategories[
                      Object.keys(this.buildingCategories)[
                          this.buildingsTab.current.category
                      ]
                  ].buildings
                : [];
        },
        buildingsFiltered() {
            return Object.values(this.currentBuildings).filter(building =>
                JSON.stringify(Object.values(building))
                    .toLowerCase()
                    .match(this.buildingsTab.search.toLowerCase())
            );
        },
        buildingsSorted() {
            return Object.values(
                this.buildingsTab.search
                    ? this.buildingsFiltered
                    : this.currentBuildings
            ).sort((a, b) => {
                let modifier = this.buildingsTab.sortDir === 'desc' ? -1 : 1;
                let f = a[this.buildingsTab.sort] || '';
                let s = b[this.buildingsTab.sort] || '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
        currentSchoolings() {
            return this.currentType === 2
                ? this.schoolingCategories[
                      Object.keys(this.schoolingCategories)[
                          this.schoolingsTab.current.category
                      ]
                  ]
                : [];
        },
        schoolingsFiltered() {
            return Object.values(this.currentSchoolings).filter(building =>
                JSON.stringify(Object.values(building))
                    .toLowerCase()
                    .match(this.schoolingsTab.search.toLowerCase())
            );
        },
        schoolingsSorted() {
            return Object.values(
                this.schoolingsTab.search
                    ? this.schoolingsFiltered
                    : this.currentSchoolings
            ).sort((a, b) => {
                let modifier = this.schoolingsTab.sortDir === 'desc' ? -1 : 1;
                let f = a[this.schoolingsTab.sort] || '';
                let s = b[this.schoolingsTab.sort] || '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
        vehicleTypes() {
            if (this.currentType !== 0) return [];
            const category = this.vehicleCategories[
                Object.keys(this.vehicleCategories)[
                    this.vehiclesTab.current.category
                ]
            ];
            let vehicles =
                category.vehicles[
                    Object.keys(category.vehicles)[
                        this.vehiclesTab.current.group
                    ]
                ];
            return (this.vehiclesTab.search
                ? vehicles.filter(vehicle =>
                      JSON.stringify(Object.values(vehicle))
                          .toLowerCase()
                          .match(this.vehiclesTab.search.toLowerCase())
                  )
                : vehicles
            ).sort((a, b) => {
                let modifier = this.vehiclesTab.sortDir === 'desc' ? -1 : 1;
                let f = a[this.vehiclesTab.sort] || '';
                let s = b[this.vehiclesTab.sort] || '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.overview.${key}`, args);
        },
        setSortVehicles(type) {
            if (this.vehiclesTab.sort === type) {
                return (this.vehiclesTab.sortDir =
                    this.vehiclesTab.sortDir === 'asc' ? 'desc' : 'asc');
            }
            this.vehiclesTab.sort = type;
            this.vehiclesTab.sortDir = 'asc';
        },
        setSortBuildings(type) {
            if (this.buildingsTab.sort === type) {
                return (this.buildingsTab.sortDir =
                    this.buildingsTab.sortDir === 'asc' ? 'desc' : 'asc');
            }
            this.buildingsTab.sort = type;
            this.buildingsTab.sortDir = 'asc';
        },
        setSortSchoolings(type) {
            if (this.schoolingsTab.sort === type) {
                return (this.schoolingsTab.sortDir =
                    this.schoolingsTab.sortDir === 'asc' ? 'desc' : 'asc');
            }
            this.schoolingsTab.sort = type;
            this.schoolingsTab.sortDir = 'asc';
        },
        setVehicleCategory(_, category) {
            this.vehiclesTab.current.category = category;
            this.setVehicleGroup(_, 0);
        },
        setVehicleGroup(_, group) {
            this.vehiclesTab.current.group = group;
        },
        setBuildingCategory(_, category) {
            this.buildingsTab.current.category = category;
        },
        setSchoolingCategory(_, category) {
            this.schoolingsTab.current.category = category;
        },
        setType(_, type) {
            this.currentType = type;
        },
    },
});
</script>

<style scoped></style>
