<template>
    <leaflet-map :id="id" height="200px"></leaflet-map>
</template>

<script lang="ts">
import Vue from 'vue';

import { useRootStore } from '@stores/index';

import {
    type Filter,
    getFilter,
    getSettings,
} from '../../assets/mapStyleFilter';

import type { MapStyleFilterPreview } from '../../settings';

export default Vue.extend<
    MapStyleFilterPreview['Data'],
    MapStyleFilterPreview['Methods'],
    MapStyleFilterPreview['Computed'],
    MapStyleFilterPreview['Props']
>({
    name: 'lssmv4-em-msf-preview',
    components: {
        LeafletMap: () =>
            import(
                /* webpackChunkName: "components/leaflet-map" */ '../../../../components/leaflet-map.vue'
            ),
    },
    props: {
        module: {
            type: Object,
            required: true,
        },
    },
    watch: {
        module: {
            deep: true,
            handler() {
                getSettings(
                    async (settingId: `mapStyleFilter${Capitalize<Filter>}`) =>
                        `${String(this.module[settingId].value)}${
                            this.module[settingId].unit
                        }`
                ).then(settings =>
                    this.$el
                        .querySelector<HTMLDivElement>('.leaflet-tile-pane')
                        ?.style.setProperty('filter', getFilter(settings))
                );
            },
        },
    },
    computed: {
        id() {
            return useRootStore().nodeAttribute('em-msf-preview', true);
        },
    },
});
</script>
