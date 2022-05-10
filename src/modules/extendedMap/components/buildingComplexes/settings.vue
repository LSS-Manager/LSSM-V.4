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
                    v-model.trim="name"
                    @keyup.enter="save"
                />
            </div>

            <!-- edit buildings -->
            <div class="form-group">
                <label for="buildings">{{ $m('buildings') }}</label>
                <v-select
                    name="buildings"
                    uid="lssmv4-complex-settings-buildings"
                    :placeholder="$m('buildings')"
                    v-model="buildingIds"
                    :options="buildingOptions"
                    :close-on-select="false"
                    multiple
                    clearable
                    append-to-body
                ></v-select>
            </div>

            <!-- show markers on map -->
            <div class="checkbox">
                <label>
                    <input type="checkbox" v-model="showMarkers" />
                    {{ $m('showMarkers') }}
                </label>
            </div>

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
                        <img :src="option.label" alt="icon" loading="lazy" />
                    </template>
                </v-select>
                <p class="help-block">{{ $m('iconHelp') }}</p>
            </div>

            <!-- edit location -->
            <div class="form-group">
                <label for="location">{{ $m('location') }}</label>
                <settings-location
                    name="location"
                    :placeholder="$m('location')"
                    v-model="location"
                />
            </div>
        </form>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import isEqual from 'lodash/isEqual';

import type { $m } from 'typings/Module';
import type { Complex } from '../../assets/buildingComplexes';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Building, InternalBuilding } from 'typings/Building';

export default Vue.extend<
    {
        faSave: IconDefinition;
        buildings: Record<number, Building>;
        name: string;
        icon: string;
        buildingIds: { value: string; label: string }[];
        buildingTypes: Record<number, InternalBuilding>;
        location: [number, number];
        showMarkers: boolean;
        iconBase64s: string[];
        excludedCustomIcons: string[];
    },
    { save(): void },
    {
        canSave: boolean;
        assignedBuildings: Building[];
        buildingOptions: { value: string; label: string }[];
        customIcons: string[];
        icons: string[];
    },
    {
        modalName: string;
        complex: Complex;
        allOtherAttachedBuildings: string[];
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
        SettingsLocation: () =>
            import(
                /* webpackChunkName: "components/setting/location" */ '../../../../components/setting/location.vue'
            ),
    },
    data() {
        const userBuildings = this.$store.getters[
            'api/buildingsById'
        ] as Record<number, Building>;
        const buildingTypes = this.$store.getters.$tBuildings as Record<
            number,
            InternalBuilding
        >;

        return {
            faSave,
            buildings: userBuildings,
            name: '',
            icon: '',
            buildingIds: [],
            buildingTypes,
            location: [0, 0],
            showMarkers: false,
            iconBase64s: [],
            excludedCustomIcons: [],
        };
    },
    computed: {
        canSave() {
            return (
                (this.name.trim() !== this.complex.name &&
                    this.name.trim().length > 0) ||
                !isEqual(
                    this.buildingIds.map(({ value }) => value),
                    this.complex.buildings
                ) ||
                this.icon !== this.complex.icon ||
                this.location[0] !== this.complex.position[0] ||
                this.location[1] !== this.complex.position[1] ||
                this.showMarkers !== this.complex.showMarkers
            );
        },
        assignedBuildings() {
            return this.buildingIds
                .map(({ value }) => this.buildings[parseInt(value)])
                .filter(Boolean);
        },
        buildingOptions() {
            return Object.entries(this.buildings)
                .filter(
                    ([id]) =>
                        !this.buildingIds.some(({ value }) => value === id) &&
                        !this.allOtherAttachedBuildings.includes(id)
                )
                .map(([id, { caption, building_type }]) => ({
                    value: id.toString(),
                    label: `[${this.buildingTypes[building_type].caption}] ${caption}`,
                }))
                .sort(({ label: labelA }, { label: labelB }) =>
                    labelA.localeCompare(labelB)
                );
        },
        customIcons() {
            return this.assignedBuildings
                .map(b => b.custom_icon_url ?? '')
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
                    ...this.customIcons.filter(
                        icon => !this.excludedCustomIcons.includes(icon)
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
                buildings: this.buildingIds.map(({ value }) => value),
                position: this.location,
                showMarkers: this.showMarkers,
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
        allOtherAttachedBuildings: {
            type: Array,
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
    async beforeMount() {
        await this.$store.dispatch('api/registerBuildingsUsage', {
            feature: `buildingComplexes`,
        });
    },
    mounted() {
        this.name = this.complex.name;
        this.icon = this.complex.icon;
        const removeUndefined = <S>(value: S | undefined): value is S =>
            !!value;
        this.buildingIds = this.complex.buildings
            .map(id => this.buildingOptions.find(({ value }) => id === value))
            .filter(removeUndefined);
        this.location = this.complex.position;
        this.showMarkers = this.complex.showMarkers;

        this.customIcons.forEach(icon => {
            fetch(icon)
                .then(res => res.arrayBuffer())
                .then(buffer => {
                    const base64 = btoa(
                        String.fromCharCode(...new Uint8Array(buffer))
                    );
                    if (this.iconBase64s.includes(base64))
                        this.excludedCustomIcons.push(icon);
                    else this.iconBase64s.push(base64);
                });
        });
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
#vslssmv4-complex-settings-icon__listbox,
#vslssmv4-complex-settings-buildings__listbox
    &.vs__dropdown-menu
        z-index: 6000
</style>
