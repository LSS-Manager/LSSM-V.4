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
                <h2>
                    {{ $m('overview.buildings.title') }}:
                    {{ complex.buildings.length.toLocaleString() }}
                </h2>
                <enhanced-table
                    :table-attrs="{ class: 'table table-striped' }"
                    :head="{
                        icon: {
                            title: '',
                            noSort: true,
                            attrs: { style: 'width: 0' },
                        },
                        type: {
                            title: '',
                            noSort: true,
                            attrs: { style: 'width: 0' },
                        },
                        name: {
                            title: $m('overview.buildings.table.head.name'),
                            noSort: true,
                        },
                        level: {
                            title: $m('overview.buildings.table.head.level'),
                            noSort: true,
                        },
                        ...(hasVehicleBuildings
                            ? {
                                  vehicles: {
                                      title: $m(
                                          'overview.buildings.table.head.vehicles'
                                      ),
                                      noSort: true,
                                  },
                              }
                            : {}),
                        ...(hasBedBuildings
                            ? {
                                  beds: {
                                      title: $m(
                                          'overview.buildings.table.head.beds'
                                      ),
                                      noSort: true,
                                  },
                              }
                            : {}),
                        ...(hasClassroomBuildings
                            ? {
                                  classrooms: {
                                      title: $m(
                                          'overview.buildings.table.head.classrooms'
                                      ),
                                      noSort: true,
                                  },
                              }
                            : {}),
                        ...(hasCellBuildings
                            ? {
                                  cells: {
                                      title: $m(
                                          'overview.buildings.table.head.cells'
                                      ),
                                      noSort: true,
                                  },
                              }
                            : {}),
                        ...(hasStaffBuildings
                            ? {
                                  staff: {
                                      title: $m(
                                          'overview.buildings.table.head.staff'
                                      ),
                                      noSort: true,
                                  },
                                  hiring: {
                                      title: $m(
                                          'overview.buildings.table.head.hiring'
                                      ),
                                      noSort: true,
                                  },
                              }
                            : {}),
                    }"
                    :search="search"
                    @search="s => (search = s)"
                >
                    <tr
                        v-for="building in filteredBuildings"
                        :key="building.id"
                    >
                        <td>
                            <img
                                :src="getBuildingIcon(building)"
                                alt="building icon"
                            />
                        </td>
                        <td class="table-cell-right">
                            <a class="btn btn-default btn-xs disabled">
                                {{
                                    buildingTypes[building.building_type]
                                        .caption
                                }}
                            </a>
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
                        <td v-if="hasVehicleBuildings">
                            {{ vehiclesByBuilding[building.id].length }} /
                            {{ building.level + 1 }}
                        </td>
                        <td v-if="hasBedBuildings">
                            <template
                                v-if="
                                    bedBuildingTypes.includes(
                                        building.building_type
                                    )
                                "
                            >
                                {{ building.level + 10 }}
                            </template>
                        </td>
                        <td v-if="hasClassroomBuildings">
                            <template
                                v-if="
                                    classroomBuildingTypes.includes(
                                        building.building_type
                                    )
                                "
                            >
                                {{ building.extensions.length + 1 }}
                                <template
                                    v-if="
                                        building.extensions.some(
                                            ({ available }) => !available
                                        )
                                    "
                                >
                                    ({{
                                        $mc(
                                            'overview.buildings.inConstruction',
                                            building.extensions.filter(
                                                ({ available }) => !available
                                            ).length
                                        )
                                    }})
                                </template>
                            </template>
                        </td>
                        <td v-if="hasCellBuildings">
                            <template>
                                {{ getCellsForBuilding(building).length || '' }}
                                <template
                                    v-if="
                                        getCellsForBuilding(building).some(
                                            ({ available }) => !available
                                        )
                                    "
                                >
                                    ({{
                                        $mc(
                                            'overview.buildings.inConstruction',
                                            getCellsForBuilding(
                                                building
                                            ).filter(
                                                ({ available }) => !available
                                            ).length
                                        )
                                    }})
                                </template>
                            </template>
                        </td>
                        <template v-if="hasStaffBuildings">
                            <td>
                                {{ building.personal_count }}
                                <template v-if="building.personal_count_target">
                                    ({{ building.personal_count_target }})
                                </template>
                            </td>
                            <td>
                                <template v-if="building.hiring_automatic">
                                    {{
                                        $m(
                                            'overview.buildings.hiring.automatic'
                                        )
                                    }}
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
                        </template>
                    </tr>
                </enhanced-table>

                <!-- Extensions -->

                <!-- Classrooms / start schoolings -->
            </tab>
            <tab
                v-for="building in sortedBuildingsByName"
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

