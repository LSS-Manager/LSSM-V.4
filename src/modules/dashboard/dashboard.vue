<template>
    <lightbox name="dashboard">
        <h1>{{ $m('name') }}</h1>
        <tabs>
            <tab :title="$m('tabs.chart-summary')">
                <chart-summary></chart-summary>
            </tab>
            <tab :title="$m('tabs.vehicle-types')">
                <vehicle-types></vehicle-types>
            </tab>
            <tab :title="$m('tabs.building-types')">
                <building-types></building-types>
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
                {{ $m('tabs.dispatchcenter-view') }}
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

<script lang="ts">
import Vue from 'vue';
import ChartSummary from './components/chart-summary.vue';
import DispatchcenterView from './components/dispatchcenter-view.vue';
import Lightbox from '../../components/lightbox.vue';
import VehicleTypes from './components/vehicle-types.vue';
import BuildingTypes from './components/building-types.vue';
import { DefaultComputed, DefaultData, DefaultProps } from 'vue/types/options';
import { DashboardMethods } from '../../../typings/modules/Dashboard/Dashboard';

export default Vue.extend<
    DefaultData<Vue>,
    DashboardMethods,
    DefaultComputed,
    DefaultProps
>({
    name: 'dashboard',
    components: {
        DispatchcenterView,
        VehicleTypes: () =>
            import(
                /* webpackChunkName: "dashboard/vehicle-types" */ './components/vehicle-types.vue'
            ),
        BuildingTypes,
        ChartSummary,
        Lightbox,
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.${key}`, args);
        },
    },
});
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
