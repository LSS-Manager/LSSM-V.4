<template>
    <lightbox name="overview">
        <h1>{{ $m('name') }}</h1>
        <tabs>
            <tab :title="$m('tabs.vehicles')">
                <tabs>
                    <tab
                        v-for="({ vehicles: groups },
                        title) in vehicleCategories"
                        :key="title"
                        :title="title"
                    >
                        <tabs>
                            <tab
                                v-for="(vehicleTypes, group) in groups"
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
                        <td v-for="(_, attr) in buildingsTab.head" :key="attr">
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
                                    v-for="(extension, index) in building[
                                        'extensions'
                                    ]"
                                    :key="index"
                                >
                                    <dt>{{ extension.caption }}:</dt>
                                    <dd>
                                        {{ extension.credits.toLocaleString() }}
                                        Credits /
                                        {{ extension.coins.toLocaleString() }}
                                        Coins; {{ extension.duration }}
                                    </dd>
                                </span>
                            </dl>
                            <span
                                v-else-if="typeof building[attr] === 'object'"
                                v-html="
                                    Object.values(building[attr]).join(',<br>')
                                "
                            >
                            </span>
                            <span
                                v-else
                                v-html="
                                    building.hasOwnProperty(attr)
                                        ? building[attr].toLocaleString()
                                        : ''
                                "
                            ></span>
                        </td>
                    </tr>
                </enhanced-table>
            </tab>
        </tabs>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../components/enhanced-table.vue';
import Lightbox from '../../components/lightbox.vue';
import { DefaultProps } from 'vue/types/options';
import {
    Overview,
    OverviewMethods,
    OverviewComputed,
} from '../../../typings/modules/Overview';
import {
    ResolvedVehicleCategory,
    VehicleCategory,
} from '../../../typings/Vehicle';

export default Vue.extend<
    Overview,
    OverviewMethods,
    OverviewComputed,
    DefaultProps
>({
    name: 'overview',
    components: { EnhancedTable, Lightbox },
    data() {
        return {
            vehicles: Object.values(this.$t('vehicles')),
            vehicleCategories: (this.$t('vehicleCategories') as unknown) as {
                [name: string]: VehicleCategory;
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
                    wtank:
                        this.$store.state.lang === 'de_DE'
                            ? { title: this.$m('titles.vehicles.wtank') }
                            : null,
                    special: { title: this.$m('titles.vehicles.special') },
                },
                search: '',
                sort: 'caption',
                sortDir: 'asc',
            },
            buildings: Object.values(this.$t('buildings')),
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
            },
        } as Overview;
    },
    computed: {
        buildingsFiltered() {
            return this.buildings.filter(building =>
                JSON.stringify(building)
                    .toLowerCase()
                    .match(this.buildingsTab.search.toLowerCase())
            );
        },
        buildingsSorted() {
            const buildings = this.buildingsTab.search
                ? this.buildingsFiltered
                : this.buildings;
            return buildings.sort((a, b) => {
                let modifier = this.buildingsTab.sortDir === 'desc' ? -1 : 1;
                let f = a[this.buildingsTab.sort] || '';
                let s = b[this.buildingsTab.sort] || '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.overview.${key}`, args);
        },
        setSortBuildings(type) {
            if (this.buildingsTab.sort === type)
                return (this.buildingsTab.sortDir =
                    this.buildingsTab.sortDir === 'asc' ? 'desc' : 'asc');
            this.buildingsTab.sort = type;
            this.buildingsTab.sortDir = 'asc';
        },
        setSortVehicles(type) {
            if (this.vehiclesTab.sort === type)
                return (this.vehiclesTab.sortDir =
                    this.vehiclesTab.sortDir === 'asc' ? 'desc' : 'asc');
            this.vehiclesTab.sort = type;
            this.vehiclesTab.sortDir = 'asc';
        },
    },
    mounted() {
        Object.entries(this.vehicleCategories).forEach(
            ([category, { vehicles: groups }]) =>
                Object.entries(groups).forEach(
                    ([group, vehicles]) =>
                        typeof vehicles[0] === 'number' &&
                        this.$set(
                            this.vehicleCategories[category].vehicles,
                            group,
                            Object.values(vehicles as number[]).map(
                                type => this.vehicles[type]
                            )
                        )
                )
        );
    },
});
</script>

<style scoped></style>
