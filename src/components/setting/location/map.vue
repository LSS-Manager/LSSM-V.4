<template>
    <lightbox :name="`${name}_map`" no-title-hide no-fullscreen>
        <h1>
            {{
                $t(
                    `modules.settings.locationSelect.${
                        zoom ? 'zoom' : 'location'
                    }`
                )
            }}
            <br />
            <small>{{ title }}</small>
        </h1>
        <leaflet-map
            :id="`${name}_map`"
            :start-lat="location[0]"
            :start-long="location[1]"
            :start-zoom="location[2]"
            :layers="[locationMarker]"
            @mounted="mapMounted"
        ></leaflet-map>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { useRootStore } from '@stores/index';

import type { DefaultComputed } from 'vue/types/options';
import type { Map as LMap, Marker } from 'leaflet';

export default Vue.extend<
    { locationMarker: Marker | null },
    { mapMounted(map: LMap): void },
    DefaultComputed,
    {
        name: string;
        title: string;
        location: number[];
        zoom: boolean;
        markers: { icon: string; location: [number, number] }[];
        save(location: number[]): void;
    }
>({
    name: 'settings-location-map',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../lightbox.vue'
            ),
        LeafletMap: () =>
            import(
                /* webpackChunkName: "components/leaflet-map" */ '../../leaflet-map.vue'
            ),
    },
    data() {
        return {
            locationMarker: null,
        };
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        location: {
            type: Array,
            required: true,
        },
        zoom: {
            type: Boolean,
            required: false,
            default: false,
        },
        markers: {
            type: Array,
            required: false,
            default: () => [],
        },
        save: {
            type: Function,
            required: true,
        },
    },
    methods: {
        async mapMounted(map) {
            map.addEventListener('moveend', () => {
                if (
                    this.locationMarker &&
                    !map.getBounds().contains(this.locationMarker.getLatLng())
                )
                    this.locationMarker.setLatLng(map.getCenter());
            });

            const mapId = map.getContainer().id;

            const rootStore = useRootStore();

            const save = await rootStore.addOSMControl({
                position: 'top-right',
                mapId,
            });
            save.classList.add('btn', 'btn-success');
            save.style.setProperty('display', 'flex');
            save.style.setProperty('justify-content', 'center');
            save.style.setProperty('align-content', 'center');
            save.addEventListener('click', e => {
                e.preventDefault();
                const location =
                    this.locationMarker?.getLatLng() ?? map.getCenter();
                this.save(
                    this.zoom
                        ? [location.lat, location.lng, map.getZoom()]
                        : [location.lat, location.lng]
                );
                this.$emit('close');
            });
            const saveIcon = document.createElement('i');
            saveIcon.classList.add('fa-solid', 'fa-save');
            save.append(saveIcon);

            const abort = await rootStore.addOSMControl({
                position: 'top-right',
                mapId,
            });
            abort.classList.add('btn', 'btn-danger');
            abort.style.setProperty('display', 'flex');
            abort.style.setProperty('justify-content', 'center');
            abort.style.setProperty('align-content', 'center');
            abort.addEventListener('click', e => {
                e.preventDefault();
                this.$emit('close');
            });
            const abortIcon = document.createElement('i');
            abortIcon.classList.add('fa-solid', 'fa-times');
            abort.append(abortIcon);

            if (this.markers?.length) {
                const markerLayer = window.L.layerGroup().addTo(map);

                this.markers.forEach(({ icon, location }) =>
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
                toggleShowIcon.classList.add(
                    'fa-solid',
                    'fa-eye',
                    'fa-fw',
                    'hidden'
                );
                const toggleHideIcon = document.createElement('i');
                toggleHideIcon.classList.add(
                    'fa-solid',
                    'fa-eye-slash',
                    'fa-fw'
                );
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

            const sync = await rootStore.addOSMControl({
                position: 'bottom-left',
                mapId,
            });
            sync.classList.add('btn', 'btn-default', 'btn-xs');
            sync.style.setProperty('width', 'auto');
            sync.style.setProperty('height', 'auto');
            sync.addEventListener('click', e => {
                e.preventDefault();
                const center = window.map.getCenter();
                map.setView(center, window.map.getZoom());
                if (this.locationMarker) this.locationMarker.setLatLng(center);
            });
            sync.textContent = this.$t(
                'modules.settings.locationSelect.sync'
            ).toString();
        },
    },
    beforeMount() {
        this.locationMarker = window.L.marker(
            [this.location[0], this.location[1]],
            {
                draggable: true,
                zIndexOffset: 1000,
                riseOnHover: true,
            }
        );
    },
});
</script>
