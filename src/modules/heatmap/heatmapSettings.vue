<template>
    <lightbox name="heatmap-settings" no-fullscreen no-title-hide>
        <h1>
            {{ $m('title') }}
            <button class="btn btn-success" @click="save">
                {{ $m('save') }}
            </button>
        </h1>
        <div>
            <label class="checkbox-inline">
                <input
                    type="radio"
                    v-model="settings.heatmapMode"
                    value="buildings"
                />
                {{ $m('buildings') }}
            </label>
            <label class="checkbox-inline">
                <input
                    type="radio"
                    v-model="settings.heatmapMode"
                    value="vehicles"
                />
                {{ $m('vehicles') }}
            </label>
        </div>
        <div class="checkbox">
            <label>
                <input
                    type="checkbox"
                    v-model="settings[mode('StaticRadius')]"
                />
                {{ $m('static') }}
            </label>
        </div>
        <div class="form-group" v-if="settings[mode('StaticRadius')]">
            <label :for="ids.RadiusPx">
                {{ $m('radius') }}:
                <span>{{ settings[mode('RadiusPx')].toLocaleString() }}px</span>
            </label>
            <button
                class="pull-right btn btn-default btn-xs"
                @click="() => $set(this, 'radiusPxAsRange', !radiusPxAsRange)"
            >
                <font-awesome-icon
                    v-if="!radiusPxAsRange"
                    :icon="icons.faSlidersH"
                ></font-awesome-icon>
                <template v-else>123</template>
            </button>
            <input
                class="form-control"
                :id="ids.RadiusPx"
                :type="radiusPxAsRange ? 'range' : 'number'"
                v-model.number="settings[mode('RadiusPx')]"
                min="10"
                max="1500"
                step="1"
            />
        </div>
        <div class="form-group" v-else>
            <label :for="ids.RadiusM">
                {{ $m('radius') }}:
                <span>
                    {{ (settings[mode('RadiusM')] / 1000).toLocaleString() }}km
                </span>
            </label>
            <button
                class="pull-right btn btn-default btn-xs"
                @click="() => $set(this, 'radiusMAsRange', !radiusMAsRange)"
            >
                <font-awesome-icon
                    v-if="!radiusMAsRange"
                    :icon="icons.faSlidersH"
                ></font-awesome-icon>
                <template v-else>123</template>
            </button>
            <input
                class="form-control"
                :id="ids.RadiusM"
                :type="radiusMAsRange ? 'range' : 'number'"
                v-model.number="settings[mode('RadiusM')]"
                min="1000"
                max="100000"
                step="1"
            />
        </div>
        <div class="form-group">
            <label :for="ids.IntensityMaxZoom">
                {{ $m('intensity') }}:
                <span>{{
                    settings[mode('IntensityMaxZoom')].toLocaleString()
                }}</span>
            </label>
            <button
                class="pull-right btn btn-default btn-xs"
                @click="() => $set(this, 'intensityAsRange', !intensityAsRange)"
            >
                <font-awesome-icon
                    v-if="!intensityAsRange"
                    :icon="icons.faSlidersH"
                ></font-awesome-icon>
                <template v-else>123</template>
            </button>
            <input
                class="form-control"
                :id="ids.IntensityMaxZoom"
                :type="intensityAsRange ? 'range' : 'number'"
                v-model.number="settings[mode('IntensityMaxZoom')]"
                min="0"
                :max="maxZoom"
                step="1"
            />
        </div>
        <div class="form-group">
            <v-select
                :placeholder="$m(`includes.${settings.heatmapMode}`)"
                multiple
                v-model="settings[mode('Includes')]"
                :options="includeOptions"
            >
                <div slot="no-options">
                    {{ $t('noOptions') }}
                </div>
            </v-select>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { $m } from 'typings/Module';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { InternalBuilding } from 'typings/Building';
import { InternalVehicle } from 'typings/Vehicle';

type Mode = 'buildings' | 'vehicles';

