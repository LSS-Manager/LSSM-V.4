<template>
    <div>
        <h1>
            {{ vehicle.vehicle_name }}
            <img :src="vehicle.image" alt="" class="vehicle-img" />
        </h1>
        <div class="vehicle-window">
            <div>
                <div class="well">
                    <span
                        v-if="hospitalListSrc > 0 && vehicle.load_all_hospitals"
                        class="pull-right"
                    >
                        {{ lightbox.$sm('load_all_hospitals.text') }}
                        <button
                            class="btn btn-default btn-xs pull-right"
                            @click="loadAllHospitals"
                        >
                            {{ lightbox.$sm('load_all_hospitals.btn') }}
                        </button>
                    </span>
                    <table class="table">
                        <tbody>
                            <tr v-if="vehicle.user">
                                <th>{{ lightbox.$sm('owner') }}</th>
                                <td colspan="2">
                                    <a :href="`/profile/${vehicle.user.id}`">
                                        <img
                                            :src="
                                                `/images/user_${
                                                    vehicle.user.online
                                                        ? 'green'
                                                        : 'gray'
                                                }.png`
                                            "
                                            :alt="
                                                lightbox.$sm(
                                                    vehicle.user.online
                                                        ? 'online'
                                                        : 'offline',
                                                    { user: vehicle.user.name }
                                                )
                                            "
                                        />
                                        {{ vehicle.user.name }}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>{{ lightbox.$sm('station') }}</th>
                                <td :colspan="vehicle.can_move ? 1 : 2">
                                    <a
                                        :href="
                                            `/buildings/${vehicle.building.id}`
                                        "
                                    >
                                        {{ vehicle.building.caption }}
                                    </a>
                                </td>
                                <td v-if="vehicle.can_move">
                                    <a
                                        :href="`/vehicles/${vehicle.id}/move`"
                                        class="btn btn-default btn-xs"
                                    >
                                        {{ lightbox.$sm('move') }}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>{{ lightbox.$sm('vehicletype') }}</th>
                                <td>
                                    {{ vehicle.vehicle_type.caption }}
                                </td>
                                <td>
                                    <a
                                        :href="
                                            `/fahrzeugfarbe/${
                                                vehicle.vehicle_type.id
                                            }${
                                                vehicle.vehicle_type.custom
                                                    ? `?vehicle_type_caption=${vehicle.vehicle_type.caption}`
                                                    : ''
                                            }`
                                        "
                                        class="btn btn-default btn-xs"
                                        :title="lightbox.$sm('color')"
                                        lightbox-open
                                    >
                                        <font-awesome-icon
                                            :icon="faPalette"
                                        ></font-awesome-icon>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>{{ lightbox.$sm('fms') }}</th>
                                <td>
                                    <span
                                        class="building_list_fms"
                                        :class="
                                            `building_list_fms_${vehicle.fms}`
                                        "
                                    >
                                        {{
                                            $i18n.t('fmsReal2Show')[vehicle.fms]
                                        }}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        v-if="
                                            vehicle.current_mission &&
                                                !vehicle.user
                                        "
                                        class="btn btn-default btn-xs"
                                        @click="backalarm"
                                    >
                                        {{ lightbox.$sm('backalarm') }}
                                    </button>
                                    <button
                                        v-if="
                                            (vehicle.fms === 2 ||
                                                vehicle.fms === 6) &&
                                                !vehicle.user
                                        "
                                        class="btn btn-default btn-xs"
                                        @click="switch_state"
                                    >
                                        {{
                                            lightbox.$sm(
                                                `fms_switch.is_s${vehicle.fms}`
                                            )
                                        }}
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th>{{ lightbox.$sm('max_staff') }}</th>
                                <td colspan="2">
                                    {{ vehicle.max_staff }}
                                </td>
                            </tr>
                            <tr v-if="vehicle.patient_releaseable">
                                <th></th>
                                <td colspan="2">
                                    <button
                                        @click="release('patient')"
                                        class="btn btn-default btn-xs btn-sm"
                                    >
                                        {{ lightbox.$sm('release_patient') }}
                                    </button>
                                </td>
                            </tr>
                            <tr v-else-if="vehicle.prisoners_releaseable">
                                <th></th>
                                <td colspan="2">
                                    <button
                                        @click="release('prisoner')"
                                        class="btn btn-default btn-xs btn-sm"
                                    >
                                        {{ lightbox.$sm('release_prisoner') }}
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="vehicle.water_amount">
                                <th>{{ lightbox.$sm('water_amount') }}</th>
                                <td colspan="2">
                                    {{ vehicle.water_amount }}
                                </td>
                            </tr>
                            <tr>
                                <th>{{ lightbox.$sm('mileage') }}</th>
                                <td colspan="2">
                                    {{ vehicle.mileage }}
                                </td>
                            </tr>
                            <tr v-if="vehicle.current_mission">
                                <th>{{ lightbox.$sm('current_mission') }}</th>
                                <td colspan="2">
                                    <a
                                        :href="
                                            `/missions/${vehicle.current_mission.id}`
                                        "
                                    >
                                        {{ vehicle.current_mission.caption }}
                                    </a>
                                </td>
                            </tr>
                            <tr v-if="vehicle.followup_missions.length">
                                <th>
                                    {{
                                        lightbox.$smc(
                                            'followup_missions',
                                            vehicle.followup_missions.length
                                        )
                                    }}
                                </th>
                                <td colspan="2">
                                    <ul>
                                        <li
                                            v-for="mission in vehicle.followup_missions"
                                            :key="mission.id"
                                        >
                                            <a
                                                :href="
                                                    `/missions/${mission.id}`
                                                "
                                            >
                                                {{ mission.caption }}
                                            </a>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr v-if="Object.keys(vehicle.staff).length">
                                <th>{{ lightbox.$sm('staff.title') }}</th>
                                <td colspan="2">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    {{
                                                        lightbox.$sm(
                                                            'staff.name'
                                                        )
                                                    }}
                                                </th>
                                                <th>
                                                    {{
                                                        lightbox.$sm(
                                                            'staff.schooling'
                                                        )
                                                    }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(schooling,
                                                name,
                                                index) in vehicle.staff"
                                                :key="index"
                                            >
                                                <td>{{ name }}</td>
                                                <td>{{ schooling }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn-group pull-right" v-if="!vehicle.user">
                    <a
                        :href="`/vehicles/${vehicle.id}/edit`"
                        class="btn btn-default"
                        :title="lightbox.$sm('edit')"
                    >
                        <font-awesome-icon :icon="faEdit"></font-awesome-icon>
                    </a>
                    <a
                        :href="`/vehicles/${vehicle.id}/stats`"
                        class="btn btn-default"
                        :title="lightbox.$sm('stats')"
                    >
                        <font-awesome-icon
                            :icon="faChartLine"
                        ></font-awesome-icon>
                    </a>
                    <a
                        :href="`/vehicles/${vehicle.id}/zuweisung`"
                        class="btn btn-default"
                        :title="lightbox.$sm('zuweisung')"
                    >
                        <font-awesome-icon :icon="faUsers"></font-awesome-icon>
                        {{ lightbox.$sm('zuweisung') }}
                    </a>

                    <button
                        class="btn btn-danger"
                        @click="deleteVehicle"
                        v-if="vehicle.fms === 2"
                        :title="lightbox.$sm('delete.button')"
                    >
                        <font-awesome-icon :icon="faTrash"></font-awesome-icon>
                    </button>
                </div>
            </div>
            <div
                v-if="
                    !vehicle.user &&
                        !vehicle.has_hospitals &&
                        !vehicle.has_cells &&
                        !vehicle.has_wlfs &&
                        missionList.length
                "
                class="table-tabs"
            >
                <tabs :on-select="setMissionList" ref="tabs">
                    <tab
                        v-for="group in ['own', 'alliance', 'all']"
                        :title="
                            lightbox.$sm(`tabs.${group}`, {
                                type: lightbox.$sm('tabs.missions'),
                                amount: (group === 'own'
                                    ? vehicle.mission_own.length
                                    : group === 'alliance'
                                    ? vehicle.mission_alliance.length
                                    : missionList.length
                                ).toLocaleString(),
                            })
                        "
                        :key="group"
                    ></tab>
                </tabs>
                <enhanced-table
                    :head="mission_head"
                    :table-attrs="{
                        class: {
                            'table': true,
                            'table-striped':
                                missionListFiltered.filter(
                                    ({ hidden }) => !hidden
                                ).length === missionList.length,
                        },
                    }"
                    :search="search"
                    @search="setSearch"
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                >
                    <template v-slot:head>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.missions.status.title')
                            }}</label>
                            <multi-select
                                name="mission_status"
                                :placeholder="
                                    lightbox.$sm('filter.missions.status.title')
                                "
                                v-model="filter.mission.status"
                                :options="[
                                    {
                                        value: 'red',
                                        label: lightbox.$sm(
                                            'filter.missions.status.red'
                                        ),
                                    },
                                    {
                                        value: 'yellow',
                                        label: lightbox.$sm(
                                            'filter.missions.status.yellow'
                                        ),
                                    },
                                    {
                                        value: 'green',
                                        label: lightbox.$sm(
                                            'filter.missions.status.green'
                                        ),
                                    },
                                ]"
                                @input="
                                    updateFilter(
                                        'mission.status',
                                        filter.mission.status
                                    )
                                "
                            ></multi-select>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm(
                                    'filter.missions.participation.title'
                                )
                            }}</label>
                            <multi-select
                                name="mission_participation"
                                :placeholder="
                                    lightbox.$sm(
                                        'filter.missions.participation.title'
                                    )
                                "
                                v-model="filter.mission.participation"
                                :options="[
                                    {
                                        value: true,
                                        label: lightbox.$sm('true'),
                                    },
                                    {
                                        value: false,
                                        label: lightbox.$sm('false'),
                                    },
                                ]"
                                @input="
                                    updateFilter(
                                        'mission.participation',
                                        filter.mission.participation
                                    )
                                "
                            ></multi-select>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.missions.distance')
                            }}</label>
                            <settings-number
                                name="mission_distance"
                                :placeholder="
                                    lightbox.$sm('filter.missions.distance')
                                "
                                v-model="filter.mission.distance"
                                :min="0"
                                @input="
                                    updateFilter(
                                        'mission.distance',
                                        filter.mission.distance
                                    )
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.missions.credits')
                            }}</label>
                            <settings-number
                                name="mission_credits"
                                :placeholder="
                                    lightbox.$sm('filter.missions.credits')
                                "
                                v-model="filter.mission.credits"
                                :min="0"
                                @input="
                                    updateFilter(
                                        'mission.credits',
                                        filter.mission.credits
                                    )
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.missions.progress')
                            }}</label>
                            <settings-number
                                name="mission_progress"
                                :placeholder="
                                    lightbox.$sm('filter.missions.progress')
                                "
                                v-model="filter.mission.progress"
                                :min="0"
                                :max="100"
                                @input="
                                    updateFilter(
                                        'mission.progress',
                                        filter.mission.progress
                                    )
                                "
                            ></settings-number>
                        </div>
                    </template>
                    <tr
                        v-for="mission in missionListSorted"
                        :key="mission.id"
                        :class="{ hidden: mission.hidden }"
                    >
                        <td v-if="missionListSrc === 2">
                            <font-awesome-icon
                                :icon="
                                    mission.list === 'mission_own'
                                        ? faPortrait
                                        : faSitemap
                                "
                            ></font-awesome-icon>
                        </td>
                        <td>
                            <img
                                loading="lazy"
                                :src="mission.image"
                                :alt="mission.caption"
                            />
                        </td>
                        <td>
                            <font-awesome-icon
                                :icon="
                                    mission.participation ? faUser : faAsterisk
                                "
                            ></font-awesome-icon>
                        </td>
                        <td>
                            <a :href="`/missions/${mission.id}`">{{
                                mission.caption
                            }}</a>
                            <br />
                            <small>{{ mission.adress }}</small>
                        </td>
                        <td>{{ mission.distance }}</td>
                        <td>
                            <span
                                v-if="
                                    mission.credits !== Number.MAX_SAFE_INTEGER
                                "
                            >
                                ~
                                {{ mission.credits.toLocaleString() }}
                                Credits
                            </span>
                        </td>
                        <td>
                            <div class="progress">
                                <div
                                    class="progress-bar"
                                    :class="
                                        `progress-bar-${
                                            color2Class[mission.status]
                                        }`
                                    "
                                    :style="
                                        `width: ${mission.progress.width}%;`
                                    "
                                >
                                    <div
                                        class="progress-striped-inner"
                                        :class="{
                                            'progress-striped-inner-active':
                                                mission.progress.active,
                                        }"
                                    ></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ mission.patients.current }}
                            of
                            {{ mission.patients.total }}
                        </td>
                        <td>
                            <button
                                @click.prevent="alarm(mission.id)"
                                class="btn btn-success"
                            >
                                {{ lightbox.$sm('missions.alarm') }}
                            </button>
                            <br />
                            <span
                                class="label label-default"
                                v-if="
                                    vehicle.current_mission &&
                                        mission.id ===
                                            vehicle.current_mission.id
                                "
                            >
                                {{ lightbox.$sm('missions.alarmed') }}
                            </span>
                        </td>
                    </tr>
                </enhanced-table>
            </div>
            <div
                v-else-if="!vehicle.user && vehicle.has_hospitals"
                class="table-tabs"
            >
                <tabs :on-select="setHospitalList" ref="tabs">
                    <tab
                        v-for="group in ['own', 'alliance', 'all']"
                        :title="
                            lightbox.$sm(`tabs.${group}`, {
                                type: lightbox.$sm('tabs.hospitals'),
                                amount: (group === 'own'
                                    ? vehicle.own_hospitals.length
                                    : group === 'alliance'
                                    ? vehicle.alliance_hospitals.length
                                    : hospitalList.length
                                ).toLocaleString(),
                            })
                        "
                        :key="group"
                    ></tab>
                </tabs>
                <enhanced-table
                    :head="hospital_head"
                    :table-attrs="{
                        class: {
                            'table': true,
                            'table-striped':
                                hospitalListFiltered.filter(
                                    ({ hidden }) => !hidden
                                ).length === hospitalList.length,
                        },
                    }"
                    :search="search"
                    @search="setSearch"
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                >
                    <template v-slot:head>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.hospitals.each')
                            }}</label>
                            <settings-number
                                name="hospital_each"
                                :placeholder="
                                    lightbox.$sm('filter.hospitals.each')
                                "
                                v-model="filter.hospital.each"
                                :min="0"
                                @input="
                                    updateFilter(
                                        'hospital.each',
                                        filter.hospital.each
                                    )
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.hospitals.distance')
                            }}</label>
                            <settings-number
                                name="hospital_distance"
                                :placeholder="
                                    lightbox.$sm('filter.hospitals.distance')
                                "
                                v-model="filter.hospital.distance"
                                :min="0"
                                @input="
                                    updateFilter(
                                        'hospital.distance',
                                        filter.hospital.distance
                                    )
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.hospitals.beds')
                            }}</label>
                            <settings-number
                                name="hospital_beds"
                                :placeholder="
                                    lightbox.$sm('filter.hospitals.beds')
                                "
                                v-model="filter.hospital.beds"
                                :min="0"
                                :max="30"
                                @input="
                                    updateFilter(
                                        'hospital.beds',
                                        filter.hospital.beds
                                    )
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.hospitals.tax')
                            }}</label>
                            <settings-number
                                name="hospital_tax"
                                :placeholder="
                                    lightbox.$sm('filter.hospitals.tax')
                                "
                                v-model="filter.hospital.tax"
                                :min="0"
                                :max="50"
                                :step="10"
                                @input="
                                    updateFilter(
                                        'hospital.tax',
                                        filter.hospital.tax
                                    )
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm(
                                    'filter.hospitals.department.title',
                                    {
                                        department: vehicle.hospital_department,
                                    }
                                )
                            }}</label>
                            <multi-select
                                name="hospital_department"
                                :placeholder="
                                    lightbox.$sm(
                                        'filter.hospitals.department.title',
                                        {
                                            department:
                                                vehicle.hospital_department,
                                        }
                                    )
                                "
                                v-model="filter.hospital.department"
                                :options="[
                                    {
                                        value: true,
                                        label: lightbox.$sm('true'),
                                    },
                                    {
                                        value: false,
                                        label: lightbox.$sm('false'),
                                    },
                                ]"
                                @input="
                                    updateFilter(
                                        'hospital.department',
                                        filter.hospital.department
                                    )
                                "
                            ></multi-select>
                        </div>
                    </template>
                    <tr
                        v-for="hospital in hospitalListSorted"
                        :key="hospital.id"
                        :class="{ hidden: hospital.hidden }"
                    >
                        <td v-if="hospitalListSrc === 2">
                            <font-awesome-icon
                                :icon="
                                    hospital.list === 'own_hospitals'
                                        ? faPortrait
                                        : faSitemap
                                "
                            ></font-awesome-icon>
                        </td>
                        <td>
                            <a :href="`/buildings/${hospital.id}`">
                                {{ hospital.caption }}
                            </a>
                        </td>
                        <td>{{ hospital.distance }}</td>
                        <td>{{ hospital.beds }}</td>
                        <td v-if="hospitalListSrc">
                            {{ hospital.tax }}
                            %
                        </td>
                        <td>
                            <span
                                class="label"
                                :class="
                                    `label-${
                                        hospital.department
                                            ? 'success'
                                            : 'warning'
                                    }`
                                "
                            >
                                {{ lightbox.$sm(hospital.department) }}
                            </span>
                        </td>
                        <td>
                            <button
                                @click="
                                    fms(
                                        `/vehicles/${vehicle.id}/patient/${hospital.id}`
                                    )
                                "
                                class="btn"
                                :class="`btn-${hospital.state}`"
                                :disabled="hospital.state === 'danger'"
                            >
                                {{ lightbox.$sm('approach') }}
                            </button>
                        </td>
                    </tr>
                </enhanced-table>
            </div>
            <div
                v-else-if="!vehicle.user && vehicle.has_cells"
                class="table-tabs"
            >
                <tabs :on-select="setCellList" ref="tabs">
                    <tab
                        v-for="group in ['own', 'alliance', 'all']"
                        :title="
                            lightbox.$sm(`tabs.${group}`, {
                                type: lightbox.$sm('tabs.cells'),
                                amount: (group === 'own'
                                    ? vehicle.own_cells.length
                                    : group === 'alliance'
                                    ? vehicle.alliance_cells.length
                                    : cellList.length
                                ).toLocaleString(),
                            })
                        "
                        :key="group"
                    ></tab>
                </tabs>
                <enhanced-table
                    :head="cell_head"
                    :table-attrs="{
                        class: {
                            'table': true,
                            'table-striped':
                                cellListFiltered.filter(({ hidden }) => !hidden)
                                    .length === cellList.length,
                        },
                    }"
                    :search="search"
                    @search="setSearch"
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                >
                    <template v-slot:head>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.cells.each')
                            }}</label>
                            <settings-number
                                name="cell_each"
                                :placeholder="lightbox.$sm('filter.cells.each')"
                                v-model="filter.cell.each"
                                :min="0"
                                @input="
                                    updateFilter('cell.each', filter.cell.each)
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.cells.distance')
                            }}</label>
                            <settings-number
                                name="cell_distance"
                                :placeholder="
                                    lightbox.$sm('filter.cells.distance')
                                "
                                v-model="filter.cell.distance"
                                :min="0"
                                @input="
                                    updateFilter(
                                        'cell.distance',
                                        filter.cell.distance
                                    )
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.cells.free')
                            }}</label>
                            <settings-number
                                name="cell_free"
                                :placeholder="lightbox.$sm('filter.cells.free')"
                                v-model="filter.cell.free"
                                :min="0"
                                :max="10"
                                @input="
                                    updateFilter('cell.free', filter.cell.free)
                                "
                            ></settings-number>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.cells.tax')
                            }}</label>
                            <settings-number
                                name="cell_tax"
                                :placeholder="lightbox.$sm('filter.cells.tax')"
                                v-model="filter.cell.tax"
                                :min="0"
                                :max="50"
                                :step="10"
                                @input="
                                    updateFilter('cell.tax', filter.cell.tax)
                                "
                            ></settings-number>
                        </div>
                    </template>
                    <tr
                        v-for="cell in cellListSorted"
                        :key="cell.id"
                        :class="{ hidden: cell.hidden }"
                    >
                        <td v-if="cellListSrc === 2">
                            <font-awesome-icon
                                :icon="
                                    cell.list === 'own_cells'
                                        ? faPortrait
                                        : faSitemap
                                "
                            ></font-awesome-icon>
                        </td>
                        <td>
                            <a :href="`/buildings/${cell.id}`">
                                {{ cell.caption }}
                            </a>
                        </td>
                        <td>{{ cell.distance }}</td>
                        <td>{{ cell.free }}</td>
                        <td v-if="cellListSrc">
                            {{ cell.tax }}
                            %
                        </td>
                        <td>
                            <button
                                @click="
                                    fms(
                                        `/vehicles/${vehicle.id}/gefangener/${cell.id}`
                                    )
                                "
                                class="btn"
                                :class="`btn-${cell.state}`"
                                :disabled="cell.state === 'danger'"
                            >
                                {{ lightbox.$sm('approach') }}
                            </button>
                        </td>
                    </tr>
                </enhanced-table>
            </div>
            <div
                v-else-if="!vehicle.user && vehicle.has_wlfs"
                class="table-tabs"
            >
                <enhanced-table
                    :head="wlf_head"
                    :table-attrs="{
                        class: {
                            'table': true,
                            'table-striped':
                                wlfListFiltered.filter(({ hidden }) => !hidden)
                                    .length === vehicle.wlfs.length,
                        },
                    }"
                    :search="search"
                    @search="setSearch"
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                >
                    <template v-slot:head>
                        <div class="form-group">
                            <label>{{ lightbox.$sm('filter.wlf.same') }}</label>
                            <multi-select
                                name="wlf_same"
                                :placeholder="
                                    lightbox.$sm('filter.wlf.same.title')
                                "
                                v-model="filter.wlf.same"
                                :options="[
                                    {
                                        value: true,
                                        label: lightbox.$sm('true'),
                                    },
                                    {
                                        value: false,
                                        label: lightbox.$sm('false'),
                                    },
                                ]"
                                @input="
                                    updateFilter('wlf.same', filter.wlf.same)
                                "
                            ></multi-select>
                        </div>
                        <div class="form-group">
                            <label>{{
                                lightbox.$sm('filter.wlf.distance')
                            }}</label>
                            <settings-number
                                name="wlf_distance"
                                :placeholder="
                                    lightbox.$sm('filter.wlf.distance')
                                "
                                v-model="filter.wlf.distance"
                                :min="0"
                                @input="
                                    updateFilter(
                                        'wlf.distance',
                                        filter.wlf.distance
                                    )
                                "
                            ></settings-number>
                        </div>
                    </template>
                    <tr
                        v-for="wlf in wlfListSorted"
                        :key="wlf.id"
                        :class="{ hidden: wlf.hidden }"
                    >
                        <td>
                            <a :href="`/vehicles/${wlf.id}`">{{
                                wlf.caption
                            }}</a>
                        </td>
                        <td>{{ wlf.distance }}</td>
                        <td>
                            <a :href="`/vehicles/${wlf.building.id}`">{{
                                wlf.building.caption
                            }}</a>
                        </td>
                        <td>
                            <span
                                class="label"
                                :class="
                                    `label-${
                                        wlf.building.same ? 'success' : 'danger'
                                    }`
                                "
                            >
                                {{ lightbox.$sm(wlf.building.same) }}
                            </span>
                        </td>
                        <td>
                            <button
                                :href="
                                    `/vehicles/${vehicle.id}/alarm?vehicle_ids%5B%5D=${wlf.id}`
                                "
                                class="btn btn-success"
                            >
                                {{ lightbox.$sm('wlf.alarm') }}
                            </button>
                        </td>
                    </tr>
                </enhanced-table>
            </div>
            <div class="btn-group nav-btns">
                <button
                    class="btn btn-xs"
                    :class="
                        `btn-${
                            vehicle.id === vehicle.previous_vehicle_id
                                ? 'default'
                                : 'success'
                        }`
                    "
                    :href="
                        vehicle.id === vehicle.previous_vehicle_id
                            ? '#'
                            : `/vehicles/${vehicle.previous_vehicle_id}`
                    "
                    :disabled="vehicle.id === vehicle.previous_vehicle_id"
                >
                    <span class="glyphicon glyphicon-arrow-left"></span>
                </button>
                <button
                    class="btn btn-xs"
                    :class="
                        `btn-${
                            vehicle.id === vehicle.next_vehicle_id
                                ? 'default'
                                : 'success'
                        }`
                    "
                    :href="
                        vehicle.id === vehicle.next_vehicle_id
                            ? '#'
                            : `/vehicles/${vehicle.next_vehicle_id}`
                    "
                    :disabled="vehicle.id === vehicle.next_vehicle_id"
                >
                    <span class="glyphicon glyphicon-arrow-right"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faPortrait } from '@fortawesome/free-solid-svg-icons/faPortrait';
