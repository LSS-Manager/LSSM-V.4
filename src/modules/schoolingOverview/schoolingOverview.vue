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
            <h3>{{ $t('modules.schoolingOverview.name') }}</h3>
            <div class="col-lg-6">
                <h4>{{ $t('modules.schoolingOverview.own') }}</h4>
                <enhanced-table
                    :head="{
                        key: {
                            title: $t('modules.schoolingOverview.schooling'),
                        },
                        amount: {
                            title: $t('modules.schoolingOverview.amount'),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSortOwn"
                    :sort="sortOwn"
                    :sort-dir="sortOwnDir"
                    :search="ownSchoolingsSearch"
                    @search="s => (ownSchoolingsSearch = s)"
                >
                    <tr v-for="schooling in sortedOwn" :key="schooling.key">
                        <td>{{ schooling.key }}</td>
                        <td>{{ schooling.amount }}</td>
                    </tr>
                </enhanced-table>
            </div>
            <div class="col-lg-6">
                <h4>{{ $t('modules.schoolingOverview.open') }}</h4>
                <enhanced-table
                    :head="{
                        key: {
                            title: $t('modules.schoolingOverview.schooling'),
                        },
                        amount: {
                            title: $t('modules.schoolingOverview.amount'),
                        },
                        seats: {
                            title: $t('modules.schoolingOverview.seats'),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSortOpen"
                    :sort="sortOpen"
                    :sort-dir="sortOpenDir"
                    :search="openSchoolingsSearch"
                    @search="s => (openSchoolingsSearch = s)"
                >
                    <tr
                        v-for="schooling in sortedOpen"
                        :key="schooling.key"
                        :class="{ 'empty-schooling': !schooling.amount }"
                    >
                        <td>{{ schooling.key }}</td>
                        <td>{{ schooling.amount }}</td>
                        <td>{{ schooling.seats }}</td>
                    </tr>
                </enhanced-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    SchoolingOverview,
    SchoolingOverviewComputed,
    SchoolingOverviewMethods,
    SchoolingOverviewProps,
} from 'typings/modules/SchoolingOverview/SchoolingOverview';
import { OpenSchoolings } from 'typings/modules/SchoolingOverview/main';

export default Vue.extend<
    SchoolingOverview,
    SchoolingOverviewMethods,
    SchoolingOverviewComputed,
    SchoolingOverviewProps
>({
    name: 'schoolingsOverview',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            hidden: true,
            sortOwn: 'key',
            sortOwnDir: 'asc',
            sortOpen: 'key',
            sortOpenDir: 'asc',
            ownSchoolingsSearch: '',
            openSchoolingsSearch: '',
        } as SchoolingOverview;
    },
    props: {
        ownSchoolings: {
            type: Object,
            required: true,
        },
        openSchoolings: {
            type: Object,
            required: true,
        },
    },
    computed: {
        sortedOwn() {
            const schoolings = Object.entries(this.$props.ownSchoolings).map(
                ([schooling, amount]) => ({
                    amount,
                    key: schooling,
                })
            ) as {
                amount: number;
                key: string;

                // General
                [key: string]: string | number;
            }[];

            return (this.ownSchoolingsSearch
                ? schoolings.filter(schooling =>
                      JSON.stringify(Object.values(schooling))
                          .toLowerCase()
                          .match(this.ownSchoolingsSearch.toLowerCase())
                  )
                : schoolings
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortOwnDir === 'desc') modifier = -1;
                if (a[this.sortOwn] < b[this.sortOwn]) return -1 * modifier;
                if (a[this.sortOwn] > b[this.sortOwn]) return modifier;
                return 0;
            });
        },
        sortedOpen() {
            const schoolings = Object.entries(
                this.$props.openSchoolings as OpenSchoolings
            ).map(([schooling, { amount, seats }]) => ({
                amount,
                seats,
                key: schooling,
            })) as {
                amount: number;
                seats: number;
                key: string;

                // General
                [key: string]: string | number;
            }[];

            return (this.openSchoolingsSearch
                ? schoolings.filter(schooling =>
                      JSON.stringify(Object.values(schooling))
                          .toLowerCase()
                          .match(this.openSchoolingsSearch.toLowerCase())
                  )
                : schoolings
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortOpenDir === 'desc') modifier = -1;
                if (a[this.sortOpen] < b[this.sortOpen]) return -1 * modifier;
                if (a[this.sortOpen] > b[this.sortOpen]) return modifier;
                return 0;
            });
        },
    },
    methods: {
        setSortOwn(s) {
            this.sortOwnDir =
                s === this.sortOwn && this.sortOwnDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortOwn = s;
        },
        setSortOpen(s) {
            this.sortOpenDir =
                s === this.sortOpen && this.sortOpenDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortOpen = s;
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

    .empty-schooling
        td:not(:first-of-type)
            color: red
</style>
