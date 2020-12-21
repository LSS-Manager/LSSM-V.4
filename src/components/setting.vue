<template>
    <div :class="{ disabled, hidden, wide }" class="setting">
        <h4>
            <b>{{ title }}</b>
            &nbsp;
            <toggle-button
                labels
                v-if="appendableListDisableable"
                v-model="appendableListEnabledUpdate"
            ></toggle-button>
        </h4>
        <slot v-if="beforeDescription"></slot>
        <span
            v-if="
                description &&
                    description !==
                        `modules.${moduleId}.settings.${settingId}.description`
            "
            v-html="description"
        >
            <br />
        </span>
        <slot v-if="!beforeDescription"></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    DefaultData,
    DefaultMethods,
    DefaultComputed,
} from 'vue/types/options';
import { SettingProps } from '../../typings/components/Setting';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    SettingProps
>({
    name: 'setting',
    props: {
        moduleId: {
            type: String,
            required: true,
        },
        settingId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
        beforeDescription: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        hidden: {
            type: Boolean,
            required: false,
            default: false,
        },
        wide: {
            type: Boolean,
            required: false,
            default: false,
        },
        appendableListDisableable: {
            type: Boolean,
            required: true,
        },
        appendableListEnabled: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        appendableListEnabledUpdate: {
            get() {
                return this.appendableListEnabled;
            },
            set(value) {
                this.$emit('toggleEnabled', value);
            },
        },
    },
});
</script>

<style scoped lang="sass">
.setting
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
    transition: 0.3s
    border-radius: 5px
    padding: 1rem

    &.disabled
        pointer-events: none
        cursor: not-allowed
        opacity: 0.5

    &:not(.disabled):hover
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
</style>
