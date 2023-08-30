<template>
    <div
        class="alert alert-danger col-xs-12"
        :class="{ 'patients-collapsed': collapsed }"
    >
        <span class="col-xs-12">
            <b>{{ amountTotal.toLocaleString() }}</b>
            {{ $m('summary.total') }}
            <b>{{ amountTreated.toLocaleString() }}</b>
            {{ $m('summary.treated') }}
        </span>
        <div
            v-if="hasRedTexts"
            :class="hasLabels ? 'col-md-2 col-xs-4' : 'col-xs-12'"
        >
            <ul>
                <li v-for="[req, amount] in redRequirements" :key="req">
                    <b>{{ amount.toLocaleString() }}x</b> {{ req }}
                </li>
            </ul>
        </div>
        <div
            v-if="hasLabels"
            class="col-xs-8"
            :class="hasRedTexts ? 'col-md-4' : 'col-md-6'"
        >
            <ul class="labels-list">
                <li v-for="[label, details] in labels" :key="label">
                    <span
                        v-for="(amount, detail) in details"
                        class="patient-label"
                        :key="`${label}_${detail}`"
                    >
                        <b>{{ amount.toLocaleString() }}x</b>
                        <span class="label label-default label-left">
                            {{ label }}
                        </span>
                        <span
                            class="label label-right"
                            :class="labelColors[label][detail]"
                        >
                            {{ detail }}
                        </span>
                    </span>
                </li>
            </ul>
        </div>
        <div v-if="hasLabels" class="col-xs-12 col-md-6">
            <enhanced-table
                :columns="[
                    {
                        key: 'combi',
                        title: $m('combis').toString(),
                        noSort: true,
                    },
                    {
                        key: 'amount',
                        title: $m('amount').toString(),
                        noSort: true,
                    },
                ]"
                :table-attrs="{ class: 'table table-striped table-condensed' }"
                no-search
            >
                <tr
                    v-for="([combi, amount], index) in labelCombis"
                    :key="index"
                >
                    <td>
                        <span
                            v-for="(detail, desc) in combi"
                            :key="`${index}_${desc}_${detail}`"
                            class="patient-label"
                        >
                            <span class="label label-default label-left">
                                {{ desc }}
                            </span>
                            <span
                                class="label label-right"
                                :class="labelColors[desc][detail]"
                            >
                                {{ detail }}
                            </span>
                            <wbr />
                        </span>
                    </td>
                    <td>
                        <b>{{ amount.toLocaleString() }}</b>
                    </td>
                </tr>
            </enhanced-table>
        </div>
        <div class="clearfix"></div>
        <font-awesome-icon
            class="pull-left"
            :icon="collapsed ? faChevronCircleUp : faChevronCircleDown"
            style="cursor: pointer"
            @click="() => (collapsed = !collapsed)"
        ></font-awesome-icon>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons/faChevronCircleDown';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons/faChevronCircleUp';

import EnhancedTable from '../../../../components/EnhancedTable.vue';
import { useI18nModule } from '../../../../i18n';

const { $m } = useI18nModule('extendedCallWindow.patientCollapse');

const collapsed = ref<boolean>(true);
const amountTotal = ref<number>(0);
const amountTreated = ref<number>(0);

const props = defineProps<{
    requirements: {
        red: Record<string, number>;
        detailed: Record<string, Record<string, number>>;
    };
    labelColors: Record<string, Record<string, string>>;
    patientLabelCombis: Record<string, number>;
}>();

const hasRedTexts = computed<boolean>(
    () => Object.keys(props.requirements.red).length > 0
);
const hasLabels = computed<boolean>(
    () => Object.keys(props.requirements.detailed).length > 0
);
const redRequirements = computed<[string, number][]>(() =>
    Object.entries(props.requirements.red).sort((reqA, reqB) =>
        reqA[0].localeCompare(reqB[0])
    )
);
const labels = computed<[string, Record<string, number>][]>(() =>
    Object.entries(props.requirements.detailed).sort((reqA, reqB) =>
        reqA[0].localeCompare(reqB[0])
    )
);
const labelCombis = computed<[Record<string, string>, number][]>(() =>
    Object.entries(props.patientLabelCombis)
        .sort((reqA, reqB) => reqA[1] - reqB[1])
        .map(([combis, amount]) => [JSON.parse(combis), amount])
);

onBeforeMount(() => {
    amountTotal.value = document.querySelectorAll('.mission_patient').length;
    amountTreated.value = document.querySelectorAll(
        '.mission_patient .progress-striped-inner-active'
    ).length;
});
</script>

<style scoped lang="sass">
.alert
    margin: 5px
    width: calc(100% - 10px)
    border-radius: 5px
    padding: 5px

    ul
        list-style: none
        padding-left: 0
        margin-bottom: 0

        &.labels-list
            padding-left: 0.5em

    span.patient-label
        display: inline-block

        &:not(:first-child)
            padding-left: 0.5em

    :deep(table)
        margin-bottom: 0

    &.patients-collapsed ~ :deep(.mission_patient)
        display: none
</style>
