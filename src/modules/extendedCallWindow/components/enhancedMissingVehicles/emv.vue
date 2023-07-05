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
        :data-raw-text="missingText.trim()"
    >
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="textMode ? faTable : faParagraph"
            fixed-width
            @click="toggleTextMode"
        ></font-awesome-icon>
        <div v-if="hoverTip" class="alert alert-info">
            {{ $m('tip.textMode') }}
        </div>
        <font-awesome-icon
            :id="collapseBtnId"
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="minified ? faExpandAlt : faCompressAlt"
            fixed-width
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
            fixed-width
            @mousedown="dragStart"
        ></font-awesome-icon>
        <div v-if="hoverTip" class="alert alert-info">
            {{ $m('tip.dragging') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="overlay ? faAngleDoubleDown : faAngleDoubleUp"
            fixed-width
            @click="toggleOverlay"
        ></font-awesome-icon>
        <div v-if="hoverTip" class="alert alert-info">
            {{ $m('tip.overlay') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': hoverTip }"
            :icon="pushedRight ? faAngleDoubleLeft : faAngleDoubleRight"
            fixed-width
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
                    :calc-max-staff="calcMaxStaff"
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
                    :calc-max-staff="calcMaxStaff"
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
                    :calc-max-staff="calcMaxStaff"
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
import { useAPIStore } from '@stores/api';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';

import vehicleListObserveHandler from '../../assets/emv/getVehicleListObserveHandler';

import type {
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
    name: 'lssmv4-emv',
    components: {
        EnhancedMissingVehiclesTable: () =>
            import(
                /* webpackChunkName: "modules/extendedCallWindow/components/emvTable" */ './emvTable.vue'
            ),
    },
    data() {
        const rootStore = useRootStore();
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
            id: rootStore.nodeAttribute('missing_text', true),
            collapseBtnId: rootStore.nodeAttribute('emv-collapse-btn', true),
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
            calcMaxStaff: false,
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
                let left = a[this.sort];
                if (typeof left !== 'number' && typeof left !== 'string')
                    left = left.min;
                let right = b[this.sort];
                if (typeof right !== 'number' && typeof right !== 'string')
                    right = right.min;
                if (left < right) return -1 * modifier;
                if (left > right) return modifier;
                return 0;
            });
        },
        missingRequirementsCheck() {
            return this.requirements.every(
                (req: {
                    total: number;
                    missing: number;
                    selected: number | { min: number; max: number };
                }) =>
                    (req.total ?? req.missing) <=
                    (typeof req.selected === 'number'
                        ? req.selected
                        : this.calcMaxStaff
                        ? req.selected.max
                        : req.selected.min)
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
        getSetting(settingId) {
            return useSettingsStore().getSetting({
                moduleId: 'extendedCallWindow',
                settingId,
            });
        },
        setSetting(settingId, value) {
            return useSettingsStore().setSetting({
                moduleId: 'extendedCallWindow',
                settingId,
                value,
            });
        },
        toggleOverlay() {
            this.setSetting('overlay', !this.overlay).then(
                () => (this.overlay = !this.overlay)
            );
        },
        toggleMinified() {
            this.setSetting('minified', !this.minified).then(
                () => (this.minified = !this.minified)
            );
        },
        toggleTextMode() {
            this.setSetting('textMode', !this.textMode).then(
                () => (this.textMode = !this.textMode)
            );
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
            if (this.drag.top < 0) this.drag.top = 0;
            if (this.drag.left < 0) this.drag.left = 0;
            await this.setSetting('drag', this.drag);
            document.body.classList.remove('lssm-is-dragging');
            document.removeEventListener('mouseup', this.dragEnd);
            document.removeEventListener('mousemove', this.dragging);
        },
        async dragging(e) {
            if (!this.drag.active) return;
            e.preventDefault();
            const current = { x: e.clientX, y: e.clientY };
            this.drag.top = Math.max(current.y + this.drag.offset.y, 0);
            this.drag.left = Math.max(current.x + this.drag.offset.x, 0);
        },
        toggleRight() {
            this.setSetting('pushRight', !this.pushedRight).then(() => {
                this.pushedRight = !this.pushedRight;
                if (!this.pushedRight) {
                    document
                        .querySelector<HTMLDivElement>(
                            '.mission_header_info.row ~ div ~ .clearfix, .mission_header_info.row ~ .clearfix'
                        )
                        ?.after(this.$el);
                } else {
                    document
                        .querySelector<HTMLFormElement>('#mission-form')
                        ?.prepend(this.$el);
                }
            });
        },
    },
    beforeMount() {
        this.getSetting('overlay').then(overlay => (this.overlay = overlay));
        this.getSetting('minified').then(
            minified => (this.minified = minified)
        );
        this.getSetting('textMode').then(
            textMode => (this.textMode = textMode)
        );
        this.getSetting('pushRight').then(
            pushedRight => (this.pushedRight = pushedRight)
        );
        this.getSetting<EnhancedMissingVehicles['drag']>('drag').then(
            drag => (this.drag = drag)
        );
        this.getSetting('hoverTip').then(
            hoverTip => (this.hoverTip = hoverTip)
        );
        this.getSetting('emvMaxStaff').then(
            calcMaxStaff => (this.calcMaxStaff = calcMaxStaff)
        );
        useAPIStore().getVehicles('emv');
    },
    mounted() {
        const observeHandler = vehicleListObserveHandler(
            window[PREFIX] as Vue,
            this.missingRequirements,
            this.requirements,
            this.$utils.getMissionTypeInMissionWindow(),
            (requirement, value) => this.$set(requirement, 'selected', value),
            this.$m
        );
        const amountElement = document.querySelector('#vehicle_amount');

        if (!observeHandler || !amountElement) return;

        const amountObserver = new MutationObserver(observeHandler);

        amountObserver.observe(amountElement, {
            childList: true,
            characterData: true,
        });

        observeHandler();
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
        z-index: 3
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
        overflow: hidden

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
