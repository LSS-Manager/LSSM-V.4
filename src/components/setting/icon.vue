<template>
    <div class="form-horizontal">
        <button class="btn btn-success" @click="openIconChooser">
            Choose icon
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import '@fortawesome/fa-icon-chooser/dist/fa-icon-chooser/fa-icon-chooser.esm';

import type {
    ColorComputed,
    ColorProps,
} from 'typings/components/setting/Color';
import type { DefaultData, DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    ColorComputed,
    ColorProps
>({
    name: 'settings-icon',
    methods: {
        openIconChooser() {
            this.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "components/iconChooser" */ '../icon-chooser.vue'
                    ),
                {},
                {
                    name: `icon-chooser_map`,
                    height: '94%',
                    width: '94%',
                }
            );
        },
    },
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
