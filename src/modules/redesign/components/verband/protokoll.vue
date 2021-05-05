<template>
    <div>
        <pre>{{ protokoll }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { RedesignSubComponent } from 'typings/modules/Redesign';
import { VerbandProtokollWindow } from '../../parsers/verband/protokoll';

type Component = RedesignSubComponent<
    'protokoll',
    'verband/protokoll',
    VerbandProtokollWindow
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-protokoll',
    components: {
        // EnhancedTable: () =>
        //     import(
        //         /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
        //     ),
    },
    data() {
        return {};
    },
    methods: {},
    computed: {},
    props: {
        protokoll: {
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
        protokoll() {
            this.lightbox.finishLoading('verband/protokoll-updated-data');
        },
    },
    beforeMount() {
        // Object.entries(this.filter).forEach(([filter, props]) => {
        //     Object.entries(props).forEach(([prop, value]) => {
        //         this.getSetting(`${filter}.${prop}`, value).then(v =>
        //             this.$set(props, prop, v)
        //         );
        //     });
        // });
    },
    mounted() {
        // this.getSetting(`sort`, this.sort).then(sort => (this.sort = sort));
        // this.getSetting(`sortDir`, this.sortDir).then(
        //     dir => (this.sortDir = dir)
        // );
        // this.startPage = this.page;
        // this.endPage = this.page;
        this.lightbox.finishLoading('verband/protokoll-mounted');
    },
});
</script>
