<template>
    <lightbox :name="modalName" no-title-hide id="complex-overview">
        <h1>
            {{ name }}
            <a
                v-if="currentBuildingId"
                class="btn btn-sm btn-success lightbox-open"
                :href="`/buildings/${currentBuildingId}`"
            >
                open in lightbox
            </a>
        </h1>
        <tabs :onSelect="selectTab">
            <tab
                v-for="building in sortedBuildings"
                :key="building.id"
                :title="building.caption"
            >
                <iframe
                    :src="`/buildings/${building.id}`"
                    @load="updateIframe"
                />
            </tab>
        </tabs>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import type { Building } from 'typings/Building';

export default Vue.extend<
    { buildings: Record<number, Building>; currentBuildingId: number },
    {
        selectTab(event: MouseEvent, index: number): void;
        updateIframe(event: Event): void;
    },
    { sortedBuildings: Building[]; sortedBuildingIds: number[] },
    {
        complexIndex: number;
        modalName: string;
        name: string;
        buildingIds: string[];
    }
>({
    name: 'lssm-building-complex',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../components/lightbox.vue'
            ),
    },
    data() {
        return {
            buildings: this.$store.getters['api/buildingsById'],
            currentBuildingId: 0,
        };
    },
    computed: {
        sortedBuildings() {
            const buildings: Building[] = this.buildingIds
                .map(id => this.buildings[parseInt(id)])
                .filter(Boolean);
            return buildings.sort(
                ({ caption: captionA }, { caption: captionB }) =>
                    captionA.localeCompare(captionB)
            );
        },
        sortedBuildingIds() {
            return this.sortedBuildings.map(({ id }) => id);
        },
    },
    methods: {
        selectTab(event, index) {
            this.$set(this, 'currentBuildingId', this.sortedBuildingIds[index]);
        },
        updateIframe(event) {
            const iframe = event.target;
            if (!(iframe instanceof HTMLIFrameElement)) return;
            const container =
                iframe.contentDocument?.querySelector<HTMLDivElement>(
                    '#iframe-inside-container'
                );
            if (!container) return;
            container.style.width = '100%';
            container.style.height = '100%';
        },
    },
    props: {
        complexIndex: {
            type: Number,
            required: true,
        },
        modalName: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        buildingIds: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        this.$set(this, 'currentBuildingId', this.sortedBuildingIds[0]);
    },
});
</script>

<style scoped lang="sass">
#complex-overview
    height: 100%
    display: flex
    flex-flow: column

    ::v-deep .vue-tabs
        height: 100%
        display: flex
        flex-flow: column

        .vue-tabpanel
            height: 100%
            display: flex
            flex-flow: column

            iframe
                width: 100%
                height: 100%
</style>
