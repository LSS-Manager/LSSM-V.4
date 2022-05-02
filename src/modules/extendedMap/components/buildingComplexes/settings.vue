<template>
    <lightbox :name="modalName" no-title-hide no-fullscreen no-x-btn>
        <h2>
            {{ $m('title') }}
            <span class="btn-group pull-right">
                <button
                    class="btn btn-success btn-sm"
                    :disabled="!canSave"
                    @click="save"
                >
                    <font-awesome-icon :icon="faSave" />
                    {{ $m('save') }}
                </button>
                <button class="btn btn-warning btn-sm" @click="close">
                    {{ $m('abort') }}
                </button>
            </span>
        </h2>

        <form @submit.prevent>
            <!-- edit name -->
            <div class="form-group">
                <label for="name">{{ $m('name') }}</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    :placeholder="$m('name')"
                    v-model="name"
                    @keyup.enter="save"
                />
            </div>
            <!-- edit buildings -->
            <!-- edit icon -->
            <div class="form-group">
                <label for="icon">{{ $m('icon') }}</label>
                <v-select
                    name="icon"
                    uid="lssmv4-complex-settings-icon"
                    :placeholder="$m('icon')"
                    v-model="icon"
                    :options="icons"
                    :clearable="false"
                    append-to-body
                >
                    <template v-slot:selected-option="option">
                        <img :src="option.label" alt="icon" />
                    </template>
                    <template v-slot:option="option">
                        <img :src="option.label" alt="icon" />
                    </template>
                </v-select>
                <p class="help-block">{{ $m('iconHelp') }}</p>
            </div>
            <!-- edit location -->
        </form>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

import type { $m } from 'typings/Module';
import type { Building } from 'typings/Building';
import type { Complex } from '../../assets/buildingComplexes';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default Vue.extend<
    {
        faSave: IconDefinition;
        buildings: Record<number, Building>;
        name: string;
        icon: string;
        buildingIds: string[];
    },
    { save(): void },
    { canSave: boolean; assignedBuildings: Building[]; icons: string[] },
    {
        modalName: string;
        complex: Complex;
        $m: $m;
        close(): void;
        updateValues(complex: Complex): Promise<void>;
    }
>({
    name: 'lssm-building-complex-setting',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../../components/lightbox.vue'
            ),
        VSelect: () =>
            import(
                /* webpackChunkName: "components/vue-select" */ 'vue-select'
            ),
    },
    data() {
        return {
            faSave,
            buildings: this.$store.getters['api/buildingsById'],
            name: '',
            icon: '',
            buildingIds: [],
        };
    },
    computed: {
        canSave() {
            return (
                (this.name.trim() !== this.complex.name &&
                    this.name.trim().length > 0) ||
                this.icon !== this.complex.icon
            );
        },
        assignedBuildings() {
            return this.buildingIds
                .map(id => this.buildings[parseInt(id)])
                .filter(Boolean);
        },
        icons() {
            return [
                ...new Set([
                    ...[
                        '/images/building_bereitschaftspolizei_other.png',
                        '/images/building_bereitstellungsraum_other.png',
                        '/images/building_bomb_disposal_other.png',
                        '/images/building_clinic_other.png',
                        '/images/building_commerce_police_other.png',
                        '/images/building_complex_other.png',
                        '/images/building_federal_police_other.png',
                        '/images/building_fire_aviation_station_other.png',
                        '/images/building_fire_boat_dock_other.png',
                        '/images/building_fire_marshall_other.png',
                        '/images/building_fire_other.png',
                        '/images/building_fireschool_other.png',
                        '/images/building_hazard_response_ems_other.png',
                        '/images/building_helipad_other.png',
                        '/images/building_home_response_location_other.png',
                        '/images/building_hospital_other.png',
                        '/images/building_leitstelle_other.png',
                        '/images/building_police_depot_other.png',
                        '/images/building_polizeischule_other.png',
                        '/images/building_polizeisondereinheiten_other.png',
                        '/images/building_polizeiwache_other.png',
                        '/images/building_rescue_boat_dock_other.png',
                        '/images/building_rescue_dog_unit_other.png',
                        '/images/building_rettungsschule_other.png',
                        '/images/building_rettungswache_other.png',
                        '/images/building_seg_other.png',
                        '/images/building_thw_other.png',
                        '/images/building_thw_school_other.png',
                        '/images/building_wasserwacht_other.png',
                        '/images/building_water_rescue_school_other.png',
                    ].flatMap(icon => [icon, icon.replace(/_other/u, '')]),
                    ...this.assignedBuildings.map(
                        () => '/images/building_fire.png' // will change once image is available in API
                    ),
                ]),
            ].sort();
        },
    },
    methods: {
        save() {
            this.updateValues({
                ...this.complex,
                name: this.name.trim(),
                icon: this.icon,
            });
            this.close();
        },
    },
    props: {
        modalName: {
            type: String,
            required: true,
        },
        complex: {
            type: Object,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
        close: {
            type: Function,
            required: true,
        },
        updateValues: {
            type: Function,
            required: true,
        },
    },
    mounted() {
        this.name = this.complex.name;
        this.icon = this.complex.icon;
        this.buildingIds = this.complex.buildings;
    },
});
</script>

<style scoped lang="sass">
form
    ::v-deep .v-select
        .vs__selected
            img
                height: 1.4em
</style>

<style lang="sass">
#vslssmv4-complex-settings-icon__listbox.vs__dropdown-menu
    z-index: 6000
</style>
