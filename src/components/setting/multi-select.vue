<template>
    <div class="form-horizontal">
        <v-select
            :placeholder="placeholder"
            :multiple="true"
            v-model="updateValue"
            :options="filteredOptions"
            :disabled="disabled"
            :clearable="false"
        >
            <div slot="no-options">
                {{ $t('noOptions') }}
            </div>
        </v-select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { DefaultData, DefaultMethods } from 'vue/types/options';
import {
    MultiSelectComputed,
    MultiSelectProps,
} from 'typings/components/setting/MultiSelect';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    MultiSelectComputed,
    MultiSelectProps
>({
    name: 'settings-multi-select',
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
        allOnNone: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        updateValue: {
            get() {
                return !this.value.length && this.allOnNone
                    ? this.options
                    : (this.value
                          .map(v =>
                              this.options.find(
                                  o => o.value.toString() === v.toString()
                              )
                          )
                          .filter(
                              v => !!v
                          ) as MultiSelectComputed['updateValue']).sort(
                          (a, b) =>
                              a.value > b.value ? 1 : a.value < b.value ? -1 : 0
                      );
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(values: ({ label: string; value: string } | string)[]) {
                this.$emit(
                    'input',
                    !values.length && this.allOnNone
                        ? this.options.map(({ value }) => value)
                        : values.map(v => (typeof v === 'string' ? v : v.value))
                );
            },
        },
        filteredOptions() {
            return this.options.filter(
                o => !this.updateValue.find(v => v.value === o.value)
            );
        },
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%
</style>
