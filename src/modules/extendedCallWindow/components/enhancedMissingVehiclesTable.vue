<template>
    <table class="table table-striped table-condensed">
        <thead>
            <tr>
                <th @click="$emit('sort', 'vehicle')">
                    {{
                        $t(
                            'modules.extendedCallWindow.enhancedMissingVehicles.vehicle'
                        )
                    }}
                </th>
                <th @click="$emit('sort', 'missing')">
                    {{
                        $t(
                            'modules.extendedCallWindow.enhancedMissingVehicles.missing'
                        )
                    }}
                </th>
                <th @click="$emit('sort', 'driving')">
                    {{
                        $t(
                            'modules.extendedCallWindow.enhancedMissingVehicles.driving'
                        )
                    }}
                </th>
                <th @click="$emit('sort', 'total')">
                    {{
                        $t(
                            'modules.extendedCallWindow.enhancedMissingVehicles.total'
                        )
                    }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="requirement in missingRequirements"
                :key="requirement.vehicle"
            >
                <td>
                    <b>{{ requirement.vehicle }}</b>
                </td>
                <td>{{ requirement.missing }}</td>
                <td>{{ requirement.driving }}</td>
                <td>{{ requirement.total }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'enhancedMissingVehiclesTable',
    props: {
        missingRequirements: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
