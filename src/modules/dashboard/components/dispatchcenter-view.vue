<template>
    <div>
        <tabs ref="boardTabs">
            <tab
                :key="boardId"
                :title="board.title"
                v-for="(board, boardId) in boards"
                @onSelect="switchTab"
            >
                <grid-board
                    :id="$store.getters.nodeId('dispatchcenter-view_board')"
                >
                    <grid-layout
                        :compact="false"
                        :margin="{ x: 9.5, y: 9.5 }"
                        :numberOfCols="100"
                        :rowHeight="5"
                        breakpoint="xl"
                    >
                        <grid-item
                            :height="
                                column.height ||
                                    Math.ceil(
                                        14 +
                                            vehiclesByBuilding[column.building]
                                                .length *
                                                1.5
                                    )
                            "
                            :id="column.building"
                            :key="column.building"
                            :ref="`building-${column.building}`"
                            :width="column.width || 15"
                            :x="column.x"
                            :y="column.y"
                            @moveEnd="modifyBuilding"
                            @resizeEnd="modifyBuilding"
                            class="panel panel-default"
                            v-for="column in board.columns"
                        >
                            <div class="panel-heading">
                                <a
                                    :href="`/buildings/${column.building}`"
                                    class="lightbox-open"
                                >
                                    <b>{{
                                        buildingsById[column.building].caption
                                    }}</b>
                                </a>
                                <button
                                    @click="removeBuilding(column.building)"
                                    class="btn btn-xs btn-danger"
                                >
                                    <i
                                        class="fas fa-minus"
                                        data-v-eea344b4=""
                                    ></i>
                                </button>
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
                                        :numberOfCols="10"
                                        :rowHeight="20"
                                        breakpoint="xl"
                                    >
                                        <grid-item
                                            :height="1"
                                            :id="
                                                `${column.building}_${vehicle.id}`
                                            "
                                            :key="
                                                `${column.building}_${vehicle.id}`
                                            "
                                            :width="10"
                                            class="building-vehicle"
                                            v-for="vehicle in vehiclesByBuilding[
                                                column.building
                                            ]"
                                        >
                                            <span
                                                :class="
                                                    `building_list_fms_${vehicle.fms_real}`
                                                "
                                                class="building_list_fms"
                                            >
                                                {{ vehicle.fms_show }}
                                            </span>
                                            <a
                                                :href="
                                                    `/vehicles/${vehicle.id}`
                                                "
                                                class="building_list_fms lightbox-open"
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
                        <grid-item
                            :height="buildingSelection.height"
                            :id="
                                $store.getters.nodeId(
                                    'dispatchcenter-view_board-selection'
                                )
                            "
                            :width="buildingSelection.width"
                            :x="buildingSelection.x"
                            :y="buildingSelection.y"
                            @moveEnd="saveSelection"
                            @resizeEnd="saveSelection"
                            class="building-selection"
                        >
                            <div class="dragging-field"></div>
                            <v-select
                                :filterable="false"
                                :options="buildingList"
                                :reduce="building => building.id"
                                @search="query => (buildingListSearch = query)"
                                label="caption"
                                v-model="selectedBuilding"
                            >
                                <template #list-header>
                                    <li class="vs-pagination">
                                        <button
                                            :disabled="!buildingListHasPrevPage"
                                            @click="
                                                buildingListOffset -= buildingLimit
                                            "
                                            class="btn btn-default"
                                        >
                                            ←
                                        </button>
                                        <button
                                            :disabled="!buildingListHasNextPage"
                                            @click="
                                                buildingListOffset += buildingLimit
                                            "
                                            class="btn btn-default"
                                        >
                                            →
                                        </button>
                                    </li>
                                </template>
                                <template #list-footer>
                                    <li class="vs-pagination">
                                        <button
                                            :disabled="!buildingListHasPrevPage"
                                            @click="
                                                buildingListOffset -= buildingLimit
                                            "
                                            class="btn btn-default"
                                        >
                                            ←
                                        </button>
                                        <button
                                            :disabled="!buildingListHasNextPage"
                                            @click="
                                                buildingListOffset += buildingLimit
                                            "
                                            class="btn btn-default"
                                        >
                                            →
                                        </button>
                                    </li>
                                </template>
                                <template #no-options>
                                    {{
                                        $t(
                                            'modules.dashboard.dispatchcenter-view.no-buildings'
                                        )
                                    }}
                                </template>
                            </v-select>
                            <button
                                :disabled="!selectedBuilding"
                                @click="addColumn"
                                class="btn btn-success"
                            >
                                <i class="fas fa-plus"></i>
                            </button>
                        </grid-item>
                    </grid-layout>
                </grid-board>
            </tab>
            <tab
                :title="
                    $t('modules.dashboard.dispatchcenter-view.manage.title')
                "
            >
                <div class="board-management-title">
                    <div style="width: 1em"></div>
                    <span class="name-title">
                        <b>{{
                            $t(
                                'modules.dashboard.dispatchcenter-view.manage.titles.name'
                            )
                        }}</b>
                    </span>
                    <div style="width: 22.5px"></div>
                    <span class="select-title">
                        <b>{{
                            $t(
                                'modules.dashboard.dispatchcenter-view.manage.titles.buildings.bold'
                            )
                        }}</b>
                        <small>
                            {{
                                $t(
                                    'modules.dashboard.dispatchcenter-view.manage.titles.buildings.small'
                                )
                            }}
                        </small>
                    </span>
                    <span class="select-title">
                        <b>{{
                            $t(
                                'modules.dashboard.dispatchcenter-view.manage.titles.dispatch.bold'
                            )
                        }}</b>
                        <small>
                            {{
                                $t(
                                    'modules.dashboard.dispatchcenter-view.manage.titles.dispatch.small'
                                )
                            }}
                        </small>
                    </span>
                </div>
                <grid-board
                    :id="$store.getters.nodeId('dispatchcenter-view_manage')"
                >
                    <grid-layout
                        :numberOfCols="1"
                        :rowHeight="34"
                        breakpoint="xl"
                    >
                        <grid-item
                            :draggable="true"
                            :id="board.id"
                            :key="board.id"
                            :resizable="false"
                            :y="boardId * 2"
                            :height="2"
                            @moveEnd="moveBoard"
                            class="board-management-field"
                            v-for="(board, boardId) in boards"
                        >
                            <div class="dragging-field"></div>
                            <label>
                                <input
                                    :placeholder="board.id"
                                    @change="setBoardName(boardId)"
                                    type="text"
                                    v-model="board.title"
                                />
                            </label>
                            <button
                                @click="removeBoard(boardId)"
                                class="btn btn-xs btn-danger"
                            >
                                <i class="fas fa-minus" data-v-eea344b4=""></i>
                            </button>
                            <v-select
                                :options="vehicleBuildings"
                                :reduce="type => type.type"
                                label="caption"
                                multiple
                                v-model="board.buildingTypes"
                                @input="saveBoards"
                            ></v-select>
                            <v-select
                                :options="dispatchBuildings"
                                :reduce="building => building.id"
                                label="caption"
                                multiple
                                v-model="board.dispatchBuildings"
                                @input="saveBoards"
                            ></v-select>
                        </grid-item>
                        <grid-item
                            :draggable="false"
                            :resizable="false"
                            :y="Object.keys(boards).length * 2"
                            id="manageBoards"
                        >
                            <label>
                                <input
                                    :placeholder="
                                        $t(
                                            'modules.dashboard.dispatchcenter-view.manage.newBoard'
                                        )
                                    "
                                    @change="addBoard"
                                    type="text"
                                    v-model="newBoardTitle"
                                />
                            </label>
                        </grid-item>
                    </grid-layout>
                </grid-board>
            </tab>
        </tabs>
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
        const buildingTypes = Object.values(this.$t('buildings'));
        return {
            buildings: this.$store.state.api.buildings,
            selectedBuilding: null,
            boards: [],
            buildingLimit: 50,
            buildingListOffset: 0,
            buildingListSearch: '',
            newBoardTitle: '',
            buildingTypes,
            vehicleBuildings: Object.values(this.$t('vehicleBuildings'))
                .map(type => ({
                    type: type,
                    caption: buildingTypes[type].caption,
                }))
                .sort((a, b) =>
                    a.caption > b.caption ? 1 : a.caption < b.caption ? -1 : 0
                ),
            dispatchBuildings: Object.values(this.$t('dispatchCenterBuildings'))
                .map(type => this.$store.getters['api/buildingsOfType'](type))
                .flat()
                .sort((a, b) =>
                    a.caption > b.caption ? 1 : a.caption < b.caption ? -1 : 0
                ),
        };
    },
    computed: {
        board() {
            return this.boards[this.$refs.boardTabs.selectedIndex];
        },
        columns() {
            return this.board ? this.board.columns : [];
        },
        buildingSelection() {
            return this.board ? this.board.buildingSelection : {};
        },
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
            if (!this.board) return [];
            const vehicleBuildingTypes = Object.values(
                this.$t('vehicleBuildings')
            );
            return Object.values(this.buildings)
                .filter(building => {
                    if (
                        (this.board.buildingTypes.length &&
                            !this.board.buildingTypes.includes(
                                building.building_type
                            )) ||
                        (this.board.dispatchBuildings.length &&
                            !this.board.dispatchBuildings.includes(
                                building.leitstelle_building_id
                            ))
                    )
                        return false;
                    return (
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
                    );
                })
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
        moveBoard({ id, y }) {
            const boards = Object.values(this.boards).filter(b => b.id !== id);
            boards.splice(
                y,
                0,
                Object.values(this.boards).find(b => b.id === id)
            );
            this.boards = boards.map(b => ({ ...b, id: b.title }));
            this.saveBoards();
        },
        setBoardName(id) {
            this.$set(this.boards, id, {
                ...this.boards[id],
                id: this.boards[id].title,
            });
            this.saveBoards();
        },
        async addBoard() {
            const title = this.newBoardTitle;
            this.newBoardTitle = null;
            this.boards.push({
                id: title,
                title: title,
                columns: [],
                buildingTypes: [],
                dispatchBuildings: [],
                buildingSelection: {
                    x: 0,
                    y: 0,
                    width: 25,
                    height: 3,
                },
            });
            await this.$nextTick();
            this.$refs.boardTabs.selectedIndex = this.boards.length;
            this.saveBoards();
        },
        async removeBoard(id) {
            this.boards.splice(id, 1);
            await this.$nextTick();
            this.$refs.boardTabs.selectedIndex = this.boards.length;
            this.saveBoards();
        },
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
        removeBuilding(id) {
            this.columns.splice(
                this.columns.findIndex(column => column.building === id),
                1
            );
            this.saveBoards();
        },
        modifyBuilding({ id, width, height, x, y }) {
            const building = this.$refs[`building-${id}`][0];
            const headingHeight = building.$el
                .querySelector('.panel-heading')
                .getBoundingClientRect().height;
            building.$refs[
                `${id}-overlay`
            ].style.inset = `0 0 calc(100% - ${headingHeight}px) 0`;
            building.$el.querySelector(
                '.panel-body'
            ).style.maxHeight = `calc(100% - ${headingHeight}px)`;
            this.$set(
                this.columns,
                this.columns.findIndex(column => column.building === id),
                { building: id, width, height, x, y }
            );
            this.saveBoards();
        },
        saveBoards() {
            this.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'dispatchcenter-view',
                value: { boards: this.boards },
            });
        },
        async saveSelection({ width, x, y }) {
            this.$set(this.buildingSelection, 'width', width);
            this.$set(this.buildingSelection, 'height', 3);
            this.$set(this.buildingSelection, 'x', x);
            this.$set(this.buildingSelection, 'y', y);
            this.saveBoards();
            await this.$nextTick();
            this.$set(this.buildingSelection, 'height', 3);
        },
        switchTab() {
            this.buildingListOffset = 0;
            this.buildingListSearch = '';
        },
    },
    mounted() {
        this.$store
            .dispatch('settings/getModule', MODULE_ID)
            .then(async settings => {
                settings = settings['dispatchcenter-view'];
                this.boards = settings.boards || [];
                await this.$nextTick();
                this.columns.forEach(col =>
                    (async () => {
                        await this.$nextTick();
                        const column = this.$refs[`building-${col.building}`][0]
                            .item;
                        this.modifyBuilding({
                            id: column._id,
                            width: column._width,
                            height: column._height,
                            x: column._x,
                            y: column._y,
                        });
                    })()
                );
            });
    },
};
</script>

