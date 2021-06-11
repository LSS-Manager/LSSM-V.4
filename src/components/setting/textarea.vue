<template>
    <div class="form-horizontal">
        <textarea
            :name="name"
            :placeholder="placeholder"
            class="form-control"
            v-model="updateValue"
            :disabled="disabled"
        />
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
    name: 'settings-textarea',
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
textarea
    resize: vertical
</style>
