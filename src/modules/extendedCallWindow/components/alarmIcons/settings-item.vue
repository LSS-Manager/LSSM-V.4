<template>
    <div class="tailored-tabs-setting">
        <label>
            <input type="text" v-model="updateIcon" placeholder="icon" />
        </label>
        <v-select
            placeholder="type"
            v-model="updateType"
            :options="styles"
        ></v-select>
        <a href="#" class="btn btn-success navbar-btn btn-sm">
            <font-awesome-icon
                :icon="[updateType.value, updateIcon]"
                class="type-icon"
            ></font-awesome-icon>
            Alarm
            <span id="vehicle_amount" class="badge vehicle_amount_selected">
                0
            </span>
        </a>
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
import { DefaultMethods } from 'vue/types/options';
import {
    SettingsItem,
    SettingsItemComputed,
    SettingsItemProps,
} from 'typings/modules/ExtendedCallWindow/alarmIcons/SettingsItem';
import { InternalVehicle } from 'typings/Vehicle';

export default Vue.extend<
    SettingsItem,
    DefaultMethods<Vue>,
    SettingsItemComputed,
    SettingsItemProps
>({
    name: 'tailored-tabs-settings-item',
    components: {
        VSelect: () =>
            import(
                /* webpackChunkName: "components/vue-select" */ 'vue-select'
            ),
    },
    data() {
        return {
            vehicleTypes: (Object.values(
                this.$t('vehicles')
            ) as InternalVehicle[]).map(({ caption }, index) => ({
                label: caption,
                value: index,
            })),
            styles: [
                {
                    value: 'fas',
                    label: 'solid',
                },
                {
                    value: 'far',
                    label: 'regular',
                },
                {
                    value: 'fab',
                    label: 'brand',
                },
            ],
        };
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    computed: {
        updateIcon: {
            get(): SettingsItemComputed['updateIcon'] {
                return this.value.icon;
            },
            set(icon) {
                this.$emit('input', { ...this.value, icon });
            },
        },
        updateType: {
            get(): SettingsItemComputed['updateType'] {
                return (
                    this.styles.find(s => s.value === this.value.type) ||
                    this.styles[0]
                );
            },
            set(type: { label: string; value: string }) {
                this.$emit('input', { ...this.value, type: type.value });
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
            set(vehicleTypes: ({ label: string; value: number } | number)[]) {
                this.$emit('input', {
                    ...this.value,
                    vehicleTypes: vehicleTypes.map(v =>
                        typeof v === 'number' ? v : v.value
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

        &:not(label):not(.btn)
            width: 100%
</style>
