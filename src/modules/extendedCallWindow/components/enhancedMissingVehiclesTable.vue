<template>
    <enhanced-table
        :head="{
            vehicle: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.vehicle'
                ),
            },
            missing: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.missing'
                ),
            },
            driving: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.driving'
                ),
            },
            total: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.total'
                ),
            },
        }"
        :table-attrs="{ class: 'table table-striped table-condensed' }"
        @sort="k => $emit('sort', k)"
        :sort="sort"
        :sort-dir="sortDir"
        :no-search="true"
        :search="search"
        @search="k => $emit('search', k)"
    >
        <tr
            v-for="requirement in missingRequirements"
            :key="requirement.vehicle"
        >
            <td>
                <b>{{ requirement.vehicle }}</b>
            </td>
            <td>{{ requirement.missing.toLocaleString() }}</td>
            <td>{{ (requirement.driving || 0).toLocaleString() }}</td>
            <td v-if="requirement.hasOwnProperty('total')">
                {{ requirement.total.toLocaleString() }}
            </td>
            <td v-else>{{ requirement.missing.toLocaleString() }}</td>
        </tr>
    </enhanced-table>
</template>

<script>
import EnhancedTable from '../../../components/enhanced-table.vue';

export default {
    name: 'enhancedMissingVehiclesTable',
    components: { EnhancedTable },
    props: {
        missingRequirements: {
            type: Array,
            required: true,
        },
        sort: {
            type: String,
            required: false,
            default() {
                return Object.keys(this.head)[0];
            },
        },
        sortDir: {
            type: String,
            required: false,
            validator: value => ['asc', 'desc'].includes(value),
        },
        search: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
