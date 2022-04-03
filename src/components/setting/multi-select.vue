<template>
    <div class="form-horizontal">
        <v-select
            :placeholder="placeholder"
            multiple
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

import type { DefaultData, DefaultMethods } from 'vue/types/options';
import type {
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
                    : (
                          this.value
                              .map(v =>
                                  this.options.find(
                                      o => o.value.toString() === v.toString()
                                  )
                              )
                              .filter(
                                  v => !!v
                              ) as MultiSelectComputed['updateValue']
                      ).sort((a, b) =>
                          a.value > b.value ? 1 : a.value < b.value ? -1 : 0
                      );
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(values: (string | { label: string; value: string })[]) {
                this.$emit(
                    'input',
                    !values.length && this.allOnNone
                        ? this.options.map(({ value }) => value)
                        : values.map(v => (typeof v === 'string' ? v : v.value))
                );
            },
        },
        filteredOptions() {
            const filtered = this.options.filter(
                o => !this.updateValue.some(v => v.value === o.value)
            );
            return filtered.every(({ label }) => label.match(/^\d+/u))
                ? filtered.sort((a, b) => {
                      const aLabel = a.label.replace(
                          /(?<=^\d+)-(?=\d+:)/u,
                          ':'
                      );
                      const bLabel = b.label.replace(
                          /(?<=^\d+)-(?=\d+:)/u,
                          ':'
                      );
                      return aLabel > bLabel ? 1 : aLabel < bLabel ? -1 : 0;
                  })
                : filtered;
        },
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%
</style>
