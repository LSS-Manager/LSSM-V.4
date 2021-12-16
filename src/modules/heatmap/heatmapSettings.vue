<template>
    <lightbox name="heatmap-settings" no-fullscreen no-title-hide>
        <h1>
            Hütmap Sättings
            <button class="btn btn-success" @click="save">
                Säif
            </button>
        </h1>
        <div class="form-group">
            <label :for="ids.radiusM">
                Radius:
                <span>{{ (settings.radiusM / 1000).toLocaleString() }}km</span>
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
                :id="ids.radiusM"
                :type="radiusMAsRange ? 'range' : 'number'"
                v-model.number="settings.radiusM"
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

export interface Settings {
    radiusM: number;
}

export type UpdateSettings = (radiusM: number) => void;

export default Vue.extend<
    {
        settings: Settings;
        ids: Record<keyof Settings, string>;
        icons: { faSlidersH: IconDefinition };
        radiusMAsRange: boolean;
    },
    {
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
            settings: { radiusM: 0 },
            ids: {
                radiusM: nodeAttribute('radius_m', true),
            },
            icons: { faSlidersH },
            radiusMAsRange: true,
        };
    },
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
    },
    methods: {
        async save() {
            await this.setSetting('radiusM', this.settings.radiusM);
            this.updateSettings(this.settings.radiusM);
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
    watch: {
        radiusM() {
            if (this.radiusM < 0) this.$set(this, 'radiusM', 0);
            else if (this.radiusM > 100_000)
                this.$set(this, 'radiusM', 100_000);
        },
    },
    mounted() {
        this.getModuleSettings().then(settings =>
            Object.entries(settings).forEach(([setting, value]) =>
                this.$set(this.settings, setting, value)
            )
        );
    },
});
</script>
