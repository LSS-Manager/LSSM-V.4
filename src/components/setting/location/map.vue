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

            const clearfix: HTMLAnchorElement = await this.$store.dispatch(
                'addOSMControl',
                {
                    position: 'top-right',
                    mapId,
                }
            );
            clearfix.classList.add('clearfix');

            const save: HTMLAnchorElement = await this.$store.dispatch(
                'addOSMControl',
                {
                    position: 'top-right',
                    mapId,
                }
            );
            save.classList.add('btn', 'btn-success');
            save.style.setProperty('display', 'flex');
            save.style.setProperty('justify-content', 'center');
            save.style.setProperty('align-content', 'center');
            save.addEventListener('click', e => {
                e.preventDefault();
                const center = map.getCenter();
                this.save(
                    this.zoom
                        ? [center.lat, center.lng, map.getZoom()]
                        : [center.lat, center.lng]
                );
                this.$emit('close');
            });
            const saveIcon = document.createElement('i');
            saveIcon.classList.add('fas', 'fa-save');
            save.append(saveIcon);

            const abort: HTMLAnchorElement = await this.$store.dispatch(
                'addOSMControl',
                {
                    position: 'top-right',
                    mapId,
                }
            );
            abort.classList.add('btn', 'btn-danger');
            abort.style.setProperty('display', 'flex');
            abort.style.setProperty('justify-content', 'center');
            abort.style.setProperty('align-content', 'center');
            abort.addEventListener('click', e => {
                e.preventDefault();
                this.$emit('close');
            });
            const abortIcon = document.createElement('i');
            abortIcon.classList.add('fas', 'fa-times');
            abort.append(abortIcon);

            const sync: HTMLAnchorElement = await this.$store.dispatch(
                'addOSMControl',
                {
                    position: 'bottom-left',
                    mapId,
                }
            );
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
            }
        );
    },
});
</script>
