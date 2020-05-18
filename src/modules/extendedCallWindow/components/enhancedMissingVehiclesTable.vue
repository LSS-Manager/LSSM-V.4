<template>
    <enhanced-table
        :head="{
            vehicle: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.vehicle'
                ),
            },
            missing: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.missing'
                ),
            },
            driving: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.driving'
                ),
            },
            total: {
                title: $t(
                    'modules.extendedCallWindow.enhancedMissingVehicles.total'
                ),
            },
        }"
        :table-attrs="{ class: 'table table-striped table-condensed' }"
        @sort="k => $emit('sort', k)"
        :sort="sort"
        :sort-dir="sortDir"
        :no-search="true"
        :search="search"
        @search="k => $emit('search', k)"
    >
        <tr
            v-for="requirement in missingRequirements"
            :key="requirement.vehicle"
        >
            <td>
                <b>{{ requirement.vehicle }}</b>
            </td>
            <td>{{ requirement.missing.toLocaleString() }}</td>
            <td>{{ requirement.driving.toLocaleString() }}</td>
            <td>{{ requirement.total.toLocaleString() }}</td>
        </tr>
    </enhanced-table>

    <!--    <table class="table table-striped table-condensed">-->
    <!--        <thead>-->
    <!--            <tr>-->
    <!--                <th @click="$emit('sort', 'vehicle')">-->
    <!--                    {{-->
    <!--                        $t(-->
    <!--                            'modules.extendedCallWindow.enhancedMissingVehicles.vehicle'-->
    <!--                        )-->
    <!--                    }}-->
    <!--                </th>-->
    <!--                <th @click="$emit('sort', 'missing')">-->
    <!--                    {{-->
    <!--                        $t(-->
    <!--                            'modules.extendedCallWindow.enhancedMissingVehicles.missing'-->
    <!--                        )-->
    <!--                    }}-->
    <!--                </th>-->
    <!--                <th @click="$emit('sort', 'driving')">-->
    <!--                    {{-->
    <!--                        $t(-->
    <!--                            'modules.extendedCallWindow.enhancedMissingVehicles.driving'-->
    <!--                        )-->
    <!--                    }}-->
    <!--                </th>-->
    <!--                <th @click="$emit('sort', 'total')">-->
    <!--                    {{-->
    <!--                        $t(-->
    <!--                            'modules.extendedCallWindow.enhancedMissingVehicles.total'-->
    <!--                        )-->
    <!--                    }}-->
    <!--                </th>-->
    <!--            </tr>-->
    <!--        </thead>-->
    <!--        <tbody>-->
    <!--            <tr-->
    <!--                v-for="requirement in missingRequirements"-->
    <!--                :key="requirement.vehicle"-->
    <!--            >-->
    <!--                <td>-->
    <!--                    <b>{{ requirement.vehicle }}</b>-->
    <!--                </td>-->
    <!--                <td>{{ requirement.missing.toLocaleString() }}</td>-->
    <!--                <td>{{ requirement.driving.toLocaleString() }}</td>-->
    <!--                <td>{{ requirement.total.toLocaleString() }}</td>-->
    <!--            </tr>-->
    <!--        </tbody>-->
    <!--    </table>-->
</template>

<script>
import EnhancedTable from '../../../components/enhanced-table.vue';

export default {
    name: 'enhancedMissingVehiclesTable',
    components: { EnhancedTable },
    props: {
        missingRequirements: {
            type: Array,
            required: true,
        },
        sort: {
            type: String,
            required: false,
            default() {
                return Object.keys(this.head)[0];
            },
        },
        sortDir: {
            type: String,
            required: false,
            validator: value => ['asc', 'desc'].includes(value),
        },
        search: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
