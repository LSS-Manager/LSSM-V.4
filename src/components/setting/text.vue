<template>
    <div class="form-horizontal">
        <label>
            <input
                :name="name"
                :placeholder="placeholder"
                type="text"
                class="form-control"
                v-model="updateValue"
                :disabled="disabled"
            />
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { DefaultData, DefaultMethods } from 'vue/types/options';
import {
    TextComputed,
    TextProps,
} from '../../../typings/components/setting/Text';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    TextComputed,
    TextProps
>({
    name: 'settings-text',
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
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        updateValue: {
            get(): string {
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
