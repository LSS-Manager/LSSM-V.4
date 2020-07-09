<template>
    <div class="alert alert-danger alert-missing-vehicles" id="missing_text">
        {{ extras }}
        <div class="row">
            <div class="col-md-6">
                <enhanced-missing-vehicles-table
                    :missing-requirements="
                        missingRequirementsSorted.slice(
                            0,
                            Math.ceil(missingRequirementsFiltered.length / 2)
                        )
                    "
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="missingRequirementsSearch"
                    @sort="setSort"
                    @search="(s) => (missingRequirementsSearch = s)"
                ></enhanced-missing-vehicles-table>
            </div>
            <div class="col-md-6">
                <enhanced-missing-vehicles-table
                    :missing-requirements="
                        missingRequirementsSorted.slice(
                            Math.ceil(missingRequirementsFiltered.length / 2)
                        )
                    "
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="missingRequirementsSearch"
                    @sort="setSort"
                    @search="(s) => (missingRequirementsSearch = s)"
                ></enhanced-missing-vehicles-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedMissingVehiclesTable from './enhancedMissingVehiclesTable.vue';
import {
    EnhancedMissingVehicles,
    EnhancedMissingVehiclesComputed,
    EnhancedMissingVehiclesMethods,
    EnhancedMissingVehiclesProps,
} from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

export default Vue.extend<
    EnhancedMissingVehicles,
    EnhancedMissingVehiclesMethods,
    EnhancedMissingVehiclesComputed,
    EnhancedMissingVehiclesProps
>({
    name: 'enhancedMissingVehicles',
    components: { EnhancedMissingVehiclesTable },
    data() {
        return {
            missingRequirementsSearch: '',
            sort: 'vehicle',
            sortDir: 'asc',
        };
    },
    props: {
        missingRequirements: {
            type: Array,
            required: true,
        },
        extras: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        missingRequirementsFiltered() {
            return this.missingRequirements.filter((req) =>
                JSON.stringify(req)
                    .toLowerCase()
                    .match(this.missingRequirementsSearch.toLowerCase())
            );
        },
        missingRequirementsSorted() {
            return Object.values(
                this.missingRequirementsSearch
                    ? this.missingRequirementsFiltered
                    : this.missingRequirements
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                if (a[this.sort] < b[this.sort]) return -1 * modifier;
                if (a[this.sort] > b[this.sort]) return modifier;
                return 0;
            });
        },
    },
    methods: {
        setSort(s) {
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
    },
});
</script>
