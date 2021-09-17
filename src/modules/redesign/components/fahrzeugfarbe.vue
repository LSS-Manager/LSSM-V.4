<template>
    <div>
        <h1>{{ lightbox.$sm('title', { type: vehicleTypeCaption }) }}</h1>
        <div class="alert alert-info">{{ lightbox.$sm('description') }}</div>
        <div class="alert alert-success" v-show="showSavedNote">
            <button
                class="close"
                data-dismiss="alert"
                type="button"
                @click="() => (showSavedNote = !showSavedNote)"
            >
                ×
            </button>
            {{ lightbox.$sm('savedNote') }}
        </div>
        <div class="row">
            <div class="col-xs-6">
                <input type="color" :value="fahrzeugfarbe.color" ref="color" />
                <small v-if="!hasColor">
                    {{ lightbox.$sm('noColor') }}
                </small>
                <br />
                <button class="btn btn-success" @click="updateColor">
                    {{ lightbox.$sm('save') }}
                </button>
                <button class="btn btn-danger" @click="resetColor">
                    {{ lightbox.$sm('reset') }}
                </button>
            </div>
            <div class="col-xs-6">
                <!-- Here a selection will appear to set color of different vehicle type more faster -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { FahrzeugfarbeWindow } from '../parsers/fahrzeugfarbe';
import { InternalVehicle } from 'typings/Vehicle';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'fahrzeugfarbe',
    'fahrzeugfarbe',
    FahrzeugfarbeWindow,
    { showSavedNote: boolean },
    { updateColor(): void; resetColor(): void },
    {
        vehicleTypeCaption: string;
        hasColor: boolean;
        urlSearchParam: string;
        closeAfterSubmit: boolean;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'fahrzeugfarbe',
    data() {
        return {
            showSavedNote: false,
        };
    },
    computed: {
        vehicleTypeCaption() {
            return (
                this.fahrzeugfarbe.customVehicleType ??
                (this.$t('vehicles') as Record<number, InternalVehicle>)[
                    this.fahrzeugfarbe.vehicleType
                ].caption
            );
        },
        hasColor() {
            return this.fahrzeugfarbe.color.length === 7;
        },
        urlSearchParam() {
            return this.fahrzeugfarbe.customVehicleType
                ? `?vehicle_type_caption=${this.fahrzeugfarbe.customVehicleType}`
                : '';
        },
        closeAfterSubmit() {
            return new URL(this.url, window.location.origin).searchParams.has(
                'close-after-submit'
            );
        },
    },
    methods: {
        updateColor() {
            const url = new URL(
                `/fahrzeugfarbe/${this.fahrzeugfarbe.vehicleType}`,
                window.location.origin
            );
            url.searchParams.append('utf8', '✓');
            url.searchParams.append('_method', 'put');
            url.searchParams.append(
                'vehicle_color[color]',
                (this.$refs.color as HTMLInputElement).value.replace(/^#/, '')
            );
            url.searchParams.append(
                'authenticity_token',
                this.fahrzeugfarbe.authenticity_token
            );
            this.$store
                .dispatch('api/request', {
                    url: `/fahrzeugfarbe/${this.fahrzeugfarbe.vehicleType}/update${this.urlSearchParam}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: `https://www.leitstellenspiel.de/fahrzeugfarbe/${this.fahrzeugfarbe.vehicleType}${this.urlSearchParam}`,
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-update-fahrzeugfarbe-${this.fahrzeugfarbe.vehicleType}`,
                })
                .then(() => {
                    if (this.closeAfterSubmit)
                        return window.lightboxClose(this.lightbox.creation);
                    this.$set(this, 'showSavedNote', true);
                    this.$set(
                        this.fahrzeugfarbe,
                        'color',
                        (this.$refs.color as HTMLInputElement).value
                    );
                });
        },
        resetColor() {
            this.$store
                .dispatch('api/request', {
                    url: `/fahrzeugfarbe/${this.fahrzeugfarbe.vehicleType}/destroy${this.urlSearchParam}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: `https://www.leitstellenspiel.de/fahrzeugfarbe/${this.fahrzeugfarbe.vehicleType}${this.urlSearchParam}`,
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: `redesign-destroy-fahrzeugfarbe-${this.fahrzeugfarbe.vehicleType}`,
                })
                .then(() => {
                    if (this.closeAfterSubmit)
                        return window.lightboxClose(this.lightbox.creation);
                    this.$set(this.fahrzeugfarbe, 'color', '#');
                });
        },
    },
    props: {
        fahrzeugfarbe: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
        getSetting: {
            type: Function,
            required: true,
        },
        setSetting: {
            type: Function,
            required: true,
        },
    },
    watch: {
        fahrzeugfarbe() {
            this.lightbox.finishLoading('fahrzeugfarbe-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('fahrzeugfarbe-mounted');
    },
});
</script>

<style scoped lang="sass">
.row
    margin-left: 0
    margin-right: 0
</style>
