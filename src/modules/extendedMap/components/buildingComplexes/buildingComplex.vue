<template>
    <lightbox :name="modalName" no-title-hide id="complex-overview">
        <h1>
            <img :src="complex.icon" alt="complex image" />
            {{ complex.name }}
            <button class="btn btn-sm btn-default" @click="openSettings">
                <font-awesome-icon :icon="faPencilAlt" />
            </button>
            <a
                v-if="currentBuildingId"
                class="btn btn-sm btn-success lightbox-open"
                :href="`/buildings/${currentBuildingId}`"
            >
                {{ $m('openInLightbox') }}
            </a>
        </h1>
        <tabs :onSelect="selectTab">
            <tab :title="$m('overview.title')">
                <!-- List of attached buildings -->
                <h2>{{ $m('overview.buildings.title') }}</h2>
                <enhanced-table
                    :table-attrs="{ class: 'table table-striped' }"
                    :head="{
                        icon: { title: '', noSort: true },
                        name: {
                            title: $m('overview.buildings.table.head.name'),
                            noSort: true,
                        },
                        level: {
                            title: $m('overview.buildings.table.head.level'),
                            noSort: true,
                        },
                        staff: {
                            title: $m('overview.buildings.table.head.staff'),
                            noSort: true,
                        },
                        hiring: {
                            title: $m('overview.buildings.table.head.hiring'),
                            noSort: true,
                        },
                    }"
                    no-search
                >
                    <tr v-for="building in sortedBuildings" :key="building.id">
                        <td>
                            <img
                                :src="
                                    building.custom_icon_url ||
                                    getBuildingMarkerIcon(
                                        building.building_type
                                    )
                                "
                                alt="building icon"
                            />
                        </td>
                        <td>
                            <a
                                :href="`/buildings/${building.id}`"
                                class="lightbox-open"
                            >
                                {{ building.caption }}
                            </a>
                        </td>
                        <td>
                            {{ building.level }}
                        </td>
                        <td>
                            {{ building.personal_count }}
                            <template v-if="building.personal_count_target">
                                ({{ building.personal_count_target }})
                            </template>
                        </td>
                        <td>
                            <template v-if="building.hiring_automatic">
                                {{ $m('overview.buildings.hiring.automatic') }}
                            </template>
                            <template v-else-if="building.hiring_phase">
                                {{
                                    $mc(
                                        'overview.buildings.hiring.phase',
                                        building.hiring_phase
                                    )
                                }}
                            </template>
                            <template v-else>
                                {{ $m('overview.buildings.hiring.no') }}
                            </template>
                        </td>
                    </tr>
                </enhanced-table>
            </tab>
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

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';

import type { Building } from 'typings/Building';
import type { Complex } from '../../assets/buildingComplexes';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { $m, $mc } from 'typings/Module';

export default Vue.extend<
    {
        faPencilAlt: IconDefinition;
        buildings: Record<number, Building>;
        currentBuildingId: number;
        getBuildingMarkerIcon(
            building_type: number
        ): ReturnType<typeof window['getBuildingMarkerIcon']>;
    },
    {
        selectTab(event: MouseEvent, index: number): void;
        updateIframe(event: Event): void;
        openSettings(): void;
    },
    { sortedBuildings: Building[]; sortedBuildingIds: number[] },
    {
        complexIndex: number;
        modalName: string;
        complex: Complex;
        $m: $m;
        $mc: $mc;
        updateComplex(complex: Complex): void;
    }
>({
    name: 'lssm-building-complex',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../../components/lightbox.vue'
            ),
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            faPencilAlt,
            buildings: this.$store.getters['api/buildingsById'],
            currentBuildingId: 0,
            getBuildingMarkerIcon: (building_type: number) =>
                window.getBuildingMarkerIcon({
                    user_id: window.user_id,
                    building_type,
                }),
        };
    },
    computed: {
        sortedBuildings() {
            const buildings: Building[] = this.complex.buildings
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
            this.$set(
                this,
                'currentBuildingId',
                this.sortedBuildingIds[index - 1]
            );
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
        openSettings() {
            const settingsModalName = `${this.modalName}-settings`;
            this.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "modules/extendedMap/components/buildingComplexes/settings" */ './settings.vue'
                    ),
                {
                    modalName: settingsModalName,
                    complex: this.complex,
                    $m: <$m>((key, args) => this.$m(`settings.${key}`, args)),
                    close: () => this.$modal.hide(settingsModalName),
                    updateValues: this.updateComplex,
                },
                {
                    name: settingsModalName,
                    height: 'auto',
                    clickToClose: false,
                    shiftY: 0.1,
                }
            );
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
        complex: {
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
        updateComplex: {
            type: Function,
            required: true,
        },
    },
    mounted() {
        this.$set(this, 'currentBuildingId', this.sortedBuildingIds[-1]);
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
