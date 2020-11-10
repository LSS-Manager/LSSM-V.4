<template>
    <div class="form-horizontal">
        <v-select
            :placeholder="placeholder"
            v-model="updateValue"
            :options="options"
            :disabled="disabled"
            :clearable="false"
        ></v-select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SelectComputed, SelectProps } from 'typings/components/setting/Select';
import { DefaultData, DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    SelectComputed,
    SelectProps
>({
    name: 'settings-select',
    components: {
        VSelect: () =>
            import(
                /* webpackChunkName: "components/vue-select" */ 'vue-select'
            ),
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
            type: String,
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
                return (
                    this.options.find(
                        o => o.value.toString() === this.value.toString()
                    ) ?? {
                        label: this.value,
                        value: this.value,
                    }
                );
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(value: { label: string; value: string }) {
                this.$emit('input', value.value);
            },
        },
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%
</style>
