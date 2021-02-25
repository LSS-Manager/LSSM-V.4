<template>
    <div>
        <h1>
            {{ vehicle.vehicle_name }}
            <img :src="vehicle.image" alt="" class="vehicle-img" />
        </h1>
        <div class="vehicle-window">
            <div>
                <div class="well">
                    <table class="table">
                        <tbody>
                            <tr v-if="vehicle.user">
                                <th>owner</th>
                                <td>
                                    <a :href="`/profile/${vehicle.user.id}`">
                                        <img
                                            :src="
                                                `/images/user_${
                                                    vehicle.user.online
                                                        ? 'green'
                                                        : 'gray'
                                                }.png`
                                            "
                                            alt=""
                                        />
                                        {{ vehicle.user.name }}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>station</th>
                                <td>
                                    <a
                                        :href="
                                            `/buildings/${vehicle.building.id}`
                                        "
                                    >
                                        {{ vehicle.building.caption }}
                                    </a>
                                </td>
                                <td>
                                    <a
                                        :href="`/vehicles/${vehicle.id}/move`"
                                        class="btn btn-default btn-xs"
                                    >
                                        move
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>vehicletype</th>
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
                                    >
                                        edit color
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>FMS</th>
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
                                    switch FMS (2 ←→ 6) / backalarm
                                </td>
                            </tr>
                            <tr>
                                <th>max staff</th>
                                <td>
                                    {{ vehicle.max_staff }}
                                </td>
                            </tr>
                            <tr v-if="vehicle.water_amount">
                                <th>water amount</th>
                                <td>
                                    {{ vehicle.water_amount }}
                                </td>
                            </tr>
                            <tr>
                                <th>mileage</th>
                                <td>
                                    {{ vehicle.mileage }}
                                </td>
                            </tr>
                            <tr v-if="vehicle.current_mission">
                                <th>current mission</th>
                                <td>
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
                                <th>followup missions</th>
                                <td>
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
                                <th>schdaff</th>
                                <td>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>namö</th>
                                                <th>schooling</th>
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
                    >
                        edüt
                    </a>
                    <a
                        :href="`/vehicles/${vehicle.id}/stats`"
                        class="btn btn-default"
                    >
                        Statistiken
                    </a>
                    <a
                        :href="`/vehicles/${vehicle.id}/zuweisung`"
                        class="btn btn-default"
                    >
                        Leude druff
                    </a>

                    <button
                        class="btn btn-danger"
                        disabled
                        v-if="vehicle.fms === 2"
                    >
                        löschen
                    </button>
                </div>
            </div>
            <div
                v-if="!vehicle.user && !vehicle.has_hospitals"
                class="table-tabs"
            >
                <tabs :on-select="setMissionList">
                    <tab
                        v-for="group in ['own', 'alliance', 'all']"
                        :title="group"
                        :key="group"
                    ></tab>
                </tabs>
                <enhanced-table
                    :head="mission_head"
                    :table-attrs="{ class: 'table' }"
                    :search="search"
                    @search="setSearch"
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                >
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
                            <img :src="mission.image" :alt="mission.caption" />
                        </td>
                        <td>
                            {{
                                participated_missions.includes(
                                    mission.id.toString()
                                )
                            }}
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
                                nafahra
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
                                is scho dahanna na alarmiert
                            </span>
                        </td>
                    </tr>
                </enhanced-table>
            </div>
            <div
                v-else-if="!vehicle.user && vehicle.has_hospitals"
                class="table-tabs"
            >
                <tabs :on-select="setHospitalList">
                    <tab
                        v-for="group in ['own', 'alliance', 'all']"
                        :title="group"
                        :key="group"
                    ></tab>
                </tabs>
                <enhanced-table
                    :head="hospital_head"
                    :table-attrs="{ class: 'table' }"
                    :search="search"
                    @search="setSearch"
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                >
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
                                {{ hospital.department }}
                            </span>
                        </td>
                        <td>
                            <a
                                :href="
                                    `/vehicles/${vehicle.id}/patient/${hospital.id}`
                                "
                                class="btn btn-success"
                            >
                                nafahra
                            </a>
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
import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';
import { faPortrait } from '@fortawesome/free-solid-svg-icons/faPortrait';
import { VehicleWindow } from '../parsers/vehicle';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Vehicle } from 'typings/Vehicle';

