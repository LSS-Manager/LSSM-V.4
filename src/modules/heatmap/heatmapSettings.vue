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
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { DefaultComputed } from 'vue/types/options';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Layer } from 'leaflet';

type Mode = 'buildings' | 'vehicles'

type Subsetting<Scope extends Mode | ''> = Record<`${Scope}StaticRadius`, boolean> &
    Record<`${Scope}RadiusM` | `${Scope}RadiusPx`, number>;

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
    DefaultComputed,
    {
        heatLayer: Layer;
        setSetting: <T>(settingId: string, value: T) => Promise<void>;
        getModuleSettings: () => Promise<Settings>;
        updateSettings: UpdateSettings;
    }
>({
    name: 'lssmv4-heatmap-settings',
    data() {
        const nodeAttribute = (attr: string, id = false) =>
            this.$store.getters.nodeAttribute(`heatmap-settings-${attr}`, id);

        return {
            settings: {
                heatmapMode: 'buildings',
                buildingsStaticRadius: false,
                buildingsRadiusM: 0,
                buildingsRadiusPx: 0,
                vehiclesStaticRadius: false,
                vehiclesRadiusM: 0,
                vehiclesRadiusPx: 0,
            },
            ids: {
                StaticRadius: nodeAttribute('static_radius', true),
                RadiusM: nodeAttribute('radius_m', true),
                RadiusPx: nodeAttribute('radius_px', true),
            },
            icons: { faSlidersH },
            radiusMAsRange: true,
            radiusPxAsRange: true,
        };
    },
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
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
