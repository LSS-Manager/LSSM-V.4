<template>
    <div class="alert alert-danger col-xs-12" :id="boxId">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    { boxId: string },
    DefaultMethods<Vue>,
    { hasRedTexts: boolean; hasLabels: boolean },
    {
        featureId: string;
        requirements: {
            red: Record<string, number>;
            detailed: Record<string, Record<string, number>>;
        };
        labelColors: Record<string, Record<string, string>>;
        patientLabelCombis: Record<string, number>;
    }
>({
    name: 'lssmv4-collapsablePatients',
    data() {
        return {
            boxId: this.$store.getters.nodeAttribute(
                `${this.featureId}_summary-box`,
                true
            ),
        };
    },
    computed: {
        hasRedTexts() {
            return !!Object.keys(this.requirements.red).length;
        },
        hasLabels() {
            return !!Object.keys(this.requirements.detailed).length;
        },
    },
    props: {
        featureId: {
            type: String,
            required: true,
        },
        requirements: {
            type: Object,
            required: true,
        },
        labelColors: {
            type: Object,
            required: true,
        },
        patientLabelCombis: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style lang="sass" scoped>
#lssmv4-extendedCallWindow_collapsable-patients_summary-box
    margin: 5px
    width: calc(100% - 10px)
    border-radius: 5px
    padding: 5px

    ul
        list-style: none
        padding-left: 0
        margin-bottom: 0

        &.labels-list, &.labels-list > li > span:not(:first-child)
            padding-left: 0.5em
</style>
