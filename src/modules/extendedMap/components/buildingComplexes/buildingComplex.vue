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
                <tabs>
                    <!-- List of attached buildings -->
                    <tab :title="$m('overview.buildings.title')">
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
                                    title: $m(
                                        'overview.buildings.table.head.name'
                                    ),
                                    noSort: true,
                                },
                                ...(hasLevelBuildings
                                    ? {
                                          level: {
                                              title: $m(
                                                  'overview.buildings.table.head.level'
                                              ),
                                              noSort: true,
                                          },
                                      }
                                    : {}),
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
                            <template v-slot:head>
                                <h2 class="overview-heading">
                                    {{ $m('overview.buildings.title') }}:
                                    {{
                                        complex.buildings.length.toLocaleString()
                                    }}
                                </h2>
                            </template>
                            <tr
                                v-for="building in filteredBuildings"
                                :key="building.id"
                            >
                                <td>
                                    <img
                                        :src="building.icon"
                                        alt="building icon"
                                    />
                                </td>
                                <td class="table-cell-right">
                                    <a class="btn btn-default btn-xs disabled">
                                        {{ building.typeName }}
                                    </a>
                                </td>
                                <td>
                                    <a
                                        :href="`/buildings/${building.id}`"
                                        class="lightbox-open"
                                    >
                                        {{ building.name }}
                                    </a>
                                </td>
                                <td v-if="hasLevelBuildings">
                                    {{
                                        building.hasLevel ? building.level : ''
                                    }}
                                </td>
                                <td v-if="hasVehicleBuildings">
                                    <template v-if="building.hasVehicles">
                                        {{ building.vehicles.length }}
                                        /
                                        {{ building.maxVehicles }}
                                    </template>
                                </td>
                                <td v-if="hasBedBuildings">
                                    <template v-if="building.hasBeds">
                                        {{ building.beds }}
                                    </template>
                                </td>
                                <td v-if="hasClassroomBuildings">
                                    <template v-if="building.hasClassrooms">
                                        {{ building.classrooms }}
                                        <template
                                            v-if="
                                                building.classRoomsUnavailable
                                            "
                                        >
                                            ({{
                                                $mc(
                                                    'overview.buildings.inConstruction',
                                                    building.classRoomsUnavailable
                                                )
                                            }})
                                        </template>
                                    </template>
                                </td>
                                <td v-if="hasCellBuildings">
                                    <template v-if="building.hasCells">
                                        {{ building.cells }}
                                        <template
                                            v-if="building.cellsUnavailable"
                                        >
                                            ({{
                                                $mc(
                                                    'overview.buildings.inConstruction',
                                                    building.cellsUnavailable
                                                )
                                            }})
                                        </template>
                                    </template>
                                </td>
                                <template v-if="hasStaffBuildings">
                                    <td>
                                        <template v-if="building.hasStaff">
                                            {{ building.staff }}
                                            <template
                                                v-if="building.staffTarget"
                                            >
                                                ({{ building.staffTarget }})
                                            </template>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="building.hasStaff">
                                            <template
                                                v-if="building.hiring_automatic"
                                            >
                                                {{
                                                    $m(
                                                        'overview.buildings.hiring.automatic'
                                                    )
                                                }}
                                            </template>
                                            <template
                                                v-else-if="
                                                    building.hiring_phase
                                                "
                                            >
                                                {{
                                                    $mc(
                                                        'overview.buildings.hiring.phase',
                                                        building.hiring_phase
                                                    )
                                                }}
                                            </template>
                                            <template v-else>
                                                {{
                                                    $m(
                                                        'overview.buildings.hiring.no'
                                                    )
                                                }}
                                            </template>
                                        </template>
                                    </td>
                                </template>
                            </tr>
                        </enhanced-table>
                    </tab>

                    <!-- All vehicles -->
                    <tab
                        :title="$m('overview.vehicles.title')"
                        v-if="hasVehicleBuildings"
                    >
                        Vehicles coming soon
                    </tab>

                    <!-- Extensions -->
                    <tab :title="$m('overview.extensions.title')">
                        Extensions coming soon
                    </tab>

                    <!-- Classrooms / start schoolings -->
                    <tab
                        :title="$m('overview.classrooms.title')"
                        v-if="hasClassroomBuildings"
                    >
                        Classrooms and schoolings coming soon
                    </tab>
                </tabs>
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
import type {
    Building,
    InternalBuilding,
    InternalExtension,
} from 'typings/Building';

