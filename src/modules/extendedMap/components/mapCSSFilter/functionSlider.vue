<template>
    <input
        v-if="row.value.filterFunction.startsWith('predefined')"
        type="text"
        class="form-control"
        :value="row.value.filterFunction"
        disabled
    />
    <Slider
        v-else
        placeholder=""
        :name="`em-mapCSSFilter-${row.index}`"
        v-model="updateValue"
        :min="slider.min"
        :max="slider.max"
        :step="slider.step"
        :unit="slider.unit"
        @input="newValue => (updateValue = newValue)"
    />
</template>

<script lang="ts">
import Vue from 'vue';

import { useRootStore } from '@stores/index';

import { sliders } from '../../assets/mapCSSFilter';

import type { MapCSSFilterFunctionSlider } from 'modules/extendedMap/settings';

export default Vue.extend<
    MapCSSFilterFunctionSlider['Data'],
    MapCSSFilterFunctionSlider['Methods'],
    MapCSSFilterFunctionSlider['Computed'],
    MapCSSFilterFunctionSlider['Props']
>({
    name: 'lssmv4-em-map_css_filter-function-slider',
    data() {
        return {
            sliders,
        };
    },
    components: {
        Slider: () =>
            import(
                /* webpackChunkName: "components/setting/slider" */ '../../../../components/setting/slider.vue'
            ),
    },
    props: {
        value: {
            type: Number,
            required: true,
        },
        values: {
            type: Array,
            required: true,
        },
        row: {
            type: Object,
            required: true,
        },
    },
    computed: {
        id() {
            return useRootStore().nodeAttribute(
                `em-msf-preview-${this.row.index}`,
                true
            );
        },
        slider() {
            return {
                step: 'any',
                ...this.sliders[this.row.value.filterFunction],
            };
        },
        updateValue: {
            get() {
                return this.value === -1
                    ? this.slider.default
                    : Number.isNaN(this.value)
                    ? this.min ?? this.max ?? 0
                    : this.value;
            },
            set(value) {
                this.$emit(
                    'input',
                    this.updateValue === -1
                        ? this.slider.default
                        : Number.isNaN(value)
                        ? this.min ?? this.max ?? 0
                        : value
                );
            },
        },
    },
});
</script>
