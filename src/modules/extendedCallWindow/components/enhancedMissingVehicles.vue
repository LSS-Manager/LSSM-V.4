<template>
    <div
        class="alert alert-danger alert-missing-vehicles"
        :class="{ overlay, minified }"
        :style="`top: ${drag.top}px; left: ${drag.left}px`"
        :id="id"
    >
        <font-awesome-icon
            class="pull-right"
            :icon="textMode ? faTable : faParagraph"
            :fixed-width="true"
            @click="toggleTextMode"
        ></font-awesome-icon>
        <font-awesome-icon
            class="pull-right"
            :icon="minified ? faExpandAlt : faCompressAlt"
            :fixed-width="true"
            @click="toggleMinified"
        ></font-awesome-icon>
        <font-awesome-icon
            v-show="overlay"
            :icon="faArrowsAlt"
            class="pull-right dragging-field"
            :fixed-width="true"
            @mousedown="dragStart"
        ></font-awesome-icon>
        <font-awesome-icon
            class="pull-right"
            :icon="overlay ? faAngleDoubleDown : faAngleDoubleUp"
            :fixed-width="true"
            @click="toggleOverlay"
        ></font-awesome-icon>
        <span v-if="!textMode">{{ extras }}</span>
        <div class="row" v-if="!overlay && !textMode">
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
        <div class="row" v-else-if="overlay && !textMode">
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
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons/faAngleDoubleUp';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph';
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
                /* webpackChunkName: "extendedCallWindow/components/enhancedMissingVehiclesTable" */ './enhancedMissingVehiclesTable.vue'
            ),
    },
    data() {
        return {
            faAngleDoubleUp,
            faAngleDoubleDown,
            faArrowsAlt,
            faCompressAlt,
            faExpandAlt,
            faTable,
            faParagraph,
            id: this.$store.getters.nodeAttribute('missing_text'),
            missingRequirementsSearch: '',
            sort: 'vehicle',
            sortDir: 'asc',
            requirements: this.missingRequirements,
            overlay: undefined,
            minified: undefined,
            textMode: undefined,
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
    },
    methods: {
        setSort(s) {
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
        toggleOverlay() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
                    settingId: `overlay`,
                    value: !this.overlay,
                })
                .then(() => (this.overlay = !this.overlay));
        },
        toggleMinified() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
                    settingId: `minified`,
                    value: !this.minified,
                })
                .then(() => (this.minified = !this.minified));
        },
        toggleTextMode() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
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
    },
    beforeMount() {
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'overlay',
                defaultValue: false,
            })
            .then(overlay => (this.overlay = overlay));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'minified',
                defaultValue: false,
            })
            .then(minified => (this.minified = minified));
    },
    mounted() {
        const vehicleGroups = (this.$t(
            'modules.extendedCallWindow.enhancedMissingVehicles.vehiclesByRequirement'
        ) as unknown) as {
            [group: string]: number[];
        };
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
            console.log('selected');
            this.requirements.forEach(req => (req.selected = 0));
            (vehicleList.querySelectorAll(
                '.vehicle_checkbox:checked'
            ) as NodeListOf<HTMLInputElement>).forEach(vehicle => {
                categoriesById[
                    parseInt(vehicle.getAttribute('vehicle_type_id') || '-1')
                ]?.forEach(group => {
                    const req = this.requirements.find(({ vehicle }) =>
                        vehicle.match(new RegExp(group))
                    );
                    console.log(group, req);
                    if (req) this.$set(req, 'selected', req.selected + 1);
                });
            });
        });
        const amountElement = document.getElementById('vehicle_amount');

        amountElement &&
            amountObserver.observe(amountElement, {
                childList: true,
                characterData: true,
            });
    },
});
</script>

<style scoped lang="sass">
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
