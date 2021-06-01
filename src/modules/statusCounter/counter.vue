<template>
    <div>
        <span
            v-for="({ real, amount }, show) in vehicle_states"
            :key="show"
            class="building_list_fms"
            :class="{
                [`building_list_fms_${real}`]: true,
                noblink:
                    real === '5' &&
                    (settings.s5noblink ||
                        (settings.s5blinkOnGt0 && amount <= 0)),
            }"
            :title="`Status ${show}: ${amount.toLocaleString()}`"
            v-show="
                settings[`show_${show}`] &&
                    (!settings[`hide_${show}`] ||
                        (settings[`hide_${show}`] && amount))
            "
        >
            {{ amount.toLocaleString() }}
            <template v-if="settings[`percent_${show}`]">
                {{
                    (amount / (vehicles / 100)).toFixed(
                        settings.percentRounding
                    )
                }}%
            </template>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    { fmsReal2Show: Record<string, number> },
    DefaultMethods<Vue>,
    {
        vehicles: number;
        vehicle_states: Record<string, { real: string; amount: number }>;
    },
    { settings: { percentRounding: number } & Record<string, boolean> }
>({
    name: 'status-counter',
    data() {
        return {
            fmsReal2Show: (this.$t('fmsReal2Show') as unknown) as Record<
                string,
                number
            >,
        };
    },
    computed: {
        vehicles() {
            return this.$store.state.api.vehicles.length;
        },
        vehicle_states() {
            return Object.fromEntries(
                Object.entries(this.fmsReal2Show).map(([real, show]) => [
                    show,
                    {
                        real,
                        amount: this.$store.state.api.vehicleStates[show] ?? 0,
                    },
                ])
            );
        },
    },
    props: {
        settings: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
.noblink
    background-image: none
</style>
