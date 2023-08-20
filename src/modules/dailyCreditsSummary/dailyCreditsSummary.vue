<template>
    <div class="dcs-wrapper">
        <span
            class="glyphicon glyphicon-info-sign"
            @click="hidden = !hidden"
        ></span>
        <div class="row" :class="{ 'alert alert-info': !hidden }">
            <button
                v-if="!hidden"
                class="close"
                type="button"
                @click="hidden = !hidden"
            >
                ×
            </button>
            <h4 v-if="!hidden" style="margin-left: 1em">
                {{ $m('title') }}
            </h4>
            <div
                :class="{ 'col-lg-6': !hidden, 'col-lg-12': hidden }"
                class="badges-charts"
            >
                <div class="badges">
                    <dcs-badge
                        v-for="type in sorted"
                        :key="type.desc"
                        :backgroundColor="type.backgroundColor"
                        :textColor="type.textColor"
                        :amount="type.amount"
                        :total="type.total"
                        :desc="type.desc"
                        :show-average="showAverage"
                    ></dcs-badge>
                </div>
                <div v-if="!hidden">
                    <div class="col-lg-6">
                        <highcharts :options="incomeChartOptions"></highcharts>
                    </div>
                    <div class="col-lg-6">
                        <highcharts
                            :options="expensesChartOptions"
                        ></highcharts>
                    </div>
                </div>
            </div>
            <div v-if="!hidden" class="col-lg-6">
                <enhanced-table
                    :head="tableHead"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSort"
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="search"
                    @search="s => (search = s)"
                >
                    <template v-slot:head>
                        <div class="btn-group pull-right">
                            <button
                                class="btn btn-default dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {{ $m('export.export') }}&nbsp;<span
                                    class="caret"
                                ></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a
                                        download="credits.json"
                                        :href="`data:application/json;charset=utf-8,${encodeURIComponent(
                                            exports.jsonPretty
                                        )}`"
                                    >
                                        {{ $m('export.json.raw') }}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        download="credits.json"
                                        :href="`data:application/json;charset=utf-8,${encodeURIComponent(
                                            exports.jsonPretty
                                        )}`"
                                    >
                                        {{ $m('export.json.prettified') }}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        download="credits.csv"
                                        :href="`data:text/csv;charset=utf-8,${encodeURIComponent(
                                            exports.csv
                                        )}`"
                                    >
                                        {{ $m('export.csv') }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <tr v-for="type in sorted" :key="type.desc">
                        <td>{{ type.desc }}</td>
                        <td
                            :class="`text-${
                                type.total > 0
                                    ? 'success'
                                    : type.total < 0
                                    ? 'danger'
                                    : ''
                            }`"
                        >
                            {{ type.total.toLocaleString() }}
                        </td>
                        <td
                            :class="`text-${
                                type.total > 0
                                    ? 'success'
                                    : type.total < 0
                                    ? 'danger'
                                    : ''
                            }`"
                        >
                            {{
                                Math.round(
                                    type.total / type.amount
                                ).toLocaleString()
                            }}
                        </td>
                        <td>{{ type.amount.toLocaleString() }}</td>
                    </tr>
                </enhanced-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { Chart as Highcharts } from 'highcharts-vue';
import { useSettingsStore } from '@stores/settings';

import dcsBadge from './components/dcsBadge.vue';
import EnhancedTable from '../../components/enhanced-table.vue';
import { useI18nModule } from '../../i18n';

import type { CreditsDailyWindow } from '../redesign/parsers/credits/daily';
import type { CreditsTypes } from 'typings/modules/dailyCreditsSummary/main';
import type {
    BasicChartOptions,
    Category,
    ChartOptions,
} from 'typings/modules/dailyCreditsSummary/dailyCreditsSummary';

const { $m } = useI18nModule('dailyCreditsSummary');

const hidden = ref<boolean>(true);
const sort = ref<keyof Category>('desc');
const sortDir = ref<'asc' | 'desc'>('asc');
const search = ref<string>('');
const showAverage = ref<boolean>(false);

const props = defineProps<{
    entries: CreditsDailyWindow['entries'];
    creditsTypes: CreditsTypes;
}>();

const tableHead = {
    desc: {
        title: $m('category').toString(),
    },
    total: {
        title: $m('total').toString(),
    },
    average: {
        title: 'Ø',
    },
    amount: {
        title: $m('amount').toString(),
    },
};

const basicChartOptions = {
    chart: {
        type: 'pie',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        margin: 0,
        spacing: [5, 10, 0, 10],
        height: '100%',
        borderRadius: '4px',
    },
    tooltip: {
        pointFormat:
            '{series.name}: <b>{point.value}</b> ({point.percentage:.1f}%)',
    },
    plotOptions: {
        pie: {
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.value} ({point.percentage:.1f}%)',
            },
        },
    },
} satisfies BasicChartOptions;

const creditsTypeSum = computed(() => {
    const result: Record<string, Category> = Object.fromEntries(
        Object.entries(props.creditsTypes).map(
            ([key, { regex, title, backgroundColor, textColor }]) => [
                key,
                {
                    desc:
                        title ??
                        regex
                            ?.toString()
                            .replace(/^\/|\/[ADJUgimux]*$/gu, '') ??
                        '',
                    total: 0,
                    amount: 0,
                    backgroundColor,
                    textColor,
                },
            ]
        )
    );

    props.entries.forEach(({ total, amount, types }) => {
        types.forEach(type => {
            result[type].total += total;
            result[type].amount += amount;
        });
    });
    return Object.values(result).filter(({ amount }) => amount > 0);
});

const filtered = computed(() => {
    if (!search.value.trim().length || hidden.value)
        return creditsTypeSum.value;
    return creditsTypeSum.value.filter(({ desc }) =>
        desc.toLowerCase().match(search.value.trim().toLowerCase())
    );
});

const sorted = computed(() => {
    const types = filtered.value;
    return types.sort((a, b) => {
        let modifier = 1;
        if (sortDir.value === 'desc') modifier = -1;
        if (a[sort.value] < b[sort.value]) return -1 * modifier;
        if (a[sort.value] > b[sort.value]) return modifier;
        return 0;
    });
});

const exports = computed(() => ({
    json: JSON.stringify(creditsTypeSum.value),
    jsonPretty: JSON.stringify(creditsTypeSum.value, null, 4),
    csv: `${['desc', 'total', 'amount', 'backgroundColor', 'textColor'].join(
        ','
    )}\n${creditsTypeSum.value
        .map(({ desc, total, amount, backgroundColor, textColor }) =>
            [desc, total, amount, backgroundColor, textColor].join(',')
        )
        .join('\n')}`,
}));

const incomeChartOptions = computed<ChartOptions>(() => ({
    ...basicChartOptions,
    title: {
        text: $m('charts.income').toString(),
        align: 'left',
    },
    series: [
        {
            name: $m('charts.income').toString(),
            data: creditsTypeSum.value
                .filter(({ total }) => total > 0)
                .map(({ desc: name, total: y, backgroundColor }) => ({
                    name,
                    y,
                    value: y.toLocaleString(),
                    color: backgroundColor,
                })),
        },
    ],
}));
const expensesChartOptions = computed<ChartOptions>(() => ({
    ...basicChartOptions,
    title: {
        text: $m('charts.expenses').toString(),
        align: 'left',
    },
    series: [
        {
            name: $m('charts.expenses').toString(),
            data: creditsTypeSum.value
                .filter(({ total }) => total < 0)
                .map(({ desc: name, total: y, backgroundColor }) => ({
                    name,
                    y: -y,
                    value: y.toLocaleString(),
                    color: backgroundColor,
                })),
        },
    ],
}));

const setSort = (sortBy: keyof Category) => {
    sortDir.value =
        sortBy === sort.value && sortDir.value === 'asc' ? 'desc' : 'asc';
    sort.value = sortBy;
};

onMounted(() => {
    useSettingsStore()
        .getSetting<boolean>({
            moduleId: 'dailyCreditsSummary',
            settingId: 'showAverage',
        })
        .then(setting => (showAverage.value = setting));
});
</script>

<style scoped lang="sass">
.glyphicon
    cursor: pointer

.dcs-wrapper
    display: flex

    > .row
        margin-left: 0

        &.alert-info
            margin-left: -15px
            width: 100%

        .badges-charts
            display: flex
            flex-flow: column
            height: calc(100% - 30px)

            .badges
                display: flex
                flex-flow: row
                flex-wrap: wrap
</style>
