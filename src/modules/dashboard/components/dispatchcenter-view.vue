<template>
    <div>
        <div class="building-selection">
            <v-select
                label="caption"
                :options="buildingList"
                :reduce="building => building.id"
                :filterable="false"
                v-model="selectedBuilding"
                @search="query => (buildingListSearch = query)"
            >
                <template #list-header>
                    <li class="vs-pagination">
                        <button
                            class="btn btn-default"
                            @click="buildingListOffset -= buildingLimit"
                            :disabled="!buildingListHasPrevPage"
                        >
                            ←
                        </button>
                        <button
                            class="btn btn-default"
                            @click="buildingListOffset += buildingLimit"
                            :disabled="!buildingListHasNextPage"
                        >
                            →
                        </button>
                    </li>
                </template>
                <template #list-footer>
                    <li class="vs-pagination">
                        <button
                            class="btn btn-default"
                            @click="buildingListOffset -= buildingLimit"
                            :disabled="!buildingListHasPrevPage"
                        >
                            ←
                        </button>
                        <button
                            class="btn btn-default"
                            @click="buildingListOffset += buildingLimit"
                            :disabled="!buildingListHasNextPage"
                        >
                            →
                        </button>
                    </li>
                </template>
            </v-select>
            <button
                class="btn btn-success"
                @click="addColumn"
                :disabled="!selectedBuilding"
            >
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <grid-board :id="$store.getters.nodeId('dispatchcenter-view_board')">
            <grid-layout breakpoint="xl" :numberOfCols="100" :compact="false">
                <grid-item
                    class="panel panel-default"
                    v-for="column in columns"
                    :key="column.building"
                    :id="column.building"
                    :x="column.x"
                    :y="column.y"
                    :width="column.width || 15"
                    :height="
                        column.height ||
                            Math.ceil(
                                4 +
                                    vehiclesByBuilding[column.building].length *
                                        1.5
                            )
                    "
                    :rowHeight="20"
                    :ref="`building-${column.building}`"
                    @moveEnd="modifyBuilding"
                    @resizeEnd="modifyBuilding"
                >
                    <div class="panel-heading">
                        <a
                            :href="`/buildings/${column.building}`"
                            class="lightbox-open"
                        >
                            <b>{{ buildingsById[column.building].caption }}</b>
                        </a>
                    </div>
                    <div class="panel-body">
                        <grid-board
                            :id="
                                $store.getters.nodeId(
                                    `dispatchcenter-view_board-${column.building}`
                                )
                            "
                        >
                            <grid-layout
                                breakpoint="xl"
                                :numberOfCols="10"
                                :rowHeight="20"
                            >
                                <grid-item
                                    class="building-vehicle"
                                    v-for="vehicle in vehiclesByBuilding[
                                        column.building
                                    ]"
                                    :key="`${column.building}_${vehicle.id}`"
                                    :id="`${column.building}_${vehicle.id}`"
                                    :width="10"
                                    :height="1"
                                >
                                    <span
                                        class="building_list_fms"
                                        :class="
                                            `building_list_fms_${vehicle.fms_real}`
                                        "
                                    >
                                        {{ vehicle.fms_show }}
                                    </span>
                                    <a
                                        class="building_list_fms lightbox-open"
                                        :href="`/vehicles/${vehicle.id}`"
                                    >
                                        {{ vehicle.caption }}
                                    </a>
                                    <template #resizeBottomRight>
                                        ⤡
                                    </template>
                                </grid-item>
                            </grid-layout>
                        </grid-board>
                    </div>
                    <template #resizeBottomRight>
                        ⤡
                    </template>
                </grid-item>
            </grid-layout>
        </grid-board>
    </div>
</template>

<script>
import VSelect from 'vue-select';
import {
    Dashboard as GridBoard,
    DashLayout as GridLayout,
    DashItem as GridItem,
} from 'vue-responsive-dash';

