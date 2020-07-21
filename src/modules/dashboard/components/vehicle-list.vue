<template>
    <lightbox name="vehicle-list" :no-title-hide="true" :no-fullscreen="true">
        <h4>{{ title }}: {{ vehicles.length }}</h4>
        <enhanced-table
            :head="{
                vehicle_type: { title: $m('type') },
                caption: { title: $m('caption') },
                actions: { title: $m('actions'), noSort: true },
                fms_show: { title: $m('fms') },
                building: { title: $m('building') },
            }"
            :table-attrs="{ class: 'table table-striped' }"
            @sort="setSort"
            :sort="sort"
            :sort-dir="sortDir"
            :search="search"
            @search="s => (search = s)"
        >
            <tr v-for="vehicle in vehiclesSorted" :key="vehicle.id">
                <td>
                    <a class="btn btn-default btn-xs disabled">
                        {{ vehicleTypeNames[vehicle.vehicle_type] }}
                    </a>
                    <a
                        v-if="vehicle.vehicle_type_caption"
                        class="btn btn-default btn-xs disabled"
                    >
                        {{ vehicle.vehicle_type_caption }}
                    </a>
                </td>
                <td>
                    <a :href="`/vehicles/${vehicle.id}`" class="lightbox-open">
                        {{ vehicle.caption }}
                    </a>
                </td>
                <td>
                    <div class="btn-group">
                        <a
                            :href="`/vehicles/${vehicle.id}/edit`"
                            class="lightbox-open btn btn-default btn-xs"
                        >
                            <font-awesome-icon
                                :icon="faPencilAlt"
                            ></font-awesome-icon>
                        </a>
                        <a
                            :href="`/vehicles/${vehicle.id}/zuweisung`"
                            class="lightbox-open btn btn-default btn-xs"
                        >
                            <font-awesome-icon
                                :icon="faUsers"
                            ></font-awesome-icon>
                        </a>
                    </div>
                </td>
                <td>
                    <span
                        class="building_list_fms"
                        :class="`building_list_fms_${vehicle.fms_real}`"
                        @click="toggleFMS(vehicle)"
                    >
                        {{ vehicle.fms_show }}
                    </span>
                </td>
                <td>
                    <a
                        :href="`/buildings/${vehicle.building_id}`"
                        class="lightbox-open"
                    >
                        {{ vehicle.building }}
                    </a>
                </td>
            </tr>
        </enhanced-table>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import Lightbox from '../../../components/lightbox.vue';
import EnhancedTable from '../../../components/enhanced-table.vue';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import {
    VehicleList,
    VehicleListComputed,
    VehicleListMethods,
    VehicleListProps,
} from '../../../../typings/modules/Dashboard/VehicleList';

export default Vue.extend<
    VehicleList,
    VehicleListMethods,
    VehicleListComputed,
    VehicleListProps
>({
    name: 'vehicle-list',
    components: { Lightbox, EnhancedTable },
    data() {
        return {
            vehicleTypeNames: Object.values(this.$t('vehicles')).map(
                type => type.caption
            ),
            vehiclesWithBuildings: [],
            buildings: this.$store.state.api.buildings,
            search: '',
            sort: 'caption',
            sortDir: 'asc',
            faPencilAlt,
            faUsers,
        } as VehicleList;
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        vehicles: {
            type: Array,
            required: true,
        },
    },
    computed: {
        vehiclesFiltered() {
            return this.vehiclesWithBuildings.filter(vehicle =>
                JSON.stringify(vehicle)
                    .toLowerCase()
                    .match(this.search.toLowerCase())
            );
        },
        vehiclesSorted() {
            const vehicles = this.search
                ? this.vehiclesFiltered
                : this.vehiclesWithBuildings;
            return vehicles.sort((a, b) => {
                let modifier = this.sortDir === 'desc' ? -1 : 1;
                let f = a[this.sort] || '';
                let s = b[this.sort] || '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.vehicle-list.${key}`, args);
        },
        setSort(type) {
            if (this.sort === type)
                return (this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc');
            this.sort = type;
            this.sortDir = 'asc';
        },
        toggleFMS(vehicle) {
            if (![2, 6].includes(vehicle.fms_real)) return;
            const target = vehicle.fms_real === 2 ? 6 : 2;
            this.$store
                .dispatch('api/request', {
                    url: `/vehicles/${vehicle.id}/set_fms/${target}`,
                })
                .then(() => {
                    vehicle.fms_real = target;
                    vehicle.fms_show = target;
                });
        },
    },
    beforeMount() {
        this.vehiclesWithBuildings = this.vehicles.map(v => ({
            ...v,
            building: this.buildings.find(({ id }) => id === v.building_id)
                ?.caption,
        }));
    },
});
</script>

<style scoped lang="sass">
.building_list_fms_2, .building_list_fms_6
    cursor: pointer
</style>