type Subsetting<Scope extends Mode | ''> = Record<
    `${Scope}StaticRadius`,
    boolean
> &
    Record<
        `${Scope}RadiusM` | `${Scope}RadiusPx` | `${Scope}IntensityMaxZoom`,
        number
    > &
    Record<`${Scope}Includes`, { value: number; label: string }[]>;

export type Settings = {
    position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    heatmapMode: Mode;
} & Subsetting<'buildings'> &
    Subsetting<'vehicles'>;

export type UpdateSettings = (updated: Settings) => void;

export default Vue.extend<
    {
        settings: Settings;
        ids: Record<keyof Subsetting<''>, string>;
        icons: { faSlidersH: IconDefinition };
        maxZoom: number;
        radiusMAsRange: boolean;
        radiusPxAsRange: boolean;
        intensityAsRange: boolean;
    },
    {
        mode: <Setting extends keyof Subsetting<''>>(
            setting: Setting
        ) => `${Mode}${Setting}`;
        save: () => Promise<void>;
    },
    { includeOptions: { value: number; label: string }[] },
    {
        setSetting: <T>(settingId: string, value: T) => Promise<void>;
        getModuleSettings: () => Promise<Settings>;
        updateSettings: UpdateSettings;
        $m: $m;
    }
>({
    name: 'lssmv4-heatmap-settings',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
        VSelect: () =>
            import(
                /* webpackChunkName: "components/vue-select" */ 'vue-select'
            ),
    },
    data() {
        const nodeAttribute = (attr: string, id = false) =>
            this.$store.getters.nodeAttribute(`heatmap-settings-${attr}`, id);

        return {
            settings: {
                position: 'bottom-left',
                heatmapMode: 'buildings',
                buildingsStaticRadius: false,
                buildingsRadiusM: 31_415,
                buildingsRadiusPx: 50,
                buildingsIntensityMaxZoom: window.map.getMaxZoom(),
                buildingsIncludes: [],
                vehiclesStaticRadius: false,
                vehiclesRadiusM: 31_415,
                vehiclesRadiusPx: 50,
                vehiclesIntensityMaxZoom: window.map.getMaxZoom(),
                vehiclesIncludes: [],
            },
            ids: {
                StaticRadius: nodeAttribute('static_radius', true),
                RadiusM: nodeAttribute('radius_m', true),
                RadiusPx: nodeAttribute('radius_px', true),
                IntensityMaxZoom: nodeAttribute('intensity_max_zoom', true),
                Includes: nodeAttribute('includes', true),
            },
            icons: { faSlidersH },
            maxZoom: window.map.getMaxZoom(),
            radiusMAsRange: true,
            radiusPxAsRange: true,
            intensityAsRange: true,
        };
    },
    methods: {
        mode(setting) {
            return `${this.settings.heatmapMode}${setting}`;
        },
        async save() {
            for (const [setting, value] of Object.entries(this.settings))
                await this.setSetting(setting, value);

            this.updateSettings(this.settings);
        },
    },
    computed: {
        includeOptions() {
            return Object.entries(
                this.$t(this.settings.heatmapMode) as Record<
                    number,
                    InternalBuilding | InternalVehicle
                >
            )
                .map(([id, { caption }]) => ({
                    value: parseInt(id),
                    label: caption,
                }))
                .sort(({ label: labelA }, { label: labelB }) =>
                    labelA > labelB ? 1 : labelA < labelB ? -1 : 0
                );
        },
    },
    props: {
        setSetting: {
            type: Function,
            required: true,
        },
        getModuleSettings: {
            type: Function,
            required: true,
        },
        updateSettings: {
            type: Function,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
    },
    mounted() {
        this.getModuleSettings().then(settings =>
            Object.entries(settings).forEach(([setting, value]) =>
                this.$set(
                    this.settings,
                    setting,
                    value ?? this.settings[setting as keyof Settings]
                )
            )
        );
    },
});
</script>
