<template>
    <einsatz-component :type="type" :mission="missionId"></einsatz-component>
</template>

<script lang="ts">
import Vue from 'vue';

import { EinsatzWindow } from '../parsers/einsatz';
import { RedesignComponent } from 'typings/modules/Redesign';
import { DefaultData, DefaultMethods } from 'vue/types/options';

type Component = RedesignComponent<
    'mission',
    'einsatz',
    EinsatzWindow,
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
    name: 'einsatz',
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
                    /\d+\/?$/
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
        this.$el.addEventListener('click', e => {
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            const href = target?.getAttribute('href');
            if (!target || !href) return;
            e.preventDefault();
            if (target.hasAttribute('lightbox-open'))
                return window.lightboxOpen(href);
            else this.$set(this.lightbox, 'src', href);
        });
        this.lightbox.finishLoading('einsatz-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