export default {
    name: 'dispatchcenter-view',
    components: { VSelect, GridBoard, GridLayout, GridItem },
    data() {
        return {
            buildings: this.$store.state.api.buildings,
            selectedBuilding: null,
            columns: [],
            buildingLimit: 50,
            buildingListOffset: 0,
            buildingListSearch: '',
        };
    },
    computed: {
        buildingsById() {
            const buildings = {};
            Object.values(this.buildings).forEach(
                building => (buildings[building.id] = building)
            );
            return buildings;
        },
        buildingList() {
            return this.buildingListFiltered.slice(
                this.buildingListOffset,
                this.buildingLimit + this.buildingListOffset
            );
        },
        buildingListFiltered() {
            const vehicleBuildingTypes = Object.values(
                this.$t('vehicleBuildings')
            );
            return Object.values(this.buildings)
                .filter(
                    building =>
                        building.caption
                            .toLowerCase()
                            .match(
                                this.escapeRegex(
                                    this.buildingListSearch.toLowerCase()
                                )
                            ) &&
                        vehicleBuildingTypes.includes(building.building_type) &&
                        !Object.values(this.columns).find(
                            column => column.building === building.id
                        )
                )
                .sort((a, b) =>
                    a.caption > b.caption ? 1 : a.caption < b.caption ? -1 : 0
                );
        },
        buildingListHasPrevPage() {
            const prevOffset = this.buildingListOffset - this.buildingLimit;
            return Boolean(
                this.buildingListFiltered.slice(
                    prevOffset,
                    this.buildingLimit + prevOffset
                ).length
            );
        },
        buildingListHasNextPage() {
            const nextOffset = this.buildingListOffset + this.buildingLimit;
            return Boolean(
                this.buildingListFiltered.slice(
                    nextOffset,
                    this.buildingLimit + nextOffset
                ).length
            );
        },
        vehiclesByBuilding() {
            const vehicles = {};
            Object.values(this.columns).forEach(column => {
                vehicles[column.building] = this.$store.getters[
                    'api/vehiclesAtBuilding'
                ](column.building);
            });
            return vehicles;
        },
    },
    methods: {
        async addColumn() {
            this.columns.push({ building: this.selectedBuilding });
            await this.$nextTick();
            const column = this.$refs[`building-${this.selectedBuilding}`][0]
                .item;
            this.selectedBuilding = null;
            this.modifyBuilding({
                id: column._id,
                width: column._width,
                height: column._height,
                x: column._x,
                y: column._y,
            });
        },
        modifyBuilding({ id, width, height, x, y }) {
            this.$set(
                this.columns,
                this.columns.findIndex(column => column.building === id),
                { building: id, width, height, x, y }
            );
            this.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'buildings',
                value: this.columns,
            });
        },
    },
    mounted() {
        this.$store.dispatch('settings/getModule', MODULE_ID).then(settings => {
            this.columns = settings.buildings || [];
        });
    },
};
</script>

<style scoped lang="sass">
.building-selection
    display: flex

    .v-select
        width: 100%
        max-width: 40rem
        margin-right: 1rem

        /deep/ .vs-pagination
            display: flex

            .btn
                width: 50%

.item.panel

    a
        position: relative
        z-index: 2

    /deep/ & > [id$="-overlay"]
        inset: 0 0 calc(100% - 41px) 0 !important

    /deep/ [id$="-resizeBottomRight"]
        cursor: nwse-resize !important
        width: 1em !important
        height: unset !important
        right: -1em !important
        bottom: -1em !important

    .panel-body
        background: transparent

        .building-vehicle
            display: flex

            span,
            a
                display: flex
                align-items: center
                justify-content: center

            span
                border-radius: .25em 0 0 .25em !important
                padding: .4em .6em .3em !important
                border: 1px solid !important
                margin-right: 0

            a
                border: 1px solid
                border-left: 0
                margin-left: -5px
                margin-right: 0
                border-radius: 0 .25em .25em 0 !important
                padding: .4em .6em .3em !important
                color: #4a4a4a !important
                width: 100%

body.dark

    .item.panel .building-vehicle

        span
            border-color: #ddd !important

        a
            color: unset !important
</style>
