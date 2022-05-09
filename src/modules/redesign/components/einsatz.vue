<template>
    <einsatz-component :type="type" :mission="missionId"></einsatz-component>
</template>

<script lang="ts">
import Vue from 'vue';

import type { RedesignComponent } from 'typings/modules/Redesign';
import type { DefaultData, DefaultMethods } from 'vue/types/options';

type Component = RedesignComponent<
    'mission',
    'einsatz',
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    { type: number; missionId: number }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-einsatz',
    components: {
        EinsatzComponent: () =>
            import(
                /* webpackChunkName: "modules/redesign/components/einsatz" */ './einsatz-component.vue'
            ),
    },
    computed: {
        type() {
            return parseInt(
                new URL(this.url, window.location.origin).pathname.match(
                    /\d+\/?$/u
                )?.[0] ?? '-1'
            );
        },
        missionId() {
            return parseInt(
                new URL(this.url, window.location.origin).searchParams.get(
                    'mission_id'
                ) ?? '0'
            );
        },
    },
    props: {
        mission: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
        getSetting: {
            type: Function,
            required: true,
        },
        setSetting: {
            type: Function,
            required: true,
        },
    },
    watch: {
        mission() {
            this.lightbox.finishLoading('einsatz-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('einsatz-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
