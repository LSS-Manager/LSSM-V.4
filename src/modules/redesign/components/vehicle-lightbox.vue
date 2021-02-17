<template>
    <lightbox name="releasenotes">
        <h1>{{ vehicle.vehicle_name }}</h1>
        <div class="vehicle-window">
            <div class="well">
                <table class="table">
                    <tbody>
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
                                    class="btn btn-default btn-xs"
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
                                <!-- TODO: Fahrzeugfarbe at custom vehicle types -->
                                <a
                                    :href="
                                        `/fahrzeugfarbe/${vehicle.vehicle_type.id}`
                                    "
                                    class="btn btn-default btn-xs lightbox-open"
                                >
                                    edit color
                                </a>
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

    tr
        *
            border-top-width: 0
        th
            float: right
</style>
