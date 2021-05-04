<template>
    <div>
        <schoolings-overview
            :open-schoolings="schoolings.openSchoolings.amounts"
            :own-schoolings="schoolings.ownSchoolings.amounts"
        ></schoolings-overview>
        <h3>{{ lightbox.$sm('ownSchoolings') }}</h3>
        <own-schooling-tabs
            :tabs="schoolings.ownSchoolings.tabs"
        ></own-schooling-tabs>
        <h3>{{ lightbox.$sm('openSchoolings') }}</h3>
        <open-schooling-tabs
            :tabs="schoolings.openSchoolings.tabs"
        ></open-schooling-tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { SchoolingsWindow } from '../parsers/schoolings';

import { RedesignSubComponent } from 'typings/modules/Redesign';

type Component = RedesignSubComponent<
    'schoolings',
    'schoolings',
    SchoolingsWindow
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'schoolings',
    components: {
        SchoolingsOverview: () =>
            import(
                /*webpackChunkName: "modules/schoolingOverview/schoolingOverview"*/ '../../schoolingOverview/schoolingOverview'
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
        if (!this.lightbox.noModal) {
            (this.schoolings as SchoolingsWindow).ownSchoolings.tabs[
                this.$t('modules.schoolingOverview.all').toString()
            ].forEach(({ end, id }) => window.educationCountdown(end, id));
            (this.schoolings as SchoolingsWindow).openSchoolings.tabs[
                this.$t('modules.schoolingOverview.all').toString()
            ].forEach(({ end, id }) => window.educationCountdown(end, id));
        }
        this.lightbox.finishLoading('schoolings-mounted');
    },
});
</script>