type AttributedBuildingBeds =
    | { hasBeds: false }
    | { hasBeds: true; beds: number };
type AttributedBuildingCells =
    | { hasCells: false }
    | { hasCells: true; cells: number; cellsUnavailable: number };
type AttributedBuildingClassrooms =
    | {
          hasClassrooms: true;
          classrooms: number;
          classRoomsUnavailable: number;
      }
    | { hasClassrooms: false };
type AttributedBuildingLevel =
    | { hasLevel: false }
    | { hasLevel: true; level: number };
type AttributedBuildingStaff =
    | {
          hasStaff: true;
          staff: number;
          staffTarget?: number;
          hiring_automatic: boolean;
          hiring_phase: number;
      }
    | { hasStaff: false };
type AttributedBuildingVehicles =
    | { hasVehicles: false }
    | { hasVehicles: true; vehicles: Vehicle[]; maxVehicles: number };

type AttributedBuilding = AttributedBuildingBeds &
    AttributedBuildingCells &
    AttributedBuildingClassrooms &
    AttributedBuildingLevel &
    AttributedBuildingStaff &
    AttributedBuildingVehicles & {
        id: number;
        icon: string;
        typeName: string;
        name: string;
    };

export default Vue.extend<
    {
        faPencilAlt: IconDefinition;
        buildings: Record<number, Building>;
        buildingTypes: Record<number, InternalBuilding>;
        bedBuildingTypes: number[];
        classroomBuildingTypes: number[];
        cellBuildingTypes: number[];
        cellExtensionIDs: string[];
        currentBuildingId: number;
        vehiclesByBuilding: Record<number, Vehicle[]>;
        search: string;
    },
    {
        selectTab(event: MouseEvent, index: number): void;
        updateIframe(event: Event): void;
        openSettings(): void;
    },
    {
        attributedBuildings: AttributedBuilding[];
        sortedBuildingsByName: Building[];
        sortedBuildingIdsByName: number[];
        filteredBuildings: AttributedBuilding[];
        hasLevelBuildings: boolean;
        hasStaffBuildings: boolean;
        hasBedBuildings: boolean;
        hasClassroomBuildings: boolean;
        hasCellBuildings: boolean;
        hasVehicleBuildings: boolean;
    },
    {
        complexIndex: number;
        modalName: string;
        complex: Complex;
        allAttachedBuildings: string[];
        $m: $m;
        $mc: $mc;
        dissolve(): Promise<void>;
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
        const buildingTypes = this.$store.getters.$tBuildings as Record<
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
            currentBuildingId: 0,
            vehiclesByBuilding: this.$store.getters['api/vehiclesByBuilding'],
            search: '',
        };
    },
    computed: {
        attributedBuildings() {
            return this.complex.buildings
                .map(buildingId => {
                    const building = this.buildings[parseInt(buildingId)];
                    const buildingType =
                        this.buildingTypes[building.building_type];

                    const buildingAttrs = {
                        id: building.id,
                        icon:
                            building.custom_icon_url ??
                            window
                                .getBuildingMarkerIcon({
                                    building_type: building.building_type,
                                })
                                ?.replace(/_other(?=\.png$)/u, ''),
                        typeName: buildingType.caption,
                        name: building.caption,
                    };

                    const beds: AttributedBuildingBeds =
                        'startBeds' in buildingType
                            ? {
                                  hasBeds: true,
                                  beds: buildingType.startBeds + building.level,
                              }
                            : { hasBeds: false };

                    const cellExtensions = {
                        cells:
                            'startCells' in buildingType
                                ? buildingType.startCells
                                : 0,
                        cellsUnavailable: 0,
                    };
                    building.extensions.forEach(extension => {
                        if (
                            !(
                                'newCells' in
                                buildingType.extensions[extension.type_id]
                            )
                        )
                            return;
                        if (!extension.available)
                            cellExtensions.cellsUnavailable++;
                        cellExtensions.cells++;
                    });

                    const cells: AttributedBuildingCells =
                        'startCells' in buildingType
                            ? {
                                  hasCells: true,
                                  ...cellExtensions,
                              }
                            : { hasCells: false };

                    const classroomExtensions = {
                        classrooms:
                            'startClassrooms' in buildingType
                                ? buildingType.startClassrooms
                                : 0,
                        classRoomsUnavailable: 0,
                    };
                    building.extensions.forEach(extension => {
                        if (
                            !(
                                'newClassrooms' in
                                buildingType.extensions[extension.type_id]
                            )
                        )
                            return;
                        if (!extension.available)
                            classroomExtensions.classRoomsUnavailable++;
                        classroomExtensions.classrooms++;
                    });

                    const classrooms: AttributedBuildingClassrooms =
                        'startClassrooms' in buildingType
                            ? {
                                  hasClassrooms: true,
                                  ...classroomExtensions,
                              }
                            : { hasClassrooms: false };

                    const level: AttributedBuildingLevel =
                        buildingType.maxLevel !== 0
                            ? { hasLevel: true, level: building.level }
                            : { hasLevel: false };

                    const staff: AttributedBuildingStaff =
                        'startParkingLots' in buildingType
                            ? {
                                  hasStaff: true,
                                  staff: building.personal_count,
                                  staffTarget: building.personal_count_target,
                                  hiring_automatic: building.hiring_automatic,
                                  hiring_phase: building.hiring_phase,
                              }
                            : { hasStaff: false };

                    const vehicles: AttributedBuildingVehicles =
                        'startParkingLots' in buildingType
                            ? {
                                  hasVehicles: true,
                                  vehicles:
                                      this.vehiclesByBuilding[building.id] ??
                                      [],
                                  maxVehicles:
                                      (buildingType.levelNotIncreasingLots
                                          ? 0
                                          : building.level) +
                                      buildingType.startParkingLots +
                                      building.extensions
                                          .map(extension => {
                                              const extensionType: InternalExtension =
                                                  buildingType.extensions[
                                                      extension.type_id
                                                  ];
                                              if (
                                                  !extension.available ||
                                                  !(
                                                      'isVehicleExtension' in
                                                      extensionType
                                                  )
                                              )
                                                  return 0;
                                              return (
                                                  extensionType.givesParkingLots +
                                                  (extensionType.givesParkingLotsPerLevel ??
                                                      0) *
                                                      building.level
                                              );
                                          })
                                          .reduce((a, b) => a + b, 0),
                              }
                            : { hasVehicles: false };

                    return {
                        ...buildingAttrs,
                        ...beds,
                        ...cells,
                        ...classrooms,
                        ...level,
                        ...staff,
                        ...vehicles,
                    };
                })
                .filter(Boolean);
        },
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
        filteredBuildings() {
            return this.attributedBuildings.filter(building =>
                JSON.stringify(Object.values(building))
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
            );
        },
        hasLevelBuildings() {
            return this.attributedBuildings.some(({ hasLevel }) => hasLevel);
        },
        hasStaffBuildings() {
            return this.attributedBuildings.some(({ hasStaff }) => hasStaff);
        },
        hasBedBuildings() {
            return this.attributedBuildings.some(({ hasBeds }) => hasBeds);
        },
        hasClassroomBuildings() {
            return this.attributedBuildings.some(
                ({ hasClassrooms }) => hasClassrooms
            );
        },
        hasCellBuildings() {
            return this.attributedBuildings.some(({ hasCells }) => hasCells);
        },
        hasVehicleBuildings() {
            return this.attributedBuildings.some(
                ({ hasVehicles }) => hasVehicles
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
                    dissolve: this.dissolve,
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
        dissolve: {
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

    .overview-heading
        width: 100%

    .table-cell-right
        text-align: right
</style>
