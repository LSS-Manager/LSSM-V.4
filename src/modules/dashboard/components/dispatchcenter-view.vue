<template>
    <div>
        <tabs ref="boardTabs" :on-select="(_, i) => (currentBoard = i)">
            <tab
                :key="boardId"
                :title="board.title"
                v-for="(board, boardId) in boards"
                @onSelect="switchTab"
            >
                <grid-board
                    :id="
                        $store.getters.nodeAttribute(
                            'dispatchcenter-view_board',
                            true
                        )
                    "
                >
                    <grid-layout
                        :compact="false"
                        :margin="{ x: 9.5, y: 9.5 }"
                        :numberOfCols="100"
                        :rowHeight="5"
                        breakpoint="xl"
                    >
                        <grid-item
                            class="board-title-item"
                            :height="title.height || 3"
                            :id="`${boardId}_${title.title}_${titleId}`"
                            :key="`${boardId}_${title.title}_${titleId}`"
                            :width="title.width || 15"
                            :x="title.x"
                            :y="title.y"
                            @moveEnd="modifyTitle"
                            @resizeEnd="modifyTitle"
                            :ref="`${boardId}_${title.title}_${titleId}`"
                            v-for="(title, titleId) in board.titles"
                        >
                            <button
                                @click="removeTitle(title.title)"
                                class="btn btn-xs btn-danger"
                            >
                                <i class="fas fa-minus"></i>
                            </button>
                            <b>{{ title.title }}</b>
                        </grid-item>
                        <grid-item
                            :height="
                                column.height ||
                                    Math.ceil(
                                        14 +
                                            (
                                                vehiclesByBuilding[
                                                    column.building
                                                ] || []
                                            ).length *
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
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                            <div class="panel-body">
                                <grid-board
                                    :id="
                                        $store.getters.nodeAttribute(
                                            `dispatchcenter-view_board-${column.building}`,
                                            true
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
                                            v-for="vehicle in vehiclesByBuildingSorted[
                                                column.building
                                            ]"
                                            :maxHeight="1"
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
                                        </grid-item>
                                    </grid-layout>
                                </grid-board>
                            </div>
                            <template #resizeBottomRight> ⤡ </template>
                        </grid-item>
                        <grid-item
                            :height="buildingSelection.height"
                            :minHeight="3"
                            :maxHeight="3"
                            :id="
                                $store.getters.nodeAttribute(
                                    'dispatchcenter-view_board-selection',
                                    true
                                )
                            "
                            :width="buildingSelection.width"
                            :x="buildingSelection.x"
                            :y="buildingSelection.y"
                            @moveEnd="saveSelection"
                            @resizeEnd="saveSelection"
                            class="building-selection panel-default"
                        >
                            <div class="panel-heading">
                                <b>
                                    {{ $sm('building-selection') }}
                                </b>
                            </div>
                            <v-select
                                :filterable="false"
                                :options="buildingList"
                                :reduce="building => building.id"
                                :clearSearchOnBlur="() => false"
                                @search="query => (buildingListSearch = query)"
                                label="caption"
                                v-model="selectedBuilding"
                                ref="buildingListSelection"
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
                                    {{ $sm('no-buildings') }}
                                </template>
                            </v-select>
                            <button
                                :disabled="
                                    !selectedBuilding && !buildingListSearch
                                "
                                @click="addColumn"
                                class="btn btn-success"
                            >
                                <i class="fas fa-plus"></i>
                            </button>
                            <button
                                @click="bulkAddColumn"
                                class="btn btn-warning"
                            >
                                <i class="fas fa-folder-plus"></i>
                            </button>
                        </grid-item>
                    </grid-layout>
                </grid-board>
            </tab>
            <tab :title="$sm('manage.title')">
                <enhanced-table
                    :head="{
                        name: {
                            title: $sm('manage.titles.name'),
                            noSort: true,
                        },
                        buildings: {
                            title: $sm('manage.titles.buildings.bold'),
                            titleAttr: $sm('manage.titles.buildings.small'),
                            noSort: true,
                        },
                        dispatch: {
                            title: $sm('manage.titles.dispatch.bold'),
                            titleAttr: $sm('manage.titles.dispatch.small'),
                            noSort: true,
                        },
                        delete: { title: '', noSort: true },
                    }"
                    :table-attrs="{
                        class: 'table table-striped',
                        id: $store.getters.nodeAttribute(
                            'dispatchcenter-view_manage',
                            true
                        ),
                    }"
                    :noSearch="true"
                >
                    <tr
                        :id="board.id"
                        :key="board.id"
                        v-for="(board, boardId) in boards"
                    >
                        <td>
                            <label>
                                <input
                                    :placeholder="board.id"
                                    @change="setBoardName(boardId)"
                                    type="text"
                                    v-model="board.title"
                                />
                            </label>
                        </td>
                        <td>
                            <v-select
                                :options="vehicleBuildings"
                                :reduce="type => type.type"
                                label="caption"
                                multiple
                                v-model="board.buildingTypes"
                                @input="saveBoards"
                            ></v-select>
                        </td>
                        <td>
                            <v-select
                                :options="dispatchBuildings"
                                :reduce="building => building.id"
                                label="caption"
                                multiple
                                v-model="board.dispatchBuildings"
                                @input="saveBoards"
                            ></v-select>
                        </td>
                        <td>
                            <button
                                @click="removeBoard(boardId)"
                                class="btn btn-xs btn-danger"
                            >
                                <i class="fas fa-minus" data-v-eea344b4=""></i>
                            </button>
                            <div class="btn-group">
                                <button
                                    v-if="boardId > 0"
                                    class="btn btn-xs btn-success"
                                    @click="boardUp(boardId)"
                                >
                                    <i class="fas fa-long-arrow-alt-up"></i>
                                </button>
                                <button
                                    v-if="
                                        boardId < boards.length - 1 &&
                                            boards.length > 1
                                    "
                                    class="btn btn-xs btn-success"
                                    @click="boardDown(boardId)"
                                >
                                    <i class="fas fa-long-arrow-alt-down"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr id="manageBoards">
                        <td>
                            <label>
                                <input
                                    :placeholder="$sm('manage.newBoard')"
                                    @change="addBoard"
                                    type="text"
                                    v-model="newBoardTitle"
                                />
                            </label>
                        </td>
                    </tr>
                </enhanced-table>
            </tab>
        </tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { DefaultProps } from 'vue/types/options';
