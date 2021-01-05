<template>
    <lightbox name="building-list" :no-title-hide="true" :no-fullscreen="true">
        <h4>{{ title }}: {{ buildings.length }}</h4>
        <enhanced-table
            :head="{
                ...headingsAll,
                ...headingsExtensions,
            }"
            :table-attrs="{ class: 'table table-striped' }"
            @sort="setSort"
            :sort="sort"
            :sort-dir="sortDir"
            :search="search"
            @search="s => (search = s)"
        >
            <tr v-for="building in buildingsSorted" :key="building.id">
                <td>
                    <a class="btn btn-default btn-xs disabled">
                        {{ buildingTypeNames[building.building_type] }}
                    </a>
                </td>
                <td>
                    <a
                        :href="`/buildings/${building.id}`"
                        class="lightbox-open"
                    >
                        {{ building.caption }}
                    </a>
                </td>
                <td>
                    <div class="btn-group">
                        <a
                            :href="`/buildings/${building.id}/edit`"
                            class="lightbox-open btn btn-default btn-xs"
                        >
                            <font-awesome-icon
                                :icon="faPencilAlt"
                            ></font-awesome-icon>
                        </a>
                        <button
                            v-if="
                                !dispatchCenterBuildings.includes(
                                    building.building_type
                                ) && listType === 'building'
                            "
                            :href="
                                `${
                                    building.leitstelle_building_id
                                        ? `/buildings/${building.leitstelle_building_id}`
                                        : '#'
                                }`
                            "
                            class="btn btn-default btn-xs lightbox-open"
                            :id="`dispatch-btn-${building.id}`"
                        >
                            {{
                                getDispatchCenterCaption(
                                    dispatchBuildings,
                                    building
                                )
                            }}
                        </button>
                        <button
                            v-if="
                                !dispatchCenterBuildings.includes(
                                    building.building_type
                                ) && listType === 'building'
                            "
                            class="btn btn-default btn-xs dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span class="caret"> </span>
                        </button>
                        <ul
                            v-if="
                                !dispatchCenterBuildings.includes(
                                    building.building_type
                                ) && listType === 'building'
                            "
                            class="dropdown-menu"
                            style="right: 0; left: auto"
                        >
                            <li
                                v-for="dispatchBuilding in dispatchBuildings"
                                :key="dispatchBuilding.id"
                            >
                                <a>
                                    {{ dispatchBuilding.caption }}
                                    <button
                                        class="btn btn-xs btn-success pull-right"
                                        style="marginleft: 1ch"
                                        @click="
                                            setDispatchCenter(
                                                building,
                                                dispatchBuilding
                                            )
                                        "
                                    >
                                        <i class="fas fa-check"></i>
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td v-if="listType === 'extension'">
                    {{ building.extension_available.toLocaleString() }} ({{
                        building.extension_enabled.toLocaleString()
                    }})
                </td>
                <td v-if="listType === 'extension'">
                    {{ building.extension_unavailable.toLocaleString() }}
                </td>
            </tr>
        </enhanced-table>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {
    BuildingList,
    BuildingListComputed,
    BuildingListMethods,
    BuildingListProps,
} from '../../../../typings/modules/Dashboard/BuildingList';
import { Building, InternalBuilding } from 'typings/Building';

export default Vue.extend<
    BuildingList,
    BuildingListComputed,
    BuildingListMethods,
    BuildingListProps
>({
    name: 'building-list',
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
        const headingsAll = {
            building_type: { title: this.$m('type') },
            caption: { title: this.$m('caption') },
            actions: { title: this.$m('actions'), noSort: true },
        } as {
            [name: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        const headingsExtensions = (this.listType === 'extension'
            ? {
                  current: { title: this.$m('current'), noSort: true },
                  unavailable: {
                      title: this.$m('unavailable'),
                      noSort: true,
                  },
              }
            : {}) as {
            [name: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        const dispatchBuildings = [
            {
                caption: this.$m('fastDispatchChooser.noDispatch'),
                id: 0,
            },
        ] as Building[];
        const buildingsByType = this.$store.getters['api/buildingsByType'] as {
            [type: number]: Building[];
        };
        const dispatchCenterBuildings = Object.values(
            this.$t('dispatchCenterBuildings')
        ) as number[];
        dispatchCenterBuildings.forEach(type =>
            dispatchBuildings.push(...(buildingsByType[type] ?? []))
        );
        dispatchBuildings.sort((a, b) =>
            !a.id
                ? 1
                : a.caption < b.caption
                ? -1
                : a.caption > b.caption
                ? 1
                : 0
        );
        return {
            buildingTypeNames: Object.fromEntries(
                Object.entries(
                    this.$t('buildings') as {
                        [id: number]: InternalBuilding;
                    }
                ).map(([index, { caption }]) => [index, caption])
            ),
            search: '',
            sort: 'caption',
            sortDir: 'asc',
            faPencilAlt,
            headingsExtensions,
            headingsAll,
            dispatchBuildings,
            dispatchCenterBuildings,
        } as BuildingList;
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buildings: {
            type: Array,
            required: true,
        },
        listType: {
            type: String,
            required: true,
        },
    },
    computed: {
        buildingsFiltered() {
            return this.buildings.filter(building =>
                JSON.stringify(building)
                    .toLowerCase()
                    .match(this.search.toLowerCase())
            );
        },
        buildingsSorted() {
            const buildings = this.search
                ? this.buildingsFiltered
                : this.buildings;
            return buildings.sort((a, b) => {
                let modifier = this.sortDir === 'desc' ? -1 : 1;
                let f = a[this.sort] || '';
                let s = b[this.sort] || '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.building-list.${key}`, args);
        },
        setSort(type) {
            if (this.sort === type)
                return (this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc');
            this.sort = type;
            this.sortDir = 'asc';
        },
        setDispatchCenter(building, dispatchBuilding) {
            this.$store
                .dispatch('api/request', {
                    url: `/buildings/${building.id}/leitstelle-set/${dispatchBuilding.id}`,
                })
                .then(() => {
                    const dispatchBtn = document.getElementById(
                        `dispatch-btn-${building.id}`
                    );
                    if (!dispatchBtn) return;
                    dispatchBtn.setAttribute(
                        'href',
                        dispatchBuilding.id
                            ? `/buildings/${dispatchBuilding.id}`
                            : '#'
                    );
                    dispatchBtn.textContent = dispatchBuilding.caption;
                });
        },
        getDispatchCenterCaption(dispatchBuildings, building) {
            return dispatchBuildings.find(
                b => b.id === (building.leitstelle_building_id ?? 0)
            ).caption;
        },
    },
});
</script>
