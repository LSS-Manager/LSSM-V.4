<template>
    <div class="form-horizontal">
        <label>
            <input
                :name="name"
                :disabled="disabled"
                type="color"
                class="form-control"
                :value="updateValue"
                @change="e => (updateValue = e.target.value)"
            />
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DefaultData, DefaultMethods } from 'vue/types/options';
import {
    ColorComputed,
    ColorProps,
} from '../../../typings/components/setting/Color';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    ColorComputed,
    ColorProps
>({
    name: 'settings-color',
    props: {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        updateValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%
</style>
