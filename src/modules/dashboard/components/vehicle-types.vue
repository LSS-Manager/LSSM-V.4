<template>
    <div>
        <label class="pull-right">
            <input
                type="search"
                class="search_input_field"
                v-model="search"
                :placeholder="$t('search')"
            />
        </label>
        <table
            :id="$store.getters.nodeId('dashboard-vehicle-types')"
            class="table table-striped"
        >
            <thead>
                <tr>
                    <th @click="setSort('title')">
                        {{ $t('modules.dashboard.vehicle-types.type') }}
                    </th>
                    <th
                        v-for="status in statuses"
                        :key="status"
                        @click="setSort(status)"
                    >
                        {{ $t('modules.dashboard.vehicle-types.status') }}
                        &nbsp;{{ status }}
                    </th>
                    <th @click="setSort('sum')">
                        {{ $t('modules.dashboard.vehicle-types.sum') }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="vehicleType in vehicleTypesSorted"
                    :stats="(stats = vehicleTypes[vehicleType])"
                    :key="`vehicles_${vehicleType}`"
                >
                    <td>{{ stats.title }}</td>
                    <td
                        v-for="status in statuses"
                        :key="`${vehicleType}_${status}`"
                    >
                        {{ stats[status].toLocaleString() }}
                    </td>
                    <td>
                        {{ stats.sum.toLocaleString() }}
                    </td>
                </tr>
            </tbody>
            <tfoot>
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
            </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    name: 'vehicle-types',
    data() {
        return {
            vehicleTypeNames: Object.values(this.$t('vehicles')).map(
                type => type.caption
            ),
            statuses: this.$t('modules.dashboard.vehicle-types.statuses'),
            search: '',
            sort: 'title',
            sortDir: 'asc',
        };
    },
    computed: {
        vehicleTypes() {
            const vbt = this.$store.getters['api/vehiclesByType'];
            const types = {};
            Object.keys(vbt).forEach(type => {
                const fms = {};
                Object.values(this.statuses).forEach(
                    status => (fms[status] = 0)
                );
                Object.values(vbt[type]).forEach(vehicle => {
                    fms[vehicle.fms_real]++;
                });
                types[type] = {
                    title: this.vehicleTypeNames[type],
                    ...fms,
                    sum: vbt[type].length,
                };
            });
            return types;
        },
        vehicleTypesFiltered() {
            const vehicleTypes = this.vehicleTypes;
            const filtered = {};
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
                a = vehicleTypes[a][this.sort] || '';
                b = vehicleTypes[b][this.sort] || '';
                return a < b ? -1 * modifier : a > b ? modifier : 0;
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
};
</script>

<style scoped lang="sass">
table

    thead th
        cursor: pointer

    td:first-child,
    td:last-child
        font-weight: bold
</style>
