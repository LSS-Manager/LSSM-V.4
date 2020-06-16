<template>
    <enhanced-table
        :head="{
            title: { title: $t('modules.dashboard.vehicle-types.type') },
            ...statusHeads,
            sum: { title: $t('modules.dashboard.vehicle-types.sum') },
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
            <td>{{ stats.title }}</td>
            <td v-for="status in statuses" :key="`${vehicleType}_${status}`">
                {{ stats[`s${status}`].toLocaleString() }}
            </td>
            <td>
                {{ stats.sum.toLocaleString() }}
            </td>
        </tr>
        <template v-slot:foot>
            <tr>
                <th>
                    {{ $t('modules.dashboard.vehicle-types.sum') }}
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
        const statuses = Object.values(
            this.$t('modules.dashboard.vehicle-types.statuses')
        );
        const statusText = this.$t('modules.dashboard.vehicle-types.status');
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
        } as VehicleTypes;
    },
    computed: {
        vehicleTypes() {
            const vbt = this.$store.getters['api/vehiclesByType'] as {
                [type: string]: Vehicle[];
            };
            const types = {} as TypeList;
            Object.keys(vbt).forEach(type => {
                const fms = {} as { [status: string]: number };
                Object.values(this.statuses).forEach(
                    status => (fms[`s${status}`] = 0)
                );
                Object.values(vbt[type]).forEach(vehicle => {
                    fms[`s${vehicle.fms_real}`]++;
                });
                types[`t${type}`] = {
                    title: this.vehicleTypeNames[parseInt(type)],
                    ...fms,
                    sum: vbt[type].length,
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
            const vehicleTypes = this.search
                ? this.vehicleTypesFiltered
                : this.vehicleTypes;
            return Object.keys(vehicleTypes).sort((a, b) => {
                let modifier = this.sortDir === 'desc' ? -1 : 1;
                let f = vehicleTypes[a][this.sort] || '';
                let s = vehicleTypes[b][this.sort] || '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
        sum() {
            return this.$store.state.api.vehicleStates;
        },
    },
    methods: {
        setSort(type) {
            if (this.sort === type)
                return (this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc');
            this.sort = type;
            this.sortDir = 'asc';
        },
    },
});
</script>

<style scoped lang="sass">
table
    td:first-child,
    td:last-child
        font-weight: bold
</style>
