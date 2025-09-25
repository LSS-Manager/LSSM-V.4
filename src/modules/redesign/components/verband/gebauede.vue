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
                :search="search"
                @search="s => (search = s)"
            >
                <template v-slot:head>
                    <div class="filters">
                        <template
                            v-for="type in buildingTypesSorted.filter(
                                type => buildingTypesAmount[type] > 0
                            )"
                        >
                            <span
                                class="label"
                                :class="`label-${
                                    hiddenFilters.has(type)
                                        ? 'danger'
                                        : 'success'
                                }`"
                                :key="type"
                                @click="toggleFilter(type)"
                                @dblclick="onlyFilter(type)"
                            >
                                {{ buildingTypes[type].caption }}:
                                {{ buildingTypesAmount[type].toLocaleString() }}
                            </span>
                        </template>
                    </div>
                </template>
                <tr v-for="gebauede in filteredBuildings" :key="gebauede.id">
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

import type { defineAPIStore } from '@stores/api';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignSubComponent } from 'typings/modules/Redesign';
import type { VerbandGebaeudeWindow } from '../../parsers/verband/gebauede';
import type { FeatureGroup, Marker } from 'leaflet';

type Component = RedesignSubComponent<
    'gebauede',
    'verband/gebauede',
    {
        faMapMarkedAlt: IconDefinition;
        markers: Marker[];
        markerFeatureGroup: FeatureGroup;
        search: string;
        buildingTypes: Vue['$stores']['translations']['buildings'];
        buildingTypesSorted: number[];
        hiddenFilters: Set<number>;
    },
    {
        toggleFilter(type: number): void;
        onlyFilter(type: number): void;
    },
    {
        filteredBuildings: VerbandGebaeudeWindow['buildings'];
        allianceBuildings: ReturnType<
            typeof defineAPIStore
        >['alliance_buildings'];
        buildingTypesAmount: Record<number, number>;
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
                /* webpackChunkName: "components/leafletMap" */ '../../../../components/LeafletMap.vue'
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
            search: '',
            buildingTypes: this.lightbox.translationStore.buildings,
            buildingTypesSorted: Object.entries(
                this.lightbox.translationStore.buildings
            )
                .sort(([, { caption: a }], [, { caption: b }]) =>
                    a.localeCompare(b)
                )
                .map(([id]) => parseInt(id)),
            hiddenFilters: new Set<number>(),
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
    computed: {
        filteredBuildings() {
            if (this.search || this.hiddenFilters.size) {
                return this.gebauede.buildings.filter(
                    ({ name, id }) =>
                        name
                            .toLowerCase()
                            .includes(this.search.toLowerCase()) &&
                        (this.hiddenFilters.size
                            ? !this.hiddenFilters.has(
                                  this.allianceBuildings[id]?.building_type
                              )
                            : true)
                );
            } else {
                return this.gebauede.buildings;
            }
        },
        allianceBuildings() {
            return this.lightbox.apiStore.alliance_buildings;
        },
        buildingTypesAmount() {
            const amounts: Record<number, number> = {};
            this.gebauede.buildings.forEach(({ id }) => {
                const building_type = this.allianceBuildings[id]?.building_type;
                if (!building_type) return;
                amounts[building_type] ??= 0;
                amounts[building_type]++;
            });
            return amounts;
        },
    },
    methods: {
        toggleFilter(type) {
            if (this.hiddenFilters.has(type)) this.hiddenFilters.delete(type);
            else this.hiddenFilters.add(type);

            // workaround on Vue2
            this.hiddenFilters = new Set(this.hiddenFilters);
        },
        onlyFilter(type) {
            this.hiddenFilters.clear();
            this.hiddenFilters.add(type);

            // workaround on Vue2
            this.hiddenFilters = new Set(this.hiddenFilters);
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
        this.lightbox.apiStore.getAllianceBuildings(
            'redesign/verband/gebaeude'
        );
    },
    mounted() {
        this.lightbox.finishLoading('verband/gebauede-mounted');
        this.gebauede.buildings.forEach(({ extensions }) =>
            extensions.forEach(({ id, countdown }) =>
                window.registerExtensionTimer(id, `${id}_redesign`, countdown)
            )
        );
    },
});
</script>

<style scoped lang="sass">
.row
    margin-left: 0
    margin-right: 0

.filters
    width: 100%
    display: flex
    flex-flow: row wrap
    justify-content: space-between

    span
        margin-left: 5px
        margin-right: 5px
        cursor: pointer

.map-locator
  cursor: pointer
</style>
