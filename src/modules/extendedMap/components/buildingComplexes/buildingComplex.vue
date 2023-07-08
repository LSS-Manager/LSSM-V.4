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
                <tabs :on-select="selectOverviewTab">
                    <!-- List of attached buildings -->
                    <tab :title="$m('overview.buildings.title')">
                        <div
                            v-show="buildingsTable.showSummary"
                            class="summary-alert alert alert-unimportant"
                        >
                            <span
                                class="close"
                                @click="
                                    () => (buildingsTable.showSummary = false)
                                "
                            >
                                ×
                            </span>
                            <ul>
                                <li
                                    v-for="buildingType in buildingTypeAmounts"
                                    :key="buildingType[0]"
                                >
                                    {{ buildingType[1].toLocaleString() }}x
                                    {{ buildingType[0] }}
                                </li>
                            </ul>
                        </div>
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
                                <h2 class="overview-heading indented-title">
                                    {{ $m('overview.buildings.title') }}:
                                    {{
                                        attributedBuildings.length.toLocaleString()
                                    }}
                                    <small
                                        class="summary-icon"
                                        @click="
                                            () =>
                                                (buildingsTable.showSummary =
                                                    !buildingsTable.showSummary)
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="faCircleInfo"
                                        />
                                    </small>
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
                                        v-if="
                                            building.alliance &&
                                            hasAllianceAndPrivateBuildings
                                        "
                                        class="btn btn-default btn-xs disabled"
                                    >
                                        {{
                                            $m(
                                                'overview.buildings.table.alliance'
                                            )
                                        }}
                                    </a>
                                    <a
                                        :href="`/buildings/${building.id}`"
                                        class="lightbox-open"
                                    >
                                        {{ building.name }}
                                    </a>
                                    <a
                                        v-if="
                                            !building.alliance ||
                                            (building.alliance &&
                                                userHasAllianceFinanceRights)
                                        "
                                        class="btn btn-default btn-xs pull-right lightbox-open"
                                        :href="`/buildings/${building.id}/edit`"
                                    >
                                        <font-awesome-icon
                                            :icon="faPencilAlt"
                                        />
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
                                        <template
                                            v-if="building.bedsUnavailable"
                                        >
                                            ({{
                                                $mc(
                                                    'overview.buildings.inConstruction',
                                                    building.bedsUnavailable
                                                )
                                            }})
                                        </template>

                                        <template
                                            v-if="
                                                !building.alliance ||
                                                userHasAllianceFinanceRights
                                            "
                                        >
                                            <button
                                                class="btn btn-xs btn-default in-cell-toggle-btn"
                                                @click="toggleInCellOptions"
                                            >
                                                <font-awesome-icon
                                                    :icon="faGears"
                                                ></font-awesome-icon>
                                            </button>
                                            <div class="hidden">
                                                <button
                                                    v-if="!building.alliance"
                                                    class="btn btn-sm"
                                                    :class="`btn-${
                                                        building.is_alliance_shared
                                                            ? 'danger'
                                                            : 'success'
                                                    }`"
                                                    @click="
                                                        toggleAllianceShare(
                                                            building.id
                                                        )
                                                    "
                                                >
                                                    {{
                                                        $m(
                                                            `overview.buildings.share.beds.${
                                                                building.is_alliance_shared
                                                                    ? 'unShare'
                                                                    : 'share'
                                                            }`
                                                        )
                                                    }}
                                                </button>
                                                <div
                                                    v-if="
                                                        building.is_alliance_shared
                                                    "
                                                    class="btn-group"
                                                >
                                                    <a
                                                        class="btn btn-xs"
                                                        :class="`btn-${
                                                            (n - 1) * 10 ===
                                                            building.alliance_share_credits_percentage
                                                                ? 'success'
                                                                : 'default'
                                                        }`"
                                                        v-for="n in 6"
                                                        :key="n"
                                                        @click="
                                                            setAllianceTax(
                                                                building.id,
                                                                n - 1
                                                            )
                                                        "
                                                    >
                                                        {{ (n - 1) * 10 }}%
                                                    </a>
                                                </div>
                                            </div>
                                        </template>
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

                                        <template
                                            v-if="
                                                !building.alliance ||
                                                userHasAllianceFinanceRights
                                            "
                                        >
                                            <button
                                                class="btn btn-xs btn-default in-cell-toggle-btn"
                                                @click="toggleInCellOptions"
                                            >
                                                <font-awesome-icon
                                                    :icon="faGears"
                                                ></font-awesome-icon>
                                            </button>
                                            <div class="hidden">
                                                <button
                                                    v-if="!building.alliance"
                                                    class="btn btn-sm"
                                                    :class="`btn-${
                                                        building.is_alliance_shared
                                                            ? 'danger'
                                                            : 'success'
                                                    }`"
                                                    @click="
                                                        toggleAllianceShare(
                                                            building.id
                                                        )
                                                    "
                                                >
                                                    {{
                                                        $m(
                                                            `overview.buildings.share.cells.${
                                                                building.is_alliance_shared
                                                                    ? 'unShare'
                                                                    : 'share'
                                                            }`
                                                        )
                                                    }}
                                                </button>
                                                <div
                                                    v-if="
                                                        building.is_alliance_shared
                                                    "
                                                    class="btn-group"
                                                >
                                                    <a
                                                        class="btn btn-xs"
                                                        :class="`btn-${
                                                            (n - 1) * 10 ===
                                                            building.alliance_share_credits_percentage
                                                                ? 'success'
                                                                : 'default'
                                                        }`"
                                                        v-for="n in 6"
                                                        :key="n"
                                                        @click="
                                                            setAllianceTax(
                                                                building.id,
                                                                n - 1
                                                            )
                                                        "
                                                    >
                                                        {{ (n - 1) * 10 }}%
                                                    </a>
                                                </div>
                                            </div>
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
                        <div
                            v-show="vehiclesTable.showSummary"
                            class="summary-alert alert alert-unimportant"
                        >
                            <span
                                class="close"
                                @click="
                                    () => (vehiclesTable.showSummary = false)
                                "
                            >
                                ×
                            </span>
                            <ul>
                                <li
                                    v-for="vehicleType in vehicleTypeAmounts"
                                    :key="vehicleType[0]"
                                >
                                    {{ vehicleType[1].toLocaleString() }}x
                                    {{ vehicleType[0] }}
                                </li>
                            </ul>
                        </div>
                        <small>{{ $m('overview.vehicles.imageInfo') }}</small>
                        <enhanced-table
                            :table-attrs="{
                                class: 'table table-striped',
                                id: rootStore.nodeAttribute(
                                    'buildingComplex-vehicle-table',
                                    true
                                ),
                            }"
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
                                <h2 class="overview-heading indented-title">
                                    {{ $m('overview.vehicles.title') }}:
                                    {{ vehicles.length.toLocaleString() }}
                                    <small
                                        class="summary-icon"
                                        @click="
                                            () =>
                                                (vehiclesTable.showSummary =
                                                    !vehiclesTable.showSummary)
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="faCircleInfo"
                                        />
                                    </small>
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
                                        @click="
                                            [2, 6].includes(
                                                vehicle.fms_real
                                                    ? toggleVehicleFMS(vehicle)
                                                    : () => {}
                                            )
                                        "
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
                                },
                                buildingName: {
                                    title: $m(
                                        'overview.extensions.table.head.building'
                                    ),
                                },
                                actions: {
                                    title: '',
                                },
                            }"
                            :search="extensionsTable.search"
                            @search="s => (extensionsTable.search = s)"
                            :sort="extensionsTable.sort"
                            :sort-dir="extensionsTable.sortDir"
                            @sort="setSortExtensionsTable"
                        >
                            <template v-slot:head>
                                <h2 class="indented-title">
                                    {{ $m('overview.extensions.title') }}
                                    <br />
                                    <small>
                                        {{
                                            $mc(
                                                'overview.extensions.summary.built',
                                                extensionsAvailableCount,
                                                {
                                                    n: extensionsAvailableCount.toLocaleString(),
                                                }
                                            )
                                        }},
                                        {{
                                            $mc(
                                                'overview.extensions.summary.inConstruction',
                                                extensionsUnderConstructionCount,
                                                {
                                                    n: extensionsUnderConstructionCount.toLocaleString(),
                                                }
                                            )
                                        }},
                                        {{
                                            $mc(
                                                'overview.extensions.summary.available',
                                                extensionsCanBuyCount,
                                                {
                                                    n: extensionsCanBuyCount.toLocaleString(),
                                                }
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
                                <div class="form-group extensions-filter">
                                    <div>
                                        <label>
                                            {{
                                                $m(
                                                    'overview.extensions.filter.extensions'
                                                )
                                            }}
                                        </label>
                                        <multi-select
                                            name="extensions_select"
                                            :placeholder="
                                                $m(
                                                    'overview.extensions.filter.extensions'
                                                )
                                            "
                                            :value="extensionsFilterNamesValue"
                                            :options="
                                                extensionsFilterNamesOptions
                                            "
                                            @input="updateExtensionsFilterNames"
                                        ></multi-select>
                                    </div>
                                    <div>
                                        <label>
                                            {{
                                                $m(
                                                    'overview.extensions.filter.buildings'
                                                )
                                            }}
                                        </label>
                                        <multi-select
                                            name="extensions_buildings_select"
                                            :placeholder="
                                                $m(
                                                    'overview.extensions.filter.buildings'
                                                )
                                            "
                                            :value="
                                                extensionsFilterBuildingsValue
                                            "
                                            :options="
                                                extensionsFilterBuildingsOptions
                                            "
                                            @input="
                                                updateExtensionsFilterBuildings
                                            "
                                        ></multi-select>
                                    </div>
                                    <div>
                                        <label>
                                            {{
                                                $m(
                                                    'overview.extensions.filter.states'
                                                )
                                            }}
                                        </label>
                                        <multi-select
                                            name="extensions_states_select"
                                            :placeholder="
                                                $m(
                                                    'overview.extensions.filter.states'
                                                )
                                            "
                                            :value="extensionsFilterStatesValue"
                                            :options="
                                                extensionsFilterStatesOptions
                                            "
                                            @input="
                                                updateExtensionsFilterStates
                                            "
                                        ></multi-select>
                                    </div>
                                </div>
                            </template>
                            <tr
                                v-for="(extension, index) in sortedExtensions"
                                :key="index"
                            >
                                <td>
                                    {{ extension.name }}
                                </td>
                                <td>
                                    <a
                                        v-if="
                                            extension.allianceBuilding &&
                                            hasAllianceAndPrivateBuildings
                                        "
                                        class="btn btn-default btn-xs disabled"
                                    >
                                        {{
                                            $m(
                                                'overview.buildings.table.alliance'
                                            )
                                        }}
                                    </a>
                                    <a
                                        :href="`/buildings/${extension.buildingId}#ausbauten`"
                                        class="lightbox-open"
                                    >
                                        {{ extension.buildingName }}
                                    </a>
                                </td>
                                <td>
                                    <template v-if="extension.bought">
                                        <template v-if="extension.available">
                                            <span
                                                v-if="extension.enabled"
                                                class="label label-success"
                                            >
                                                {{
                                                    $m(
                                                        'overview.extensions.enabled'
                                                    )
                                                }}
                                            </span>
                                            <span
                                                v-else
                                                class="label label-danger"
                                            >
                                                {{
                                                    $m(
                                                        'overview.extensions.disabled'
                                                    )
                                                }}
                                            </span>
                                            <button
                                                v-if="extension.canToggle"
                                                class="btn btn-xs btn-default extension-toggle"
                                                @click="
                                                    toggleExtension(
                                                        extension.buildingId,
                                                        extension.type
                                                    )
                                                "
                                                :disabled="
                                                    tempDisableAllExtensionButtons
                                                "
                                            >
                                                {{
                                                    $m(
                                                        `overview.extensions.${
                                                            extension.enabled
                                                                ? 'disable'
                                                                : 'enable'
                                                        }`
                                                    )
                                                }}
                                            </button>
                                        </template>
                                        <template v-else>
                                            <span class="label label-default">
                                                {{
                                                    $m(
                                                        'overview.extensions.underConstruction'
                                                    )
                                                }}
                                            </span>
                                            <span class="label label-default">
                                                <span
                                                    :id="extension.countdownId"
                                                ></span>
                                                ({{
                                                    extension.availableAtReadable
                                                }})
                                            </span>
                                            &nbsp;
                                            <button
                                                class="btn btn-default btn-xs"
                                                v-if="extension.canBeAborted"
                                                disabled
                                            >
                                                {{
                                                    $m(
                                                        'overview.extensions.abort'
                                                    )
                                                }}
                                            </button>
                                        </template>
                                    </template>
                                    <template
                                        v-else-if="
                                            !extension.allianceBuilding ||
                                            (extension.allianceBuilding &&
                                                userHasAllianceFinanceRights)
                                        "
                                    >
                                        <button
                                            :class="`btn btn-${
                                                extension.enoughCredits
                                                    ? 'success'
                                                    : 'danger'
                                            } btn-sm`"
                                            :disabled="
                                                !extension.canBuy ||
                                                !extension.enoughCredits ||
                                                tempDisableAllExtensionButtons
                                            "
                                            @click="
                                                buyExtension(
                                                    extension.buildingId,
                                                    extension.type,
                                                    'credits',
                                                    extension.credits,
                                                    extension.allianceBuilding
                                                )
                                            "
                                        >
                                            {{
                                                extension.credits.toLocaleString()
                                            }}
                                            {{ $t('credits') }}
                                        </button>
                                        <button
                                            v-if="!extension.allianceBuilding"
                                            :class="`btn btn-${
                                                extension.enoughCoins
                                                    ? 'success'
                                                    : 'danger'
                                            } btn-sm`"
                                            :disabled="
                                                !extension.canBuy ||
                                                !extension.enoughCoins ||
                                                tempDisableAllExtensionButtons
                                            "
                                            @click="
                                                buyExtension(
                                                    extension.buildingId,
                                                    extension.type,
                                                    'coins',
                                                    extension.coins,
                                                    extension.allianceBuilding
                                                )
                                            "
                                        >
                                            {{
                                                extension.coins.toLocaleString()
                                            }}
                                            {{ $t('coins') }}
                                        </button>
                                        <span
                                            v-else
                                            class="label label-default extensions-alliance-funds-label"
                                        >
                                            {{
                                                $m(
                                                    'overview.extensions.allianceFunds'
                                                )
                                            }}
                                        </span>
                                        {{ extension.duration }}
                                        <ul
                                            v-if="!extension.canBuy"
                                            class="requirements-list"
                                        >
                                            <li>
                                                {{
                                                    $m(
                                                        'overview.extensions.missingRequirements'
                                                    )
                                                }}
                                            </li>
                                            <li
                                                v-for="(
                                                    requirement, index
                                                ) in extension.requirements"
                                                :key="index"
                                            >
                                                {{ requirement }}
                                            </li>
                                        </ul>
                                    </template>
                                </td>
                            </tr>
                        </enhanced-table>
                    </tab>

                    <!-- Classrooms / start schoolings -->
                    <tab
                        :title="$m('overview.classrooms.title')"
                        v-if="hasClassroomBuildings"
                    >
                        <h2 class="indented-title">
                            {{ $m('overview.classrooms.title') }}
                            <button
                                class="btn btn-success pull-right"
                                :disabled="classroomStats.free === 0"
                                @click="openAvailableSchool"
                            >
                                {{ $m('overview.classrooms.startTraining') }}
                            </button>
                            <br />
                            <small>
                                {{
                                    $m(
                                        'overview.classrooms.subtitle',
                                        classroomStats
                                    )
                                }}
                            </small>
                        </h2>
                        <div class="classrooms-table">
                            <div
                                class="panel panel-default"
                                v-for="building in schoolingBuildings"
                                :key="building.id"
                            >
                                <div class="panel-heading">
                                    <span
                                        class="pull-right label label-default"
                                    >
                                        {{
                                            buildingTypes[building.type].caption
                                        }}
                                    </span>
                                    <img
                                        loading="lazy"
                                        :src="building.icon"
                                        :alt="building.name"
                                    />
                                    <a
                                        class="lightbox-open"
                                        :href="`/buildings/${building.id}`"
                                    >
                                        {{ building.name }}
                                    </a>
                                </div>
                                <div class="panel-body">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>
                                                    {{
                                                        $m(
                                                            'overview.classrooms.table.running.title'
                                                        )
                                                    }}
                                                </th>
                                                <th>
                                                    {{
                                                        $m(
                                                            'overview.classrooms.table.free'
                                                        )
                                                    }}
                                                </th>
                                                <th>
                                                    {{
                                                        $m(
                                                            'overview.classrooms.table.countdown'
                                                        )
                                                    }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="schooling in building.schoolings"
                                                :key="schooling.id"
                                            >
                                                <td>
                                                    <a
                                                        class="btn btn-success lightbox-open"
                                                        :href="`/schoolings/${schooling.id}`"
                                                    >
                                                        {{
                                                            schooling.education_title
                                                        }}
                                                    </a>
                                                </td>
                                                <td>
                                                    <span
                                                        class="label"
                                                        :class="{
                                                            'label-success':
                                                                schooling.running,
                                                            'label-warning':
                                                                !schooling.running,
                                                        }"
                                                    >
                                                        {{
                                                            $m(
                                                                `overview.classrooms.table.running.${schooling.running}`
                                                            )
                                                        }}
                                                    </span>
                                                </td>
                                                <td>
                                                    {{ schooling.open_spaces }}
                                                </td>
                                                <td
                                                    :id="schooling.countdownId"
                                                ></td>
                                            </tr>
                                            <tr v-if="building.freeClassrooms">
                                                <td colspan="4">
                                                    {{
                                                        $mc(
                                                            'overview.classrooms.table.freeClassrooms',
                                                            building.freeClassrooms
                                                        )
                                                    }}
                                                    <a
                                                        class="lightbox-open btn btn-success pull-right"
                                                        :href="`/buildings/${building.id}`"
                                                    >
                                                        {{
                                                            $m(
                                                                'overview.classrooms.table.start'
                                                            )
                                                        }}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr
                                                v-if="
                                                    building.classRoomsUnavailable
                                                "
                                            >
                                                <td colspan="4">
                                                    <span
                                                        class="label label-default"
                                                    >
                                                        {{
                                                            $mc(
                                                                'overview.classrooms.table.unavailable',
                                                                building.classRoomsUnavailable
                                                            )
                                                        }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </tab>

                    <!-- dispatch center protocol filtered by attached buildings -->
                    <tab :title="$m('overview.protocol.title')">
                        <enhanced-table
                            :table-attrs="{ class: 'table table-striped' }"
                            :head="{
                                time: {
                                    title: $m(
                                        'overview.protocol.table.head.time'
                                    ),
                                },
                                label: {
                                    title: $m(
                                        'overview.protocol.table.head.label'
                                    ),
                                },
                                title: {
                                    title: $m(
                                        'overview.protocol.table.head.name'
                                    ),
                                },
                                building: {
                                    title: $m(
                                        'overview.protocol.table.head.building'
                                    ),
                                },
                                staff: {
                                    title: $m(
                                        'overview.protocol.table.head.staff'
                                    ),
                                },
                                actions: {
                                    title: '',
                                    noSort: true,
                                },
                            }"
                            :search="protocolTable.search"
                            @search="s => (protocolTable.search = s)"
                            :sort="protocolTable.sort"
                            :sort-dir="protocolTable.sortDir"
                            @sort="setSortProtocolTable"
                        >
                            <template v-slot:head>
                                <h2 class="overview-heading indented-title">
                                    {{ $m('overview.protocol.title') }}
                                    <span
                                        v-show="protocolUpdating"
                                        class="protocol-update-info"
                                    >
                                        ({{ $m('overview.protocol.updating') }})
                                    </span>
                                    <br />
                                    <small>
                                        {{
                                            $mc(
                                                'overview.protocol.subtitle',
                                                protocol.length,
                                                {
                                                    n: protocol.length.toLocaleString(),
                                                }
                                            )
                                        }}
                                    </small>
                                </h2>
                                <button
                                    class="btn btn-sm btn-danger"
                                    :disabled="
                                        protocolDeletions.length ||
                                        !protocol.length
                                    "
                                    @click="deleteAllProtocolEntries"
                                >
                                    <font-awesome-icon
                                        :icon="faTrash"
                                    ></font-awesome-icon>
                                </button>
                            </template>
                            <tr
                                v-for="protocolEntry in sortedProtocol"
                                :key="protocolEntry.id"
                            >
                                <td>{{ protocolEntry.time.text }}</td>
                                <td>
                                    <label
                                        v-if="protocolEntry.label"
                                        :class="`label label-${protocolEntry.label.color}`"
                                    >
                                        {{ protocolEntry.label.text }}
                                    </label>
                                </td>
                                <td>{{ protocolEntry.text }}</td>
                                <td>
                                    <a
                                        :href="`/buildings/${protocolEntry.building.id}`"
                                        class="lightbox-open"
                                    >
                                        {{ protocolEntry.building.name }}
                                    </a>
                                </td>
                                <td>
                                    <template
                                        v-for="(
                                            staff, building
                                        ) in protocolEntry.staff"
                                    >
                                        <a
                                            class="lightbox-open"
                                            :href="`/buildings/${building}`"
                                            :key="`${protocolEntry.id}_${building}`"
                                        >
                                            {{ buildings[building].caption }}
                                        </a>
                                        <ul
                                            :key="`${protocolEntry.id}_${building}_li`"
                                            class="protocol-staff-list"
                                        >
                                            <li
                                                v-for="(name, index) in staff"
                                                :key="index"
                                            >
                                                {{ name }}
                                            </li>
                                        </ul>
                                    </template>
                                </td>
                                <td>
                                    <button
                                        class="btn btn-xs btn-danger"
                                        :disabled="
                                            protocolDeletions.includes(
                                                protocolEntry.id
                                            )
                                        "
                                        @click="
                                            deleteProtocolEntry(
                                                protocolEntry.id,
                                                protocolEntry.dispatchId
                                            )
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="faTrash"
                                        ></font-awesome-icon>
                                    </button>
                                </td>
                            </tr>
                        </enhanced-table>
                    </tab>
                </tabs>
            </tab>
            <template v-if="complex.buildingTabs">
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
            </template>
        </tabs>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faGears } from '@fortawesome/free-solid-svg-icons/faGears';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { mapState } from 'pinia';
import moment from 'moment';
import { useEventStore } from '@stores/event';
import { useRootStore } from '@stores/index';
import { useTranslationStore } from '@stores/translationUtilities';
import { defineAPIStore, useAPIStore } from '@stores/api';

import type { Complex } from '../../assets/buildingComplexes';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Schooling } from 'typings/api/Schoolings';
import type { $m, $mc } from 'typings/Module';
import type {
    Building,
    Extension,
    InternalBuilding,
    InternalExtension,
} from 'typings/Building';
import type { InternalVehicle, Vehicle } from 'typings/Vehicle';

type Maybe = boolean | unknown;

type HasInterface<HasAttribute extends string> = Record<HasAttribute, true>;
type HasNotInterface<HasAttribute extends string> = Record<HasAttribute, false>;
type MaybeInterface<
    HasInterface,
    HasNotInterface,
    Has extends Maybe = unknown,
> = Has extends true
    ? HasInterface
    : Has extends false
    ? HasNotInterface
    : HasInterface | HasNotInterface;

type AttributedBuildingHasBeds = HasInterface<'hasBeds'> & {
    beds: number;
    bedsUnavailable: number;
    is_alliance_shared: boolean;
    alliance_share_credits_percentage: 0 | 10 | 20 | 30 | 40 | 50;
};
type AttributedBuildingHasNoBeds = HasNotInterface<'hasBeds'>;
type AttributedBuildingBeds<HasBeds extends Maybe = unknown> = MaybeInterface<
    AttributedBuildingHasBeds,
    AttributedBuildingHasNoBeds,
    HasBeds
>;

type AttributedBuildingHasCells = HasInterface<'hasCells'> & {
    cells: number;
    cellsUnavailable: number;
    is_alliance_shared: boolean;
    alliance_share_credits_percentage: 0 | 10 | 20 | 30 | 40 | 50;
};
type AttributedBuildingHasNoCells = HasNotInterface<'hasCells'>;
type AttributedBuildingCells<HasCells extends Maybe = unknown> = MaybeInterface<
    AttributedBuildingHasCells,
    AttributedBuildingHasNoCells,
    HasCells
>;

type AttributedBuildingHasClassrooms = HasInterface<'hasClassrooms'> & {
    classrooms: number;
    classRoomsUnavailable: number;
};
type AttributedBuildingHasNoClassrooms = HasNotInterface<'hasClassrooms'>;
type AttributedBuildingClassrooms<HasClassrooms extends Maybe = unknown> =
    MaybeInterface<
        AttributedBuildingHasClassrooms,
        AttributedBuildingHasNoClassrooms,
        HasClassrooms
    >;

type AttributedBuildingHasLevel = HasInterface<'hasLevel'> & { level: number };
type AttributedBuildingHasNoLevel = HasNotInterface<'hasLevel'>;
type AttributedBuildingLevel<HasLevel extends Maybe = unknown> = MaybeInterface<
    AttributedBuildingHasLevel,
    AttributedBuildingHasNoLevel,
    HasLevel
>;

type AttributedBuildingHasStaff = HasInterface<'hasStaff'> & {
    staff: number;
    staffTarget?: number;
    hiring_automatic: boolean;
    hiring_phase: number;
};
type AttributedBuildingHasNoStaff = HasNotInterface<'hasStaff'>;
type AttributedBuildingStaff<HasStaff extends Maybe = unknown> = MaybeInterface<
    AttributedBuildingHasStaff,
    AttributedBuildingHasNoStaff,
    HasStaff
>;

type AttributedBuildingHasVehicles = HasInterface<'hasVehicles'> & {
    vehicles: Vehicle[];
    maxVehicles: number;
};
type AttributedBuildingHasNoVehicles = HasNotInterface<'hasVehicles'>;
type AttributedBuildingVehicles<HasVehicles extends Maybe = unknown> =
    MaybeInterface<
        AttributedBuildingHasVehicles,
        AttributedBuildingHasNoVehicles,
        HasVehicles
    >;

type AttributedBuilding<
    HasBeds extends Maybe = unknown,
    HasCells extends Maybe = unknown,
    HasClassrooms extends Maybe = unknown,
    HasLevel extends Maybe = unknown,
    HasStaff extends Maybe = unknown,
    HasVehicles extends Maybe = unknown,
> = AttributedBuildingBeds<HasBeds> &
    AttributedBuildingCells<HasCells> &
    AttributedBuildingClassrooms<HasClassrooms> &
    AttributedBuildingLevel<HasLevel> &
    AttributedBuildingStaff<HasStaff> &
    AttributedBuildingVehicles<HasVehicles> & {
        alliance: boolean;
        id: number;
        type: number;
        icon: string;
        typeName: string;
        name: string;
        extensions: Extension[];
        leitstelle: number | null;
    };

type ClassroomBuilding = AttributedBuilding<unknown, unknown, true>;

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
    allianceBuilding: boolean;
    buildingId: number;
    buildingName: string;
    name: string;
    type: number;
} & (
    | ({
          duration: string;
          credits: number;
          coins: number;
          enoughCredits: boolean;
          enoughCoins: boolean;
      } & ({ canBuy: false; requirements: string[] } | { canBuy: true }))
    | ({ bought: true; enabled: boolean; canToggle: boolean } & (
          | {
                available: false;
                availableAt: string;
                availableAtReadable: string;
                canBeAborted: boolean;
                countdownId: string;
                initCountdown(): void;
            }
          | { available: true }
      ))
);

type SchoolingBuilding = ClassroomBuilding & {
    schoolings: (Schooling & {
        countdownId: string;
        initCountdown(): void;
    })[];
    classroomsAvailable: number;
    freeClassrooms: number;
};

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

type ExtensionSortAttribute = 'actions' | 'buildingName' | 'name';

type ExtensionStateFilters =
    | 'canBuy'
    | 'cannotBuy'
    | 'cannotToggle'
    | 'canToggle'
    | 'disabled'
    | 'enabled'
    | 'underConstruction';

interface ProtocolEntry {
    id: number;
    dispatchId: number;
    time: {
        timestamp: number;
        text: string;
    };
    label?: {
        color: string;
        text: string;
    };
    text: string;
    building: { id: number; name: string };
    staff: Record<number, string[]>;
}

type ProtocolSortAttribute = 'building' | 'label' | 'staff' | 'time' | 'title';

export default Vue.extend<
    {
        faCircleInfo: IconDefinition;
        faGears: IconDefinition;
        faPencilAlt: IconDefinition;
        faTrash: IconDefinition;
        buildingTypes: Record<number, InternalBuilding>;
        vehicleTypes: Record<number, InternalVehicle>;
        currentBuildingId: number;
        currentOverviewTab: number;
        buildingsTable: {
            search: string;
            sort: BuildingSortAttribute;
            sortDir: 'asc' | 'desc';
            showSummary: boolean;
        };
        vehiclesTable: {
            search: string;
            sort: keyof AttributedVehicle;
            sortDir: 'asc' | 'desc';
            showSummary: boolean;
        };
        extensionsTable: {
            search: string;
            sort: ExtensionSortAttribute;
            sortDir: 'asc' | 'desc';
            filters: {
                extensionNames: string[] | 'all';
                buildings: number[] | 'all';
                states: ExtensionStateFilters[] | 'all';
            };
        };
        tempDisableAllExtensionButtons: boolean;
        protocol: ProtocolEntry[];
        protocolUpdating: boolean;
        protocolDeletions: number[];
        protocolDeletionTimeout: number | null;
        protocolTable: {
            search: string;
            sort: ProtocolSortAttribute;
            sortDir: 'asc' | 'desc';
        };
        apiStore: ReturnType<typeof useAPIStore>;
        rootStore: ReturnType<typeof useRootStore>;
        translationStore: ReturnType<typeof useTranslationStore>;
        moment: typeof moment;
    },
    {
        selectTab(event: MouseEvent, index: number): void;
        selectOverviewTab(event: MouseEvent, index: number): void;
        updateIframe(event: Event): void;
        openSettings(): void;
        toggleVehicleFMS(vehicle: AttributedVehicle): void;
        setSortBuildingsTable(sort: BuildingSortAttribute): void;
        setSortVehiclesTable(sort: keyof AttributedVehicle): void;
        setSortExtensionsTable(sort: ExtensionSortAttribute): void;
        setSortProtocolTable(sort: ProtocolSortAttribute): void;
        initExtensionCountdowns(): void;
        buyExtension(
            buildingId: number,
            extensionType: number,
            method: 'coins' | 'credits',
            price: number,
            allianceBuilding: boolean
        ): void;
        toggleExtension(buildingId: number, extensionType: number): void;
        updateExtensionsFilterNames(names: string[]): void;
        updateExtensionsFilterBuildings(buildings: (number | '*')[]): void;
        updateExtensionsFilterStates(
            states: (ExtensionStateFilters | '*')[]
        ): void;
        initSchoolingCountdowns(): void;
        updateProtocol(): void;
        deleteProtocolEntry(id: number, dispatchCenter: number): void;
        deleteAllProtocolEntries(): void;
        toggleInCellOptions($event: MouseEvent): void;
        toggleAllianceShare(buildingId: number): void;
        setAllianceTax(buildingId: number, tax: number): void;
        openAvailableSchool(): void;
    },
    {
        buildings: Record<number, Building>;
        allianceBuildings: Record<number, Building>;
        vehiclesByBuilding: Record<number, Vehicle[]>;
        allSchoolings: Schooling[];
        attributedBuildings: AttributedBuilding[];
        sortedBuildingsByName: AttributedBuilding[];
        sortedBuildingIdsByName: number[];
        filteredBuildings: AttributedBuilding[];
        sortedBuildings: AttributedBuilding[];
        hasLevelBuildings: boolean;
        hasStaffBuildings: boolean;
        hasBedBuildings: boolean;
        classroomBuildings: ClassroomBuilding[];
        hasClassroomBuildings: boolean;
        hasCellBuildings: boolean;
        hasVehicleBuildings: boolean;
        hasAllianceAndPrivateBuildings: boolean;
        overviewTabs: {
            buildings: 0;
            vehicles: number;
            extensions: number;
            classrooms: number;
            protocol: number;
        };
        buildingTypeAmounts: [string, number][];
        vehicles: AttributedVehicle[];
        filteredVehicles: AttributedVehicle[];
        sortedVehicles: AttributedVehicle[];
        vehicleTypeAmounts: [string, number][];
        boughtExtensionsAmountByType: Record<number, Record<number, number>>;
        extensions: AttributedExtension[];
        filteredExtensions: AttributedExtension[];
        sortedExtensions: AttributedExtension[];
        extensionsAvailableCount: number;
        extensionsUnderConstructionCount: number;
        extensionsCanBuyCount: number;
        extensionsFilterNamesValue: string[];
        extensionsFilterNamesOptions: { label: string; value: string }[];
        extensionsFilterBuildingsValue: number[] | ['*'];
        extensionsFilterBuildingsOptions: {
            label: string;
            value: number | '*';
        }[];
        extensionsFilterStatesValue: ExtensionStateFilters[] | ['*'];
        extensionsFilterStatesOptions: {
            label: string;
            value: ExtensionStateFilters | '*';
        }[];
        userHasAllianceFinanceRights: boolean;
        schoolings: Schooling[];
        schoolingBuildings: SchoolingBuilding[];
        classroomStats: {
            total: number;
            unavailable: number;
            free: number;
        };
        filteredProtocol: ProtocolEntry[];
        sortedProtocol: ProtocolEntry[];
    },
    {
        complexIndex: number;
        modalName: string;
        complex: Complex;
        allAttachedBuildings: string[];
        allAttachedAllianceBuildings: string[];
        complexLocations: { icon: string; location: [number, number] }[];
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
        MultiSelect: () =>
            import(
                /* webpackChunkName: "components/settings/multi-select" */ '../../../../components/setting/multi-select.vue'
            ),
    },
    data() {
        const translationStore = useTranslationStore();
        return {
            faCircleInfo,
            faGears,
            faPencilAlt,
            faTrash,
            buildingTypes: translationStore.buildings,
            vehicleTypes: translationStore.vehicles,
            currentBuildingId: 0,
            currentOverviewTab: 0,
            buildingsTable: {
                search: '',
                sort: 'name',
                sortDir: 'asc',
                showSummary: false,
            },
            vehiclesTable: {
                search: '',
                sort: 'name',
                sortDir: 'asc',
                showSummary: false,
            },
            extensionsTable: {
                search: '',
                sort: 'buildingName',
                sortDir: 'asc',
                filters: {
                    extensionNames: 'all',
                    buildings: 'all',
                    states: 'all',
                },
            },
            tempDisableAllExtensionButtons: false,
            protocol: [],
            protocolUpdating: false,
            protocolDeletions: [],
            protocolDeletionTimeout: null,
            protocolTable: {
                search: '',
                sort: 'time',
                sortDir: 'asc',
            },
            apiStore: useAPIStore(),
            rootStore: useRootStore(),
            translationStore,
            moment,
        };
    },
    computed: {
        ...mapState(defineAPIStore, {
            buildings: 'buildingsById',
            allianceBuildings: 'allianceBuildingsById',
            vehiclesByBuilding: 'vehiclesByBuilding',
            allSchoolings(store) {
                const allianceSchoolings = store.alliance_schoolings.result;
                const allianceSchoolingIds = allianceSchoolings.map(s => s.id);
                return allianceSchoolings.concat(
                    store.schoolings.result.filter(
                        s => !allianceSchoolingIds.includes(s.id)
                    )
                );
            },
        }),
        attributedBuildings() {
            const smallBuildings = this.$t(
                'small_buildings'
            ) as unknown as Record<number, number>;

            return [
                ...this.complex.buildings,
                ...this.complex.allianceBuildings,
            ]
                .map(buildingId => {
                    const intId = parseInt(buildingId);
                    const isAllianceBuilding =
                        this.allianceBuildings.hasOwnProperty(intId);
                    const building = isAllianceBuilding
                        ? this.allianceBuildings[intId]
                        : this.buildings[intId];
                    if (!building) return null;

                    const realBuildingType = building.small_building
                        ? smallBuildings[building.building_type] ??
                          building.building_type
                        : building.building_type;

                    const buildingType =
                        this.buildingTypes[realBuildingType] ?? {};

                    const buildingAttrs = {
                        alliance: isAllianceBuilding,
                        id: building.id,
                        type: realBuildingType,
                        icon:
                            building.custom_icon_url ??
                            window.flavouredAsset(
                                window
                                    .getBuildingMarkerIcon({
                                        building_type: building.building_type,
                                    })
                                    ?.replace(/_other(?=\.png$)/u, '')
                            ),
                        typeName: buildingType?.caption ?? '🦥',
                        name: building.caption,
                        extensions: building.extensions,
                        leitstelle: building.leitstelle_building_id,
                    };

                    const bedExtensions = {
                        beds:
                            'startBeds' in buildingType
                                ? buildingType.startBeds + building.level
                                : 0,
                        bedsUnavailable: 0,
                    };
                    building.extensions.forEach(extension => {
                        const extensionType =
                            buildingType.extensions?.[extension.type_id] ?? {};
                        if ('newBeds' in extensionType) {
                            if (!extension.available) {
                                bedExtensions.bedsUnavailable +=
                                    extensionType.newBeds;
                            }
                            bedExtensions.beds += extensionType.newBeds;
                        }
                    });
                    const beds: AttributedBuildingBeds =
                        'startBeds' in buildingType
                            ? {
                                  hasBeds: true,
                                  ...bedExtensions,
                                  is_alliance_shared:
                                      building.is_alliance_shared ?? false,
                                  alliance_share_credits_percentage:
                                      building.alliance_share_credits_percentage ??
                                      0,
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
                        const extensionType =
                            buildingType.extensions?.[extension.type_id] ?? {};
                        if ('newCells' in extensionType) {
                            if (!extension.available) {
                                cellExtensions.cellsUnavailable +=
                                    extensionType.newCells;
                            }
                            cellExtensions.cells += extensionType.newCells;
                        }
                    });

                    const cells: AttributedBuildingCells =
                        'startCells' in buildingType
                            ? {
                                  hasCells: true,
                                  ...cellExtensions,
                                  is_alliance_shared:
                                      building.is_alliance_shared ?? false,
                                  alliance_share_credits_percentage:
                                      building.alliance_share_credits_percentage ??
                                      0,
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
                                (buildingType.extensions?.[extension.type_id] ??
                                    {})
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
                                      (buildingType.parkingLotsPerLevel ?? 1) *
                                          building.level +
                                      buildingType.startParkingLots +
                                      building.extensions
                                          .map(extension => {
                                              const extensionType: InternalExtension | null =
                                                  buildingType.extensions[
                                                      extension.type_id
                                                  ];
                                              if (
                                                  !extensionType ||
                                                  !extension.available ||
                                                  !(
                                                      'isVehicleExtension' in
                                                      extensionType
                                                  )
                                              )
                                                  return 0;
                                              return (
                                                  (extensionType.givesParkingLots ??
                                                      0) +
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
                .filter(<S,>(value: S | null): value is S => !!value);
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
        classroomBuildings() {
            return this.attributedBuildings.filter(
                (building): building is ClassroomBuilding =>
                    building.hasClassrooms
            );
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
        hasAllianceAndPrivateBuildings() {
            return !!(
                this.complex.buildings.length &&
                this.complex.allianceBuildings.length
            );
        },
        overviewTabs() {
            const vehiclesTab = this.hasVehicleBuildings ? 1 : 0;
            const extensionsTab = vehiclesTab + 1;
            const classroomTab = this.hasClassroomBuildings
                ? extensionsTab + 1
                : -1;
            const protocolTab =
                classroomTab > 0 ? classroomTab + 1 : extensionsTab + 1;
            return {
                buildings: 0,
                vehicles: vehiclesTab || -1,
                extensions: extensionsTab,
                classrooms: classroomTab,
                protocol: protocolTab,
            };
        },
        buildingTypeAmounts() {
            const types: Record<string, number> = {};
            this.attributedBuildings.forEach(({ typeName }) => {
                if (!types.hasOwnProperty(typeName)) types[typeName] = 0;
                types[typeName]++;
            });
            return Object.entries(types).sort(([typeA], [typeB]) =>
                typeA.localeCompare(typeB)
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
                              icon: window.flavouredAsset(
                                  window.vehicle_graphics[
                                      vehicle.vehicle_type
                                  ]?.[0] ?? ''
                              ),
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
        vehicleTypeAmounts() {
            const types: Record<string, number> = {};
            this.vehicles.forEach(({ typeName }) => {
                if (!types.hasOwnProperty(typeName)) types[typeName] = 0;
                types[typeName]++;
            });
            return Object.entries(types).sort(([typeA], [typeB]) =>
                typeA.localeCompare(typeB)
            );
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
                    alliance,
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

                    const removeNull = <S,>(value: S | null): value is S =>
                        !!value;

                    const availableAtSorted = extensions
                        .map(extension =>
                            !extension.available ? extension.available_at : null
                        )
                        .filter(removeNull)
                        .sort()
                        .reverse();

                    return (
                        buildingType?.extensions
                            ?.map<AttributedExtension | null>(
                                (extensionType, index) => {
                                    if (!extensionType) return null;
                                    const boughtExtension = extensions.find(
                                        ({ type_id }) => index === type_id
                                    );
                                    if (
                                        !boughtExtension &&
                                        extensionType.maxExtensionsFunction
                                    ) {
                                        maxExtensionsFunctionResults[
                                            buildingTypeId
                                        ][index] ??=
                                            extensionType.maxExtensionsFunction(
                                                this.apiStore.buildingsByType
                                            );
                                    }

                                    const requiredExtensions =
                                        extensionType.requiredExtensions;

                                    const allRequiredExtensionsBought =
                                        requiredExtensions?.every(extension =>
                                            extensions.find(
                                                ({ type_id }) =>
                                                    extension === type_id
                                            )
                                        );

                                    const canBuyByAmount =
                                        extensionType.canBuyByAmount?.(
                                            this.boughtExtensionsAmountByType,
                                            maxExtensionsFunctionResults[
                                                buildingTypeId
                                            ][index]
                                        );

                                    const canBuy =
                                        allRequiredExtensionsBought ??
                                        canBuyByAmount ??
                                        true;

                                    const available =
                                        boughtExtension?.available ?? false;
                                    const availableAt =
                                        boughtExtension &&
                                        !boughtExtension.available
                                            ? boughtExtension.available_at
                                            : '';
                                    const canBeAborted =
                                        availableAt === availableAtSorted[0];

                                    const countdownId =
                                        this.rootStore.nodeAttribute(
                                            `buildingComplexes-extensions-${buildingId}-${index}-countdown`,
                                            true
                                        );

                                    return {
                                        allianceBuilding: alliance,
                                        buildingId,
                                        buildingName,
                                        name: extensionType.caption,
                                        type: index,
                                        ...(boughtExtension
                                            ? {
                                                  bought: true,
                                                  ...(available
                                                      ? { available }
                                                      : {
                                                            available,
                                                            availableAt,
                                                            availableAtReadable:
                                                                this.moment(
                                                                    availableAt
                                                                ).calendar(),
                                                            canBeAborted,
                                                            countdownId,
                                                            initCountdown: () =>
                                                                this.$utils.countdown(
                                                                    countdownId,
                                                                    Math.floor(
                                                                        (new Date(
                                                                            availableAt
                                                                        ).getTime() -
                                                                            Date.now()) /
                                                                            1000
                                                                    ),
                                                                    true
                                                                ),
                                                        }),
                                                  enabled:
                                                      boughtExtension.enabled,
                                                  canToggle:
                                                      !extensionType.cannotDisable,
                                              }
                                            : {
                                                  ...(canBuy
                                                      ? {
                                                            canBuy: true,
                                                        }
                                                      : {
                                                            canBuy: false,
                                                            requirements: [
                                                                ...(requiredExtensions?.map(
                                                                    id =>
                                                                        buildingType
                                                                            .extensions[
                                                                            id
                                                                        ]
                                                                            ?.caption ??
                                                                        ''
                                                                ) ?? []),
                                                                ...(canBuyByAmount ||
                                                                typeof canBuyByAmount ===
                                                                    'undefined'
                                                                    ? []
                                                                    : [
                                                                          this.$mc(
                                                                              'overview.extensions.limit',
                                                                              maxExtensionsFunctionResults[
                                                                                  buildingTypeId
                                                                              ][
                                                                                  index
                                                                              ]
                                                                          ).toString(),
                                                                      ]),
                                                            ],
                                                        }),
                                                  duration:
                                                      extensionType.duration,
                                                  credits:
                                                      extensionType.credits,
                                                  coins: extensionType.coins,
                                                  enoughCredits:
                                                      (alliance
                                                          ? this.apiStore
                                                                .allianceinfo
                                                                ?.credits_current ??
                                                            0
                                                          : this.rootStore
                                                                .credits) >=
                                                      extensionType.credits,
                                                  enoughCoins:
                                                      this.rootStore.coins >=
                                                      extensionType.coins,
                                              }),
                                    };
                                }
                            )
                            .filter(removeNull) ?? []
                    );
                }
            );
        },
        filteredExtensions() {
            return (
                this.extensionsTable.search
                    ? this.extensions.filter(extension =>
                          JSON.stringify(Object.values(extension))
                              .toLowerCase()
                              .includes(
                                  this.extensionsTable.search.toLowerCase()
                              )
                      )
                    : this.extensions
            ).filter(extension => {
                if (
                    this.extensionsTable.filters.extensionNames !== 'all' &&
                    !this.extensionsTable.filters.extensionNames.includes(
                        extension.name
                    )
                )
                    return false;
                if (
                    this.extensionsTable.filters.buildings !== 'all' &&
                    !this.extensionsTable.filters.buildings.includes(
                        extension.buildingId
                    )
                )
                    return false;
                if (this.extensionsTable.filters.states !== 'all') {
                    return (
                        (this.extensionsTable.filters.states.includes(
                            'canBuy'
                        ) &&
                            'canBuy' in extension &&
                            extension.canBuy) ||
                        (this.extensionsTable.filters.states.includes(
                            'cannotBuy'
                        ) &&
                            'canBuy' in extension &&
                            !extension.canBuy) ||
                        (this.extensionsTable.filters.states.includes(
                            'disabled'
                        ) &&
                            !this.extensionsTable.filters.states.includes(
                                'canToggle'
                            ) &&
                            !this.extensionsTable.filters.states.includes(
                                'cannotToggle'
                            ) &&
                            'bought' in extension &&
                            !extension.enabled) ||
                        (this.extensionsTable.filters.states.includes(
                            'disabled'
                        ) &&
                            this.extensionsTable.filters.states.includes(
                                'canToggle'
                            ) &&
                            'bought' in extension &&
                            !extension.enabled &&
                            extension.canToggle) ||
                        (this.extensionsTable.filters.states.includes(
                            'disabled'
                        ) &&
                            this.extensionsTable.filters.states.includes(
                                'cannotToggle'
                            ) &&
                            'bought' in extension &&
                            !extension.enabled &&
                            !extension.canToggle) ||
                        (this.extensionsTable.filters.states.includes(
                            'enabled'
                        ) &&
                            !this.extensionsTable.filters.states.includes(
                                'canToggle'
                            ) &&
                            !this.extensionsTable.filters.states.includes(
                                'cannotToggle'
                            ) &&
                            'bought' in extension &&
                            extension.enabled &&
                            extension.available) ||
                        (this.extensionsTable.filters.states.includes(
                            'enabled'
                        ) &&
                            this.extensionsTable.filters.states.includes(
                                'canToggle'
                            ) &&
                            'bought' in extension &&
                            extension.enabled &&
                            extension.available &&
                            extension.canToggle) ||
                        (this.extensionsTable.filters.states.includes(
                            'enabled'
                        ) &&
                            this.extensionsTable.filters.states.includes(
                                'cannotToggle'
                            ) &&
                            'bought' in extension &&
                            extension.enabled &&
                            extension.available &&
                            !extension.canToggle) ||
                        (this.extensionsTable.filters.states.includes(
                            'underConstruction'
                        ) &&
                            'bought' in extension &&
                            !extension.available) ||
                        (this.extensionsTable.filters.states.includes(
                            'canToggle'
                        ) &&
                            !this.extensionsTable.filters.states.includes(
                                'enabled'
                            ) &&
                            !this.extensionsTable.filters.states.includes(
                                'disabled'
                            ) &&
                            'bought' in extension &&
                            extension.available &&
                            extension.canToggle) ||
                        (this.extensionsTable.filters.states.includes(
                            'cannotToggle'
                        ) &&
                            !this.extensionsTable.filters.states.includes(
                                'enabled'
                            ) &&
                            !this.extensionsTable.filters.states.includes(
                                'disabled'
                            ) &&
                            'bought' in extension &&
                            extension.available &&
                            !extension.canToggle)
                    );
                }

                return true;
            });
        },
        sortedExtensions() {
            const getActionsNumber = (
                extension: AttributedExtension
            ): number => {
                const min = Number.MIN_SAFE_INTEGER / 2;
                if ('bought' in extension) {
                    if (!extension.available)
                        return -new Date(extension.availableAt).getTime();
                    const toggleBonus = extension.canToggle ? 0 : 1;
                    if (extension.enabled) return min - toggleBonus;
                    return min - 2 - toggleBonus;
                }
                return extension.credits;
            };

            return [...this.filteredExtensions].sort(
                (extensionA, extensionB) => {
                    let result: number;
                    if (this.extensionsTable.sort === 'actions') {
                        result =
                            getActionsNumber(extensionA) -
                            getActionsNumber(extensionB);
                    } else {
                        result = extensionA[
                            this.extensionsTable.sort
                        ].localeCompare(extensionB[this.extensionsTable.sort]);
                    }

                    if (this.extensionsTable.sortDir === 'desc') result *= -1;

                    return result;
                }
            );
        },
        extensionsAvailableCount() {
            return this.extensions.filter(
                extension =>
                    'bought' in extension &&
                    extension.bought &&
                    extension.available
            ).length;
        },
        extensionsUnderConstructionCount() {
            return this.extensions.filter(
                extension =>
                    'bought' in extension &&
                    extension.bought &&
                    !extension.available
            ).length;
        },
        extensionsCanBuyCount() {
            return this.extensions.filter(
                extension => 'canBuy' in extension && extension.canBuy
            ).length;
        },
        extensionsFilterNamesValue() {
            return this.extensionsTable.filters.extensionNames === 'all'
                ? ['*']
                : [...this.extensionsTable.filters.extensionNames];
        },
        extensionsFilterNamesOptions() {
            return [
                ...(this.extensionsTable.filters.extensionNames === 'all'
                    ? []
                    : [
                          {
                              label: this.$m(
                                  'overview.extensions.filter.all'
                              ).toString(),
                              value: '*',
                          },
                      ]),
                ...[...new Set(this.extensions.map(({ name }) => name))]
                    .sort((extensionA, extensionB) =>
                        extensionA.localeCompare(extensionB)
                    )
                    .map(extension => ({ label: extension, value: extension })),
            ];
        },
        extensionsFilterBuildingsValue() {
            return this.extensionsTable.filters.buildings === 'all'
                ? ['*']
                : [...this.extensionsTable.filters.buildings];
        },
        extensionsFilterBuildingsOptions() {
            return [
                ...(this.extensionsTable.filters.buildings === 'all'
                    ? []
                    : ([
                          {
                              label: this.$m(
                                  'overview.extensions.filter.all'
                              ).toString(),
                              value: '*',
                          },
                      ] as [{ label: string; value: '*' }])),
                ...[
                    ...new Set(
                        this.extensions.map(({ buildingId }) => buildingId)
                    ),
                ]
                    .map(buildingId => ({
                        label: (
                            this.buildings[buildingId] ??
                            this.allianceBuildings[buildingId]
                        ).caption,
                        value: buildingId,
                    }))
                    .sort((buildingA, buildingB) =>
                        buildingA.label.localeCompare(buildingB.label)
                    ),
            ];
        },
        extensionsFilterStatesValue() {
            return this.extensionsTable.filters.states === 'all'
                ? ['*']
                : [...this.extensionsTable.filters.states];
        },
        extensionsFilterStatesOptions() {
            return [
                ...(this.extensionsTable.filters.states === 'all'
                    ? []
                    : ([
                          {
                              label: this.$m(
                                  'overview.extensions.filter.all'
                              ).toString(),
                              value: '*',
                          },
                      ] as [{ label: string; value: '*' }])),
                ...(
                    [
                        'canBuy',
                        'cannotBuy',
                        'canToggle',
                        'cannotToggle',
                        'disabled',
                        'enabled',
                        'underConstruction',
                    ] as ExtensionStateFilters[]
                )
                    .map(state => ({
                        label: this.$m(
                            `overview.extensions.filter.${state}`
                        ).toString(),
                        value: state,
                    }))
                    .sort((stateA, stateB) =>
                        stateA.label.localeCompare(stateB.label)
                    ),
            ];
        },
        userHasAllianceFinanceRights() {
            const allianceUserRoleFlags =
                this.apiStore.allianceinfo?.users.find(
                    ({ id }) => id === window.user_id
                )?.role_flags;
            return !!(
                allianceUserRoleFlags?.admin || allianceUserRoleFlags?.finance
            );
        },
        schoolings() {
            return this.allSchoolings.filter(
                ({ building_id }) =>
                    building_id &&
                    (this.complex.buildings.includes(building_id.toString()) ||
                        this.complex.allianceBuildings.includes(
                            building_id.toString()
                        ))
            );
        },
        schoolingBuildings() {
            return this.classroomBuildings.map(building => {
                const classroomsAvailable =
                    building.classrooms - building.classRoomsUnavailable;
                const schoolings = this.schoolings
                    .filter(({ building_id }) => building_id === building.id)
                    .map(schooling => {
                        const countdownId = this.rootStore.nodeAttribute(
                            `buildingComplex-schoolings-countdown-${schooling.id}`,
                            true
                        );
                        return {
                            ...schooling,
                            countdownId,
                            initCountdown: () =>
                                this.$utils.countdown(
                                    countdownId,
                                    Math.floor(
                                        (new Date(
                                            schooling.finish_time
                                        ).getTime() -
                                            Date.now()) /
                                            1000
                                    )
                                ),
                        };
                    })
                    .sort(
                        (a, b) =>
                            new Date(a.finish_time).getTime() -
                            new Date(b.finish_time).getTime()
                    );
                return {
                    ...building,
                    schoolings,
                    classroomsAvailable,
                    freeClassrooms: classroomsAvailable - schoolings.length,
                };
            });
        },
        classroomStats() {
            const stats = { total: 0, unavailable: 0, free: 0 };
            this.schoolingBuildings.forEach(
                ({ classrooms, classRoomsUnavailable, freeClassrooms }) => {
                    stats.total += classrooms;
                    stats.unavailable += classRoomsUnavailable;
                    stats.free += freeClassrooms;
                }
            );
            return stats;
        },
        filteredProtocol() {
            return this.protocolTable.search
                ? this.protocol.filter(entry =>
                      JSON.stringify(Object.values(entry))
                          .toLowerCase()
                          .includes(this.protocolTable.search.toLowerCase())
                  )
                : this.protocol;
        },
        sortedProtocol() {
            return [...this.filteredProtocol].sort((entryA, entryB) => {
                // Workaround for TypeScript <3
                const getSortValue = (entry: ProtocolEntry) => {
                    switch (this.protocolTable.sort) {
                        case 'building':
                            return entry.building.name;
                        case 'label':
                            return `${entry.label?.color}-${entry.label?.text}`;
                        case 'staff':
                            return Object.values(entry.staff)
                                .map(s => s.length)
                                .reduce((a, b) => a + b, 0);
                        case 'time':
                            return entry.time.timestamp;
                        case 'title':
                            return entry.text;
                    }
                };
                const attributeA = getSortValue(entryA);
                const attributeB = getSortValue(entryB);

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

                if (this.protocolTable.sortDir === 'desc') result *= -1;

                return result;
            });
        },
    },
    methods: {
        selectTab(event, index) {
            this.$set(
                this,
                'currentBuildingId',
                this.sortedBuildingIdsByName[index - 1]
            );
            if (!index) this.selectOverviewTab(event, 0);
        },
        selectOverviewTab(event, index) {
            this.currentOverviewTab = index;
            (async () => {
                switch (index) {
                    case this.overviewTabs.classrooms:
                        return this.apiStore
                            .getSchoolings('buildingComplex')
                            .then(() =>
                                this.apiStore.getAllianceSchoolings(
                                    'buildingComplex'
                                )
                            )
                            .then(() => this.$nextTick())
                            .then(() => this.initSchoolingCountdowns());
                    case this.overviewTabs.buildings:
                        return this.apiStore.getBuildings('buildingComplex');
                    case this.overviewTabs.extensions:
                        return this.apiStore
                            .getBuildings('buildingComplex')
                            .then(() => this.$nextTick())
                            .then(() => this.initExtensionCountdowns());
                    case this.overviewTabs.vehicles:
                        return this.apiStore.getBuildings('buildingComplex');
                    case this.overviewTabs.protocol:
                        return this.updateProtocol();
                }
            })()
                .then(() => this.$nextTick())
                .then(() => {
                    const tab = Object.entries(this.overviewTabs).find(
                        ([, i]) => i === index
                    )?.[0];
                    if (tab) {
                        useEventStore().createAndDispatchEvent({
                            name: 'buildingComplex-opened-overview-tab',
                            detail: tab,
                        });
                    }
                });
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
                    allOtherAttachedAllianceBuildings:
                        this.allAttachedAllianceBuildings.filter(
                            building =>
                                !this.complex.allianceBuildings.includes(
                                    building
                                )
                        ),
                    complexLocations: this.complexLocations,
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
        toggleVehicleFMS(vehicle) {
            if (![2, 6].includes(vehicle.fms_real)) return;
            const targetFMS = vehicle.fms_real === 2 ? 6 : 2;
            const feature = 'buildingComplex-setFMS';
            this.apiStore
                .request({
                    url: `/vehicles/${vehicle.id}/set_fms/${targetFMS}`,
                    feature,
                })
                .then(() => this.apiStore.getVehicle(vehicle.id, feature));
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
        setSortExtensionsTable(sort) {
            const s = sort;
            this.extensionsTable.sortDir =
                s === this.extensionsTable.sort &&
                this.extensionsTable.sortDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.extensionsTable.sort = s;
        },
        setSortProtocolTable(sort) {
            const s = sort;
            this.protocolTable.sortDir =
                s === this.protocolTable.sort &&
                this.protocolTable.sortDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.protocolTable.sort = s;
        },
        initExtensionCountdowns() {
            if (this.currentOverviewTab !== this.overviewTabs.extensions)
                return;
            this.filteredExtensions.forEach(
                extension =>
                    'bought' in extension &&
                    !extension.available &&
                    extension.initCountdown()
            );
        },
        buyExtension(
            buildingId,
            extensionType,
            method,
            price,
            allianceBuilding
        ) {
            this.tempDisableAllExtensionButtons = true;
            const url = new URL('/', window.location.origin);
            url.searchParams.append('_method', 'post');
            url.searchParams.append(
                'authenticity_token',
                document.querySelector<HTMLMetaElement>(
                    'meta[name="csrf-token"]'
                )?.content ?? ''
            );
            const feature = 'buildingComplexes-build-extension';
            this.apiStore
                .request({
                    url: `/buildings/${buildingId}/extension/${method}/${extensionType}?redirect_building_id=${buildingId}`,
                    init: {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: `/buildings/${buildingId}`,
                        method: 'POST',
                        body: url.searchParams.toString(),
                    },
                    feature,
                })
                .then(() =>
                    this.apiStore[
                        allianceBuilding ? 'getAllianceBuilding' : 'getBuilding'
                    ](buildingId, feature)
                )
                .then(() => {
                    this.tempDisableAllExtensionButtons = false;
                    if (method === 'credits')
                        window.creditsUpdate(this.rootStore.credits - price);
                    else window.coinsUpdate(this.rootStore.coins - price);
                });
        },
        toggleExtension(buildingId, extensionType) {
            this.tempDisableAllExtensionButtons = true;
            const url = new URL('/', window.location.origin);
            url.searchParams.append('_method', 'post');
            url.searchParams.append(
                'authenticity_token',
                document.querySelector<HTMLMetaElement>(
                    'meta[name="csrf-token"]'
                )?.content ?? ''
            );
            const feature = 'buildingComplexes-toggle-extension';
            this.apiStore
                .request({
                    url: `/buildings/${buildingId}/extension_ready/${extensionType}/${buildingId}`,
                    init: {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: `/buildings/${buildingId}`,
                        method: 'POST',
                        body: url.searchParams.toString(),
                    },
                    feature,
                })
                .then(() => this.apiStore.getBuilding(buildingId, feature))
                .then(() => {
                    this.tempDisableAllExtensionButtons = false;
                });
        },
        updateExtensionsFilterNames(names) {
            if (names.indexOf('*') === names.length - 1 || !names.length) {
                this.extensionsTable.filters.extensionNames = 'all';
            } else {
                this.extensionsTable.filters.extensionNames = names.filter(
                    name => name !== '*'
                );
            }
        },
        updateExtensionsFilterBuildings(buildings) {
            if (
                buildings.indexOf('*') === buildings.length - 1 ||
                !buildings.length
            ) {
                this.extensionsTable.filters.buildings = 'all';
            } else {
                const removeAllElement = <S,>(
                    building: S | '*'
                ): building is S => building !== '*';
                this.extensionsTable.filters.buildings =
                    buildings.filter(removeAllElement);
            }
        },
        updateExtensionsFilterStates(states) {
            if (states.indexOf('*') === states.length - 1 || !states.length) {
                this.extensionsTable.filters.states = 'all';
            } else {
                const removeAllElement = <S,>(state: S | '*'): state is S =>
                    state !== '*';
                this.extensionsTable.filters.states =
                    states.filter(removeAllElement);
            }
            this.$nextTick().then(this.initExtensionCountdowns);
        },
        initSchoolingCountdowns() {
            if (this.currentOverviewTab !== this.overviewTabs.classrooms)
                return;
            this.schoolingBuildings.forEach(({ schoolings }) =>
                schoolings.forEach(schooling => schooling.initCountdown())
            );
        },
        updateProtocol() {
            const dispatchCenterTypes =
                this.translationStore.dispatchCenterBuildings;
            const dispatchCenterBuilding = this.apiStore.buildings.find(
                ({ building_type }) =>
                    dispatchCenterTypes.includes(building_type)
            );
            if (!dispatchCenterBuilding) return;
            if (this.protocolDeletionTimeout)
                window.clearTimeout(this.protocolDeletionTimeout);
            this.protocolDeletionTimeout = window.setTimeout(() => {
                this.protocolUpdating = true;
                this.apiStore
                    .request({
                        url: `/buildings/${dispatchCenterBuilding.id}/leitstelle-protocol`,
                        feature: 'buildingComplex',
                    })
                    .then(res => res.text())
                    .then(html => {
                        const protocolDocument =
                            new DOMParser().parseFromString(html, 'text/html');
                        const attachedBuildingsSelector = [
                            ...this.complex.buildings,
                            ...this.complex.allianceBuildings,
                        ]
                            .map(
                                buildingId =>
                                    `a[href="/buildings/${buildingId}"]`
                            )
                            .join(', ');
                        const protocolEntries: ProtocolEntry[] = [];
                        protocolDocument
                            .querySelectorAll<HTMLTableRowElement>(
                                '#protocol_table tbody tr'
                            )
                            .forEach(row => {
                                if (
                                    !row.querySelector(
                                        attachedBuildingsSelector
                                    )
                                )
                                    return;
                                const label =
                                    row.querySelector<HTMLSpanElement>(
                                        'td:nth-child(2) .label'
                                    );
                                const buildingEl =
                                    row.querySelector<HTMLAnchorElement>(
                                        'td:nth-child(4) a'
                                    );
                                const staff: Record<number, string[]> = {};
                                row.querySelectorAll<HTMLLIElement>(
                                    'td:nth-child(5) ul li'
                                ).forEach(staffLi => {
                                    const name = Array.from(staffLi.childNodes)
                                        .filter(
                                            node =>
                                                node.nodeType === Node.TEXT_NODE
                                        )
                                        .map(
                                            node =>
                                                node.textContent
                                                    ?.trim()
                                                    .replace(/^-|\.$/gu, '')
                                                    .trim()
                                        )
                                        .join(' ');
                                    const buildingId = parseInt(
                                        staffLi
                                            .querySelector<HTMLAnchorElement>(
                                                'a'
                                            )
                                            ?.href.match(/\d+$/u)?.[0] ?? '-1'
                                    );
                                    if (!staff.hasOwnProperty(buildingId))
                                        staff[buildingId] = [];
                                    staff[buildingId].push(name);
                                });
                                protocolEntries.push({
                                    id: parseInt(
                                        row.id.match(/\d+$/u)?.[0] ?? '-1'
                                    ),
                                    dispatchId: dispatchCenterBuilding.id,
                                    time: {
                                        timestamp: new Date(
                                            row.dataset.logTime ?? -1
                                        ).getTime(),
                                        text: this.moment(
                                            row.dataset.logTime ?? -1
                                        ).format('ddd, DD.MM LT'),
                                    },
                                    label: label
                                        ? {
                                              color:
                                                  label.classList
                                                      .toString()
                                                      .match(
                                                          /danger|default|info|link|success|warning/u
                                                      )?.[0]
                                                      .toString() ?? 'default',
                                              text:
                                                  label.textContent?.trim() ??
                                                  '',
                                          }
                                        : undefined,
                                    text:
                                        row.children[2].textContent?.trim() ??
                                        '',
                                    building: {
                                        id: parseInt(
                                            buildingEl?.href.match(
                                                /\d+$/u
                                            )?.[0] ?? '-1'
                                        ),
                                        name:
                                            buildingEl?.textContent?.trim() ??
                                            '',
                                    },
                                    staff,
                                });
                            });
                        this.protocol = protocolEntries;
                        this.protocolUpdating = false;
                    });
            }, 100);
        },
        deleteProtocolEntry(id, dispatchId) {
            this.protocolDeletions.push(id);
            this.apiStore
                .request({
                    url: `/buildings/${dispatchId}/leitstelle-protocol-delete?protocol_id=${id}`,
                    feature: 'buildingComplex',
                })
                .then(() => {
                    this.protocol.splice(
                        this.protocol.findIndex(p => p.id === id),
                        1
                    );
                    this.updateProtocol();
                    this.protocolDeletions.splice(
                        this.protocolDeletions.indexOf(id),
                        1
                    );
                });
        },
        deleteAllProtocolEntries() {
            this.protocol.forEach(({ id, dispatchId }) =>
                this.deleteProtocolEntry(id, dispatchId)
            );
        },
        toggleInCellOptions($event) {
            const target = $event.target;
            if (
                !(target instanceof HTMLElement) &&
                !(target instanceof SVGElement)
            )
                return;
            target
                .closest<HTMLButtonElement>('.in-cell-toggle-btn')
                ?.parentElement?.querySelector<HTMLDivElement>(
                    '.in-cell-toggle-btn + div'
                )
                ?.classList.toggle('hidden');
        },
        toggleAllianceShare(buildingId) {
            const feature = 'buildingComplex-toggle-alliance-share';
            this.apiStore
                .request({
                    url: `/buildings/${buildingId}/alliance`,
                    feature,
                })
                .then(() => this.apiStore.getBuilding(buildingId, feature));
        },
        setAllianceTax(buildingId, tax) {
            const feature = 'buildingComplex-toggle-alliance-set-tax';
            this.apiStore
                .request({
                    url: `/buildings/${buildingId}/alliance_costs/${tax}`,
                    feature,
                })
                .then(() => this.apiStore.getBuilding(buildingId, feature));
        },
        openAvailableSchool() {
            const buildingId = this.schoolingBuildings.find(
                building => building.freeClassrooms
            )?.id;
            if (buildingId) window.lightboxOpen(`/buildings/${buildingId}`);
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
        allAttachedAllianceBuildings: {
            type: Array,
            required: true,
        },
        complexLocations: {
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
    beforeMount() {
        this.moment.locale(useRootStore().locale);
        this.apiStore.getBuildings('buildingComplex');
    },
    mounted() {
        this.$set(this, 'currentBuildingId', this.sortedBuildingIdsByName[-1]);
        this.apiStore.$subscribe(() =>
            this.$nextTick().then(() => this.initSchoolingCountdowns())
        );
        this.selectOverviewTab(new MouseEvent('click'), 0);
    },
});
</script>

<style scoped lang="sass">
#complex-overview
    height: 100%
    display: flex
    flex-flow: column

    :deep(.vue-tabs)
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

    .summary-icon
        color: white
        cursor: pointer

    .indented-title
        text-indent: -0.5em
        padding-left: 0.5em

    .building_list_fms_2,
    .building_list_fms_6
        cursor: pointer

    .extensions-filter
        flex-grow: 1
        display: flex
        flex-flow: row
        justify-content: end

        > div
            flex-grow: 1
            margin-right: 1em

    .extension-toggle
        margin-left: 1rem

    .extensions-alliance-funds-label
        margin-right: 0.5rem

    ul.requirements-list li
        &:first-child
            margin-left: -1em
            font-weight: bold

        &:not(:first-child)
            list-style: unset !important

.summary-alert
    position: fixed
    top: calc(2% + 1rem)
    right: calc(2% + 1rem)
    z-index: 1
    max-height: calc(96% - 2rem)
    overflow: auto

    > ul
        padding-left: 0
        list-style: none
        margin-right: 1em

    .close
        opacity: 1
        color: white

.classrooms-table
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr))
    grid-gap: 1em

.protocol-update-info
    font-size: small

.protocol-staff-list
    &,
    & li
        list-style: none
</style>
