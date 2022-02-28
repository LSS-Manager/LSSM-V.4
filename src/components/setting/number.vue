<template>
    <div class="form-horizontal">
        <label>
            <input
                :name="name"
                :placeholder="placeholder"
                :min="min"
                :max="max"
                :step="step"
                :disabled="disabled"
                type="number"
                class="form-control"
                v-model.number="updateValue"
            />
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import type { DefaultData } from 'vue/types/options';
import type {
    NumberComputed,
    NumberMethods,
    NumberProps,
} from 'typings/components/setting/Number';

export default Vue.extend<
    DefaultData<Vue>,
    NumberMethods,
    NumberComputed,
    NumberProps
>({
    name: 'settings-number',
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
            type: Number,
            required: false,
        },
        float: {
            type: Boolean,
            required: false,
            default: false,
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
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%
</style>