export default Vue.extend<
    {
        faSitemap: IconDefinition;
        faPortrait: IconDefinition;
        missionListSrc: number;
        search: string;
        searchTimeout: null | number;
        sort: string;
        sortDir: 'asc' | 'desc';
        hospitalListSrc: number;
        color2Class: {
            red: 'danger';
            yellow: 'warning';
            green: 'success';
        };
    },
    {
        setMissionList(_: unknown, group: number): void;
        setHospitalList(_: unknown, group: number): void;
        setSearch(search: string): void;
        setSort(type: string): void;
        alarm(missionId: number): void;
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
    },
    { vehicle: VehicleWindow; lightbox: Vue }
>({
    name: 'vehicle-lightbox',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            faSitemap,
            faPortrait,
            missionListSrc: 0,
            search: '',
            searchTimeout: null,
            sort: 'distance',
            sortDir: 'asc',
            hospitalListSrc: 0,
            color2Class: {
                red: 'danger',
                yellow: 'warning',
                green: 'success',
            },
        };
    },
    computed: {
        participated_missions() {
            return Object.keys(
                (this.$store.getters['api/vehiclesByTarget'] as {
                    mission: { [id: number]: Vehicle[] };
                    building: { [id: number]: Vehicle[] };
                }).mission
            );
        },
        mission_head() {
            return {
                ...(this.missionListSrc === 2 ? { list: { title: '' } } : {}),
                img: {
                    title: '',
                    noSort: true,
                },
                participation: {
                    title: 'participation',
                },
                mission: {
                    title: 'mission',
                },
                distance: {
                    title: 'distance',
                },
                progress: {
                    title: 'progress',
                },
                patients: {
                    title: 'patients',
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
            return this.missionList.map(m => ({
                ...m,
                participation: true,
                hidden: !(
                    (this.missionListSrc === 2 ||
                        (this.missionListSrc === 0 &&
                            m.list === 'mission_own') ||
                        (this.missionListSrc === 1 &&
                            m.list === 'mission_alliance')) &&
                    JSON.stringify(Object.values(m))
                        .toLowerCase()
                        .match(this.search.trim().toLowerCase())
                ),
            }));
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
                    title: 'hospital',
                },
                distance: {
                    title: 'distance',
                },
                beds: {
                    title: 'beds',
                },
                ...(this.hospitalListSrc ? { tax: { title: 'tax' } } : {}),
                department: {
                    title: 'department',
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
            return this.hospitalList.map(m => ({
                ...m,
                hidden: !(
                    (this.hospitalListSrc === 2 ||
                        (this.hospitalListSrc === 0 &&
                            m.list === 'own_hospitals') ||
                        (this.hospitalListSrc === 1 &&
                            m.list === 'alliance_hospitals')) &&
                    JSON.stringify(Object.values(m))
                        .toLowerCase()
                        .match(this.search.trim().toLowerCase())
                ),
            }));
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
                let f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let s = b[this.sort] ?? '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    methods: {
        setMissionList(_, list) {
            this.missionListSrc = list;
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
        },
        setHospitalList(_, list) {
            this.hospitalListSrc = list;
        },
        alarm(mission) {
            const url = new URL(
                `/missions/${mission}/alarm`,
                window.location.href
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
                        referrer: `https://www.leitstellenspiel.de/vehicles/${this.vehicle.id}`,
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
    },
    props: {
        vehicle: {
            type: Object,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.$el.addEventListener('click', e => {
            e.preventDefault();
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            if (!target || !target.hasAttribute('href')) return;
            this.$set(this.lightbox, 'src', target.getAttribute('href'));
        });
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

.titleHidden .nav-btns
    right: calc(3 * 34px)
</style>
