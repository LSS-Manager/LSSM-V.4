<template>
    <div class="form-horizontal">
        <v-select
            :placeholder="placeholder"
            v-model="updateValue"
            :options="options"
            :disabled="disabled"
            :clearable="false"
        >
            <div slot="no-options">
                {{ $t('noOptions') }}
            </div>
            <template v-if="name === 'global.branch'" #option="{ label }">
                <span v-html="label"></span>
            </template>
            <template
                v-if="name === 'global.branch'"
                #selected-option="{ label }"
            >
                <span v-html="label"></span>
            </template>
        </v-select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import type { DefaultData, DefaultMethods } from 'vue/types/options';
import type {
    SelectComputed,
    SelectProps,
} from 'typings/components/setting/Select';

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

.setting[name="global.branch"] .form-horizontal ::v-deep(.vs__dropdown-option)
    white-space: break-spaces

    &:nth-child(1), &:nth-child(2)
        font-weight: bold
</style>
