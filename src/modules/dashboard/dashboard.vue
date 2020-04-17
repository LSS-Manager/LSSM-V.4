<template>
    <lightbox name="dashboard">
        <h1>{{ $t('modules.dashboard.name') }}</h1>
        <tabs>
            <tab :title="$t('modules.dashboard.tabs.chart-summary')">
                <chart-summary></chart-summary>
            </tab>
            <tab :title="$t('modules.dashboard.tabs.vehicle-types')">
                <vehicle-types></vehicle-types>
            </tab>
        </tabs>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';
import ChartSummary from './components/chart-summary.vue';
import VehicleTypes from './components/vehicle-types.vue';

export default {
    name: 'dashboard',
    components: { VehicleTypes, ChartSummary, Lightbox },
    mounted() {
        this.$store.dispatch('api/buildings');
    },
};
</script>
