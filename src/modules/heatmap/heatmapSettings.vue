<template>
    <lightbox name="heatmap-settings" no-fullscreen no-title-hide>
        <h1>
            Hütmap Sättings
            <button class="btn btn-success" @click="save">
                Säif
            </button>
        </h1>
        <div>
            <label class="checkbox-inline">
                <input
                    type="radio"
                    v-model="settings.heatmapMode"
                    value="buildings"
                />
                Büldüngs
            </label>
            <label class="checkbox-inline">
                <input
                    type="radio"
                    v-model="settings.heatmapMode"
                    value="vehicles"
                    disabled
                />
                Vähikels
            </label>
        </div>
        <pre>{{ settings.heatmapMode }}</pre>
        <div class="checkbox">
            <label>
                <input
                    type="checkbox"
                    v-model="settings[mode('StaticRadius')]"
                />
                Statisch?
            </label>
        </div>
        <div class="form-group" v-if="settings[mode('StaticRadius')]">
            <label :for="ids.RadiusPx">
                Radius:
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
                Radius:
                <span
                    >{{
                        (settings[mode('RadiusM')] / 1000).toLocaleString()
                    }}km</span
                >
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
            <v-select
                :placeholder="'...'"
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

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { InternalBuilding } from 'typings/Building';
import { InternalVehicle } from 'typings/Vehicle';
import { Layer } from 'leaflet';

type Mode = 'buildings' | 'vehicles';

type Subsetting<Scope extends Mode | ''> = Record<`${Scope}StaticRadius`, boolean> &
    Record<`${Scope}RadiusM` | `${Scope}RadiusPx`, number> & Record<`${Scope}Includes`, { value: number, label: string}[]>;

export type Settings = { heatmapMode: Mode } &
    Subsetting<'buildings'> &
    Subsetting<'vehicles'>;

export type UpdateSettings = (updated: Settings) => void;

export default Vue.extend<
    {
        settings: Settings;
        ids: Record<keyof Subsetting<''>, string>;
        icons: { faSlidersH: IconDefinition };
        radiusMAsRange: boolean;
        radiusPxAsRange: boolean;
    },
    {
        mode: <Setting extends keyof Subsetting<''>>(setting: Setting) => `${Mode}${Setting}`
        save: () => Promise<void>;
    },
    { includeOptions: { value: number, label: string}[] },
    {
        heatLayer: Layer;
        setSetting: <T>(settingId: string, value: T) => Promise<void>;
        getModuleSettings: () => Promise<Settings>;
        updateSettings: UpdateSettings;
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
                heatmapMode: 'buildings',
                buildingsStaticRadius: false,
                buildingsRadiusM: 0,
                buildingsRadiusPx: 0,
                buildingsIncludes: [],
                vehiclesStaticRadius: false,
                vehiclesRadiusM: 0,
                vehiclesRadiusPx: 0,
                vehiclesIncludes: []
            },
            ids: {
                StaticRadius: nodeAttribute('static_radius', true),
                RadiusM: nodeAttribute('radius_m', true),
                RadiusPx: nodeAttribute('radius_px', true),
                Includes: nodeAttribute('includes', true)
            },
            icons: { faSlidersH },
            radiusMAsRange: true,
            radiusPxAsRange: true,
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
            return Object.entries(this.$t(this.settings.heatmapMode) as Record<number, InternalBuilding | InternalVehicle>).map(([id, {caption}]) => ({value: parseInt(id), label: caption})).sort(({label: labelA}, {label: labelB}) => labelA > labelB ? 1 : labelA < labelB ? -1 : 0);
        }
    },
    props: {
        heatLayer: {
            type: Object,
            required: true,
        },
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
    },
    mounted() {
        this.getModuleSettings().then(settings =>
            Object.entries(settings).forEach(([setting, value]) =>
                this.$set(this.settings, setting, value ?? this.settings[value])
            )
        );
    },
});
</script>
