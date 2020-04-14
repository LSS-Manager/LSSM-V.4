<template>
    <lightbox name="dashboard">
        <h1>{{ $t('modules.dashboard.name') }}</h1>
        <tabs>
            <tab :title="$t('modules.dashboard.tabs.chart-summary')">
                <chart-summary></chart-summary>
            </tab>
        </tabs>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';
import ChartSummary from './components/chart-summary.vue';

export default {
    name: 'dashboard',
    components: { ChartSummary, Lightbox },
};
</script>
