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
                                typeName: {
                                    title: '',
                                    attrs: { style: 'width: 0' },
                                },
                                name: {
                                    title: $m(
                                        'overview.buildings.table.head.name'
                                    ),
                                },
                                ...(hasLevelBuildings
                                    ? {
                                          level: {
                                              title: $m(
                                                  'overview.buildings.table.head.level'
                                              ),
                                          },
                                      }
                                    : {}),
                                ...(hasVehicleBuildings
                                    ? {
                                          vehicles: {
                                              title: $m(
                                                  'overview.buildings.table.head.vehicles'
                                              ),
                                          },
                                      }
                                    : {}),
                                ...(hasBedBuildings
                                    ? {
                                          beds: {
                                              title: $m(
                                                  'overview.buildings.table.head.beds'
                                              ),
                                          },
                                      }
                                    : {}),
                                ...(hasClassroomBuildings
                                    ? {
                                          classrooms: {
                                              title: $m(
                                                  'overview.buildings.table.head.classrooms'
                                              ),
                                          },
                                      }
                                    : {}),
                                ...(hasCellBuildings
                                    ? {
                                          cells: {
                                              title: $m(
                                                  'overview.buildings.table.head.cells'
                                              ),
                                          },
                                      }
                                    : {}),
                                ...(hasStaffBuildings
                                    ? {
                                          staff: {
                                              title: $m(
                                                  'overview.buildings.table.head.staff'
                                              ),
                                          },
                                          hiring: {
                                              title: $m(
                                                  'overview.buildings.table.head.hiring'
                                              ),
                                          },
                                      }
                                    : {}),
                            }"
                            :search="buildingsTable.search"
                            @search="s => (buildingsTable.search = s)"
                            :sort="buildingsTable.sort"
                            :sort-dir="buildingsTable.sortDir"
                            @sort="setSortBuildingsTable"
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
                                v-for="building in sortedBuildings"
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
                        <enhanced-table
                            :table-attrs="{ class: 'table table-striped' }"
                            :head="{
                                icon: {
                                    title: '',
                                    noSort: true,
                                    attrs: { style: 'width: 0' },
                                },
                                customTypeName: {
                                    title: '',
                                    attrs: { style: 'width: 0' },
                                },
                                name: {
                                    title: $m(
                                        'overview.vehicles.table.head.name'
                                    ),
                                },
                                fms_show: {
                                    title: $m(
                                        'overview.vehicles.table.head.fms'
                                    ),
                                },
                                buildingName: {
                                    title: $m(
                                        'overview.vehicles.table.head.building'
                                    ),
                                },
                                maxStaff: {
                                    title: $m(
                                        'overview.vehicles.table.head.staff'
                                    ),
                                },
                            }"
                            :search="vehiclesTable.search"
                            @search="s => (vehiclesTable.search = s)"
                            :sort="vehiclesTable.sort"
                            :sort-dir="vehiclesTable.sortDir"
                            @sort="setSortVehiclesTable"
                        >
                            <template v-slot:head>
                                <h2 class="overview-heading">
                                    {{ $m('overview.vehicles.title') }}:
                                    {{ vehicles.length.toLocaleString() }}
                                </h2>
                            </template>
                            <tr
                                v-for="vehicle in sortedVehicles"
                                :key="vehicle.id"
                            >
                                <td>
                                    <img
                                        :src="vehicle.icon"
                                        alt="vehicle icon"
                                    />
                                </td>
                                <td class="table-cell-right">
                                    <a
                                        class="btn btn-default btn-xs disabled"
                                        v-if="vehicle.customTypeName"
                                    >
                                        {{ vehicle.customTypeName }}
                                    </a>
                                    <a class="btn btn-default btn-xs disabled">
                                        {{ vehicle.typeName }}
                                    </a>
                                </td>
                                <td>
                                    <a
                                        class="lightbox-open"
                                        :href="`/vehicles/${vehicle.id}`"
                                    >
                                        {{ vehicle.name }}
                                    </a>
                                    <a
                                        class="btn btn-default btn-xs pull-right lightbox-open"
                                        :href="`/vehicles/${vehicle.id}/edit`"
                                    >
                                        <font-awesome-icon
                                            :icon="faPencilAlt"
                                        />
                                    </a>
                                </td>
                                <td>
                                    <span
                                        class="building_list_fms"
                                        :class="`building_list_fms_${vehicle.fms_real}`"
                                    >
                                        {{ vehicle.fms_show }}
                                    </span>
                                </td>
                                <td>
                                    <a
                                        class="lightbox-open"
                                        :href="`/buildings/${vehicle.buildingId}`"
                                    >
                                        {{ vehicle.buildingName }}
                                    </a>
                                </td>
                                <td>
                                    <template v-if="vehicle.maxStaff">
                                        {{ vehicle.assignedStaff }} /
                                        {{ vehicle.maxStaff }}
                                    </template>
                                </td>
                            </tr>
                        </enhanced-table>
                    </tab>

                    <!-- Extensions -->
                    <tab :title="$m('overview.extensions.title')">
                        <enhanced-table
                            :table-attrs="{ class: 'table table-striped' }"
                            :head="{
                                name: {
                                    title: $m(
                                        'overview.extensions.table.head.name'
                                    ),
                                    noSort: true,
                                },
                                buildingName: {
                                    title: $m(
                                        'overview.extensions.table.head.building'
                                    ),
                                    noSort: true,
                                },
                                actions: {
                                    title: '',
                                    noSort: true,
                                },
                            }"
                            no-search
                        >
                            <template v-slot:head>
                                <h2 class="overview-heading indented-title">
                                    {{ $m('overview.extensions.title') }}
                                    <br />
                                    <small>
                                        {{
                                            $mc(
                                                'overview.extensions.summary.built',
                                                1,
                                                { n: 'n' }
                                            )
                                        }},
                                        {{
                                            $mc(
                                                'overview.extensions.summary.inConstruction',
                                                1,
                                                { n: 'm' }
                                            )
                                        }},
                                        {{
                                            $mc(
                                                'overview.extensions.summary.available',
                                                1,
                                                { n: 'x' }
                                            )
                                        }},
                                        {{
                                            $mc(
                                                'overview.extensions.summary.total',
                                                extensions.length,
                                                {
                                                    n: extensions.length.toLocaleString(),
                                                }
                                            )
                                        }}
                                    </small>
                                </h2>
                            </template>
                            <tr
                                v-for="(extension, index) in extensions"
                                :key="index"
                            >
                                <td>
                                    {{ extension.name }}
                                </td>
                                <td>
                                    <a
                                        :href="`/buildings/${extension.buildingId}`"
                                        class="lightbox-open"
                                    >
                                        {{ extension.buildingName }}
                                    </a>
                                </td>
                                <td>
                                    <pre>{{ extension }}</pre>
                                </td>
                            </tr>
                        </enhanced-table>
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
                :title="building.name"
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
import type { $m, $mc } from 'typings/Module';
import type {
    Building,
    Extension,
    InternalBuilding,
    InternalExtension,
} from 'typings/Building';
import type { InternalVehicle, Vehicle } from 'typings/Vehicle';

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
        type: number;
        icon: string;
        typeName: string;
        name: string;
        extensions: Extension[];
    };

