<template>
    <div
        :class="{ disabled, hidden, wide, collapsed }"
        class="setting"
        :data-setting-type="settingType"
    >
        <button
            v-if="settingType === 'appendable-list'"
            class="btn btn-xs btn-collapse pull-right"
            :class="collapsed ? 'btn-danger' : 'btn-success'"
            @click="() => (collapsed = !collapsed)"
        >
            <font-awesome-icon
                :icon="collapsed ? faExpandAlt : faCompressAlt"
            ></font-awesome-icon>
        </button>
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
            class="description"
            v-if="
                description &&
                description !==
                    `modules.${moduleId}.settings.${settingId}.description`
            "
            v-html="description"
        ></span>
        <slot v-if="!beforeDescription"></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { SettingProps } from 'typings/components/Setting';
import type { DefaultComputed, DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    {
        collapsed: boolean;
        faCompressAlt: IconDefinition;
        faExpandAlt: IconDefinition;
    },
    DefaultMethods<Vue>,
    DefaultComputed,
    SettingProps
>({
    name: 'lssmv4-setting',
    data: () => ({ collapsed: true, faCompressAlt, faExpandAlt }),
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
        settingType: {
            type: String,
            required: true,
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

    &.collapsed[data-setting-type="appendable-list"] > :not(.description):not(h4):not(.btn-collapse)
      display: none
</style>
