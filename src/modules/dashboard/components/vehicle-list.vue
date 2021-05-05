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
                target: { title: $m('target') },
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
                <td>
                    <a
                        v-if="vehicle.target_type"
                        class="lightbox-open"
                        :class="resolveLinkClass"
                        :data-resolve-type="vehicle.target_type"
                        :data-resolve-id="vehicle.target_id"
                        :href="`/${vehicle.target_type}s/${vehicle.target_id}`"
                        @mouseover="
                            startResolve(vehicle.target_type, vehicle.target_id)
                        "
                        @mouseout="endResolve()"
                    >
                        {{ vehicle.target_id }}
                        <small>{{ vehicle.target_type }}</small>
                    </a>
                </td>
            </tr>
        </enhanced-table>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

import { InternalVehicle } from 'typings/Vehicle';
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
            vehicleTypeNames: Object.fromEntries(
                Object.entries(
                    this.$t('vehicles') as {
                        [id: number]: InternalVehicle;
                    }
                ).map(([index, { caption }]) => [index, caption])
            ),
            vehiclesWithBuildings: [],
            buildings: this.$store.state.api.buildings,
            search: '',
            sort: 'caption',
            sortDir: 'asc',
            faPencilAlt,
            faUsers,
            resolveLinkClass: this.$store.getters.nodeAttribute(
                'dashboard-vehiclelist-resolvable-link'
            ),
            resolving: null,
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
                const modifier = this.sortDir === 'desc' ? -1 : 1;
                const f = a[this.sort] || '';
                const s = b[this.sort] || '';
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
                    feature: `dashboard-vehicleList-setfms`,
                })
                .then(() => {
                    vehicle.fms_real = target;
                    vehicle.fms_show = target;
                });
        },
        startResolve(type, id) {
            if (this.resolving) return;
            this.resolving = window.setTimeout(
                () =>
                    this.$store
                        .dispatch('api/request', {
                            url: `/${type}s/${id}`,
                            feature: 'dashboard-vehiclelist-resolve-title',
                        })
                        .then(res => res.text())
                        .then(html => {
                            const doc = new DOMParser().parseFromString(
                                html,
                                'text/html'
                            );
                            let title = '';
                            let subtitle = '';
                            if (type === 'mission') {
                                title =
                                    doc.getElementById('missionH1')
                                        ?.textContent ?? '';
                                subtitle =
                                    doc.querySelector<HTMLElement>(
                                        '#missionH1 + small'
                                    )?.textContent ?? '';
                            } else if (type === 'building') {
                                title =
                                    document.querySelector<HTMLHeadingElement>(
                                        'h1'
                                    )?.textContent ?? '';
                            }
                            this.$el
                                .querySelectorAll<HTMLAnchorElement>(
                                    `a[data-resolve-type="${type}"][data-resolve-id="${id}"]`
                                )
                                .forEach(link => {
                                    const small = link.querySelector('small');
                                    if (small)
                                        small.innerText = subtitle.trim();
                                    link.innerText = title.trim();
                                    link.classList.remove(
                                        this.resolveLinkClass
                                    );
                                });
                            this.resolving = null;
                        }),
                200
            );
        },
        endResolve() {
            if (this.resolving) window.clearTimeout(this.resolving);
            this.resolving = null;
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
