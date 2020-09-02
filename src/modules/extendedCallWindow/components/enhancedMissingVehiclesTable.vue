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
            selected: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.selected'
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
            <td>{{ (requirement.selected || 0).toLocaleString() }}</td>
        </tr>
    </enhanced-table>
</template>

<script lang="ts">
import Vue from 'vue';
import { EnhancedMissingVehiclesTableProps } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehiclesTable';
import {
    DefaultData,
    DefaultMethods,
    DefaultComputed,
} from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    EnhancedMissingVehiclesTableProps
>({
    name: 'enhancedMissingVehiclesTable',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    props: {
        missingRequirements: {
            type: Array,
            required: true,
        },
        sort: {
            type: String,
            required: false,
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
});
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
