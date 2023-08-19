<template>
    <div>
        <leaflet-map
            :id="id"
            height="200px"
            v-if="row.index === values.length - 1"
            @mounted="updateFilter"
        ></leaflet-map>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { useRootStore } from '@stores/index';

import { getFilter } from '../../assets/mapCSSFilter';

import type { MapCSSFilterPreview } from '../../settings';

export default Vue.extend<
    MapCSSFilterPreview['Data'],
    MapCSSFilterPreview['Methods'],
    MapCSSFilterPreview['Computed'],
    MapCSSFilterPreview['Props']
>({
    name: 'lssmv4-em-map_css_filter-preview',
    components: {
        LeafletMap: () =>
            import(
                /* webpackChunkName: "components/leafletMap" */ '../../../../components/LeafletMap.vue'
            ),
    },
    props: {
        values: {
            type: Array,
            required: true,
        },
        row: {
            type: Object,
            required: true,
        },
    },
    watch: {
        values: {
            deep: true,
            handler() {
                this.updateFilter();
            },
        },
    },
    methods: {
        updateFilter() {
            this.$el
                .querySelector<HTMLDivElement>('.leaflet-tile-pane')
                ?.style.setProperty('filter', getFilter(this.values));
        },
    },
    computed: {
        id() {
            return useRootStore().nodeAttribute(
                `em-msf-preview-${this.row.index}`,
                true
            );
        },
    },
});
</script>
