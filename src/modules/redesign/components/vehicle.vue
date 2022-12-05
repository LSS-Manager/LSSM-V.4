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
                                    ['patient', 'prisoner'].includes(
                                        vehicle.transportRequestType
                                    ) &&
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
            <div v-if="vehicle.windowType">
                <tabs>
                    <tab title="?"></tab>
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
                    :sort="tables[tableType].sort"
                    :sort-dir="tables[tableType].sortDir"
                >
                    <tr v-for="(item, index) in filteredItems" :key="index">
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
                                <a
                                    :href="getUrl(item)"
                                    class="lightbox-open"
                                    lightbox-open
                                >
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
                                            'missions.patientsProgress',
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
                                v-else-if="col === 'department'"
                                class="label"
                                :class="`label-${
                                    item.department ? 'success' : 'warning'
                                }`"
                            >
                                {{ lightbox.$sm(item.department) }}
                            </span>
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

import type { RedesignVehicleComponent as Component } from '../types/components/vehicle';

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
        // MultiSelect: () =>
        //     import(
        //         /* webpackChunkName: "components/settings/multi-select" */ '../../../components/setting/multi-select.vue'
        //     ),
        // SettingsNumber: () =>
        //     import(
        //         /* webpackChunkName: "components/settings/number" */ '../../../components/setting/number.vue'
        //     ),
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
                        progress: 100,
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                },
                patient: {
                    filter: {
                        department: [true, false],
                        distance: 0,
                        tax: 50,
                        beds: 0,
                        show: 0,
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    disableReleaseConfirmation: false,
                },
                prisoner: {
                    filter: {
                        distance: 0,
                        tax: 50,
                        free: 0,
                        show: 0,
                    },
                    sort: 'distance',
                    sortDir: 'asc',
                    disableReleaseConfirmation: false,
                },
                trailer: {
                    filter: {
                        distance: 0,
                        same: [true, false],
                        show: 0,
                    },
                    sort: 'distance',
                    sortDir: 'asc',
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
            if (this.vehicle.windowType === 'missions') return 'mission';
            return this.vehicle.transportRequestType;
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
            if (this.vehicle.windowType === 'missions') {
                head = {
                    list: { title: '' },
                    image: { title: '' },
                    participation: {
                        title: this.lightbox
                            .$sm('missions.participation')
                            .toString(),
                    },
                    caption: {
                        title: this.lightbox.$sm('missions.mission').toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    credits: {
                        title: this.lightbox.$sm('missions.credits').toString(),
                    },
                    progress: {
                        title: this.lightbox
                            .$sm('missions.progress')
                            .toString(),
                    },
                    patients: {
                        title: this.lightbox
                            .$sm('missions.patients')
                            .toString(),
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
                        title: this.lightbox
                            .$sm('hospitals.hospital')
                            .toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    freeBeds: {
                        title: this.lightbox.$sm('hospitals.beds').toString(),
                    },
                    tax: { title: this.lightbox.$sm('tax').toString() },
                    department: {
                        title: this.lightbox
                            .$sm('hospitals.department', {
                                department: this.vehicle.department,
                            })
                            .toString(),
                    },
                    dispatch: {
                        title: '',
                        noSort: true,
                    },
                };
            } else if (this.vehicle.transportRequestType === 'prisoner') {
                head = {
                    list: { title: '' },
                    caption: {
                        title: this.lightbox.$sm('cells.cell').toString(),
                    },
                    distance: {
                        title: this.lightbox.$sm('distance').toString(),
                    },
                    freeCells: {
                        title: this.lightbox.$sm('cells.free').toString(),
                    },
                    tax: { title: this.lightbox.$sm('tax').toString() },
                    dispatch: {
                        title: '',
                        noSort: true,
                    },
                };
            } else if (this.vehicle.transportRequestType === 'trailer') {
                head = {
                    caption: {
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
            }
            return head;
        },
        items() {
            if (this.vehicle.windowType === 'transportRequest') {
                switch (this.vehicle.transportRequestType) {
                    case 'patient':
                        return [
                            ...this.vehicle.hospitals.own,
                            ...this.vehicle.hospitals.alliance,
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
            return this.items.map(item => ({
                ...item,
                filter: true,
                hidden: false,
            }));
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
                    missionsSorted: [],
                },
            };
        },
        starredMissionButtons() {
            if (!this.starredMissionsEnabled || this.tableType !== 'mission')
                return {};
            const btnClass = useRootStore().nodeAttribute(
                'extendedCallList_starrable-missions_btn'
            );
            const getSetting = <T = boolean>(
                settingId: string,
                defaultValue?: T
            ) =>
                this.settingsStore.getSetting<T>({
                    moduleId: 'extendedCallList',
                    settingId,
                    defaultValue,
                });
            const setSetting = <T = boolean>(settingId: string, value: T) =>
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
            if (this.vehicle.windowType === 'missions')
                return `/missions/${item.id}`;
            if (this.vehicle.transportRequestType === 'trailer')
                return `/vehicles/${item.id}`;
            return `/buildings/${item.id}`;
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
        release() {
            if (this.vehicle.windowType !== 'transportRequest') return;
            const type = this.vehicle.transportRequestType;
            if (type !== 'patient' && type !== 'prisoner') return;

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
                title: this.lightbox.$sm(`release.${type}.title`),
                text: this.lightbox.$sm(`release.${type}.text`),
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
                                `${type}.disableReleaseConfirmation`,
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
                this.getSetting(`${table}.${prop}`, value).then(value =>
                    this.$set(props, prop, value)
                );
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
