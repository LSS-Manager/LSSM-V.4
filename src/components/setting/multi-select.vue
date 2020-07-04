<template>
    <div class="form-horizontal">
        <v-select
            :placeholder="placeholder"
            :multiple="true"
            v-model="updateValue"
            :options="options"
            :disabled="disabled"
            :clearable="false"
        ></v-select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VSelect from 'vue-select';
import {
    MultiSelectComputed,
    MultiSelectProps,
} from 'typings/components/setting/MultiSelect';
import { DefaultData, DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    MultiSelectComputed,
    MultiSelectProps
>({
    name: 'settings-multi-select',
    components: { VSelect },
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
        options: {
            type: Array,
            required: true,
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(values: ({ label: string; value: string[] } | string)[]) {
                this.$emit(
                    'input',
                    values.map(v => (typeof v === 'string' ? v : v.value))
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
