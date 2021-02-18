<template>
    <lightbox name="redesign-lightbox">
        <img :src="vehicle.image" alt="" class="pull-right vehicle-img" />
        <h1>{{ vehicle.vehicle_name }}</h1>
        <div class="vehicle-window">
            <div class="well">
                <table class="table">
                    <tbody>
                        <tr v-if="vehicle.user">
                            <th>owner</th>
                            <td>
                                <a
                                    class="lightbox-open"
                                    :href="`/profile/${vehicle.user.id}`"
                                >
                                    <img
                                        :src="
                                            `/images/user_${
                                                vehicle.user.online
                                                    ? 'green'
                                                    : 'gray'
                                            }.png`
                                        "
                                        alt=""
                                    />
                                    {{ vehicle.user.name }}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>station</th>
                            <td>
                                <a
                                    class="lightbox-open"
                                    :href="`/buildings/${vehicle.building.id}`"
                                >
                                    {{ vehicle.building.caption }}
                                </a>
                            </td>
                            <td>
                                <a
                                    :href="`/vehicles/${vehicle.id}/move`"
                                    class="btn btn-default btn-xs lightbox-open"
                                >
                                    move
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>vehicletype</th>
                            <td>
                                {{ vehicle.vehicle_type.caption }}
                            </td>
                            <td>
                                <a
                                    :href="
                                        `/fahrzeugfarbe/${
                                            vehicle.vehicle_type.id
                                        }${
                                            vehicle.vehicle_type.custom
                                                ? `?vehicle_type_caption=${vehicle.vehicle_type.caption}`
                                                : ''
                                        }`
                                    "
                                    class="btn btn-default btn-xs lightbox-open"
                                >
                                    edit color
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>FMS</th>
                            <td>
                                <span
                                    class="building_list_fms"
                                    :class="`building_list_fms_${vehicle.fms}`"
                                >
                                    {{ $i18n.t('fmsReal2Show')[vehicle.fms] }}
                                </span>
                            </td>
                            <td>
                                switch FMS (2 ←→ 6)
                            </td>
                        </tr>
                        <tr>
                            <th>max staff</th>
                            <td>
                                {{ vehicle.max_staff }}
                            </td>
                        </tr>
                        <tr v-if="vehicle.water_amount">
                            <th>water amount</th>
                            <td>
                                {{ vehicle.water_amount }}
                            </td>
                        </tr>
                        <tr>
                            <th>mileage</th>
                            <td>
                                {{ vehicle.mileage }}
                            </td>
                        </tr>
                        <tr v-if="vehicle.current_mission">
                            <th>current mission</th>
                            <td>
                                <a
                                    :href="
                                        `/missions/${vehicle.current_mission.id}`
                                    "
                                    class="lightbox-open"
                                >
                                    {{ vehicle.current_mission.caption }}
                                </a>
                            </td>
                        </tr>
                        <tr v-if="vehicle.followup_missions.length">
                            <th>followup missions</th>
                            <td>
                                <ul>
                                    <li
                                        v-for="mission in vehicle.followup_missions"
                                        :key="mission.id"
                                    >
                                        <a
                                            :href="`/missions/${mission.id}`"
                                            class="lightbox-open"
                                        >
                                            {{ mission.caption }}
                                        </a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr v-if="Object.keys(vehicle.staff).length">
                            <th>schdaff</th>
                            <td>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>namö</th>
                                            <th>schooling</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(schooling,
                                            name,
                                            index) in vehicle.staff"
                                            :key="index"
                                        >
                                            <td>{{ name }}</td>
                                            <td>{{ schooling }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div></div>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    DefaultData,
    DefaultMethods,
    DefaultComputed,
} from 'vue/types/options';
import { VehicleWindow } from '../parsers/vehicle';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    { vehicle: VehicleWindow }
>({
    name: 'vehicle-lightbox',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../components/lightbox.vue'
            ),
    },
    props: {
        vehicle: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
.vehicle-window
    display: flex

    > .well > table > tbody > tr
        > *
            border-top-width: 0
        > th
            float: right
.vehicle-img
    margin-right: calc(3 * 34px)
</style>
