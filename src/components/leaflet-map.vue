<template>
    <div :id="mapId" :style="`height: ${height}`"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    MapComputed,
    MapData,
    MapMethods,
    MapProps,
} from '../../typings/components/LeafletMap';

export default Vue.extend<MapData, MapMethods, MapComputed, MapProps>({
    name: 'leaflet-map',
    data() {
        return {
            map: null,
        };
    },
    methods: {
        redraw() {
            if (this.map) this.map.remove();
            this.map = window.L.map(this.mapId).setView(
                [this.startLat, this.startLong],
                this.startZoom
            );
            window.L.tileLayer('https://{s}/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
                subdomains: ['maps.leitstellenspiel.de/tiles/osm'],
                maxZoom: 17,
                noWrap: true,
            }).addTo(this.map);
        },
        setView(lat, long, zoom = undefined) {
            this.map?.setView([lat, long], zoom ?? this.map?.getZoom() ?? 15);
        },
    },
    computed: {
        mapId() {
            return this.$store.getters.nodeAttribute(`map-${this.id}`, true);
        },
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: false,
            default: () => '550px',
        },
        startLat: {
            type: Number,
            required: false,
            default: () => 48.78320089873878,
        },
        startLong: {
            type: Number,
            required: false,
            default: () => 9.18036460876465,
        },
        startZoom: {
            type: Number,
            required: false,
            default: () => 15,
        },
    },
    mounted() {
        this.redraw();
    },
});
</script>
