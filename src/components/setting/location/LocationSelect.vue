<template>
    <lightbox :name="`${name}_map`" no-title-hide no-fullscreen>
        <h1>
            {{ $m(zoom ? 'zoom' : 'location') }}
            <br />
            <small>{{ title }}</small>
        </h1>
        <leaflet-map
            :id="id"
            :start-lat="location[0]"
            :start-long="location[1]"
            :start-zoom="location[2]"
            :layers="[locationMarker]"
            @mounted="mapMounted"
        ></leaflet-map>
    </lightbox>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import { useRootStore } from '@stores/index';

import LeafletMap from '../../leaflet-map.vue';
import Lightbox from '../../LightboxWrapper.vue';
import { useI18n } from '../../../i18n';

import type { Map as LMap, Marker } from 'leaflet';

type Location = [number, number, number] | [number, number];

const locationMarker = ref<Marker>();

const rootStore = useRootStore();
const { $m } = useI18n('modules.settings.locationSelect');

const props = withDefaults(
    defineProps<{
        name: string;
        title: string;
        location: Location;
        zoom?: boolean;
        markers?: { icon: string; location: [number, number] }[];
        save(location: Location): void;
    }>(),
    {
        zoom: false,
        markers: () => [],
    }
);

const id = computed(() => `location_select-${props.name}_map`);

const $emit = defineEmits<{ (event: 'close'): void }>();

const mapMounted = async (map: LMap) => {
    const marker = locationMarker.value;
    if (!marker) return;

    // center on map if out of view
    map.addEventListener('moveend', () => {
        if (marker && !map.getBounds().contains(marker.getLatLng()))
            marker.setLatLng(map.getCenter());
    });

    const mapId = map.getContainer().id;

    const saveBtn = await rootStore.addOSMControl({
        position: 'top-right',
        mapId,
    });
    saveBtn.classList.add('btn', 'btn-success');
    saveBtn.addEventListener('click', e => {
        e.preventDefault();
        const location = marker?.getLatLng() ?? map.getCenter();
        props.save(
            props.zoom
                ? [location.lat, location.lng, map.getZoom()]
                : [location.lat, location.lng]
        );
        $emit('close');
    });
    const saveIcon = document.createElement('i');
    saveIcon.classList.add('fa-solid', 'fa-save');
    saveBtn.append(saveIcon);

    const abortBtn = await rootStore.addOSMControl({
        position: 'top-right',
        mapId,
    });
    abortBtn.classList.add('btn', 'btn-danger');
    abortBtn.addEventListener('click', e => {
        e.preventDefault();
        $emit('close');
    });
    const abortIcon = document.createElement('i');
    abortIcon.classList.add('fa-solid', 'fa-times');
    abortBtn.append(abortIcon);

    if (props.markers.length) {
        const markerLayer = window.L.layerGroup().addTo(map);

        props.markers.forEach(({ icon, location }) =>
            window.iconMapGenerate(
                icon,
                window.L.marker(location, {
                    icon: window.icon_empty,
                }).addTo(markerLayer)
            )
        );

        const toggleMarkers = await rootStore.addOSMControl({
            position: 'top-right',
            mapId,
        });
        const toggleLocationIcon = document.createElement('i');
        toggleLocationIcon.classList.add(
            'fa-solid',
            'fa-location-dot',
            'fa-fw'
        );
        const toggleShowIcon = document.createElement('i');
        toggleShowIcon.classList.add('fa-solid', 'fa-eye', 'fa-fw', 'hidden');
        const toggleHideIcon = document.createElement('i');
        toggleHideIcon.classList.add('fa-solid', 'fa-eye-slash', 'fa-fw');
        toggleMarkers.append(
            toggleLocationIcon,
            toggleShowIcon,
            toggleHideIcon
        );

        let markersShown = true;

        toggleMarkers.addEventListener('click', e => {
            e.preventDefault();
            toggleMarkers
                .querySelectorAll<SVGElement>('svg[data-icon^="eye"]')
                .forEach(icon => icon.classList.toggle('hidden'));
            if (markersShown) markerLayer.removeFrom(map);
            else markerLayer.addTo(map);
            markersShown = !markersShown;
        });
    }

    const syncBtn = await rootStore.addOSMControl({
        position: 'bottom-left',
        mapId,
    });
    syncBtn.classList.add('btn', 'btn-default', 'btn-xs');
    syncBtn.style.setProperty('width', 'auto');
    syncBtn.style.setProperty('height', 'auto');
    syncBtn.addEventListener('click', e => {
        e.preventDefault();
        const center = window.map.getCenter();
        map.setView(center, window.map.getZoom());
        if (marker) marker.setLatLng(center);
    });
    syncBtn.textContent = $m('sync').toString();
};

onBeforeMount(() => {
    locationMarker.value = window.L.marker(
        [props.location[0], props.location[1]],
        {
            draggable: true,
            zIndexOffset: 1000,
            riseOnHover: true,
        }
    );
});
</script>

<style scoped lang="sass">
div:deep(.leaflet-control-container)
    .leaflet-bar
        .btn
            display: flex
            justify-content: center
            align-content: center
</style>
