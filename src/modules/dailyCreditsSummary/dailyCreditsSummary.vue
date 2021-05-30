<template>
    <div>
        <span
            class="glyphicon glyphicon-info-sign"
            @click="hidden = !hidden"
        ></span>
        <div class="alert alert-info row" :class="{ hidden }">
            <button class="close" type="button" @click="hidden = !hidden">
                ×
            </button>
            <div class="col-lg-6">
                <h4>{{ $m('name') }}</h4>
                <enhanced-table
                    :head="{
                        desc: {
                            title: $m('category'),
                        },
                        total: {
                            title: $m('total'),
                        },
                        amount: {
                            title: $m('amount'),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSort"
                    :sort="sort"
                    :sort-dir="sortDir"
                    :noSearch="true"
                >
                    <tr v-for="type in sorted" :key="type.desc">
                        <td>{{ type.desc }}</td>
                        <td
                            :class="
                                `text-${
                                    type.total > 0
                                        ? 'success'
                                        : type.total < 0
                                        ? 'danger'
                                        : ''
                                }`
                            "
                        >
                            {{ type.total.toLocaleString() }}
                        </td>
                        <td>{{ type.amount.toLocaleString() }}</td>
                    </tr>
                </enhanced-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { CreditsTypes } from 'typings/modules/dailyCreditsSummary/main';
import {
    DailyCreditsSummary,
    DailyCreditsSummaryComputed,
    DailyCreditsSummaryMethods,
    DailyCreditsSummaryProps,
} from 'typings/modules/dailyCreditsSummary/dailyCreditsSummary';

export default Vue.extend<
    DailyCreditsSummary,
    DailyCreditsSummaryMethods,
    DailyCreditsSummaryComputed,
    DailyCreditsSummaryProps
>({
    name: 'dailyCreditsSummary',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            hidden: true,
            sort: 'total',
            sortDir: 'desc',
        } as DailyCreditsSummary;
    },
    props: {
        entries: {
            type: Array,
            required: true,
        },
        creditsTypes: {
            type: Object,
            required: true,
        },
    },
    computed: {
        sorted() {
            const types = this.creditsTypeSum;
            return types.sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                if (a[this.sort] < b[this.sort]) return -1 * modifier;
                if (a[this.sort] > b[this.sort]) return modifier;
                return 0;
            });
        },
        creditsTypeSum() {
            const result: {
                [key: string]: {
                    desc: string;
                    total: number;
                    amount: number;
                };
            } = Object.fromEntries(
                Object.entries(
                    this.creditsTypes as CreditsTypes
                ).map(([key, { regex, title }]) => [
                    key,
                    {
                        desc:
                            title ??
                            regex?.toString().replace(/^\/|\/$/g, '') ??
                            '',
                        total: 0,
                        amount: 0,
                    },
                ])
            );

            this.entries.forEach(({ total, amount, types }) => {
                types.forEach(type => {
                    result[type].total += total;
                    result[type].amount += amount;
                });
            });
            return Object.values(result).filter(({ amount }) => amount > 0);
        },
    },
    methods: {
        setSort(s) {
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
        $m(key, args) {
            return this.$t(`modules.dailyCreditsSummary.${key}`, args);
        },
    },
});
</script>

<style scoped lang="sass">
th,
.glyphicon
	cursor: pointer

.alert
	&.external
		margin: 0
</style>