interface AttributedVehicle {
    id: number;
    icon: string;
    customTypeName?: string;
    typeName: string;
    name: string;
    fms_show: number;
    fms_real: number;
    buildingId: number;
    buildingName: string;
    assignedStaff: number;
    maxStaff: number;
}

type AttributedExtension = {
    buildingId: number;
    buildingName: string;
    name: string;
} & (
    | { bought: true; available: boolean; enabled: boolean }
    | { canBuy: boolean; duration: string; credits: number; coins: number }
);

type BuildingSortAttribute =
    | 'beds'
    | 'cells'
    | 'classrooms'
    | 'hiring'
    | 'level'
    | 'name'
    | 'staff'
    | 'typeName'
    | 'vehicles';

export default Vue.extend<
    {
        faPencilAlt: IconDefinition;
        buildings: Record<number, Building>;
        buildingTypes: Record<number, InternalBuilding>;
        vehicleTypes: Record<number, InternalVehicle>;
        currentBuildingId: number;
        vehiclesByBuilding: Record<number, Vehicle[]>;
        buildingsTable: {
            search: string;
            sort: BuildingSortAttribute;
            sortDir: 'asc' | 'desc';
        };
        vehiclesTable: {
            search: string;
            sort: keyof AttributedVehicle;
            sortDir: 'asc' | 'desc';
        };
    },
    {
        selectTab(event: MouseEvent, index: number): void;
        updateIframe(event: Event): void;
        openSettings(): void;
        setSortBuildingsTable(sort: BuildingSortAttribute): void;
        setSortVehiclesTable(sort: keyof AttributedVehicle): void;
    },
    {
        attributedBuildings: AttributedBuilding[];
        sortedBuildingsByName: AttributedBuilding[];
        sortedBuildingIdsByName: number[];
        filteredBuildings: AttributedBuilding[];
        sortedBuildings: AttributedBuilding[];
        hasLevelBuildings: boolean;
        hasStaffBuildings: boolean;
        hasBedBuildings: boolean;
        hasClassroomBuildings: boolean;
        hasCellBuildings: boolean;
        hasVehicleBuildings: boolean;
        vehicles: AttributedVehicle[];
        filteredVehicles: AttributedVehicle[];
        sortedVehicles: AttributedVehicle[];
        boughtExtensionsAmountByType: Record<number, Record<number, number>>;
        extensions: AttributedExtension[];
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
        return {
            faPencilAlt,
            buildings: this.$store.getters['api/buildingsById'],
            buildingTypes: this.$store.getters.$tBuildings as Record<
                number,
                InternalBuilding
            >,
            vehicleTypes: this.$store.getters.$tVehicles as Record<
                number,
                InternalVehicle
            >,
            currentBuildingId: 0,
            vehiclesByBuilding: this.$store.getters['api/vehiclesByBuilding'],
            buildingsTable: {
                search: '',
                sort: 'name',
                sortDir: 'asc',
            },
            vehiclesTable: {
                search: '',
                sort: 'name',
                sortDir: 'asc',
            },
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
                        type: building.building_type,
                        icon:
                            building.custom_icon_url ??
                            window
                                .getBuildingMarkerIcon({
                                    building_type: building.building_type,
                                })
                                ?.replace(/_other(?=\.png$)/u, ''),
                        typeName: buildingType.caption,
                        name: building.caption,
                        extensions: building.extensions,
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
            const buildings = this.attributedBuildings;
            return buildings.sort(({ name: captionA }, { name: captionB }) =>
                captionA.localeCompare(captionB)
            );
        },
        sortedBuildingIdsByName() {
            return this.sortedBuildingsByName.map(({ id }) => id);
        },
        filteredBuildings() {
            return this.buildingsTable.search
                ? this.attributedBuildings.filter(building =>
                      JSON.stringify(Object.values(building))
                          .toLowerCase()
                          .includes(this.buildingsTable.search.toLowerCase())
                  )
                : this.attributedBuildings;
        },
        sortedBuildings() {
            if (this.buildingsTable.sort === 'name') {
                return this.buildingsTable.sortDir === 'asc'
                    ? this.sortedBuildingsByName
                    : [...this.sortedBuildingsByName].reverse();
            }
            return [...this.filteredBuildings].sort((buildingA, buildingB) => {
                // Workaround for TypeScript <3
                const getSortValue = (building: AttributedBuilding) => {
                    switch (this.buildingsTable.sort) {
                        case 'beds':
                            return 'beds' in building ? building.beds : -1;
                        case 'cells':
                            return 'cells' in building ? building.cells : -1;
                        case 'classrooms':
                            return 'classrooms' in building
                                ? building.classrooms
                                : -1;
                        case 'hiring':
                            if ('staff' in building) {
                                if (building.hiring_automatic) return 0;
                                return building.hiring_phase || -1;
                            }
                            return -2;
                        case 'level':
                            return 'level' in building ? building.level : -1;
                        case 'name':
                            return 'name' in building ? building.name : '';
                        case 'staff':
                            return 'staff' in building ? building.staff : -1;
                        case 'typeName':
                            return 'typeName' in building
                                ? building.typeName
                                : '';
                        case 'vehicles':
                            return 'vehicles' in building
                                ? building.vehicles.length
                                : -1;
                    }
                };
                const attributeA = getSortValue(buildingA);
                const attributeB = getSortValue(buildingB);

                let result = 0;

                if (
                    typeof attributeA === 'number' &&
                    typeof attributeB === 'number'
                )
                    result = attributeA - attributeB;
                else if (
                    typeof attributeA === 'string' &&
                    typeof attributeB === 'string'
                )
                    result = attributeA.localeCompare(attributeB);

                if (this.buildingsTable.sortDir === 'desc') result *= -1;

                return result;
            });
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
        vehicles() {
            return this.attributedBuildings.flatMap(building =>
                building.hasVehicles
                    ? building.vehicles.map(vehicle => {
                          const vehicleType =
                              this.vehicleTypes[vehicle.vehicle_type];
                          return {
                              id: vehicle.id,
                              icon:
                                  window.vehicle_graphics[
                                      vehicle.vehicle_type
                                  ]?.[0] ?? '',
                              customTypeName:
                                  vehicle.vehicle_type_caption ?? undefined,
                              typeName: vehicleType.caption,
                              name: vehicle.caption,
                              fms_show: vehicle.fms_show,
                              fms_real: vehicle.fms_real,
                              buildingId: vehicle.building_id,
                              buildingName:
                                  this.buildings[vehicle.building_id].caption,
                              assignedStaff: vehicle.assigned_personnel_count,
                              maxStaff:
                                  vehicle.max_personnel_override ??
                                  vehicleType.maxPersonnel,
                          };
                      })
                    : []
            );
        },
        filteredVehicles() {
            return this.vehiclesTable.search
                ? this.vehicles.filter(vehicle =>
                      JSON.stringify(Object.values(vehicle))
                          .toLowerCase()
                          .includes(this.vehiclesTable.search.toLowerCase())
                  )
                : this.vehicles;
        },
        sortedVehicles() {
            return [...this.filteredVehicles].sort((vehicleA, vehicleB) => {
                const attributeA = vehicleA[this.vehiclesTable.sort];
                const attributeB = vehicleB[this.vehiclesTable.sort];

                let result = 0;

                if (
                    typeof attributeA === 'number' &&
                    typeof attributeB === 'number'
                ) {
                    result = attributeA - attributeB;
                } else if (this.vehiclesTable.sort === 'customTypeName') {
                    result = (attributeA ?? vehicleA.typeName)
                        .toString()
                        .localeCompare(
                            (attributeB ?? vehicleB.typeName).toString()
                        );
                } else if (
                    typeof attributeA === 'string' &&
                    typeof attributeB === 'string'
                ) {
                    result = attributeA.localeCompare(attributeB);
                }

                if (this.vehiclesTable.sortDir === 'desc') result *= -1;

                return result;
            });
        },
        boughtExtensionsAmountByType() {
            const data: Record<
                number,
                Record<number, number>
            > = Object.fromEntries(
                Object.keys(this.buildingTypes).map(type => [type, {}])
            );
            Object.values(this.buildings).forEach(
                ({ building_type, extensions }) => {
                    extensions.forEach(({ type_id }) => {
                        if (!data[building_type].hasOwnProperty(type_id))
                            data[building_type][type_id] = 0;
                        data[building_type][type_id]++;
                    });
                }
            );
            return data;
        },
        extensions() {
            const maxExtensionsFunctionResults: Record<
                number,
                Record<number, number>
            > = {};

            return this.attributedBuildings.flatMap(
                ({
                    id: buildingId,
                    extensions,
                    name: buildingName,
                    type: buildingTypeId,
                }) => {
                    const buildingType = this.buildingTypes[buildingTypeId];
                    if (
                        !maxExtensionsFunctionResults.hasOwnProperty(
                            buildingTypeId
                        )
                    )
                        maxExtensionsFunctionResults[buildingTypeId] = {};
                    return buildingType.extensions.map(
                        (extensionType, index) => {
                            const boughtExtension = extensions.find(
                                ({ type_id }) => index === type_id
                            );
                            if (
                                !boughtExtension &&
                                extensionType.maxExtensionsFunction
                            ) {
                                maxExtensionsFunctionResults[buildingTypeId][
                                    index
                                ] ??= extensionType.maxExtensionsFunction(
                                    this.$store.getters['api/buildingsByType']
                                );
                            }

                            return {
                                buildingId,
                                buildingName,
                                name: extensionType.caption,
                                ...(boughtExtension
                                    ? {
                                          bought: true,
                                          available: boughtExtension.available,
                                          enabled: boughtExtension.enabled,
                                      }
                                    : {
                                          canBuy:
                                              extensionType.requiredExtensions?.every(
                                                  extension =>
                                                      extensions.find(
                                                          ({ type_id }) =>
                                                              extension ===
                                                              type_id
                                                      )
                                              ) ??
                                              extensionType.canBuyByAmount?.(
                                                  this
                                                      .boughtExtensionsAmountByType,
                                                  maxExtensionsFunctionResults[
                                                      buildingTypeId
                                                  ][index]
                                              ) ??
                                              true,
                                          duration: extensionType.duration,
                                          credits: extensionType.credits,
                                          coins: extensionType.coins,
                                      }),
                            };
                        }
                    );
                }
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
        setSortBuildingsTable(sort) {
            const s = sort;
            this.buildingsTable.sortDir =
                s === this.buildingsTable.sort &&
                this.buildingsTable.sortDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.buildingsTable.sort = s;
        },
        setSortVehiclesTable(sort) {
            const s = sort;
            this.vehiclesTable.sortDir =
                s === this.vehiclesTable.sort &&
                this.vehiclesTable.sortDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.vehiclesTable.sort = s;
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

    .indented-title
        text-indent: -0.5em
        padding-left: 0.5em
</style>
