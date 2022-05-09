<template>
    <div>
        <button class="btn btn-success pull-right" @click="openMap">
            <font-awesome-icon :icon="faMapMarkedAlt"></font-awesome-icon>
        </button>
        <span><b>lat</b>: {{ updateValue[0] }}</span>
        <span><b>lng</b>: {{ updateValue[1] }}</span>
        <span v-if="zoom"><b>zoom</b>: {{ updateValue[2] }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';

import type {
    LocationComputed,
    LocationData,
    LocationMethods,
    LocationProps,
} from 'typings/components/setting/Location';

export default Vue.extend<
    LocationData,
    LocationMethods,
    LocationComputed,
    LocationProps
>({
    name: 'settings-location',
    data() {
        return { faMapMarkedAlt };
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        value: {
            type: Array,
            required: true,
        },
        zoom: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        updateValue: {
            get(): number[] {
                return this.value;
            },
            set(value) {
                this.$emit(
                    'input',
                    value
                        .toString()
                        .split(',')
                        .slice(0, this.zoom ? 3 : 2)
                        .map(n => parseFloat(n))
                        .map(n => (Number.isNaN(n) ? 0 : n))
                );
            },
        },
    },
    methods: {
        openMap() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const Vue = this;
            this.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "components/setting/location/map" */ './location/map.vue'
                    ),
                {
                    name: this.name,
                    title: this.placeholder,
                    zoom: this.zoom,
                    location: this.updateValue.filter(Boolean).length
                        ? this.updateValue
                        : [
                              window.map.getCenter().lat,
                              window.map.getCenter().lng,
                              window.map.getZoom(),
                          ],
                    save(location: number[]) {
                        Vue.$set(
                            Vue,
                            'updateValue',
                            location.slice(0, Vue.zoom ? 3 : 2).join(',')
                        );
                    },
                },
                {
                    name: `${this.name}_map`,
                    height: 'auto',
                }
            );
        },
    },
});
</script>

<style scoped lang="sass">
span
    white-space: nowrap
</style>
