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
            <tab :title="$m('tabs.dispatchcenter-view')">
                <dispatchcenter-view></dispatchcenter-view>
            </tab>
        </tabs>
    </lightbox>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import { useI18nModule } from '../../i18n';

const { $m } = useI18nModule('dashboard');

const Lightbox = defineAsyncComponent(
    () =>
        import(
            /* webpackChunkName: "modules/components/lightbox" */ '../../components/LightboxWrapper.vue'
        )
);
const ChartSummary = defineAsyncComponent(
    () =>
        import(
            /* webpackChunkName: "modules/dashboard/chart-summary" */ './components/chart-summary.vue'
        )
);
const VehicleTypes = defineAsyncComponent(
    () =>
        import(
            /* webpackChunkName: "modules/dashboard/vehicle-types" */ './components/vehicle-types.vue'
        )
);
const BuildingTypes = defineAsyncComponent(
    () =>
        import(
            /* webpackChunkName: "modules/dashboard/building-types" */ './components/building-types.vue'
        )
);
const DispatchcenterView = defineAsyncComponent(
    () =>
        import(
            /* webpackChunkName: "modules/dashboard/dispatchcenter-view" */ './components/dispatchcenter-view.vue'
        )
);
</script>
