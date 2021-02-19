<template>
    <lightbox :name="`vehicle-${vehicle.id}`">
        <h1>
            {{ vehicle.vehicle_name }}
            <img :src="vehicle.image" alt="" class="vehicle-img" />
        </h1>
        <div class="vehicle-window">
            <div class="well">
                <table class="table">
                    <tbody>
                        <tr v-if="vehicle.user">
                            <th>owner</th>
                            <td>
                                <a
                                    class="lightbox-open"
                                    :href="`/profile/${vehicle.user.id}`"
                                >
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
                                    class="lightbox-open"
                                    :href="`/buildings/${vehicle.building.id}`"
                                >
                                    {{ vehicle.building.caption }}
                                </a>
                            </td>
                            <td>
                                <a
                                    :href="`/vehicles/${vehicle.id}/move`"
                                    class="btn btn-default btn-xs lightbox-open"
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
                                    class="btn btn-default btn-xs lightbox-open"
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
                                    :class="`building_list_fms_${vehicle.fms}`"
                                >
                                    {{ $i18n.t('fmsReal2Show')[vehicle.fms] }}
                                </span>
                            </td>
                            <td>
                                switch FMS (2 ←→ 6)
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
                                    class="lightbox-open"
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
                                            :href="`/missions/${mission.id}`"
                                            class="lightbox-open"
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
            <div v-if="!vehicle.user" class="mission-tabs">
                <tabs :on-select="setMissionList">
                    <tab
                        v-for="group in ['own', 'alliance', 'all']"
                        :title="group"
                        :key="group"
                    ></tab>
                </tabs>
                <enhanced-table
                    :head="head"
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
                        <td>
                            <img :src="mission.image" :alt="mission.caption" />
                        </td>
                        <td>männle / starndl</td>
                        <td>
                            <a
                                :href="`/missions/${mission.id}`"
                                class="lightbox-open"
                                >{{ mission.caption }}</a
                            >
                            <br />
                            <small>{{ mission.adress }}</small>
                        </td>
                        <td>{{ mission.distance }}</td>
                        <td>
                            <div class="progress">
                                <div
                                    class="progress-bar progress-bar-danger"
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
                            'alarm'
                        </td>
                    </tr>
                </enhanced-table>
            </div>
            <div class="btn-group nav-btns">
                <button
                    class="btn btn-xs lightbox-open"
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
                    disabled
                >
                    <span class="glyphicon glyphicon-arrow-left"></span>
                </button>
                <button
                    class="btn btn-xs lightbox-open"
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
                    disabled
                >
                    <span class="glyphicon glyphicon-arrow-right"></span>
                </button>
            </div>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { VehicleWindow } from '../parsers/vehicle';

export default Vue.extend<
    {
        head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        missionListSrc: number;
        search: string;
        searchTimeout: null | number;
        sort: string;
        sortDir: 'asc' | 'desc';
    },
    {
        setMissionList(_: unknown, group: number): void;
        setSearch(search: string): void;
        setSort(type: string): void;
    },
    {
        missionList: VehicleWindow['mission_own'];
        missionListFiltered: VehicleWindow['mission_own'];
        missionListSorted: VehicleWindow['mission_own'];
    },
    { vehicle: VehicleWindow }
>({
    name: 'vehicle-lightbox',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../components/lightbox.vue'
            ),
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            head: {
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
            },
            missionListSrc: 0,
            search: '',
            searchTimeout: null,
            sort: 'distance',
            sortDir: 'asc',
        };
    },
    computed: {
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
    },
    props: {
        vehicle: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
.vehicle-window
    display: flex

    > .well
        width: calc(100% / 3)

        > table > tbody > tr
            > *
                border-top-width: 0
            > th
                float: right

    > div
        margin-left: 1em
        margin-right: 1em

        &.mission-tabs
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
