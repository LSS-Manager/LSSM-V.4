<template>
    <div>
        <table
            :id="$store.getters.nodeId('dashboard-vehicle-types')"
            class="table table-striped"
        >
            <thead>
                <tr>
                    <th>{{ $t('modules.dashboard.vehicle-types.type') }}</th>
                    <th v-for="status in statuses" :key="status">
                        {{ $t('modules.dashboard.vehicle-types.status') }}
                        &nbsp;{{ status }}
                    </th>
                    <th>
                        {{ $t('modules.dashboard.vehicle-types.sum') }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(stats, vehicleType) in vehicleTypes"
                    :key="`vehicles_${vehicleType}`"
                >
                    <td>{{ stats.title }}</td>
                    <td
                        v-for="status in statuses"
                        :key="`${vehicleType}_${status}`"
                    >
                        {{ (stats[status] || 0).toLocaleString() }}
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
        };
    },
    computed: {
        vehicleTypes() {
            const vbt = this.$store.getters['api/vehiclesByType'];
            const types = {};
            Object.keys(vbt).forEach(type => {
                const fms = {};
                Object.values(vbt[type]).forEach(vehicle => {
                    if (!fms.hasOwnProperty(vehicle.fms_real))
                        fms[vehicle.fms_real] = 0;
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
        sum() {
            return this.$store.state.api.vehicleStates;
        },
    },
};
</script>

<style scoped lang="sass">
table
    td:first-child,
    td:last-child
        font-weight: bold
</style>
