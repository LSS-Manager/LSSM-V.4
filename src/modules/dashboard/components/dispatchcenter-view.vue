<template>
    <div>
        <div class="building-selection">
            <v-select
                label="caption"
                :options="buildingList"
                :reduce="building => building.id"
                :filterable="false"
                v-model="selectedBuilding"
                @open="onBuildingListOpen"
                @close="onBuildingListClose"
                @search="query => (buildingListSearch = query)"
            >
                <template #list-header v-if="buildingListHasPrevPage">
                    <li ref="loadLower" class="loader">
                        Loading more buildings...
                    </li>
                </template>
                <template #list-footer v-if="buildingListHasNextPage">
                    <li ref="loadUpper" class="loader">
                        Loading more buildings...
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
            <grid-layout breakpoint="xl" :numberOfCols="100">
                <grid-item
                    class="panel panel-default"
                    v-for="column in columns"
                    :key="column"
                    :id="column"
                    :width="column.width || 10"
                    :height="
                        column.height ||
                            3 + vehiclesByBuilding[column].length * 3
                    "
                    @moveEnd="eventHandler"
                    @resizeEnd="eventHandler"
                >
                    <div class="panel-heading">
                        <a :href="`/buildings/${column}`" class="lightbox-open">
                            <b>{{ buildingsById[column].caption }}</b>
                        </a>
                    </div>
                    <div class="panel-body">
                        <grid-board
                            :id="
                                $store.getters.nodeId(
                                    `dispatchcenter-view_board-${column}`
                                )
                            "
                        >
                            <grid-layout breakpoint="xl" :numberOfCols="10">
                                <grid-item
                                    class="building-vehicle"
                                    v-for="vehicle in vehiclesByBuilding[
                                        column
                                    ]"
                                    :key="vehicle.id"
                                    :id="`${column}_${vehicle.id}`"
                                    :width="10"
                                    :height="3"
                                    @moveEnd="eventHandler"
                                    @resizeEnd="eventHandler"
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
                                    <template v-slot:resizeBottomRight>
                                        ⤡
                                    </template>
                                </grid-item>
                            </grid-layout>
                        </grid-board>
                    </div>
                    <template v-slot:resizeBottomRight>
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
            observerLower: null,
            observerUpper: null,
            buildings: this.$store.state.api.buildings,
            selectedBuilding: null,
            columns: [],
            buildingLimit: 15,
            buildingLimitUpper: 10,
            buildingLoadAmount: 10,
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
            const buildingList = this.buildingListFiltered;
            return buildingList
                .sort((a, b) =>
                    a.caption > b.caption ? 1 : a.caption < b.caption ? -1 : 0
                )
                .slice(
                    this.buildingListHasPrevPage
                        ? this.buildingLimitUpper - this.buildingLimit
                        : 0,
                    this.buildingLimitUpper
                );
        },
        buildingListFiltered() {
            const vehicleBuildingTypes = Object.values(
                this.$t('vehicleBuildings')
            );
            return Object.values(this.buildings)
                .filter(
                    building =>
                        vehicleBuildingTypes.includes(building.building_type) &&
                        !Object.values(this.columns).includes(building.id)
                )
                .filter(building =>
                    building.caption.match(this.buildingListSearch)
                );
        },
        buildingListHasPrevPage() {
            return this.buildingLimitUpper > this.buildingLimit;
        },
        buildingListHasNextPage() {
            return this.buildingList.length < this.buildingListFiltered.length;
        },
        vehiclesByBuilding() {
            const vehicles = {};
            this.columns.forEach(
                building =>
                    (vehicles[building] = this.$store.getters[
                        'api/vehiclesAtBuilding'
                    ](building))
            );
            return vehicles;
        },
    },
    methods: {
        addColumn() {
            this.columns.push(this.selectedBuilding);
            this.selectedBuilding = null;
        },
        eventHandler(...args) {
            console.log(...args);
        },
        async onBuildingListOpen() {
            if (this.buildingListHasPrevPage) {
                await this.$nextTick();
                this.observerLower.observe(this.$refs.loadLower);
            }
            if (this.buildingListHasNextPage) {
                await this.$nextTick();
                this.observerUpper.observe(this.$refs.loadUpper);
            }
        },
        onBuildingListClose() {
            this.observerLower.disconnect();
            this.observerUpper.disconnect();
        },
        async buildingListinfiniteScrollLower([{ isIntersecting, target }]) {
            if (isIntersecting) {
                const ul = target.offsetParent;
                const scrollTop = target.offsetParent.scrollTop;
                this.buildingLimitUpper -= this.buildingLoadAmount;
                await this.$nextTick();
                ul.scrollTop = scrollTop;
            }
        },
        async buildingListinfiniteScrollUpper([{ isIntersecting, target }]) {
            if (isIntersecting) {
                const ul = target.offsetParent;
                const scrollTop = target.offsetParent.scrollTop;
                this.buildingLimitUpper += this.buildingLoadAmount;
                await this.$nextTick();
                ul.scrollTop = scrollTop;
            }
        },
    },
    mounted() {
        this.observerLower = new IntersectionObserver(
            this.buildingListinfiniteScrollLower
        );
        this.observerUpper = new IntersectionObserver(
            this.buildingListinfiniteScrollUpper
        );
    },
};
</script>

<style scoped lang="sass">
.building-selection
    display: flex

    .v-select
        width: 100%
        max-width: 250px
        margin-right: 1rem

.item.panel

    a
        position: relative
        z-index: 2

    /deep/ [id$="-overlay"]
        inset: 0 0 calc(100% - 41px) 0 !important

    /deep/ [id$="-resizeBottomRight"]
        cursor: nwse-resize !important
        width: 1em !important
        height: unset !important
        right: -1em !important
        bottom: -1em !important

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
