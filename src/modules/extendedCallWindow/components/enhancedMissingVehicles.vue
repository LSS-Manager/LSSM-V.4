<template>
    <div
        class="alert alert-missing-vehicles"
        :class="{
            overlay,
            minified,
            'alert-success': missingRequirementsCheck,
            'alert-danger': !missingRequirementsCheck,
        }"
        :style="`top: ${drag.top}px; left: ${drag.left}px`"
        :id="id"
    >
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="textMode ? faTable : faParagraph"
            :fixed-width="true"
            @click="toggleTextMode"
        ></font-awesome-icon>
        <div v-if="hoverTip" class="alert alert-info">
            {{ $m('tip.textMode') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="minified ? faExpandAlt : faCompressAlt"
            :fixed-width="true"
            @click="toggleMinified"
        ></font-awesome-icon>
        <div v-if="hoverTip" class="alert alert-info">
            {{ $m('tip.minified') }}
        </div>
        <font-awesome-icon
            v-show="overlay"
            :icon="faArrowsAlt"
            class="pull-right dragging-field"
            :class="{ 'hover-tip': hoverTip }"
            :fixed-width="true"
            @mousedown="dragStart"
        ></font-awesome-icon>
        <div v-if="hoverTip" class="alert alert-info">
            {{ $m('tip.dragging') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="overlay ? faAngleDoubleDown : faAngleDoubleUp"
            :fixed-width="true"
            @click="toggleOverlay"
        ></font-awesome-icon>
        <div v-if="hoverTip" class="alert alert-info">
            {{ $m('tip.overlay') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="pushedRight ? faAngleDoubleLeft : faAngleDoubleRight"
            :fixed-width="true"
            @click="toggleRight"
            v-if="!overlay"
        ></font-awesome-icon>
        <div class="alert alert-info" v-if="!overlay && hoverTip">
            {{ $m(`tip.push${pushedRight ? 'Left' : 'Right'}`) }}
        </div>
        <span v-if="!textMode">{{ extras }}</span>
        <div class="row" v-if="!overlay && !textMode && !pushedRight">
            <div class="col-md-6" id="lssm-missing-vehicles-left-col">
                <enhanced-missing-vehicles-table
                    :missing-requirements="
                        missingRequirementsSorted.slice(
                            0,
                            Math.ceil(missingRequirementsFiltered.length / 2)
                        )
                    "
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="missingRequirementsSearch"
                    @sort="setSort"
                    @search="s => (missingRequirementsSearch = s)"
                ></enhanced-missing-vehicles-table>
            </div>
            <div class="col-md-6">
                <enhanced-missing-vehicles-table
                    :missing-requirements="
                        missingRequirementsSorted.slice(
                            Math.ceil(missingRequirementsFiltered.length / 2)
                        )
                    "
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="missingRequirementsSearch"
                    @sort="setSort"
                    @search="s => (missingRequirementsSearch = s)"
                ></enhanced-missing-vehicles-table>
            </div>
        </div>
        <div class="row" v-else-if="(overlay || pushedRight) && !textMode">
            <div class="col-md-12">
                <enhanced-missing-vehicles-table
                    :missing-requirements="missingRequirementsSorted"
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="missingRequirementsSearch"
                    @sort="setSort"
                    @search="s => (missingRequirementsSearch = s)"
                ></enhanced-missing-vehicles-table>
            </div>
        </div>
        <div v-else>
            {{ missingText }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons/faAngleDoubleUp';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';

import {
    EnhancedMissingVehicles,
    EnhancedMissingVehiclesComputed,
    EnhancedMissingVehiclesMethods,
    EnhancedMissingVehiclesProps,
} from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

export default Vue.extend<
    EnhancedMissingVehicles,
    EnhancedMissingVehiclesMethods,
    EnhancedMissingVehiclesComputed,
    EnhancedMissingVehiclesProps
>({
    name: 'enhancedMissingVehicles',
    components: {
        EnhancedMissingVehiclesTable: () =>
            import(
                /* webpackChunkName: "modules/extendedCallWindow/components/enhancedMissingVehiclesTable" */ './enhancedMissingVehiclesTable.vue'
            ),
    },
    data() {
        return {
            faAngleDoubleUp,
            faAngleDoubleDown,
            faAngleDoubleLeft,
            faAngleDoubleRight,
            faArrowsAlt,
            faCompressAlt,
            faExpandAlt,
            faTable,
            faParagraph,
            id: this.$store.getters.nodeAttribute('missing_text', true),
            missingRequirementsSearch: '',
            sort: 'vehicle',
            sortDir: 'asc',
            requirements: this.missingRequirements,
            overlay: undefined,
            minified: undefined,
            textMode: undefined,
            pushedRight: undefined,
            hoverTip: false,
            drag: {
                active: false,
                top: 60,
                left: window.innerWidth * 0.03,
                offset: {
                    x: 0,
                    y: 0,
                },
            },
        };
    },
    props: {
        missingRequirements: {
            type: Array,
            required: true,
        },
        extras: {
            type: String,
            required: false,
            default: '',
        },
        missingText: {
            type: String,
            required: true,
        },
    },
    computed: {
        missingRequirementsFiltered() {
            return this.requirements.filter(req =>
                JSON.stringify(req)
                    .toLowerCase()
                    .match(this.missingRequirementsSearch.toLowerCase())
            );
        },
        missingRequirementsSorted() {
            return Object.values(
                this.missingRequirementsSearch
                    ? this.missingRequirementsFiltered
                    : this.requirements
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                if (a[this.sort] < b[this.sort]) return -1 * modifier;
                if (a[this.sort] > b[this.sort]) return modifier;
                return 0;
            });
        },
        missingRequirementsCheck() {
            return this.requirements.every(
                (req: { total: number; missing: number; selected: number }) => {
                    if ((req.total ?? req.missing) <= req.selected) return true;
                    else return false;
                }
            );
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(
                `modules.extendedCallWindow.enhancedMissingVehicles.${key}`,
                args
            );
        },
        setSort(s) {
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
        toggleOverlay() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: 'extendedCallWindow',
                    settingId: `overlay`,
                    value: !this.overlay,
                })
                .then(() => (this.overlay = !this.overlay));
        },
        toggleMinified() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: 'extendedCallWindow',
                    settingId: `minified`,
                    value: !this.minified,
                })
                .then(() => (this.minified = !this.minified));
        },
        toggleTextMode() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: 'extendedCallWindow',
                    settingId: `textMode`,
                    value: !this.textMode,
                })
                .then(() => (this.textMode = !this.textMode));
        },
        dragStart(e) {
            const current = { x: e.clientX, y: e.clientY };
            const missionHelperOffset = this.$el.getBoundingClientRect();
            document.body.classList.add('lssm-is-dragging');
            const topRight = {
                x: missionHelperOffset.x,
                y: missionHelperOffset.y,
            };
            this.drag.offset = {
                x: topRight.x - current.x,
                y: topRight.y - current.y,
            };
            this.drag.active = true;
            document.addEventListener('mouseup', this.dragEnd);
            document.addEventListener('mousemove', this.dragging);
        },
        async dragEnd() {
            this.drag.active = false;
            await this.$store.dispatch('settings/setSetting', {
                moduleId: 'extendedCallWindow',
                settingId: `drag`,
                value: this.drag,
            });
            document.body.classList.remove('lssm-is-dragging');
            document.removeEventListener('mouseup', this.dragEnd);
            document.removeEventListener('mousemove', this.dragging);
        },
        async dragging(e) {
            if (!this.drag.active) return;
            e.preventDefault();
            const current = { x: e.clientX, y: e.clientY };
            this.drag.top = current.y + this.drag.offset.y;
            this.drag.left = current.x + this.drag.offset.x;
        },
        toggleRight() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: 'extendedCallWindow',
                    settingId: `pushRight`,
                    value: !this.pushedRight,
                })
                .then(() => {
                    this.pushedRight = !this.pushedRight;
                    if (!this.pushedRight) {
                        document
                            .querySelector(
                                '.mission_header_info.row ~ div ~ .clearfix, .mission_header_info.row ~ .clearfix'
                            )
                            ?.after(this.$el);
                    } else {
                        document
                            .getElementById('mission-form')
                            ?.insertAdjacentElement('afterbegin', this.$el);
                    }
                });
        },
    },
    beforeMount() {
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'extendedCallWindow',
                settingId: 'overlay',
                defaultValue: false,
            })
            .then(overlay => (this.overlay = overlay));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'extendedCallWindow',
                settingId: 'minified',
                defaultValue: false,
            })
            .then(minified => (this.minified = minified));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'extendedCallWindow',
                settingId: 'textMode',
                defaultValue: false,
            })
            .then(textMode => (this.textMode = textMode));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'extendedCallWindow',
                settingId: 'pushRight',
                defaultValue: false,
            })
            .then(pushedRight => (this.pushedRight = pushedRight));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'extendedCallWindow',
                settingId: 'drag',
                defaultValue: false,
            })
            .then(drag => (this.drag = drag));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'extendedCallWindow',
                settingId: 'hoverTip',
                defaultValue: false,
            })
            .then(hoverTip => (this.hoverTip = hoverTip));
    },
    mounted() {
        const vehicleGroups = (this.$m('vehiclesByRequirement') as unknown) as {
            [group: string]: number[];
        };
        const water = this.$m('water').toString();
        const foam = this.$m('foam').toString();
        const categoriesById = {} as {
            [id: number]: string[];
        };
        Object.entries(vehicleGroups).forEach(([group, ids]) => {
            Object.values(ids).forEach(id => {
                if (!categoriesById.hasOwnProperty(id)) categoriesById[id] = [];
                categoriesById[id].push(group.replace(/(^\/)|(\/$)/g, ''));
            });
        });
        const vehicleList = document.getElementById('vehicle_show_table_all');
        if (!vehicleList) return;
        const amountObserver = new MutationObserver(() => {
            this.requirements.forEach(req => (req.selected = 0));
            const waterReq = this.requirements.find(
                ({ vehicle }) => vehicle === water
            );
            const foamReq = this.requirements.find(
                ({ vehicle }) => vehicle === foam
            );
            if (waterReq) {
                waterReq.selected = parseInt(
                    document
                        .querySelector<HTMLDivElement>(
                            '[id^="mission_water_holder_"] div.progress-bar-mission-window-water.progress-bar-danger, [id^="mission_water_holder_"] div.progress-bar-mission-window-water.progress-bar-success'
                        )
                        ?.textContent?.match(/\d{1,3}([,. ]\d{3})*/)?.[0]
                        ?.replace(/[,. ]/g, '') ?? '0'
                );
            } else if (foamReq) {
                foamReq.selected = parseInt(
                    document
                        .querySelector<HTMLDivElement>(
                            '[id^="mission_foam_holder_"] div.progress-bar-mission-window-water.progress-bar-danger, [id^="mission_foam_holder_"] div.progress-bar-mission-window-water.progress-bar-success'
                        )
                        ?.textContent?.match(/\d{1,3}([,. ]\d{3})*/)?.[0]
                        ?.replace(/[,. ]/g, '') ?? '0'
                );
            }
            vehicleList
                .querySelectorAll<HTMLInputElement>('.vehicle_checkbox:checked')
                .forEach(vehicle => {
                    categoriesById[
                        parseInt(
                            vehicle.getAttribute('vehicle_type_id') || '-1'
                        )
                    ]?.forEach(group => {
                        const req = this.requirements.find(({ vehicle }) =>
                            vehicle.match(new RegExp(group))
                        );
                        if (req) this.$set(req, 'selected', req.selected + 1);
                    });
                });
        });
        const amountElement = document.getElementById('vehicle_amount');

        if (amountElement) {
            amountObserver.observe(amountElement, {
                childList: true,
                characterData: true,
            });
        }
    },
});
</script>

<style scoped lang="sass">
.hover-tip
  cursor: pointer

  &:hover
    &+ .alert
      display: block

  &+ .alert
    display: none
    position: absolute
    z-index: 1

.alert

    &:not(.overlay) #lssm-missing-vehicles-left-col
        margin-top: 14px

    &.overlay
        z-index: 2
        position: fixed
        top: 3%
        left: 3%
        min-width: 100px
        max-width: calc(100% / 3)
        height: auto
        max-height: calc((100vh - 51.5px - 3%) * 0.97)
        transition: 100ms linear
        margin-bottom: 0.625em
        overflow: auto

    &.minified
        max-height: 1rem
        min-width: auto

        > div
            display: none

    h3
        margin-top: 0 !important

    .svg-inline--fa
        cursor: pointer
        position: relative
        top: -6px

    &.dragging-field
        cursor: move
</style>
