<template>
    <div :id="mapId"></div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';

import { useEventStore } from '@stores/event';
import { useRootStore } from '@stores/index';

import type { FeatureGroup, Layer, Map as LMap } from 'leaflet';

const leafletMap = ref<LMap>();
const rootStore = useRootStore();

const props = withDefaults(
    defineProps<{
        id: string;
        height?: string;
        startLat?: number;
        startLong?: number;
        startZoom?: number;
        layers?: Layer[];
        centerGroup?: FeatureGroup;
    }>(),
    {
        height: '500px',
        startLat: 48.783_200_898_738_78,
        startLong: 9.180_364_608_764_65,
        startZoom: 15,
        layers: () => [],
        centerGroup: undefined,
    }
);

const mapId = computed(() => rootStore.nodeAttribute(`map-${props.id}`, true));

const redraw = () => {
    leafletMap.value?.remove();

    const map = window.L.map(mapId.value, {
        layers: props.layers,
    }).setView([props.startLat, props.startLong], props.startZoom);

    leafletMap.value = map;

    window.L.tileLayer('https://{s}/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        subdomains: ['maps.missionchief.com/tile'],
        maxZoom: 17,
        noWrap: true,
    }).addTo(map);

    if (props.centerGroup) map.fitBounds(props.centerGroup.getBounds());

    useEventStore().createAndDispatchEvent({
        name: 'leaflet-map-loaded',
        detail: { id: mapId.value, map },
    });

    return map;
};

const setView = (lat: number, long: number, zoom: number = undefined) =>
    leafletMap.value?.setView(
        [lat, long],
        zoom ?? leafletMap.value?.getZoom() ?? 15
    );

const $emit = defineEmits<{ (event: 'mounted', map: LMap): void }>();

defineExpose({ map: leafletMap, redraw, setView });

onMounted(() => {
    $emit('mounted', redraw());
    nextTick(() => window.dispatchEvent(new Event('resize')));
});
</script>

<style scoped lang="sass">
div
    height: v-bind(height)
</style>