import type { Complex } from '../../assets/buildingComplexes';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Vehicle } from 'typings/Vehicle';
import type { $m, $mc } from 'typings/Module';
import type { Building, Extension, InternalBuilding } from 'typings/Building';

export default Vue.extend<
    {
        faPencilAlt: IconDefinition;
        buildings: Record<number, Building>;
        buildingTypes: Record<number, InternalBuilding>;
        bedBuildingTypes: number[];
        classroomBuildingTypes: number[];
        cellBuildingTypes: number[];
        cellExtensionIDs: string[];
        vehicleBuildingTypes: number[];
        currentBuildingId: number;
        vehiclesByBuilding: Record<number, Vehicle[]>;
        search: string;
    },
    {
        selectTab(event: MouseEvent, index: number): void;
        updateIframe(event: Event): void;
        openSettings(): void;
        getBuildingIcon(building: Building): string;
        getCellsForBuilding(building: Building): Extension[];
    },
    {
        sortedBuildingsByName: Building[];
        sortedBuildingIdsByName: number[];
        hasStaffBuildings: boolean;
        hasBedBuildings: boolean;
        hasClassroomBuildings: boolean;
        hasCellBuildings: boolean;
        hasVehicleBuildings: boolean;
        filteredBuildings: Building[];
    },
    {
        complexIndex: number;
        modalName: string;
        complex: Complex;
        allAttachedBuildings: string[];
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
        const buildingTypes = this.$t('buildings') as Record<
            number,
            InternalBuilding
        >;
        return {
            faPencilAlt,
            buildings: this.$store.getters['api/buildingsById'],
            buildingTypes,
            bedBuildingTypes: Object.values(this.$t('bedBuildings')),
            classroomBuildingTypes: Object.values(this.$t('schoolBuildings')),
            cellBuildingTypes: Object.values(this.$t('cellBuildings')),
            cellExtensionIDs: Object.values(this.$t('cellExtensions')),
            vehicleBuildingTypes: Object.values(this.$t('vehicleBuildings')),
            currentBuildingId: 0,
            vehiclesByBuilding: this.$store.getters['api/vehiclesByBuilding'],
            search: '',
        };
    },
    computed: {
        sortedBuildingsByName() {
            const buildings: Building[] = this.complex.buildings
                .map(id => this.buildings[parseInt(id)])
                .filter(Boolean);
            return buildings.sort(
                ({ caption: captionA }, { caption: captionB }) =>
                    captionA.localeCompare(captionB)
            );
        },
        sortedBuildingIdsByName() {
            return this.sortedBuildingsByName.map(({ id }) => id);
        },
        hasStaffBuildings() {
            return this.sortedBuildingsByName.some(
                ({ personal_count, personal_count_target }) =>
                    personal_count || personal_count_target
            );
        },
        hasBedBuildings() {
            return this.sortedBuildingsByName.some(({ building_type }) =>
                this.bedBuildingTypes.includes(building_type)
            );
        },
        hasClassroomBuildings() {
            return this.sortedBuildingsByName.some(({ building_type }) =>
                this.classroomBuildingTypes.includes(building_type)
            );
        },
        hasCellBuildings() {
            return this.sortedBuildingsByName.some(({ building_type }) =>
                this.cellBuildingTypes.includes(building_type)
            );
        },
        hasVehicleBuildings() {
            return this.sortedBuildingsByName.some(({ building_type }) =>
                this.vehicleBuildingTypes.includes(building_type)
            );
        },
        filteredBuildings() {
            return this.sortedBuildingsByName.filter(building =>
                JSON.stringify(Object.values(building))
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        selectTab(event, index) {
            this.$set(
                this,
                'currentBuildingId',
                this.sortedBuildingIdsByName[index - 1]
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
                    allOtherAttachedBuildings: this.allAttachedBuildings.filter(
                        building => !this.complex.buildings.includes(building)
                    ),
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
        getBuildingIcon(building) {
            return (
                building.custom_icon_url ??
                window
                    .getBuildingMarkerIcon({
                        building_type: building.building_type,
                    })
                    ?.replace(/_other(?=\.png$)/u, '')
            );
        },
        getCellsForBuilding(building) {
            const extensionIds = this.cellExtensionIDs.filter(id =>
                id.startsWith(building.building_type.toString())
            );
            return building.extensions.filter(({ type_id }) =>
                extensionIds.includes(`${building.building_type}_${type_id}`)
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
        allAttachedBuildings: {
            type: Array,
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
        this.$set(this, 'currentBuildingId', this.sortedBuildingIdsByName[-1]);
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

    .table-cell-right
        text-align: right
</style>