import { Vehicle } from 'typings/Vehicle';
import { Building, InternalBuilding } from 'typings/Building';
import {
    DispatchcenterView,
    DispatchcenterViewComputed,
    DispatchcenterViewMethods,
} from 'typings/modules/Dashboard/DispatchcenterView';

export default Vue.extend<
    DispatchcenterView,
    DispatchcenterViewMethods,
    DispatchcenterViewComputed,
    DefaultProps
>({
    name: 'dispatchcenter-view',
    components: {
        VSelect: () =>
            import(
                /* webpackChunkName: "components/vue-select" */ 'vue-select'
            ),
        GridBoard: async () =>
            (
                await import(
                    /* webpackChunkName: "components/vue-select" */ 'vue-responsive-dash'
                )
            ).Dashboard,
        GridLayout: async () =>
            (
                await import(
                    /* webpackChunkName: "components/vue-select" */ 'vue-responsive-dash'
                )
            ).DashLayout,
        GridItem: async () =>
            (
                await import(
                    /* webpackChunkName: "components/vue-select" */ 'vue-responsive-dash'
                )
            ).DashItem,
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        const buildingTypes = this.$t('buildings') as {
            [id: number]: InternalBuilding;
        };
        const dispatchCenterBuildings = Object.values(
            this.$t('dispatchCenterBuildings')
        );
        return {
            buildings: this.$store.state.api.buildings,
            selectedBuilding: null,
            boards: [],
            buildingLimit: 50,
            buildingListOffset: 0,
            buildingListSearch: '',
            newBoardTitle: '',
            buildingTypes,
            currentBoard: 0,
            vehiclesByBuilding: this.$store.getters['api/vehiclesByBuilding'],
            vehicleBuildings: Object.values(this.$t('vehicleBuildings'))
                .map(type => ({
                    type,
                    caption: buildingTypes[type].caption,
                }))
                .sort((a, b) =>
                    a.caption > b.caption ? 1 : a.caption < b.caption ? -1 : 0
                ),
            dispatchBuildings: (this.$store.state.api.buildings as Building[])
                .filter(building =>
                    dispatchCenterBuildings.includes(building.building_type)
                )
                .sort((a, b) =>
                    a.caption > b.caption ? 1 : a.caption < b.caption ? -1 : 0
                ),
        } as DispatchcenterView;
    },
    computed: {
        board() {
            return this.boards[this.currentBoard];
        },
        columns() {
            return this.board ? this.board.columns : [];
        },
        buildingSelection() {
            return this.board ? this.board.buildingSelection : {};
        },
        buildingsById() {
            const buildings = {} as {
                [id: number]: Building;
            };
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
                                this.$utils.escapeRegex(
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
            return !!this.buildingListFiltered.slice(
                prevOffset,
                this.buildingLimit + prevOffset
            ).length;
        },
        buildingListHasNextPage() {
            const nextOffset = this.buildingListOffset + this.buildingLimit;
            return !!this.buildingListFiltered.slice(
                nextOffset,
                this.buildingLimit + nextOffset
            ).length;
        },
        vehiclesByBuildingSorted() {
            const vehiclesSorted = {} as { [building: number]: Vehicle[] };
            Object.keys(this.vehiclesByBuilding).forEach(building => {
                vehiclesSorted[parseInt(building)] = this.vehiclesByBuilding[
                    parseInt(building)
                ].sort((a, b) =>
                    a.caption > b.caption ? -1 : a.caption < b.caption ? 1 : 0
                );
            });
            return vehiclesSorted;
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.${key}`, args);
        },
        $sm(key, args) {
            return this.$m(`dispatchcenter-view.${key}`, args);
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
            this.newBoardTitle = '';
            this.boards.push({
                id: title,
                title,
                columns: [],
                buildingTypes: [],
                dispatchBuildings: [],
                buildingSelection: {
                    x: 0,
                    y: 0,
                    width: 25,
                    height: 3,
                },
                titles: [],
            });
            await this.$nextTick();
            this.currentBoard = this.boards.length;
            this.saveBoards();
        },
        async removeBoard(id) {
            this.boards.splice(id, 1);
            await this.$nextTick();
            this.currentBoard = this.boards.length;
            this.saveBoards();
        },
        async boardUp(id) {
            const up = this.boards[id];
            const down = this.boards[id - 1];
            this.$set(this.boards, id - 1, {
                ...up,
            });
            this.$set(this.boards, id, {
                ...down,
            });
            this.saveBoards();
        },
        async boardDown(id) {
            const up = this.boards[id + 1];
            const down = this.boards[id];
            this.$set(this.boards, id, {
                ...up,
            });
            this.$set(this.boards, id + 1, {
                ...down,
            });
            this.saveBoards();
        },
        async addColumn() {
            if (this.selectedBuilding) {
                this.columns.push({ building: this.selectedBuilding });
                await this.$nextTick();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const column = this.$refs[
                    `building-${this.selectedBuilding}`
                ][0].item;
                this.selectedBuilding = null;
                this.modifyBuilding({
                    id: column._id,
                    width: column._width,
                    height: column._height,
                    x: column._x,
                    y: column._y,
                });
            } else if (this.buildingListSearch) {
                const title = this.buildingListSearch;
                if (!this.board.hasOwnProperty('titles'))
                    this.$set(this.board, 'titles', []);
                this.board.titles.push({ title });
                await this.$nextTick();
                this.buildingListSearch = '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.$refs.buildingListSelection[0].search = '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const title_field = this.$refs[
                    `${this.currentBoard}_${title}_${this.board.titles.length -
                        1}`
                ][0].item;
                this.modifyTitle({
                    id: title_field._id,
                    width: title_field._width,
                    height: title_field._height,
                    x: title_field._x,
                    y: title_field._y,
                });
                this.saveBoards();
            }
        },
        bulkAddColumn() {
            let currentColumn = 0;
            let currentY = 8;
            let currentRow = 0;
            this.buildingListFiltered.forEach(building =>
                (async () => {
                    const height = Math.ceil(
                        14 +
                            (this.vehiclesByBuilding[building.id] || [])
                                .length *
                                1.5
                    );
                    if (height > currentRow) currentRow = height;
                    this.columns.push({
                        building: building.id,
                        width: 15,
                        height,
                        x: currentColumn * 16,
                        y: currentY,
                    });
                    currentColumn++;
                    if (currentColumn === 6) {
                        currentColumn = 0;
                        currentY += currentRow + 1;
                        currentRow = 0;
                    }
                    await this.$nextTick();
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const column = this.$refs[`building-${building.id}`][0]
                        .item;
                    this.selectedBuilding = null;
                    this.modifyBuilding({
                        id: column._id,
                        width: column._width,
                        height: column._height,
                        x: column._x,
                        y: column._y,
                    });
                    await this.$nextTick();
                })()
            );
        },
        removeBuilding(id) {
            this.columns.splice(
                this.columns.findIndex(column => column.building === id),
                1
            );
            this.saveBoards();
        },
        removeTitle(id) {
            this.board.titles.splice(
                this.board.titles.findIndex(
                    title => title.title === id.replace(/(^\d+_)|(_\d+$)/g, '')
                ),
                1
            );
            this.saveBoards();
        },
        modifyBuilding({ id, width, height, x, y }) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const [building] = this.$refs[`building-${id}`];
            const headingHeight = building.$el
                .querySelector('.panel-heading')
                .getBoundingClientRect().height;
            const buildingPanelBody = building.$el.querySelector('.panel-body');
            if (buildingPanelBody)
                buildingPanelBody.style.maxHeight = `calc(100% - ${headingHeight}px)`;
            this.$set(
                this.columns,
                this.columns.findIndex(column => column.building === id),
                { building: id, width, height, x, y }
            );
            this.saveBoards();
        },
        modifyTitle({ id, width, height, x, y }) {
            const checked_id = id?.replace(/(^\d+_)|(_\d+$)/g, '');
            this.$set(
                this.board.titles,
                this.board.titles.findIndex(
                    title => title.title === checked_id
                ),
                { title: checked_id, width, height, x, y }
            );
            this.saveBoards();
        },
        saveBoards() {
            this.$store.dispatch('settings/setSetting', {
                moduleId: 'dashboard',
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
            .dispatch('settings/getModule', 'dashboard')
            .then(async settings => {
                this.$set(
                    this,
                    'boards',
                    settings['dispatchcenter-view']?.boards || []
                );
                await this.$nextTick();
                this.columns.forEach(col =>
                    (async () => {
                        await this.$nextTick();
                        const column = this.$refs[`building-${col.building}`]
                            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              this.$refs[`building-${col.building}`][0].item
                            : false;
                        if (!column) return;
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
});
</script>

<style lang="sass" scoped>
.building-selection

	.v-select
		width: 100%
		margin-right: 1rem

		::v-deep .vs__dropdown-toggle
			padding: 0 0 6.4px 0

		::v-deep .vs-pagination
			display: flex

			.btn
				width: 50%


.item.panel

	a,
	.btn
		z-index: 2

	a
		position: relative

	.btn
		position: absolute
		right: 1rem

	::v-deep [id$="-resizeBottomRight"]
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

.board-title-item
	display: flex !important
	align-items: center
	justify-content: center

	&:hover
		border: gray solid thin

	.btn
		z-index: 2
		position: absolute
		right: 1rem

body.dark

	.item.panel .building-vehicle

		span
			border-color: #ddd !important

		a
			color: unset !important
</style>
