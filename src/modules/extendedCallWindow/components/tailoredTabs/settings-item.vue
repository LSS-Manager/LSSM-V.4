<template>
    <div class="tailored-tabs-setting">
        <label>
            <input type="text" v-model="updateName" placeholder="name" />
        </label>
        <v-select
            placeholder="types"
            :multiple="true"
            v-model="updateTypes"
            :options="selectableTypes"
            :clearable="true"
        ></v-select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VSelect from 'vue-select';
import { DefaultMethods } from 'vue/types/options';
import {
    SettingsItem,
    SettingsItemComputed,
    SettingsItemProps,
} from 'typings/modules/ExtendedCallWindow/tailoredTabs/SettingsItem';
import { InternalVehicle } from 'typings/Vehicle';

export default Vue.extend<
    SettingsItem,
    DefaultMethods<Vue>,
    SettingsItemComputed,
    SettingsItemProps
>({
    name: 'tailored-tabs-settings-item',
    components: { VSelect },
    data() {
        return {
            vehicleTypes: (Object.values(
                this.$t('vehicles')
            ) as InternalVehicle[]).map(({ caption }, index) => ({
                label: caption,
                value: index.toString(),
            })),
        };
    },
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
                return (this.value.vehicleTypes
                    .map(v =>
                        this.vehicleTypes.find(
                            o => o.value.toString() === v.toString()
                        )
                    )
                    .filter(
                        v => !!v
                    ) as SettingsItemComputed['updateTypes']).sort((a, b) =>
                    a.value > b.value ? 1 : a.value < b.value ? -1 : 0
                );
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(vehicleTypes: ({ label: string; value: string } | string)[]) {
                this.$emit('input', {
                    ...this.value,
                    vehicleTypes: vehicleTypes.map(v =>
                        typeof v === 'string' ? v : v.value
                    ),
                });
            },
        },
        selectableTypes() {
            return this.vehicleTypes.filter(
                t => !this.updateTypes.find(v => v.value === t.value)
            );
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

        &:not(label)
            width: 100%
</style>
