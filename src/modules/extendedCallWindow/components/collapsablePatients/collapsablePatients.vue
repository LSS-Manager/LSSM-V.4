<template>
    <div
        class="alert alert-danger col-xs-12"
        :id="boxId"
        :class="{ 'patients-collapsed': collapsed }"
    >
        <span class="col-xs-12">
            <b>{{ amountPatients.toLocaleString() }}</b>
            {{ $m('patientCollapse.summary.total') }},
            <b>{{ amountTreatedPatients.toLocaleString() }}</b>
            {{ $m('patientCollapse.summary.treated') }}
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
                :head="{
                    combi: {
                        title: $m('patientCollapse.combis'),
                        noSort: true,
                    },
                    amount: {
                        title: $m('patientCollapse.amount'),
                        noSort: true,
                    },
                }"
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
        <font-awesome-icon
            class="pull-left"
            :icon="collapsed ? faChevronCircleUp : faChevronCircleDown"
            style="cursor: pointer"
            @click="() => (collapsed = !collapsed)"
        ></font-awesome-icon>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons/faChevronCircleDown';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons/faChevronCircleUp';
import { useRootStore } from '@stores/index';

import type { $m } from 'typings/Module';
import type { DefaultMethods } from 'vue/types/options';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default Vue.extend<
    {
        boxId: string;
        faChevronCircleDown: IconDefinition;
        faChevronCircleUp: IconDefinition;
        collapsed: boolean;
    },
    DefaultMethods<Vue>,
    {
        hasRedTexts: boolean;
        hasLabels: boolean;
        redRequirements: [string, number][];
        labels: [string, Record<string, number>][];
        labelCombis: [Record<string, string>, number][];
        amountPatients: number;
        amountTreatedPatients: number;
    },
    {
        featureId: string;
        requirements: {
            red: Record<string, number>;
            detailed: Record<string, Record<string, number>>;
        };
        labelColors: Record<string, Record<string, string>>;
        patientLabelCombis: Record<string, number>;
        $m: $m;
    }
>({
    name: 'lssmv4-collapsablePatients',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            boxId: useRootStore().nodeAttribute(
                `${this.featureId}_summary-box`,
                true
            ),
            faChevronCircleDown,
            faChevronCircleUp,
            collapsed: true,
        };
    },
    computed: {
        hasRedTexts() {
            return !!Object.keys(this.requirements.red).length;
        },
        hasLabels() {
            return !!Object.keys(this.requirements.detailed).length;
        },
        redRequirements() {
            return Object.entries(this.requirements.red).sort(
                ([reqA], [reqB]) => (reqA > reqB ? 1 : reqA < reqB ? -1 : 0)
            );
        },
        labels() {
            return Object.entries(this.requirements.detailed).sort(
                ([reqA], [reqB]) => (reqA > reqB ? 1 : reqA < reqB ? -1 : 0)
            );
        },
        labelCombis() {
            return Object.entries(this.patientLabelCombis)
                .sort(([, amountA], [, amountB]) => amountA - amountB)
                .map(([combis, amount]) => [JSON.parse(combis), amount]) as [
                Record<string, string>,
                number,
            ][];
        },
        amountPatients() {
            return document.querySelectorAll('.mission_patient').length;
        },
        amountTreatedPatients() {
            return document.querySelectorAll(
                '.mission_patient .progress-striped-inner-active'
            ).length;
        },
    },
    props: {
        featureId: {
            type: String,
            required: true,
        },
        requirements: {
            type: Object,
            required: true,
        },
        labelColors: {
            type: Object,
            required: true,
        },
        patientLabelCombis: {
            type: Object,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
    },
});
</script>

<style lang="sass" scoped>
#lssmv4-extendedCallWindow_collapsable-patients_summary-box
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
</style>
<style lang="sass">
#lssmv4-extendedCallWindow_collapsable-patients_summary-box.patients-collapsed ~ .mission_patient
    display: none
</style>
