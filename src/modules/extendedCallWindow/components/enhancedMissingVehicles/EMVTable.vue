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
            :key="requirement.requirement"
            :class="{
                overRequirement: reqIsFulfilled(requirement),
            }"
        >
            <td>
                <b>{{ requirement.requirement }}</b>
            </td>
            <td>{{ requirement.missing.toLocaleString() }}</td>
            <td>{{ (requirement.driving || 0).toLocaleString() }}</td>
            <td>
                {{
                    (requirement.missing - requirement.driving).toLocaleString()
                }}
            </td>
            <td v-if="typeof requirement.selected !== 'number'">
                <!-- yeah, for some reason TS does not get that number check above -->
                {{
                    (typeof requirement.selected !== 'number' ?
                        requirement.selected.min
                    :   0
                    ).toLocaleString()
                }}
                -
                {{
                    (typeof requirement.selected !== 'number' ?
                        requirement.selected.max
                    :   0
                    ).toLocaleString()
                }}
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

import type { MissionRequirement } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

type Column = (typeof columns)[number]['key'];

const { $m } = useI18nModule('extendedCallWindow');

const columns = [
    { key: 'requirement' },
    { key: 'missing' },
    { key: 'driving' },
    { key: 'total' },
    { key: 'selected' },
] as const;
const $cols = computed(
    () => $m('enhancedMissingVehicles') as unknown as Record<Column, string>
);

const props = defineProps<{
    missingRequirements: MissionRequirement[];
    sort: Column;
    sortDir: 'asc' | 'desc';
    calcMaxStaff: boolean;
}>();

const $emit = defineEmits<{ (event: 'sort', key: Column): void }>();

const reqIsFulfilled = (req: MissionRequirement) =>
    req.missing - req.driving <=
    (typeof req.selected === 'number' ? req.selected
    : props.calcMaxStaff ? req.selected.max
    : req.selected.min);
</script>

<style scoped lang="sass">
.overRequirement
    color: #00cc00
</style>