<style lang="sass" scoped>
.board-management-title
    display: flex
    align-items: center
    justify-content: space-around

    span
        width: 100%

        &.select-title
            max-width: calc(((100% - 22.5px - 4em) / 7) * 3)

        &.name-title
            max-width: calc((100% - 22.5px - 4em) / 7)

.building-selection,
.board-management-field
    display: flex

    /deep/ [id$="-overlay"]
        inset: 0 calc(100% - 1em) 0 0 !important

    .dragging-field
        width: 1em
        height: 100%
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=)

    .v-select
        width: 100%
        margin-right: 1rem

        /deep/ .vs__dropdown-toggle
            padding: 0 0 6.4px 0

        /deep/ .vs-pagination
            display: flex

            .btn
                width: 50%

.board-management-field
    align-items: center
    justify-content: space-around

    label,
    .v-select
        width: 100%

    label
        max-width: calc((100% - 22.5px - 4em) / 7)

        input
            width: 100%

    .v-select
        max-width: calc(((100% - 22.5px - 4em) / 7) * 3)

        /deep/ .vs__selected-options
            flex-wrap: unset
            overflow: auto

.item.panel

    a,
    .btn
        z-index: 2

    a
        position: relative

    .btn
        position: absolute
        right: 1rem

    /deep/ [id$="-resizeBottomRight"]
        cursor: nwse-resize !important
        width: 1em !important
        height: unset !important
        right: -1em !important
        bottom: -1em !important

    .panel-body
        background: transparent
        overflow: hidden auto

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
