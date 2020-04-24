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
            <tab
                title-slot="dispatchcenter-view-title"
                :disabled="!$store.state.premium"
            >
                <dispatchcenter-view
                    v-if="$store.state.premium"
                ></dispatchcenter-view>
                <div v-else></div>
            </tab>
            <template slot="dispatchcenter-view-title">
                {{ $t('modules.dashboard.tabs.dispatchcenter-view') }}
                <br />
                <div
                    class="alert alert-info premiumNotice"
                    v-if="!$store.state.premium"
                    ref="premiumNotice"
                >
                    {{ $t('premiumNotice') }}
                </div>
            </template>
        </tabs>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';
import ChartSummary from './components/chart-summary.vue';
import VehicleTypes from './components/vehicle-types.vue';
import DispatchcenterView from './components/dispatchcenter-view.vue';

export default {
    name: 'dashboard',
    components: { DispatchcenterView, VehicleTypes, ChartSummary, Lightbox },
    mounted() {
        this.$store.dispatch('api/buildings');
    },
};
</script>

<style scoped lang="sass">
.vue-tablist .vue-tab[aria-disabled="true"]
    .premiumNotice
        display: none
        position: absolute
        width: 200%
        font-weight: normal
        z-index: 1

    &:hover .premiumNotice
        display: unset
</style>
