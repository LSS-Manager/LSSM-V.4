<template>
    <div class="row">
        <div class="col-lg-6">
            <leaflet-map
                id="verband-gebauede-map"
                ref="map"
                :layers="markers"
                :center-group="
                    gebauede.buildings.length ? markerFeatureGroup : null
                "
            ></leaflet-map>
        </div>
        <div class="col-lg-6">
            <enhanced-table
                :head="{
                    map: { title: '', noSort: true },
                    icon: { title: '', noSort: true },
                    name: {
                        title: lightbox.$sm('name').toString(),
                        noSort: true,
                    },
                    schooling: { title: '', noSort: true },
                }"
                :table-attrs="{ class: 'table table-striped' }"
                no-search
            >
                <tr v-for="gebauede in gebauede.buildings" :key="gebauede.id">
                    <td>
                        <font-awesome-icon
                            class="map-locator"
                            :icon="faMapMarkedAlt"
                            @click.stop="
                                () => {
                                    $refs.map.setView(
                                        gebauede.lat,
                                        gebauede.long,
                                        11
                                    );
                                }
                            "
                        ></font-awesome-icon>
                    </td>
                    <td>
                        <img :src="gebauede.icon" :alt="gebauede.name" />
                    </td>
                    <td
                        :colspan="
                            gebauede.canOpenSchooling || gebauede.extensions
                                ? 1
                                : 2
                        "
                    >
                        <a lightbox-open :href="`/buildings/${gebauede.id}`">
                            {{ gebauede.name }}
                        </a>
                    </td>
                    <td v-if="gebauede.canOpenSchooling || gebauede.extensions">
                        <a
                            lightbox-open
                            :href="`/buildings/${gebauede.id}`"
                            class="btn btn-success"
                            v-if="gebauede.canOpenSchooling"
                        >
                            {{ lightbox.$sm('openSchooling') }}
                        </a>
                        <template v-if="gebauede.extensions">
                            <div
                                v-for="extension in gebauede.extensions"
                                :key="extension.id"
                            >
                                <span class="label label-default">{{
                                    extension.name
                                }}</span>
                                ({{ lightbox.$sm('remaining') }}:
                                <span
                                    :id="`extension_countdown_${extension.id}_redesign`"
                                ></span
                                >)
                            </div>
                        </template>
                    </td>
                </tr>
            </enhanced-table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignSubComponent } from 'typings/modules/Redesign';
import type { FeatureGroup, Marker } from 'leaflet';

type Component = RedesignSubComponent<
    'gebauede',
    'verband/gebauede',
    {
        faMapMarkedAlt: IconDefinition;
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
    name: 'lssmv4-redesign-verband-gebauede',
    components: {
        LeafletMap: () =>
            import(
                /* webpackChunkName: "components/leaflet-map" */ '../../../../components/leaflet-map.vue'
            ),
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            faMapMarkedAlt,
            markers: [],
            markerFeatureGroup: window.L.featureGroup(),
        };
    },
    props: {
        gebauede: {
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
        gebauede() {
            this.lightbox.finishLoading('verband/gebauede-updated-data');
        },
    },
    beforeMount() {
        this.gebauede.buildings.forEach(({ lat, long, id, icon, name }) => {
            this.markers.push(
                window.L.marker([lat, long], {
                    zIndexOffset: 100,
                    icon: window.L.icon({
                        iconUrl: icon,
                        iconSize: [32, 37],
                        iconAnchor: [16, 37],
                    }),
                    title: name,
                })
                    .bindTooltip(name)
                    .on('click', () => window.lightboxOpen(`/buildings/${id}`))
            );
        });
        this.markerFeatureGroup = window.L.featureGroup(this.markers);
    },
    mounted() {
        this.lightbox.finishLoading('verband/gebauede-mounted');
        this.gebauede.buildings.forEach(({ extensions }) =>
            extensions.forEach(({ id, countdown }) =>
                window.extensionCountdown(countdown, `${id}_redesign`)
            )
        );
    },
});
</script>

<style scoped lang="sass">
.row
    margin-left: 0
    margin-right: 0

.map-locator
  cursor: pointer
</style>
