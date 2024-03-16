<template>
    <div class="statuscounter-wrapper">
        <span
            v-for="{ fms_show, fms_real, amount, show, percentage } in states"
            :key="fms_show"
            class="building_list_fms"
            :class="{
                [`building_list_fms_${fms_real}`]: true,
                noblink:
                    fms_real === '5' &&
                    (settings.s5noblink ||
                        (settings.s5blinkOnGt0 && amount <= 0)),
            }"
            :title="`Status ${fms_show}: ${amount.toLocaleString()}`"
            v-show="show"
        >
            {{ amount.toLocaleString() }}
            <template v-if="settings[`percent_${fms_show}`]">
                {{ percentage }}
            </template>
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useAPIStore } from '@stores/api';

import { useI18n } from '../../i18n';

const fmsReal2Show = useI18n().$t('fmsReal2Show') as unknown as Record<
    string,
    number
>;

const apiStore = useAPIStore();
const vehicles = apiStore.vehiclesArray.length;
const vehicleStates = apiStore.vehicleStates;

const props = defineProps<{
    settings: Record<string, boolean> & { percentRounding: number };
}>();

const getPercentageString = (amount: number) =>
    (amount / vehicles).toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: props.settings.percentRounding,
        maximumFractionDigits: props.settings.percentRounding,
    });

const states = computed(() =>
    Object.entries(fmsReal2Show).map(([fms_real, fms_show]) => {
        const amount = vehicleStates[fms_show] ?? 0;
        return {
            fms_show,
            fms_real,
            show:
                props.settings[`show_${fms_show}`] &&
                (!props.settings[`hide_${fms_show}`] ||
                    (props.settings[`hide_${fms_show}`] && amount)),
            amount,
            percentage: props.settings.percentageInBrackets
                ? `(${getPercentageString(amount)})`
                : getPercentageString(amount),
        };
    })
);
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
