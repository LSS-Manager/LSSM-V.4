<template>
    <div class="row">
        <div class="col-lg-6">
            <leaflet-map
                id="verband-bsr-map"
                :layers="markers"
                :center-group="markerFeatureGroup"
            ></leaflet-map>
        </div>
        <div class="col-lg-6">
            <pre>{{ bsr.buildings }}</pre>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { RedesignSubComponent } from 'typings/modules/Redesign';
import { VerbandBSRWindow } from '../../parsers/verband/bsr';
import { FeatureGroup, Marker } from 'leaflet';

type Component = RedesignSubComponent<
    'bsr',
    'verband/bsr',
    VerbandBSRWindow,
    {
        markers: Marker[];
        markerFeatureGroup: FeatureGroup;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-bsr',
    components: {
        LeafletMap: () =>
            import(
                /* webpackChunkName: "components/leaflet-map" */ '../../../../components/leaflet-map.vue'
            ),
    },
    data() {
        return {
            markers: [],
            markerFeatureGroup: window.L.featureGroup(),
        };
    },
    props: {
        bsr: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
            required: true,
        },
        getSetting: {
            type: Function,
            required: true,
        },
        setSetting: {
            type: Function,
            required: true,
        },
    },
    watch: {
        bsr() {
            this.lightbox.finishLoading('verband/bsr-updated-data');
        },
    },
    beforeMount() {
        this.bsr.buildings.forEach(
            ({ lat, long, id, name, owner: { name: ownerName } }) =>
                this.markers.push(
                    window.L.marker([lat, long], {
                        zIndexOffset: 100,
                        icon: window.L.icon({
                            iconUrl: '/images/building_bereitstellungsraum.png',
                            iconSize: [32, 37],
                            iconAnchor: [16, 37],
                        }),
                        title: `${name} – [${ownerName}]`,
                    })
                        .bindTooltip(`${name} – [${ownerName}]`)
                        .on('click', () =>
                            window.lightboxOpen(`/buildings/${id}`)
                        )
                )
        );
        this.markerFeatureGroup = window.L.featureGroup(this.markers);
    },
    mounted() {
        this.lightbox.finishLoading('verband/bsr-mounted');
    },
});
</script>

<style scoped lang="sass">
.row
    margin-left: 0
    margin-right: 0
</style>
