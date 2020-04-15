<template>
    <lightbox name="overview">
        <h1>{{ $t('modules.overview.name') }}</h1>
        <tabs>
            <tab :title="$t('modules.overview.tabs.vehicles')">
                <tabs>
                    <tab
                        v-for="title in $t('modules.overview.tabs.vehicleTabs')"
                        :key="Object.keys(title)[0]"
                        :title="title[Object.keys(title)[0]]"
                    >
                        <label class="pull-right">
                            <input
                                type="search"
                                class="search_input_field"
                                v-model="vehicleSearch"
                                :placeholder="$t('modules.overview.search')"
                            />
                        </label>
                        <table
                            :id="
                                $store.getters.nodeId(
                                    `overview-vehicles-${Object.keys(title)[0]}`
                                )
                            "
                            class="table table-striped"
                        >
                            <thead>
                                <tr>
                                    <th
                                        v-for="title in $t(
                                            'modules.overview.titles.vehicles'
                                        )"
                                        :key="Object.keys(title)[0]"
                                        @click="
                                            setSortVehicle(
                                                Object.keys(title)[0]
                                            )
                                        "
                                    >
                                        {{ title[Object.keys(title)[0]] }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="vehicle in vehicles[
                                        Object.keys(title)[0]
                                    ]"
                                    :key="vehicle.name"
                                >
                                    <td
                                        v-for="title in $t(
                                            'modules.overview.titles.vehicles'
                                        )"
                                        :key="Object.keys(title)[0]"
                                    >
                                        <span
                                            v-if="
                                                Object.keys(title)[0] === 'cost'
                                            "
                                        >
                                            {{
                                                (
                                                    vehicle.credits || 0
                                                ).toLocaleString()
                                            }}
                                            Credits /
                                            {{
                                                (
                                                    vehicle.coins || 0
                                                ).toLocaleString()
                                            }}
                                            Coins
                                        </span>
                                        <span
                                            v-else-if="
                                                Object.keys(title)[0] ===
                                                    'wtank'
                                            "
                                        >
                                            {{
                                                (
                                                    vehicle.wtank || 0
                                                ).toLocaleString()
                                            }}
                                            Liter
                                        </span>
                                        <span
                                            v-else
                                            v-html="
                                                vehicle[Object.keys(title)[0]]
                                            "
                                        ></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </tab>
                </tabs>
            </tab>
            <tab :title="$t('modules.overview.tabs.buildings')">
                <label class="pull-right">
                    <input
                        type="search"
                        class="search_input_field"
                        v-model="buildingSearch"
                        :placeholder="$t('modules.overview.search')"
                    />
                </label>
                <table
                    :id="$store.getters.nodeId('overview-buildings')"
                    class="table table-striped"
                >
                    <thead>
                        <tr>
                            <th
                                v-for="title in $t(
                                    'modules.overview.titles.buildings'
                                )"
                                :key="Object.keys(title)[0]"
                                @click="setSortBuilding(Object.keys(title)[0])"
                            >
                                {{ title[Object.keys(title)[0]] }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="building in buildings" :key="building.name">
                            <td
                                v-for="title in $t(
                                    'modules.overview.titles.buildings'
                                )"
                                :key="Object.keys(title)[0]"
                            >
                                <span v-if="Object.keys(title)[0] === 'cost'">
                                    {{ building.credits.toLocaleString() }}
                                    Credits /
                                    {{ building.coins.toLocaleString() }} Coins
                                </span>
                                <span
                                    v-else
                                    v-html="building[Object.keys(title)[0]]"
                                ></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </tab>
        </tabs>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';

import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'overview',
    components: { Lightbox },
    data() {
        return {
            sortBuilding: 'name',
            sortBuildingDir: 'asc',
            buildingSearch: '',
            sortVehicle: 'name',
            sortVehicleDir: 'asc',
            vehicleSearch: '',
        };
    },
    computed: {
        buildings() {
            return Object.values(this.$t('modules.overview.buildings'))
                .sort((a, b) => {
                    let modifier = this.sortVehicleDir === 'desc' ? -1 : 1;
                    a = a[this.sortVehicle] || '';
                    b = b[this.sortVehicle] || '';
                    return a < b ? -1 * modifier : a > b ? modifier : 0;
                })
                .filter(a =>
                    this.buildingSearch.length > 0
                        ? JSON.stringify(Object.values(a))
                              .toLowerCase()
                              .match(this.buildingSearch.toLowerCase())
                        : true
                );
        },
        vehicles() {
            let vehicles = cloneDeep(this.$t(`modules.overview.vehicles`));
            Object.keys(vehicles).forEach(category => {
                vehicles[category] = Object.values(vehicles[category]).filter(
                    a =>
                        this.vehicleSearch.length > 0
                            ? JSON.stringify(Object.values(a))
                                  .toLowerCase()
                                  .match(this.vehicleSearch.toLowerCase())
                            : true
                );
                return vehicles[category].sort((a, b) => {
                    let modifier = this.sortVehicleDir === 'desc' ? -1 : 1;
                    a = a[this.sortVehicle] || '';
                    b = b[this.sortVehicle] || '';
                    return a < b ? -1 * modifier : a > b ? modifier : 0;
                });
            });
            return vehicles;
        },
    },
    methods: {
        setSortBuilding(s) {
            if (s === 'cost') s = 'credits';
            this.sortBuildingDir =
                s === this.sortBuilding && this.sortBuildingDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortBuilding = s;
        },
        setSortVehicle(s) {
            if (s === 'cost') s = 'credits';
            this.sortVehicleDir =
                s === this.sortVehicle && this.sortVehicleDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortVehicle = s;
        },
    },
};
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
