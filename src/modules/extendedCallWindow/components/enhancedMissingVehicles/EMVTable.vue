<template>
    <enhanced-table
        :columns="columns"
        :column-translations="$cols"
        :table-attrs="{ class: 'table table-striped table-condensed' }"
        @sort="k => $emit('sort', k)"
        :sort="sort"
        :sort-dir="sortDir"
        no-search
    >
        <tr
            v-for="requirement in missingRequirements"
            :key="requirement.vehicle"
            :class="{
                overRequirement: reqIsFulfilled(requirement),
            }"
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
            <td v-if="requirement.selected.hasOwnProperty('min')">
                {{ (requirement.selected.min || 0).toLocaleString() }} -
                {{ (requirement.selected.max || 0).toLocaleString() }}
            </td>
            <td v-else>
                {{ (requirement.selected || 0).toLocaleString() }}
            </td>
        </tr>
    </enhanced-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import EnhancedTable from '../../../../components/EnhancedTable.vue';
import { useI18nModule } from '../../../../i18n';

import type { Requirement } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

type Column = (typeof columns)[number]['key'];

const { $m } = useI18nModule('extendedCallWindow');

const columns = [
    { key: 'vehicle' },
    { key: 'missing' },
    { key: 'driving' },
    { key: 'total' },
    { key: 'selected' },
] as const;
const $cols = computed(
    () => $m('enhancedMissingVehicles') as Record<Column, string>
);

const props = defineProps<{
    missingRequirements: Requirement[];
    sort: Column;
    sortDir: 'asc' | 'desc';
    calcMaxStaff: boolean;
}>();

const $emit = defineEmits<{ (event: 'sort', key: Column): void }>();

const reqIsFulfilled = (req: Requirement) =>
    (req.hasOwnProperty('total') ? req.total : req.missing) <=
    (typeof req.selected === 'number'
        ? req.selected
        : props.calcMaxStaff
        ? req.selected.max
        : req.selected.min);
</script>

<style scoped lang="sass">
.overRequirement
    color: #00cc00
</style>
