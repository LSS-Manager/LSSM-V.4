<template>
    <div>
        <h1>
            {{ vehicle.name }}
            <img :src="vehicle.image" alt="" class="vehicle-img" />
        </h1>
        <div class="vehicle-window">
            <div>
                <!-- Metadata -->
                <div class="well">
                    <span
                        v-if="tableType === 'patient' && vehicle.loadAll"
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
                    <dl class="dl-horizontal">
                        <template v-if="vehicle.user">
                            <dt>{{ lightbox.$sm('owner') }}</dt>
                            <dd>
                                <a
                                    :href="`/profile/${vehicle.user.id}`"
                                    class="lightbox-open"
                                    lightbox-open
                                >
                                    <img
                                        :src="`/images/user_${
                                            vehicle.user.online
                                                ? 'green'
                                                : 'gray'
                                        }.png`"
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
                            </dd>
                        </template>
                        <dt>{{ lightbox.$sm('station') }}</dt>
                        <dd>
                            <a :href="`/buildings/${vehicle.building.id}`">
                                {{ vehicle.building.caption }}
                            </a>
                            <a
                                v-if="vehicle.canMove"
                                :href="`/vehicles/${vehicle.id}/move`"
                                class="btn btn-default btn-xs pull-right"
                            >
                                {{ lightbox.$sm('move') }}
                            </a>
                        </dd>
                        <dt>{{ lightbox.$sm('vehicletype') }}</dt>
                        <dd>
                            {{ vehicle.vehicleType.caption }}
                            <a
                                :href="`/fahrzeugfarbe/${
                                    vehicle.vehicleType.id
                                }?close-after-submit${
                                    vehicle.vehicleType.custom
                                        ? `&vehicle_type_caption=${vehicle.vehicleType.caption}`
                                        : ''
                                }`"
                                class="btn btn-default btn-xs lightbox-open pull-right"
                                :title="lightbox.$sm('color')"
                                lightbox-open
                            >
                                <font-awesome-icon
                                    :icon="faPalette"
                                ></font-awesome-icon>
                            </a>
                        </dd>
                        <dt>{{ lightbox.$sm('fms') }}</dt>
                        <dd>
                            <span
                                class="building_list_fms"
                                :class="`building_list_fms_${vehicle.fms}`"
                            >
                                {{ $i18n.t('fmsReal2Show')[vehicle.fms] }}
                            </span>
                            <button
                                v-if="
                                    vehicle.windowType === 'transportRequest' &&
                                    [
                                        'patient',
                                        'prisoner',
                                        'patient-intermediate',
                                        'prisoner-intermediate',
                                    ].includes(vehicle.transportRequestType) &&
                                    vehicle.releasable
                                "
                                @click="release()"
                                class="btn btn-default btn-xs btn-sm pull-right"
                            >
                                {{
                                    lightbox.$sm(
                                        'release_' +
                                            vehicle.transportRequestType
                                    )
                                }}
                            </button>
                            <button
                                v-if="
                                    (vehicle.fms === 2 || vehicle.fms === 6) &&
                                    !vehicle.user
                                "
                                class="btn btn-default btn-xs pull-right"
                                @click="switchState"
                            >
                                {{
                                    lightbox.$sm(
                                        `fms_switch.is_s${vehicle.fms}`
                                    )
                                }}
                            </button>
                            <template
                                v-if="
                                    vehicle.windowType === 'patient' &&
                                    vehicle.doctor
                                "
                            >
                                <br />
                                ({{ lightbox.$sm('patient_doctor_transport') }})
                            </template>
                        </dd>
                        <dt>{{ lightbox.$sm('max_staff') }}</dt>
                        <dd>{{ vehicle.maxStaff }}</dd>
                        <template v-if="vehicle.water">
                            <dt>{{ lightbox.$sm('water_amount') }}</dt>
                            <dd>{{ vehicle.water }}</dd>
                        </template>
                        <template v-if="vehicle.foam">
                            <dt>{{ lightbox.$sm('foam_amount') }}</dt>
                            <dd>{{ vehicle.foam }}</dd>
                        </template>
                        <dt>{{ lightbox.$sm('mileage') }}</dt>
                        <dd>{{ vehicle.mileage }}</dd>
                        <template v-if="vehicle.currentMission">
                            <dt>{{ lightbox.$sm('current_mission') }}</dt>
                            <dd>
                                <a
                                    :href="`/missions/${vehicle.currentMission.id}`"
                                >
                                    {{ vehicle.currentMission.caption }}
                                </a>
                                <button
                                    v-if="
                                        vehicle.currentMission && !vehicle.user
                                    "
                                    class="btn btn-default btn-xs pull-right"
                                    @click="backalarm"
                                >
                                    {{ lightbox.$sm('backalarm') }}
                                </button>
                            </dd>
                        </template>
                        <template v-if="vehicle.followupMissions.length">
                            <dt>
                                {{
                                    lightbox.$smc(
                                        'followup_missions',
                                        vehicle.followupMissions.length
                                    )
                                }}
                            </dt>
                            <dd>
                                <ul>
                                    <li
                                        v-for="(
                                            mission, index
                                        ) in vehicle.followupMissions"
                                        :key="index"
                                    >
                                        <a :href="`/missions/${mission.id}`">
                                            {{ mission.caption }}
                                        </a>
                                        <span class="btn-group pull-right">
                                            <a
                                                class="btn btn-xs btn-default"
                                                @click="
                                                    backalarmFollowUp(
                                                        mission.id
                                                    )
                                                "
                                            >
                                                {{ lightbox.$sm('backalarm') }}
                                            </a>
                                            <a
                                                class="btn btn-xs btn-default"
                                                @click="backalarmCurrent"
                                            >
                                                {{
                                                    lightbox.$sm(
                                                        'backalarmNext'
                                                    )
                                                }}
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </dd>
                        </template>
                        <template v-if="Object.keys(vehicle.staff).length">
                            <dt>
                                {{ lightbox.$sm('staff.title') }}:
                                {{ Object.keys(vehicle.staff).length }}
                            </dt>
                            <dd>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>
                                                {{ lightbox.$sm('staff.name') }}
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
                                            v-for="(
                                                schooling, name, index
                                            ) in vehicle.staff"
                                            :key="index"
                                        >
                                            <td>{{ name }}</td>
                                            <td>{{ schooling }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </dd>
                        </template>
                    </dl>
                </div>
                <!-- Vehicle related Actions -->
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
                        lightbox-open
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
            <!-- table with missions/hospitals/cells/towing-vehicles/... -->
            <div v-if="vehicle.windowType !== 'empty'">
                <tabs
                    v-if="lists.length"
                    :on-select="setList"
                    :default-index="lists.indexOf(table.list)"
                >
                    <span
                        v-for="list in lists"
                        :slot="list"
                        :data-list="list"
                        :key="list"
                    >
                        {{
                            lightbox.$sm(
                                `tabs.${list === '*' ? 'all' : list}`,
                                {
                                    type: lightbox.$sm(`tabs.${tableType}`),
                                    amount: items
                                        .filter(
                                            i => list === '*' || i.list === list
                                        )
                                        .length.toLocaleString(),
                                }
                            )
                        }}
                    </span>
                    <tab
                        v-for="list in lists"
                        :title-slot="list"
                        :key="list"
                        :data-list="list"
                    ></tab>
                </tabs>
                <enhanced-table
                    :head="tableHead"
                    :table-attrs="{
                        class: {
                            'table': true,
                            'table-striped': true,
                        },
                    }"
                    :search="search"
                    @search="s => (search = s)"
                    :sort="table.sort"
                    :sort-dir="table.sortDir"
                    @sort="setSort"
                >
                    <template v-slot:head>
                        <div
                            class="form-group"
                            v-if="table.hasOwnProperty('showEach')"
                        >
                            <label>{{
                                lightbox.$sm(`filter.${tableType}.show`)
                            }}</label>
                            <settings-number
                                v-model="table.showEach"
                                :name="`${tableType}_show-each}`"
                                :placeholder="
                                    lightbox.$sm(`filter.${tableType}.show`)
                                "
                                :min="0"
                                @input="updateShowEach()"
                            ></settings-number>
                        </div>
                        <div
                            class="form-group"
                            v-for="(value, filter) in table.filter"
                            :key="filter"
                            :data-title="
                                (filter_title = lightbox
                                    .$sm(
                                        `filter.${tableType}.${filter}${
                                            filter === 'status' ? '.title' : ''
                                        }`,
                                        {
                                            department: vehicle.department,
                                        }
                                    )
                                    .toString())
                            "
                        >
                            <label>{{ filter_title }}</label>
                            <settings-number
                                v-if="typeof value === 'number'"
                                v-model="table.filter[filter]"
                                :name="`${tableType}_${filter}`"
                                :placeholder="filter_title"
                                :min="0"
                                :max="
                                    {
                                        progress: 100,
                                        tax: 50,
                                    }[filter] ?? Number.MAX_SAFE_INTEGER
                                "
                                :step="
                                    {
                                        tax: 10,
                                    }[filter] ?? 1
                                "
                                @input="updateFilter(filter)"
                            ></settings-number>
                            <multi-select
                                v-else-if="Array.isArray(value)"
                                v-model="table.filter[filter]"
                                :value="table.filter[filter]"
                                :name="`${tableType}_${filter}`"
                                :placeholder="filter_title"
                                :options="
                                    {
                                        status: [
                                            {
                                                value: 'red',
                                                label: lightbox.$sm(
                                                    'filter.mission.status.red'
                                                ),
                                            },
                                            {
                                                value: 'yellow',
                                                label: lightbox.$sm(
                                                    'filter.mission.status.yellow'
                                                ),
                                            },
                                            {
                                                value: 'green',
                                                label: lightbox.$sm(
                                                    'filter.mission.status.green'
                                                ),
                                            },
                                        ],
                                    }[filter] ?? [
                                        {
                                            value: true,
                                            label: lightbox.$sm('true'),
                                        },
                                        {
                                            value: false,
                                            label: lightbox.$sm('false'),
                                        },
                                    ]
                                "
                                @input="updateFilter(filter)"
                            ></multi-select>
                            <pre v-else>{{ JSON.stringify(value) }}</pre>
                        </div>
                    </template>
                    <tr
                        v-for="(item, index) in shownItems.filter(
                            i => table.list === '*' || i.list === table.list
                        )"
                        :key="index"
                    >
                        <td v-for="(_, col, index) in tableHead" :key="col">
                            <span
                                v-if="
                                    starredMissionsEnabled &&
                                    index === 0 &&
                                    tableType === 'mission'
                                "
                                v-html="
                                    starredMissionButtons[item.id].outerHTML +
                                    '&nbsp;'
                                "
                                @click="() => switchStarredMission(item.id)"
                            ></span>
                            <font-awesome-icon
                                v-if="col === 'list'"
                                :icon="listIcon[item[col]]"
                            ></font-awesome-icon>
                            <img
                                v-else-if="col === 'image'"
                                :src="item[col]"
                                alt=""
                            />
                            <font-awesome-icon
                                v-else-if="col === 'participation'"
                                :icon="
                                    participationIcon[
                                        participatedMissions.includes(item.id)
                                    ]
                                "
                            >
                            </font-awesome-icon>
                            <template v-else-if="col === 'caption'">
                                <a :href="getUrl(item)" class="lightbox-open">
                                    {{ item[col] }}
                                </a>
                                <template v-if="item.adress">
                                    <br />
                                    <small>{{ item.adress }}</small>
                                </template>
                            </template>
                            <template v-else-if="col === 'credits'">
                                <template v-if="apiStore.missions[item.type]">
                                    ~
                                    {{
                                        (
                                            apiStore.missions[item.type]
                                                .average_credits ?? 0
                                        ).toLocaleString()
                                    }}
                                    {{ $t('credits') }}
                                </template>
                            </template>
                            <div
                                v-else-if="col === 'progress'"
                                class="progress"
                            >
                                <div
                                    class="progress-bar"
                                    :class="`progress-bar-${
                                        color2Class[item.status]
                                    }`"
                                    :style="`width: ${item.progress.width}%;`"
                                >
                                    <div
                                        class="progress-striped-inner"
                                        :class="{
                                            'progress-striped-inner-active':
                                                item.progress.active,
                                        }"
                                    ></div>
                                </div>
                            </div>
                            <template v-else-if="col === 'patients'">
                                <template v-if="item[col].total">
                                    {{
                                        lightbox.$sm(
                                            'mission.patientsProgress',
                                            {
                                                current: item[col].current,
                                                total: item[col].total,
                                            }
                                        )
                                    }}
                                </template>
                                <template v-else>
                                    <font-awesome-icon
                                        :icon="faBan"
                                    ></font-awesome-icon>
                                </template>
                            </template>
                            <template v-else-if="col === 'tax'">
                                {{ item[col] }}%
                            </template>
                            <span
                                v-else-if="
                                    col === 'department' ||
                                    col === 'same' ||
                                    col === 'home'
                                "
                                class="label"
                                :class="`label-${
                                    item.department ??
                                    item.building?.same ??
                                    item.home
                                        ? 'success'
                                        : 'warning'
                                }`"
                            >
                                {{
                                    lightbox.$sm(
                                        item.department ??
                                            item.building?.same ??
                                            item.home
                                    )
                                }}
                            </span>
                            <template
                                v-else-if="
                                    tableType === 'trailer' &&
                                    col === 'building'
                                "
                            >
                                <a
                                    :href="`/buildings/${item[col].id}`"
                                    class="lightbox-open"
                                    lightbox-open
                                >
                                    {{ item[col].caption }}
                                </a>
                            </template>
                            <template v-else-if="col === 'dispatch'">
                                <button
                                    @click.prevent="dispatch(item.id)"
                                    :class="`btn btn-${
                                        ['patient', 'prisoner'].includes(
                                            tableType
                                        )
                                            ? item.state
                                            : 'success'
                                    }`"
                                    :disabled="
                                        ['patient', 'prisoner'].includes(
                                            tableType
                                        ) && item.state === 'danger'
                                    "
                                >
                                    {{ lightbox.$sm(tableType + '.dispatch') }}
                                </button>
                                <template
                                    v-if="
                                        vehicle.windowType === 'missions' &&
                                        vehicle.currentMission &&
                                        item.id === vehicle.currentMission.id
                                    "
                                >
                                    <br />
                                    <span class="label label-default">
                                        {{ lightbox.$sm('mission.alarmed') }}
                                    </span>
                                </template>
                            </template>
                            <template v-else>
                                {{ item[col] ?? col }}
                            </template>
                        </td>
                    </tr>
                </enhanced-table>
            </div>

            <!-- vehicle navigation btns -->
            <div class="btn-group nav-btns">
                <a
                    :class="navigationBtnClass.prev"
                    :href="
                        vehicle.id === vehicle.previousVehicle
                            ? '#'
                            : `/vehicles/${vehicle.previousVehicle}`
                    "
                >
                    <span class="glyphicon glyphicon-arrow-left"></span>
                </a>
                <a
                    :class="navigationBtnClass.next"
                    :href="
                        vehicle.id === vehicle.nextVehicle
                            ? '#'
                            : `/vehicles/${vehicle.nextVehicle}`
                    "
                >
                    <span class="glyphicon glyphicon-arrow-right"></span>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faPortrait } from '@fortawesome/free-solid-svg-icons/faPortrait';
import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { mapState } from 'pinia';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';
import { defineAPIStore, useAPIStore } from '@stores/api';

import createBtn from '../../extendedCallList/assets/starrableMissions/createBtn';

import type {
    RedesignVehicleComponent as Component,
    KebabToCamelCase,
    RedesignVehicleComponent,
} from '../types/components/vehicle';

const kebabToCamelCase = <Kebab extends string = string>(
    kebab: Kebab
): KebabToCamelCase<Kebab> =>
    kebab.replace(/-([a-z])/gu, g =>
        g[1].toUpperCase()
    ) as KebabToCamelCase<Kebab>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-vehicle-lightbox',
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
            listIcon: { own: faPortrait, alliance: faSitemap },
            participationIcon: { true: faUser, false: faAsterisk },
            faPalette,
            faEdit,
            faChartLine,
            faUsers,
            faTrash,
            faBan,
            search: '',
            searchTimeout: 0,
            color2Class: {
                red: 'danger',
                yellow: 'warning',
                green: 'success',
            },
            tables: {
                mission: {
                    filter: {
                        status: ['red', 'yellow', 'green'],
                        participation: [true, false],
                        distance: 0,
                        credits: 0,
                        progress: 0,
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    list: '*',
                },
                patient: {
                    filter: {
                        distance: 0,
                        freeBeds: 0,
                        tax: 50,
                        department: [true, false],
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    disableReleaseConfirmation: false,
                    list: '*',
                    showEach: 0,
                },
                prisoner: {
                    filter: {
                        distance: 0,
                        freeCells: 0,
                        tax: 50,
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    disableReleaseConfirmation: false,
                    list: '*',
                    showEach: 0,
                },
                trailer: {
                    filter: {
                        distance: 0,
                        same: [true, false],
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    list: '*',
                },
                patientIntermediate: {
                    filter: {
                        distance: 0,
                        home: [true, false],
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    disableReleaseConfirmation: false,
                    list: '*',
                    showEach: 0,
                },
                prisonerIntermediate: {
                    filter: {
                        distance: 0,
                        home: [true, false],
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    disableReleaseConfirmation: false,
                    list: '*',
                    showEach: 0,
                },
            },
            apiStore: useAPIStore(),
            settingsStore: useSettingsStore(),
            starredMissionsEnabled: false,
            starredMissions: [],
        };
    },
    computed: {
        tableType() {
            if (
                this.vehicle.windowType === 'missions' ||
                this.vehicle.windowType === 'empty'
            )
                return 'mission';
            return kebabToCamelCase(this.vehicle.transportRequestType);
        },
        table() {
            return this.tables[this.tableType];
        },
        navigationBtnClass() {
            const prev = ['btn', 'btn-xs'];
            if (this.vehicle.id === this.vehicle.previousVehicle)
                prev.push('disabled', 'btn-default');
            else prev.push('btn-success');

            const next = ['btn', 'btn-xs'];
            if (this.vehicle.id === this.vehicle.nextVehicle)
                next.push('disabled', 'btn-default');
            else next.push('btn-success');

            return { prev: prev.join(' '), next: next.join(' ') };
        },
        tableHead() {
            let head: Record<
                string,
                {
                    title: string;
                    noSort?: boolean;
                }
            > = {};
            if (this.vehicle.windowType === 'empty') {
                // do not modify the head
            } else if (this.vehicle.windowType === 'missions') {
                head = {
                    list: { title: '' },
                    image: { title: '' },
                    participation: {
                        title: this.lightbox
                            .$sm('mission.participation')
                            .toString(),
                    },
                    caption: {
                        title: this.lightbox.$sm('mission.mission').toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    credits: {
                        title: this.lightbox.$sm('mission.credits').toString(),
                    },
                    progress: {
                        title: this.lightbox.$sm('mission.progress').toString(),
                    },
                    patients: {
                        title: this.lightbox.$sm('mission.patients').toString(),
                    },
                    dispatch: {
                        title: '',
                        noSort: true,
                    },
                };
            } else if (this.vehicle.transportRequestType === 'patient') {
                head = {
                    list: { title: '' },
                    caption: {
                        title: this.lightbox.$sm('patient.hospital').toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    freeBeds: {
                        title: this.lightbox.$sm('patient.beds').toString(),
                    },
                    tax: { title: this.lightbox.$sm('tax').toString() },
                    department: {
                        title: this.lightbox
                            .$sm('patient.department', {
                                department: this.vehicle.department,
                            })
                            .toString(),
                    },
                    dispatch: {
                        title: '',
                        noSort: true,
                    },
                };

                // do not show tax on own list
                if (this.table.list === 'own') delete head.tax;
            } else if (this.vehicle.transportRequestType === 'prisoner') {
                head = {
                    list: { title: '' },
                    caption: {
                        title: this.lightbox.$sm('prisoner.cell').toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    freeCells: {
                        title: this.lightbox.$sm('prisoner.free').toString(),
                    },
                    tax: { title: this.lightbox.$sm('tax').toString() },
                    dispatch: {
                        title: '',
                        noSort: true,
                    },
                };

                // do not show tax on own list
                if (this.table.list === 'own') delete head.tax;
            } else if (this.vehicle.transportRequestType === 'trailer') {
                head = {
                    caption: {
                        title: this.lightbox.$sm('trailer.caption').toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    building: {
                        title: this.lightbox.$sm('trailer.building').toString(),
                    },
                    same: {
                        title: this.lightbox
                            .$sm('trailer.same', {
                                building: this.vehicle.building.caption,
                            })
                            .toString(),
                    },
                    dispatch: { title: '', noSort: true },
                };
            } else if (
                this.vehicle.transportRequestType === 'patient-intermediate' ||
                this.vehicle.transportRequestType === 'prisoner-intermediate'
            ) {
                head = {
                    list: { title: '' },
                    caption: {
                        title: this.lightbox
                            .$sm('patientIntermediate.caption')
                            .toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    home: {
                        title: this.lightbox
                            .$sm('patientIntermediate.home', {
                                building: this.vehicle.building.caption,
                            })
                            .toString(),
                    },
                    dispatch: { title: '', noSort: true },
                };
            }
            return head;
        },
        lists() {
            if (
                this.vehicle.windowType === 'transportRequest' &&
                this.vehicle.transportRequestType === 'trailer'
            )
                return [];
            return ['own', 'alliance', '*'];
        },
        items() {
            if (this.vehicle.windowType === 'empty') return [];
            if (this.vehicle.windowType === 'transportRequest') {
                switch (this.vehicle.transportRequestType) {
                    case 'patient':
                        return [
                            ...this.vehicle.hospitals.own,
                            ...this.vehicle.hospitals.alliance,
                        ];
                    case 'patient-intermediate':
                    case 'prisoner-intermediate':
                        return [
                            ...this.vehicle.buildings.own,
                            ...this.vehicle.buildings.alliance,
                        ];
                    case 'prisoner':
                        return [
                            ...this.vehicle.cells.own,
                            ...this.vehicle.cells.alliance,
                        ];
                    case 'trailer':
                        return this.vehicle.towingVehicles;
                }
            }
            return [
                ...this.vehicle.missions.own,
                ...this.vehicle.missions.alliance,
            ];
        },
        filteredItems() {
            const filteredBySearch = this.search.trim()
                ? this.items.filter(item =>
                      JSON.stringify(Object.values(item))
                          .toLowerCase()
                          .match(this.search.trim().toLowerCase())
                  )
                : this.items;
            return filteredBySearch.filter(item =>
                Object.entries(this.table.filter).every(([filter, value]) => {
                    if (filter === 'distance' && !value) return true;

                    const itemValue = {
                        [filter]:
                            filter in item
                                ? item[filter as keyof typeof item]
                                : item,
                        participation: this.participatedMissions.includes(
                            item.id
                        ),
                        distance: parseFloat(
                            item.distance
                                .replace(/[^\d,.]/gu, '')
                                .replace(/,/gu, '.')
                        ),
                        credits:
                            'type' in item
                                ? this.apiStore.missions[item.type]
                                      ?.average_credits ?? 0
                                : Number.MAX_SAFE_INTEGER,
                        progress: 'progress' in item ? item.progress.width : 0,
                        same: 'building' in item ? item.building.same : false,
                    }[filter];
                    if (Array.isArray(value))
                        return (value as unknown[]).includes(itemValue);
                    if (filter === 'progress') return itemValue <= 100 - value;
                    if (['credits', 'freeBeds', 'freeCells'].includes(filter))
                        return itemValue >= value;
                    return itemValue <= value;
                })
            );
        },
        sortedItems() {
            const sortValues: Record<string, number | string> = {};

            const directionModifier = { asc: 1, desc: -1 }[this.table.sortDir];

            const findSortValue = (
                item: (typeof this.filteredItems)[number]
            ): number | string => {
                if (item.id in sortValues) return sortValues[item.id];
                const sort = this.table.sort;

                let sortValue: boolean | number | string = 0;

                if (sort === 'participation') {
                    sortValue = this.participatedMissions.includes(item.id);
                } else if (sort === 'distance') {
                    sortValue = parseFloat(
                        item.distance
                            .replace(/[^\d,.]/gu, '')
                            .replace(/,/gu, '.')
                    );
                } else if (sort === 'credits') {
                    sortValue =
                        'type' in item
                            ? this.apiStore.missions[item.type]
                                  ?.average_credits ?? 0
                            : Number.MAX_SAFE_INTEGER;
                } else if (sort === 'progress') {
                    sortValue =
                        'progress' in item
                            ? // hacky way to respect progress and status
                              item.progress.width +
                              ['', 'green', 'yellow', 'red'].indexOf(
                                  item.status
                              ) /
                                  10_000
                            : 0;
                } else if (sort === 'patients') {
                    sortValue =
                        'patients' in item
                            ? // hacky way to respect current and total
                              item.patients.current +
                              item.patients.total / 10_000
                            : 0;
                } else if (sort === 'building') {
                    sortValue = 'building' in item ? item.building.id : 0;
                } else if (sort === 'same') {
                    sortValue = 'building' in item ? item.building.same : 0;
                } else if (sort in item) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - yes, TS is not happy because credits doesn't exist on all item types mimimi
                    sortValue = item[sort];
                }

                if (typeof sortValue === 'boolean')
                    sortValue = Number(sortValue);

                return sortValue;
            };

            return [...this.filteredItems].sort((a, b) => {
                const sortValueA = findSortValue(a);
                const sortValueB = findSortValue(b);

                if (
                    typeof sortValueA === 'string' ||
                    typeof sortValueB === 'string'
                ) {
                    return (
                        sortValueA
                            .toString()
                            .localeCompare(sortValueB.toString()) *
                        directionModifier
                    );
                }
                return (sortValueA - sortValueB) * directionModifier;
            });
        },
        shownItems() {
            if ('showEach' in this.table && this.table.showEach) {
                const showEach = this.table.showEach;
                const lists: Record<string, number> = {};
                return this.sortedItems.filter(item => {
                    if (!('list' in item)) return true;
                    const list = item.list;
                    if (lists[list] === undefined) lists[list] = 0;
                    if (lists[list] >= showEach) return false;
                    lists[list]++;
                    return true;
                });
            }
            return this.sortedItems;
        },
        ...mapState(defineAPIStore, {
            participatedMissions: 'participatedMissions',
        }),
        hotkeysParam() {
            return {
                component: this,
                data: {},
                methods: {
                    alarm: this.alarm,
                },
                computed: {
                    sortedItems: Object.fromEntries(
                        Object.keys(this.tables).map(key => [
                            key,
                            key === this.tableType ? this.sortedItems : [],
                        ])
                        // yes, what a wonderful hack, but I didn't find a better way
                    ) as RedesignVehicleComponent['Computed']['hotkeysParam']['computed']['sortedItems'],
                },
            };
        },
        starredMissionButtons() {
            if (!this.starredMissionsEnabled || this.tableType !== 'mission')
                return {};
            const btnClass = useRootStore().nodeAttribute(
                'extendedCallList_starrable-missions_btn'
            );
            const getSetting = <T = boolean,>(
                settingId: string,
                defaultValue?: T
            ) =>
                this.settingsStore.getSetting<T>({
                    moduleId: 'extendedCallList',
                    settingId,
                    defaultValue,
                });
            const setSetting = <T = boolean,>(settingId: string, value: T) =>
                this.settingsStore.setSetting<T>({
                    moduleId: 'extendedCallList',
                    settingId,
                    value,
                });
            return Object.fromEntries(
                this.items.map(({ id }) => {
                    const missionId = id.toString();
                    return [
                        missionId,
                        createBtn(
                            window[PREFIX] as Vue,
                            'extendedCallList',
                            missionId,
                            this.starredMissions.includes(missionId),
                            btnClass,
                            getSetting,
                            setSetting
                        ),
                    ];
                })
            );
        },
    },
    methods: {
        getUrl(item) {
            if (this.vehicle.windowType === 'empty') return '';
            if (this.vehicle.windowType === 'missions')
                return `/missions/${item.id}`;
            if (this.vehicle.transportRequestType === 'trailer')
                return `/vehicles/${item.id}`;
            return `/buildings/${item.id}`;
        },
        setList(_, group) {
            this.tables[this.tableType].list = this.lists[group];
            this.setSetting(`${this.tableType}.list`, this.table.list).then();
        },
        clickListTab() {
            this.$el
                .querySelector<HTMLSpanElement>(
                    `.vue-tabs .vue-tab [data-list="${this.table.list}"]`
                )
                ?.click();
        },
        setSort(sort) {
            if (this.table.sort === sort) {
                this.tables[this.tableType].sortDir =
                    this.table.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
                this.tables[this.tableType].sortDir = 'asc';
            }
            this.tables[this.tableType].sort = sort;
            this.setSetting(`${this.tableType}.sort`, this.table.sort).then(
                () =>
                    this.setSetting(
                        `${this.tableType}.sortDir`,
                        this.table.sortDir
                    )
            );
        },
        alarm(missionId) {
            const url = new URL(
                `/missions/${missionId}/alarm`,
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
            this.lightbox.apiStore
                .request({
                    url: `/missions/${missionId}/alarm`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `vehicles/${this.vehicle.id}`,
                            window.location.origin
                        ).toString(),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-vehicle-alarm-${this.vehicle.id}-to-${missionId}`,
                })
                .then(() =>
                    this.$set(
                        this.lightbox,
                        'src',
                        `/vehicles/${this.vehicle.id}`
                    )
                );
        },
        dispatch(id) {
            if (this.vehicle.windowType === 'empty') return;
            if (this.vehicle.windowType === 'missions') return this.alarm(id);
            switch (this.vehicle.transportRequestType) {
                case 'patient':
                case 'patient-intermediate':
                    this.approach(`/vehicles/${this.vehicle.id}/patient/${id}`);
                    break;
                case 'prisoner':
                case 'prisoner-intermediate':
                    this.approach(
                        `/vehicles/${this.vehicle.id}/gefangener/${id}`
                    );
                    break;
                case 'trailer':
                    this.approach(
                        `/vehicles/${this.vehicle.id}/alarm?vehicle_ids%5B%5D=${id}`,
                        false
                    );
                    break;
            }
        },
        approach(url, followRedirect = true) {
            this.lightbox.apiStore
                .request({
                    url,
                    feature: `redesign-vehicle-approach`,
                })
                .then((res: Response) => {
                    if (res.redirected && followRedirect) {
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
                            const { next: nextVehicle } = await parser.default({
                                doc: new DOMParser().parseFromString(
                                    html,
                                    'text/html'
                                ),
                                href: url,
                                getIdFromEl: this.lightbox.getIdFromEl,
                                LSSM: this.lightbox,
                                $m: this.lightbox.$m,
                                $sm: this.lightbox.$sm,
                                $mc: this.lightbox.$mc,
                                $smc: this.lightbox.$smc,
                            });
                            if (nextVehicle < 0) {
                                import(
                                    `../i18n/${this.lightbox.rootStore.locale}/vehicle/nextfms.json`
                                ).then(t => {
                                    this.$i18n.mergeLocaleMessage(
                                        this.lightbox.rootStore.locale,
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
                                `/vehicles/${nextVehicle}`
                            );
                        });
                    });
                });
        },
        deleteVehicle() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            this.$modal.show('dialog', {
                title: this.lightbox.$sm('delete.title'),
                text: this.lightbox.$sm('delete.text', {
                    caption: this.vehicle.name,
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
                            LSSM.lightbox.apiStore
                                .request({
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
                                        ).toString(),
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
            this.lightbox.apiStore
                .request({
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
        backalarmFollowUp(missionId) {
            this.lightbox.apiStore
                .request({
                    url: `/vehicles/${this.vehicle.id}/backalarm?only_mission_id=${missionId}`,
                    feature: `redesign-vehicle-backalarm-only_mission`,
                })
                .then(() => {
                    this.$set(
                        this.lightbox,
                        'src',
                        `/vehicles/${this.vehicle.id}`
                    );
                });
        },
        backalarmCurrent() {
            this.lightbox.apiStore
                .request({
                    url: `/vehicles/${this.vehicle.id}/backalarm?next_mission=1`,
                    feature: `redesign-vehicle-backalarm-next_mission`,
                })
                .then(() => {
                    this.$set(
                        this.lightbox,
                        'src',
                        `/vehicles/${this.vehicle.id}`
                    );
                });
        },
        switchState() {
            if (![2, 6].includes(this.vehicle.fms)) return;
            const target = this.vehicle.fms === 2 ? 6 : 2;
            this.lightbox.apiStore
                .request({
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
        updateFilter(filter) {
            this.setSetting(
                `${this.tableType}.filter.${filter}`,
                this.table.filter[filter]
            );
        },
        updateShowEach() {
            if ('showEach' in this.table) {
                this.setSetting(
                    `${this.tableType}.showEach`,
                    this.table.showEach
                );
            }
        },
        release() {
            if (this.vehicle.windowType !== 'transportRequest') return;
            const type = this.tableType;
            if (
                type !== 'patient' &&
                type !== 'prisoner' &&
                type !== 'patientIntermediate' &&
                type !== 'prisonerIntermediate'
            )
                return;

            const normalizedType = (
                {
                    patient: 'patient',
                    patientIntermediate: 'patient',
                    prisoner: 'prisoner',
                    prisonerIntermediate: 'prisoner',
                } as Record<typeof type, 'patient' | 'prisoner'>
            )[type];

            const releaseHandler = async () => {
                if (type === 'patient') {
                    this.$set(
                        this.lightbox,
                        'src',
                        `/vehicles/${this.vehicle.id}/patient/-1`
                    );
                    return this.$modal.hide('dialog');
                }
                const url = new URL(
                    `/missions/${
                        this.vehicle.currentMission?.id ?? 0
                    }/gefangene/entlassen`,
                    window.location.origin
                );
                url.searchParams.append('_method', 'post');
                url.searchParams.append(
                    'authenticity_token',
                    this.vehicle.authenticity_token
                );
                this.lightbox.apiStore
                    .request({
                        url: `${url.pathname}?vehicle_id=${this.vehicle.id}`,
                        init: {
                            credentials: 'include',
                            headers: {
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
                            },
                            referrer: new URL(
                                `vehicles/${this.vehicle.id}`,
                                window.location.origin
                            ).toString(),
                            body: url.searchParams.toString(),
                            method: 'POST',
                            mode: 'cors',
                        },
                        feature: `redesign-vehicle-release-prisoners`,
                    })
                    .then((res: Response) => {
                        this.$set(
                            this.lightbox,
                            'src',
                            new URL(res.url, window.location.origin)
                                .pathname === url.pathname
                                ? `/vehicles/${this.vehicle.id}`
                                : res.url
                        );
                        this.$modal.hide('dialog');
                    });
            };

            if (this.tables[type].disableReleaseConfirmation)
                return releaseHandler();

            this.$modal.show('dialog', {
                title: this.lightbox.$sm(`release.${normalizedType}.title`),
                text: this.lightbox.$sm(`release.${normalizedType}.text`),
                buttons: [
                    {
                        title: this.lightbox.$sm('release.cancel'),
                        default: true,
                        handler: () => this.$modal.hide('dialog'),
                    },
                    {
                        title: this.lightbox.$sm(`release.disable`),
                        handler: () => {
                            this.tables[type].disableReleaseConfirmation = true;
                            this.setSetting(
                                `${normalizedType}.disableReleaseConfirmation`,
                                true
                            ).then(() => releaseHandler());
                        },
                    },
                    {
                        title: this.lightbox.$sm('release.confirm'),
                        handler: releaseHandler,
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
            this.lightbox.apiStore
                .request({
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
                            LSSM: this.lightbox,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        if (
                            result.windowType === 'transportRequest' &&
                            result.transportRequestType === 'patient'
                        )
                            this.$set(this.lightbox, 'data', result);

                        this.lightbox.finishLoading(
                            'vehicle-load_all_hospitals'
                        );
                    });
                });
        },
        updateStarredMissions() {
            this.starredMissionsEnabled = false;
            return this.settingsStore
                .getSetting<boolean>({
                    moduleId: 'extendedCallList',
                    settingId: 'starrableMissions',
                })
                .then(starrableMissions => {
                    this.starredMissionsEnabled = starrableMissions;
                    if (starrableMissions) {
                        return this.settingsStore.getSetting<string[]>({
                            moduleId: 'extendedCallList',
                            settingId: 'starredMissions',
                        });
                    }
                    return [];
                })
                .then(
                    starredMissions => (this.starredMissions = starredMissions)
                );
        },
        switchStarredMission(missionId) {
            const btn = this.starredMissionButtons[missionId];
            if (!btn) return;
            if (btn.switch) btn.switch(true).then(this.updateStarredMissions);
            else this.updateStarredMissions();
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
            this.updateStarredMissions().then();

            this.clickListTab();

            this.lightbox.setHotkeyRedesignParam('vehicles', this.hotkeysParam);
            this.lightbox.finishLoading('vehicle-updated-data');
        },
        hotkeysParam() {
            this.lightbox.setHotkeyRedesignParam('vehicles', this.hotkeysParam);
        },
    },
    beforeMount() {
        // load settings
        Object.entries(this.tables).forEach(([table, props]) => {
            Object.entries(props).forEach(([prop, value]) => {
                if (prop === 'filter') {
                    return Object.entries(value).forEach(([filter, value]) => {
                        this.getSetting(
                            `${table}.${prop}.${filter}`,
                            value
                        ).then(value => this.$set(props.filter, filter, value));
                    });
                }
                this.getSetting(`${table}.${prop}`, value)
                    .then(value => this.$set(props, prop, value))
                    .then(() => {
                        if (table === this.tableType && prop === 'list')
                            this.clickListTab();
                    });
            });
        });
    },
    beforeDestroy() {
        this.lightbox.unsetHotkeyRedesignParam('vehicles');
    },
    mounted() {
        this.updateStarredMissions().then();

        this.lightbox.setHotkeyRedesignParam('vehicles', this.hotkeysParam);
        this.lightbox.finishLoading('vehicle-mounted');
    },
});
</script>

<style scoped lang="sass">
.well dl
    dt, dd
        margin-bottom: 10px

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

        &:nth-child(2):not(.nav-btns)
            width: 100%

    .nav-btns
        position: absolute
        right: 1em
        transition: right 1s

.vehicle-img
    right: calc(4 * 34px)
    position: absolute
</style>
