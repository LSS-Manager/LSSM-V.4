<template>
    <enhanced-table
        :head="{
            title: { title: $sm('type') },
            ...statusHeads,
            sum: { title: $sm('sum') },
        }"
        :table-attrs="{ class: 'table table-striped' }"
        @sort="setSort"
        :sort="sort"
        :sort-dir="sortDir"
        :search="search"
        @search="s => (search = s)"
    >
        <tr
            v-for="vehicleType in vehicleTypesSorted"
            :stats="(stats = vehicleTypes[vehicleType])"
            :key="`vehicles_${vehicleType}`"
        >
            <td>
                {{ stats.title }}
                <button
                    class="btn btn-default btn-xs vehicle-btn"
                    @click="
                        showVehicles(
                            0,
                            vehicleTypes[vehicleType],
                            vehicleTypes[vehicleType].vehicles
                        )
                    "
                >
                    <font-awesome-icon :icon="faCarSide"></font-awesome-icon>
                </button>
            </td>
            <td v-for="status in statuses" :key="`${vehicleType}_${status}`">
                {{ stats.fms[`s${status}`].length.toLocaleString() }}
                <button
                    class="btn btn-default btn-xs vehicle-btn"
                    @click="
                        showVehicles(
                            status,
                            vehicleTypes[vehicleType],
                            vehicleTypes[vehicleType].fms[`s${status}`]
                        )
                    "
                >
                    <font-awesome-icon :icon="faCarSide"></font-awesome-icon>
                </button>
            </td>
            <td>
                {{ stats.sum.toLocaleString() }}
            </td>
        </tr>
        <template v-slot:foot>
            <tr>
                <th>
                    {{ $sm('sum') }}
                </th>
                <th v-for="status in statuses" :key="`sum_${status}`">
                    {{ (sum[status] || 0).toLocaleString() }}
                </th>
                <th>
                    {{ Object.values(sum).reduce((s, c) => (s += c), 0) }}
                </th>
            </tr>
        </template>
    </enhanced-table>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../../components/enhanced-table.vue';
import vehicleList from './vehicle-list.vue';
import { faCarSide } from '@fortawesome/free-solid-svg-icons/faCarSide';
import { Vehicle } from '../../../../typings/Vehicle';
import { DefaultProps } from 'vue/types/options';
import {
    VehicleTypes,
    VehicleTypesMethods,
    VehicleTypesComputed,
    TypeList,
} from '../../../../typings/modules/Dashboard/VehicleTypes';

export default Vue.extend<
    VehicleTypes,
    VehicleTypesMethods,
    VehicleTypesComputed,
    DefaultProps
>({
    name: 'vehicle-types',
    components: { EnhancedTable },
    data() {
        const statuses = Object.values(this.$sm('statuses'));
        const statusText = this.$sm('status');
        const statusHeads = {} as {
            [status: string]: {
                title: string;
            };
        };
        Object.values(statuses).forEach(
            status =>
                (statusHeads[`s${status}`] = {
                    title: `${statusText} ${status}`,
                })
        );
        return {
            vehicleTypeNames: Object.values(this.$t('vehicles')).map(
                type => type.caption
            ),
            statuses,
            statusHeads,
            search: '',
            sort: 'title',
            sortDir: 'asc',
            faCarSide,
        } as VehicleTypes;
    },
    computed: {
        vehicleTypes() {
            const vbt = this.$store.getters['api/vehiclesByType'] as {
                [type: string]: Vehicle[];
            };
            const types = {} as TypeList;
            Object.keys(vbt).forEach(type => {
                const fms = {} as { [status: string]: Vehicle[] };
                Object.values(this.statuses).forEach(
                    status => (fms[`s${status}`] = [])
                );
                Object.values(vbt[type]).forEach(vehicle => {
                    fms[`s${vehicle.fms_real}`].push(vehicle);
                });
                types[`t${type}`] = {
                    title: this.vehicleTypeNames[parseInt(type)],
                    fms,
                    sum: vbt[type].length,
                    vehicles: vbt[type],
                };
            });
            return types;
        },
        vehicleTypesFiltered() {
            const vehicleTypes = this.vehicleTypes;
            const filtered = {} as TypeList;
            Object.keys(vehicleTypes).filter(
                type =>
                    JSON.stringify(Object.values(vehicleTypes[type]))
                        .toLowerCase()
                        .match(this.search.toLowerCase()) &&
                    (filtered[type] = vehicleTypes[type])
            );
            return filtered;
        },
        vehicleTypesSorted() {
            const vehicleTypes = (this.search
                ? this.vehicleTypesFiltered
                : this.vehicleTypes) as TypeList;
            return Object.entries(vehicleTypes)
                .sort(([, a], [, b]) => {
                    let modifier = this.sortDir === 'desc' ? -1 : 1;
                    let f, s;
                    if (this.sort.match(/s\d+/)) {
                        f = a.fms[this.sort].length;
                        s = b.fms[this.sort].length;
                    } else {
                        f = a[this.sort] || '';
                        s = b[this.sort] || '';
                    }
                    return f < s ? -1 * modifier : f > s ? modifier : 0;
                })
                .map(e => e[0]);
        },
        sum() {
            return this.$store.state.api.vehicleStates;
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.${key}`, args);
        },
        $sm(key, args) {
            return this.$m(`vehicle-types.${key}`, args);
        },
        $mc(key, amount, args) {
            return this.$tc(`modules.dashboard.${key}`, amount, args);
        },
        $smc(key, amount, args) {
            return this.$mc(`vehicle-types.${key}`, amount, args);
        },
        setSort(type) {
            if (this.sort === type)
                return (this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc');
            this.sort = type;
            this.sortDir = 'asc';
        },
        showVehicles(status, type, vehicles) {
            this.$modal.show(
                vehicleList,
                {
                    title: this.$smc('title', status, { type: type.title }),
                    vehicles,
                },
                { name: 'vehicle-list', height: 'auto' }
            );
        },
    },
});
</script>

<style scoped lang="sass">
table
    td:first-child,
    td:last-child
        font-weight: bold

    tbody
        td .vehicle-btn
            display: none

        tr
            transition: opacity 0.5s

        &:hover
            tr:hover
                border: 2px solid black !important

                td:hover .vehicle-btn
                    display: inline

            tr:not(:hover)
                opacity: 0.5
</style>
