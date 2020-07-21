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
            <h3>{{ $sm('title') }}</h3>
            <div class="col-lg-6">
                <h4>{{ $sm('all') }}</h4>
                <enhanced-table
                    :head="{
                        schooling: {
                            title: $sm('schooling'),
                        },
                        amount: {
                            title: $sm('amount'),
                        },
                        bound: {
                            title: $sm('bound'),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSortAll"
                    :sort="sortAll"
                    :sort-dir="sortAllDir"
                    :search="allSchoolingsSearch"
                    @search="s => (allSchoolingsSearch = s)"
                >
                    <tr v-for="schooling in sortedAll" :key="schooling.key">
                        <td>{{ schooling.schooling }}</td>
                        <td>{{ schooling.amount }}</td>
                        <td>{{ schooling.bound }}</td>
                    </tr>
                </enhanced-table>
            </div>
            <div class="col-lg-6">
                <h4>{{ $sm('each') }}</h4>
                <enhanced-table
                    :head="{
                        schooling: {
                            title: $sm('schooling'),
                        },
                        amount: {
                            title: $sm('amount'),
                        },
                        bound: {
                            title: $sm('bound'),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSortEach"
                    :sort="sortEach"
                    :sort-dir="sortEachDir"
                    :search="eachSchoolingsSearch"
                    @search="s => (eachSchoolingsSearch = s)"
                >
                    <tr v-for="schooling in sortedEach" :key="schooling.key">
                        <td>{{ schooling.schooling }}</td>
                        <td>{{ schooling.amount }}</td>
                        <td>{{ schooling.bound }}</td>
                    </tr>
                </enhanced-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../../components/enhanced-table.vue';
import {
    SchoolingSummary,
    SchoolingSummaryComputed,
    SchoolingSummaryMethods,
    SchoolingSummaryProps,
} from 'typings/modules/ExtendedBuilding/schoolingSummary';

export default Vue.extend<
    SchoolingSummary,
    SchoolingSummaryMethods,
    SchoolingSummaryComputed,
    SchoolingSummaryProps
>({
    name: 'schoolingSummary',
    components: { EnhancedTable },
    data() {
        return {
            hidden: true,
            sortAll: 'amount',
            sortAllDir: 'desc',
            allSchoolingsSearch: '',
            sortEach: 'amount',
            sortEachDir: 'desc',
            eachSchoolingsSearch: '',
        };
    },
    props: {
        allSchoolings: {
            type: Object,
            required: true,
        },
        eachSchoolings: {
            type: Object,
            required: true,
        },
    },
    computed: {
        sortedAll() {
            const schoolings = Object.entries(this.allSchoolings).map(
                ([schooling, { amount, bound }]) => ({
                    schooling,
                    amount,
                    bound,
                })
            );
            return (this.allSchoolingsSearch
                ? schoolings.filter(schooling =>
                      JSON.stringify(Object.values(schooling))
                          .toLowerCase()
                          .match(this.allSchoolingsSearch.toLowerCase())
                  )
                : schoolings
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortAllDir === 'desc') modifier = -1;
                if (a[this.sortAll] < b[this.sortAll]) return -1 * modifier;
                if (a[this.sortAll] > b[this.sortAll]) return modifier;
                return 0;
            });
        },
        sortedEach() {
            const schoolings = Object.entries(this.eachSchoolings).map(
                ([schooling, { amount, bound }]) => ({
                    schooling,
                    amount,
                    bound,
                })
            );
            return (this.allSchoolingsSearch
                ? schoolings.filter(schooling =>
                      JSON.stringify(Object.values(schooling))
                          .toLowerCase()
                          .match(this.eachSchoolingsSearch.toLowerCase())
                  )
                : schoolings
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortEachDir === 'desc') modifier = -1;
                if (a[this.sortEach] < b[this.sortEach]) return -1 * modifier;
                if (a[this.sortEach] > b[this.sortEach]) return modifier;
                return 0;
            });
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.${MODULE_ID}.${key}`, args);
        },
        $sm(key, args) {
            return this.$m(`schoolingSummary.${key}`, args);
        },
        setSortAll(s: SchoolingSummary['sortAll']) {
            this.sortAllDir =
                s === this.sortAll && this.sortAllDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortAll = s;
        },
        setSortEach(s: SchoolingSummary['sortEach']) {
            this.sortEachDir =
                s === this.sortEach && this.sortEachDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortEach = s;
        },
    },
});
</script>

<style scoped lang="sass">
.glyphicon
    cursor: pointer
</style>
