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
                    <dl></dl>
                    <pre>{{ JSON.stringify(vehicle, null, 4) }}</pre>
                </div>
                <!-- Vehicle related Actions -->
                <div class="btn-group pull-right" v-if="!vehicle.user"></div>
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
                >
                    <tr v-for="(item, index) in filteredItems" :key="index">
                        <td :colspan="Object.keys(tableHead).length">
                            <pre>{{ JSON.stringify(item, null, 4) }}</pre>
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

import { defineAPIStore } from '@stores/api';
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
            faSitemap,
            faPortrait,
            faUser,
            faAsterisk,
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
                        title: this.lightbox
                            .$sm('missions.progress')
                            .toString(),
                    },
                    patients: {
                        title: this.lightbox
                            .$sm('missions.patients')
                            .toString(),
                    },
                    alarm: {
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
            console.log(this.tables[this.tableType].filter);
            return this.items.map(item => ({
                ...item,
                filter: true,
                hidden: false,
            }));
        },
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
    },
    methods: {
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
