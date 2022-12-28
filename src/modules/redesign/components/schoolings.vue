<template>
    <div>
        <schoolings-overview
            :open-schoolings="schoolings.openSchoolings.amounts"
            :own-schoolings="schoolings.ownSchoolings.amounts"
        ></schoolings-overview>
        <own-schooling-tabs
            :tabs="schoolings.ownSchoolings.tabs"
        ></own-schooling-tabs>
        <open-schooling-tabs
            :tabs="schoolings.openSchoolings.tabs"
        ></open-schooling-tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import type { RedesignSubComponent } from 'typings/modules/Redesign';

type Component = RedesignSubComponent<'schoolings', 'schoolings'>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-schoolings',
    components: {
        SchoolingsOverview: () =>
            import(
                /*webpackChunkName: "modules/schoolingOverview/schoolingOverview"*/ '../../schoolingOverview/schoolingOverview.vue'
            ),
        OwnSchoolingTabs: () =>
            import(
                /*webpackChunkName: "modules/schoolingOverview/ownSchoolingTabs"*/ '../../schoolingOverview/components/ownSchoolingTabs.vue'
            ),
        OpenSchoolingTabs: () =>
            import(
                /*webpackChunkName: "modules/schoolingOverview/openSchoolingTabs"*/ '../../schoolingOverview/components/openSchoolingTabs.vue'
            ),
    },
    data() {
        return {};
    },
    props: {
        schoolings: {
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
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
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
        schoolings() {
            this.lightbox.finishLoading('schoolings-updated-data');
        },
    },
    mounted() {
        this.lightbox.finishLoading('schoolings-mounted');
    },
});
</script>
