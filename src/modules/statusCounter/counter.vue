<template>
    <div class="statuscounter-wrapper">
        <span
            v-for="({ real, amount }, show) in vehicleStateAmounts"
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
                    (settings.percentageInBrackets ? '(' : '') +
                    (amount / (vehicles / 100)).toFixed(
                        settings.percentRounding
                    ) +
                    '%' +
                    (settings.percentageInBrackets ? ')' : '')
                }}
            </template>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { mapState } from 'pinia';
import { useAPIStore } from '@stores/api';

import type { DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    { fmsReal2Show: Record<string, number> },
    DefaultMethods<Vue>,
    {
        vehicles: number;
        vehicleStates: Record<number, number>;
        vehicleStateAmounts: Record<string, { real: string; amount: number }>;
    },
    { settings: Record<string, boolean> & { percentRounding: number } }
>({
    name: 'lssmv4-status-counter',
    data() {
        return {
            fmsReal2Show: this.$t('fmsReal2Show') as unknown as Record<
                string,
                number
            >,
        };
    },
    computed: {
        ...mapState(useAPIStore, {
            vehicles: store => store.vehicles.length,
            vehicleStates: 'vehicleStates',
        }),
        vehicleStateAmounts() {
            return Object.fromEntries(
                Object.entries(this.fmsReal2Show).map(([real, show]) => [
                    show,
                    {
                        real,
                        amount: this.vehicleStates[show] ?? 0,
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
.statuscounter-wrapper
    display: flex
    flex-flow: wrap
    width: 100%
    margin-top: 0.4em

    .noblink
        background-image: none
</style>
