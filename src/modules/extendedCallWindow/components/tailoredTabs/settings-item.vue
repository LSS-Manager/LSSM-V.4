<template>
    <div class="tailored-tabs-setting">
        <label>
            <input type="text" v-model="updateName" placeholder="name" />
        </label>
        <pre>{{ updateTypes }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DefaultData, DefaultMethods } from 'vue/types/options';
import {
    SettingsItemComputed,
    SettingsItemProps,
} from 'typings/modules/ExtendedCallWindow/tailoredTabs/SettingsItem';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    SettingsItemComputed,
    SettingsItemProps
>({
    name: 'tailored-tabs-settings-item',
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    computed: {
        updateName: {
            get(): SettingsItemComputed['updateName'] {
                return this.value.name;
            },
            set(name) {
                this.$emit('input', { ...this.value, name });
            },
        },
        updateTypes: {
            get(): SettingsItemComputed['updateTypes'] {
                return this.value.vehicleTypes;
            },
            set(vehicleTypes) {
                this.$emit('input', { ...this.value, vehicleTypes });
            },
        },
    },
});
</script>

<style scoped lang="sass">
.tailored-tabs-setting
    display: flex
    justify-content: space-between

    > *
        margin-bottom: 0
        margin-left: 0.5rem
        margin-right: 0.5rem
        width: 100%
</style>