import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RedesignComponent } from 'typings/modules/Redesign';
import { Vehicle } from 'typings/Vehicle';
import { VehicleWindow } from '../parsers/vehicle';

type Component = RedesignComponent<
    'vehicle',
    'vehicle',
    VehicleWindow,
    {
        faSitemap: IconDefinition;
        faPortrait: IconDefinition;
        faUser: IconDefinition;
        faAsterisk: IconDefinition;
        faPalette: IconDefinition;
        faEdit: IconDefinition;
        faChartLine: IconDefinition;
        faUsers: IconDefinition;
        faTrash: IconDefinition;
        missionListSrc: number;
        search: string;
        searchTimeout: null | number;
        sort: string;
        sortDir: 'asc' | 'desc';
        hospitalListSrc: number;
        cellListSrc: number;
        color2Class: {
            red: 'danger';
            yellow: 'warning';
            green: 'success';
        };
        filter: {
            mission: {
                status: ('red' | 'green' | 'yellow')[];
                participation: boolean[];
                distance: number;
                credits: number;
                progress: number;
            };
            hospital: {
                department: boolean[];
                distance: number;
                tax: number;
                beds: number;
                each: number;
            };
            cell: {
                distance: number;
                tax: number;
                free: number;
                each: number;
            };
            wlf: {
                distance: number;
                same: boolean[];
                show: number;
            };
        };
    },
    {
        setMissionList(_: unknown, group: number): void;
        setHospitalList(_: unknown, group: number): void;
        setCellList(_: unknown, group: number): void;
        setSearch(search: string): void;
        setSort(type: string): void;
        alarm(missionId: number): void;
        deleteVehicle(): void;
        backalarm(): void;
        switch_state(): void;
        updateFilter(filter: string, value: unknown): void;
        fms(url: string): void;
        release(type: 'patient' | 'prisoner'): void;
        loadAllHospitals(): void;
    },
    {
        participated_missions: string[];
        mission_head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        missionList: VehicleWindow['mission_own'];
        missionListFiltered: VehicleWindow['mission_own'];
        missionListSorted: VehicleWindow['mission_own'];
        hospital_head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        hospitalList: VehicleWindow['own_hospitals'];
        hospitalListFiltered: VehicleWindow['own_hospitals'];
        hospitalListSorted: VehicleWindow['own_hospitals'];
        cell_head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        cellList: VehicleWindow['own_cells'];
        cellListFiltered: VehicleWindow['own_cells'];
        cellListSorted: VehicleWindow['own_cells'];
        wlf_head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        wlfListFiltered: VehicleWindow['wlfs'];
        wlfListSorted: VehicleWindow['wlfs'];
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'vehicle-lightbox',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
        MultiSelect: () =>
            import(
                /* webpackChunkName: "components/settings/multi-select" */ '../../../components/setting/multi-select.vue'
            ),
        SettingsNumber: () =>
            import(
                /* webpackChunkName: "components/settings/number" */ '../../../components/setting/number.vue'
            ),
    },
    data() {
        return {
            faSitemap,
            faPortrait,
            faUser,
            faAsterisk,
            faPalette,
            faEdit,
            faChartLine,
            faUsers,
            faTrash,
            missionListSrc: 0,
            search: '',
            searchTimeout: null,
            sort: 'distance',
            sortDir: 'asc',
            hospitalListSrc: 0,
            cellListSrc: 0,
            color2Class: {
                red: 'danger',
                yellow: 'warning',
                green: 'success',
            },
            filter: {
                mission: {
                    status: ['red', 'yellow', 'green'],
                    participation: [true, false],
                    distance: 0,
                    credits: 0,
                    progress: 100,
                },
                hospital: {
                    department: [true, false],
                    distance: 0,
                    tax: 50,
                    beds: 0,
                    each: 0,
                },
                cell: {
                    distance: 0,
                    tax: 50,
                    free: 0,
                    each: 0,
                },
                wlf: {
                    distance: 0,
                    same: [true, false],
                    show: 0,
                },
            },
        };
    },
    computed: {
        participated_missions() {
            return Object.keys(
                (this.$store.getters['api/vehiclesByTarget'] as {
                    mission?: { [id: number]: Vehicle[] };
                    building?: { [id: number]: Vehicle[] };
                }).mission ?? {}
            );
        },
        mission_head() {
            return {
                ...(this.missionListSrc === 2 ? { list: { title: '' } } : {}),
                img: { title: '' },
                participation: {
                    title: this.lightbox
                        .$sm('missions.participation')
                        .toString(),
                },
                mission: {
                    title: this.lightbox.$sm('missions.mission').toString(),
                },
                distance: {
                    title: this.lightbox.$sm('distance').toString(),
                },
                credits: {
                    title: this.lightbox.$sm('missions.credits').toString(),
                },
                progress: {
                    title: this.lightbox.$sm('missions.progress').toString(),
                },
                patients: {
                    title: this.lightbox.$sm('missions.patients').toString(),
                },
                alarm: {
                    title: '',
                    noSort: true,
                },
            };
        },
        missionList() {
            return [
                ...this.vehicle.mission_own,
                ...this.vehicle.mission_alliance,
            ].sort((a, b) => {
                const l = parseInt(
                    a.distance.match(/\d+([,.]?\d+)?/)?.[0] ?? '-1'
                );
                const r = parseInt(
                    b.distance.match(/\d+([,.]?\d+)?/)?.[0] ?? '-1'
                );
                return l < r ? -1 : l > r ? 1 : 0;
            });
        },
        missionListFiltered() {
            return this.missionList.map(m => {
                const missionType = this.$store.getters['api/missionsById'][
                    m.type
                ];
                const participation = this.participated_missions.includes(
                    m.id.toString()
                );
                const credits = missionType
                    ? missionType.average_credits || 0
                    : Number.MAX_SAFE_INTEGER;
                return {
                    ...m,
                    participation,
                    credits,
                    hidden: !(
                        this.filter.mission.status.includes(m.status) &&
                        this.filter.mission.participation.includes(
                            participation
                        ) &&
                        credits >= this.filter.mission.credits &&
                        (!this.filter.mission.distance ||
                            parseInt(m.distance) <
                                this.filter.mission.distance) &&
                        m.progress.width >=
                            100 - this.filter.mission.progress &&
                        (this.missionListSrc === 2 ||
                            (this.missionListSrc === 0 &&
                                m.list === 'mission_own') ||
                            (this.missionListSrc === 1 &&
                                m.list === 'mission_alliance')) &&
                        JSON.stringify(Object.values(m))
                            .toLowerCase()
                            .match(this.search.trim().toLowerCase())
                    ),
                };
            });
        },
        missionListSorted() {
            if (this.sort === 'distance') {
                if (this.sortDir === 'asc') return this.missionListFiltered;
                return [...this.missionListFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.missionListFiltered].sort((a, b) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let s = b[this.sort] ?? '';
                if (this.sort === 'mission') {
                    f = a['caption'] ?? '';
                    s = b['caption'] ?? '';
                } else if (this.sort === 'img') {
                    f = a['status'] ?? '';
                    s = b['status'] ?? '';
                } else if (this.sort === 'progress') {
                    f = f['width'] ?? 100;
                    s = s['width'] ?? 100;
                } else if (this.sort === 'patients') {
                    f = f['current'] ?? 0;
                    s = s['current'] ?? 0;
                }
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
        hospital_head() {
            return {
                ...(this.hospitalListSrc === 2 ? { list: { title: '' } } : {}),
                caption: {
                    title: this.lightbox.$sm('hospitals.hospital').toString(),
                },
                distance: {
                    title: this.lightbox.$sm('distance').toString(),
                },
                beds: {
                    title: this.lightbox.$sm('hospitals.beds').toString(),
                },
                ...(this.hospitalListSrc
                    ? { tax: { title: this.lightbox.$sm('tax').toString() } }
                    : {}),
                department: {
                    title: this.lightbox
                        .$sm('hospitals.department', {
                            department: this.vehicle.hospital_department,
                        })
                        .toString(),
                },
                dispatch: {
                    title: '',
                    noSort: true,
                },
            };
        },
        hospitalList() {
            return [
                ...this.vehicle.own_hospitals,
                ...this.vehicle.alliance_hospitals,
            ].sort((a, b) => {
                const l = parseInt(
                    a.distance.match(/\d+([,.]?\d+)?/)?.[0] ?? '-1'
                );
                const r = parseInt(
                    b.distance.match(/\d+([,.]?\d+)?/)?.[0] ?? '-1'
                );
                return l < r ? -1 : l > r ? 1 : 0;
            });
        },
        hospitalListFiltered() {
            const eachFilterLists = {
                own_hospitals: 0,
                alliance_hospitals: 0,
            };
            return this.hospitalList.map(h => {
                const hidden = !(
                    this.filter.hospital.department.includes(h.department) &&
                    h.tax <= this.filter.hospital.tax &&
                    h.beds >= this.filter.hospital.beds &&
                    (!this.filter.hospital.distance ||
                        parseInt(h.distance) < this.filter.hospital.distance) &&
                    (!this.filter.hospital.each ||
                        eachFilterLists[h.list] < this.filter.hospital.each) &&
                    (this.hospitalListSrc === 2 ||
                        (this.hospitalListSrc === 0 &&
                            h.list === 'own_hospitals') ||
                        (this.hospitalListSrc === 1 &&
                            h.list === 'alliance_hospitals')) &&
                    JSON.stringify(Object.values(h))
                        .toLowerCase()
                        .match(this.search.trim().toLowerCase())
                );
                if (!hidden) eachFilterLists[h.list]++;
                return {
                    ...h,
                    hidden,
                };
            });
        },
        hospitalListSorted() {
            if (this.sort === 'distance') {
                if (this.sortDir === 'asc') return this.hospitalListFiltered;
                return [...this.hospitalListFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.hospitalListFiltered].sort((a, b) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const s = b[this.sort] ?? '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
        cell_head() {
            return {
                ...(this.cellListSrc === 2 ? { list: { title: '' } } : {}),
                caption: {
                    title: this.lightbox.$sm('cells.cell').toString(),
                },
                distance: {
                    title: this.lightbox.$sm('distance').toString(),
                },
                free: {
                    title: this.lightbox.$sm('cells.free').toString(),
                },
                ...(this.cellListSrc
                    ? { tax: { title: this.lightbox.$sm('tax').toString() } }
                    : {}),
                dispatch: {
                    title: '',
                    noSort: true,
                },
            };
        },
        cellList() {
            return [
                ...this.vehicle.own_cells,
                ...this.vehicle.alliance_cells,
            ].sort((a, b) => {
                const l = parseInt(
                    a.distance.match(/\d+([,.]?\d+)?/)?.[0] ?? '-1'
                );
                const r = parseInt(
                    b.distance.match(/\d+([,.]?\d+)?/)?.[0] ?? '-1'
                );
                return l < r ? -1 : l > r ? 1 : 0;
            });
        },
        cellListFiltered() {
            const eachFilterLists = {
                own_cells: 0,
                alliance_cells: 0,
            };
            return this.cellList.map(c => {
                const hidden = !(
                    c.tax <= this.filter.cell.tax &&
                    c.free >= this.filter.cell.free &&
                    (!this.filter.cell.distance ||
                        parseInt(c.distance) < this.filter.cell.distance) &&
                    (!this.filter.cell.each ||
                        eachFilterLists[c.list] < this.filter.cell.each) &&
                    (this.cellListSrc === 2 ||
                        (this.cellListSrc === 0 && c.list === 'own_cells') ||
                        (this.cellListSrc === 1 &&
                            c.list === 'alliance_cells')) &&
                    JSON.stringify(Object.values(c))
                        .toLowerCase()
                        .match(this.search.trim().toLowerCase())
                );
                if (!hidden) eachFilterLists[c.list]++;
                return {
                    ...c,
                    hidden,
                };
            });
        },
        cellListSorted() {
            if (this.sort === 'distance') {
                if (this.sortDir === 'asc') return this.cellListFiltered;
                return [...this.cellListFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.cellListFiltered].sort((a, b) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const s = b[this.sort] ?? '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
        wlf_head() {
            return {
                vehicle: {
                    title: this.lightbox.$sm('wlf.caption').toString(),
                },
                distance: {
                    title: this.lightbox.$sm('distance').toString(),
                },
                building: {
                    title: this.lightbox.$sm('wlf.building').toString(),
                },
                same: {
                    title: this.lightbox
                        .$sm('wlf.same', {
                            building: this.vehicle.building.caption,
                        })
                        .toString(),
                },
                dispatch: { title: '', noSort: true },
            };
        },
        wlfListFiltered() {
            let shown = 0;
            return this.vehicle.wlfs.map(w => {
                const hidden = !(
                    this.filter.wlf.same.includes(w.building.same) &&
                    (!this.filter.wlf.distance ||
                        parseInt(w.distance) < this.filter.wlf.distance) &&
                    (!this.filter.wlf.show || shown < this.filter.wlf.show) &&
                    JSON.stringify(Object.values(w))
                        .toLowerCase()
                        .match(this.search.trim().toLowerCase())
                );
                if (!hidden) shown++;
                return {
                    ...w,
                    hidden,
                };
            });
        },
        wlfListSorted() {
            if (this.sort === 'distance') {
                if (this.sortDir === 'asc') return this.wlfListFiltered;
                return [...this.wlfListFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.wlfListFiltered].sort((a, b) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let s = b[this.sort] ?? '';
                if (this.sort === 'same') {
                    f = a.building.same ?? '';
                    s = b.building.same ?? '';
                } else if (this.sort === 'building') {
                    f = f['caption'] ?? '';
                    s = s['caption'] ?? '';
                }
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    methods: {
        setMissionList(_, list) {
            this.setSetting('missionListSrc', list).then();
            this.missionListSrc = list;
        },
        setHospitalList(_, list) {
            this.setSetting('hospitalListSrc', list).then();
            this.hospitalListSrc = list;
        },
        setCellList(_, list) {
            this.setSetting('cellListSrc', list).then();
            this.cellListSrc = list;
        },
        setSearch(search) {
            if (this.searchTimeout) window.clearTimeout(this.searchTimeout);
            this.searchTimeout = window.setTimeout(
                () => (this.search = search),
                100
            );
        },
        setSort(type) {
            if (this.sort === type) {
                this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
                this.sort = type;
                this.sortDir = 'asc';
            }
            const mode = this.vehicle.has_hospitals
                ? 'hospital'
                : this.vehicle.has_cells
                ? 'cell'
                : this.vehicle.has_wlfs
                ? 'wlf'
                : 'mission';
            this.setSetting(`${mode}.sort`, type).then(() =>
                this.setSetting(`${mode}.sortDir`, this.sortDir).then()
            );
        },
        alarm(mission) {
            const url = new URL(
                `/missions/${mission}/alarm`,
                window.location.origin
            );
            url.searchParams.append('utf8', '✓');
            url.searchParams.append(
                'authenticity_token',
                this.vehicle.authenticity_token
            );
            url.searchParams.append(
                'vehicle_ids[]',
                this.vehicle.id.toString()
            );
            url.searchParams.append('vehicle_return', '1');
            this.$store
                .dispatch('api/request', {
                    url: `/missions/${mission}/alarm`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `vehicles/${this.vehicle.id}`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-vehicle-alarm-${this.vehicle.id}-to-${mission}`,
                })
                .then(() =>
                    this.$set(
                        this.lightbox,
                        'src',
                        `/vehicles/${this.vehicle.id}`
                    )
                );
        },
        deleteVehicle() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            this.$modal.show('dialog', {
                title: this.lightbox.$sm('delete.title'),
                text: this.lightbox.$sm('delete.text', {
                    caption: this.vehicle.vehicle_name,
                    building: this.vehicle.building.caption,
                }),
                buttons: [
                    {
                        title: this.lightbox.$sm('delete.cancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.lightbox.$sm('delete.confirm'),
                        async handler() {
                            const url = new URL(
                                `/vehicles/${LSSM.vehicle.id}`,
                                window.location.origin
                            );
                            url.searchParams.append('_method', 'delete');
                            url.searchParams.append(
                                'authenticity_token',
                                LSSM.vehicle.authenticity_token
                            );
                            LSSM.$store
                                .dispatch('api/request', {
                                    url: `/vehicles/${LSSM.vehicle.id}`,
                                    init: {
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type':
                                                'application/x-www-form-urlencoded',
                                        },
                                        referrer: new URL(
                                            `vehicles/${LSSM.vehicle.id}`,
                                            window.location.origin
                                        ),
                                        body: url.searchParams.toString(),
                                        method: 'POST',
                                        mode: 'cors',
                                    },
                                    feature: `redesign-vehicle-delete-${LSSM.vehicle.id}`,
                                })
                                .then(() => {
                                    LSSM.$modal.hide('dialog');
                                    LSSM.$set(
                                        LSSM.lightbox,
                                        'src',
                                        `/buildings/${LSSM.vehicle.building.id}`
                                    );
                                });
                        },
                    },
                ],
            });
        },
        backalarm() {
            this.$store
                .dispatch('api/request', {
                    url: `/vehicles/${this.vehicle.id}/backalarm`,
                    feature: `redesign-vehicle-alarm-${this.vehicle.id}-backalarm`,
                })
                .then(() =>
                    this.$set(
                        this.lightbox,
                        'src',
                        `/vehicles/${this.vehicle.id}`
                    )
                );
        },
        switch_state() {
            if (![2, 6].includes(this.vehicle.fms)) return;
            const target = this.vehicle.fms === 2 ? 6 : 2;
            this.$store
                .dispatch('api/request', {
                    url: `/vehicles/${this.vehicle.id}/set_fms/${target}`,
                    feature: `redesign-vehicle-setfms`,
                })
                .then(() => {
                    this.$set(
                        this.lightbox,
                        'src',
                        `/vehicles/${this.vehicle.id}`
                    );
                });
        },
        updateFilter(filter, value) {
            this.setSetting(filter, value).then();
        },
        fms(url) {
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-vehicle-fms`,
                })
                .then((res: Response) => {
                    if (res.redirected) {
                        if (
                            new URL(res.url, window.location.origin)
                                .pathname === '/'
                        ) {
                            this.$set(this.lightbox, 'type', 'vehicle/nextfms');
                            return window.lightboxClose(this.lightbox.creation);
                        }
                        return this.$set(this.lightbox, 'src', res.url);
                    }

                    res.text().then(html => {
                        import(
                            /*webpackChunkName: "modules/redesign/parsers/vehicle/nextfms"*/ `../parsers/vehicle/nextfms`
                        ).then(async parser => {
                            const { next: next_vehicle } = await parser.default(
                                {
                                    doc: new DOMParser().parseFromString(
                                        html,
                                        'text/html'
                                    ),
                                    href: url,
                                    getIdFromEl: this.lightbox.getIdFromEl,
                                    LSSM: this,
                                }
                            );
                            if (next_vehicle < 0) {
                                import(
                                    `../i18n/${this.$store.state.lang}/vehicle/nextfms.json`
                                ).then(t => {
                                    this.$i18n.mergeLocaleMessage(
                                        this.$store.state.lang,
                                        {
                                            modules: {
                                                redesign: {
                                                    vehicle: {
                                                        nextfms: t,
                                                    },
                                                },
                                            },
                                        }
                                    );
                                    this.$set(
                                        this.lightbox,
                                        'type',
                                        'vehicle/nextfms'
                                    );
                                });
                                return window.lightboxClose(
                                    this.lightbox.creation
                                );
                            }
                            this.$set(
                                this.lightbox,
                                'src',
                                `/vehicles/${next_vehicle}`
                            );
                        });
                    });
                });
        },
        release(type) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            this.$modal.show('dialog', {
                title: this.lightbox.$sm(`release.${type}.title`),
                text: this.lightbox.$sm(`release.${type}.text`),
                buttons: [
                    {
                        title: this.lightbox.$sm('release.cancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.lightbox.$sm('release.confirm'),
                        async handler() {
                            if (type === 'patient') {
                                LSSM.$set(
                                    LSSM.lightbox,
                                    'src',
                                    `/vehicles/${LSSM.vehicle.id}/patient/-1`
                                );
                                return LSSM.$modal.hide('dialog');
                            }
                            const url = new URL(
                                `/missions/${LSSM.vehicle.current_mission?.id ??
                                    0}/gefangene/entlassen`,
                                window.location.origin
                            );
                            url.searchParams.append('_method', 'post');
                            url.searchParams.append(
                                'authenticity_token',
                                LSSM.vehicle.authenticity_token
                            );
                            LSSM.$store
                                .dispatch('api/request', {
                                    url: url.pathname,
                                    init: {
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type':
                                                'application/x-www-form-urlencoded',
                                        },
                                        referrer: new URL(
                                            `vehicles/${LSSM.vehicle.id}`,
                                            window.location.origin
                                        ),
                                        body: url.searchParams.toString(),
                                        method: 'POST',
                                        mode: 'cors',
                                    },
                                    feature: `redesign-vehicle-release-prisoners`,
                                })
                                .then((res: Response) => {
                                    LSSM.$set(
                                        LSSM.lightbox,
                                        'src',
                                        new URL(res.url, window.location.origin)
                                            .pathname === url.pathname
                                            ? `/vehicles/${LSSM.vehicle.id}`
                                            : res.url
                                    );
                                    LSSM.$modal.hide('dialog');
                                });
                        },
                    },
                ],
            });
        },
        loadAllHospitals() {
            this.$set(this.lightbox, 'loading', true);
            const url = new URL(
                `/vehicles/${this.vehicle.id}?load_all=true`,
                window.location.origin
            );
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-vehicle-load_all_hospitals`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/vehicle').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                        });
                        this.$set(
                            this.lightbox.data,
                            'alliance_hospitals',
                            result.alliance_hospitals
                        );
                        this.$set(
                            this.lightbox.data,
                            'load_all_hospitals',
                            false
                        );
                        this.lightbox.finishLoading(
                            'toplist-vehicle-load_all_hospitals'
                        );
                    });
                });
        },
    },
    props: {
        vehicle: {
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
        vehicle() {
            this.lightbox.finishLoading('vehicle-updated-data');
        },
    },
    beforeMount() {
        Object.entries(this.filter).forEach(([filter, props]) => {
            Object.entries(props).forEach(([prop, value]) => {
                this.getSetting(`${filter}.${prop}`, value).then(v =>
                    this.$set(props, prop, v)
                );
            });
        });
    },
    mounted() {
        const mode = this.vehicle.has_hospitals
            ? 'hospital'
            : this.vehicle.has_cells
            ? 'cell'
            : 'mission';
        this.getSetting(`${mode}.sort`, this.sort).then(
            sort => (this.sort = sort)
        );
        this.getSetting(`${mode}.sortDir`, this.sortDir).then(
            dir => (this.sortDir = dir)
        );
        if (!this.vehicle.has_wlfs) {
            this.$nextTick(() => {
                const tabSrc = this.vehicle.has_hospitals
                    ? 'hospitalListSrc'
                    : this.vehicle.has_cells
                    ? 'cellListSrc'
                    : 'missionListSrc';
                this.getSetting(tabSrc, this[tabSrc]).then(list => {
                    this[tabSrc] = list;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (this.$refs.tabs) this.$refs.tabs.selectedIndex = list;
                });
            });
        }
        this.lightbox.finishLoading('vehicle-mounted');
    },
});
</script>

<style scoped lang="sass">
.vehicle-window
    display: flex

    > div:first-child
        width: calc(100% / 3)

        > .well > table > tbody > tr
            > *
                border-top-width: 0
            > th
                float: right

    > div
        margin-left: 1em
        margin-right: 1em

        &.table-tabs
            width: 100%

.vehicle-img
    right: calc(4 * 34px)
    position: absolute

.nav-btns
    position: absolute
    right: 1em
    transition: right 1s
</style>
