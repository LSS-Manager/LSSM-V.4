<template>
    <lightbox name="building-list" :no-title-hide="true" :no-fullscreen="true">
        <h4>{{ title }}: {{ buildings.length }}</h4>
        <enhanced-table
            :head="{
                building_type: { title: $m('type') },
                caption: { title: $m('caption') },
                actions: { title: $m('actions'), noSort: true },
                current: { title: $m('current'), noSort: true },
                unavailable: { title: $m('unavailable'), noSort: true },
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
                    </div>
                </td>
                <td>
                    {{ building.extension_available.toLocaleString() }} ({{
                        building.extension_enabled.toLocaleString()
                    }})
                </td>
                <td>
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
import { InternalBuilding } from 'typings/Building';

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
        $mc(key, amount, args) {
            return this.$tc(`modules.dashboard.${key}`, amount, args);
        },
        setSort(type) {
            if (this.sort === type)
                return (this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc');
            this.sort = type;
            this.sortDir = 'asc';
        },
    },
});
</script>
