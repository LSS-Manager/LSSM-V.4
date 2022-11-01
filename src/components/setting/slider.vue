<template>
    <div class="form-horizontal">
        <span class="pull-left">
            {{ updateValue.toLocaleString() }}
        </span>
        <button
            class="pull-right btn btn-default btn-xs"
            @click="() => (this.rangeMode = !rangeMode)"
        >
            <font-awesome-icon
                v-if="!rangeMode"
                :icon="faSlidersH"
            ></font-awesome-icon>
            <template v-else>123</template>
        </button>
        <label>
            <input
                :name="name"
                :placeholder="placeholder"
                :min="min"
                :max="max"
                :step="
                    rangeMode ? step : typeof step === 'number' ? step : 0.001
                "
                :disabled="disabled"
                :type="rangeMode ? 'range' : 'number'"
                class="form-control"
                v-model.number="updateValue"
                :list="datalistId"
            />
            <datalist :id="datalistId">
                <option :value="min" :label="min.toLocaleString()"></option>
                <option
                    :value="min + (max - min) / 2"
                    :label="(min + (max - min) / 2).toLocaleString()"
                ></option>
                <option :value="max" :label="max.toLocaleString()"></option>
            </datalist>
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { useRootStore } from '@stores/index';

import type {
    SliderComputed,
    SliderData,
    SliderMethods,
    SliderProps,
} from 'typings/components/setting/Slider';

export default Vue.extend<
    SliderData,
    SliderMethods,
    SliderComputed,
    SliderProps
>({
    name: 'settings-slider',
    data() {
        return {
            faSlidersH,
            rangeMode: true,
        };
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
            type: Number,
            required: false,
        },
        min: {
            type: Number,
            required: false,
        },
        max: {
            type: Number,
            required: false,
        },
        step: {
            required: false,
            default: 'any',
            validator: value =>
                value === 'any' || (typeof value === 'number' && value > 0),
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        normalize(num) {
            return this.float
                ? parseFloat(num.toString())
                : parseInt(num.toString());
        },
    },
    computed: {
        updateValue: {
            get() {
                const int = this.normalize(this.value);
                return Number.isNaN(int) ? this.min ?? this.max ?? 0 : int;
            },
            set(value) {
                const int = this.normalize(value);
                this.$emit(
                    'input',
                    Number.isNaN(int) ? this.min ?? this.max ?? 0 : int
                );
            },
        },
        float() {
            return (
                this.step === 'any' ||
                parseInt(this.step.toString()) !== this.step ||
                parseInt(this.min.toString()) !== this.min ||
                parseInt(this.max.toString()) !== this.max
            );
        },
        datalistId() {
            return useRootStore().nodeAttribute(
                `settings-slider-${this.name}-datalist`
            );
        },
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%

    input[type="number"] + datalist
        display: none

    datalist
        display: flex
        justify-content: space-between

        option
            padding: 0
</style>
