<template>
    <div>
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
                {{ $m('title').toString() }}
            </h4>
            <div
                :class="{ 'col-lg-6': !hidden, 'col-lg-12': hidden }"
                style="display: flex; flex-wrap: wrap"
            >
                <dsc-badge
                    v-for="type in sorted"
                    :key="type.desc"
                    :backgroundColor="type.backgroundColor"
                    :textColor="type.textColor"
                    :amount="type.amount"
                    :total="type.total"
                    :desc="type.desc"
                ></dsc-badge>
            </div>
            <div v-if="!hidden" class="col-lg-6">
                <enhanced-table
                    :head="{
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
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSort"
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="search"
                    @search="s => (search = s)"
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
        dscBadge: () =>
            import(
                /* webpackChunkName: "modules/dailyCreditsSummary/components/enhanced-table" */ './components/dscBadge.vue'
            ),
    },
    data() {
        return {
            hidden: true,
            sort: 'total',
            sortDir: 'desc',
            search: '',
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
            const types = this.filtered;
            return types.sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                if (a[this.sort] < b[this.sort]) return -1 * modifier;
                if (a[this.sort] > b[this.sort]) return modifier;
                return 0;
            });
        },
        filtered() {
            if (!this.search.trim().length || this.hidden)
                return this.creditsTypeSum;
            return this.creditsTypeSum.filter(({ desc }) =>
                desc.toLowerCase().match(this.search.trim().toLowerCase())
            );
        },
        creditsTypeSum() {
            const result: {
                [key: string]: {
                    desc: string;
                    total: number;
                    amount: number;
                    backgroundColor: string;
                };
            } = Object.fromEntries(
                Object.entries(this.creditsTypes as CreditsTypes).map(
                    ([key, { regex, title, backgroundColor, textColor }]) => [
                        key,
                        {
                            desc:
                                title ??
                                regex?.toString().replace(/^\/|\/$/g, '') ??
                                '',
                            total: 0,
                            amount: 0,
                            backgroundColor,
                            textColor,
                        },
                    ]
                )
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
