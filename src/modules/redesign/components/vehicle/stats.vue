<template>
    <div>
        <h1>
            {{ lightbox.$smc('title', stats.data.length) }}
        </h1>
        <highcharts :options="chart"></highcharts>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Chart } from 'highcharts-vue';
import moment from 'moment';

import type { DefaultMethods } from 'vue/types/options';
import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'stats',
    'vehicle/stats',
    {
        moment: typeof moment;
    },
    DefaultMethods<Vue>,
    {
        chart: {
            chart: {
                type: 'column';
                backgroundColor: string;
            };
            tooltip: { pointFormat: string };
            xAxis: {
                categories: string[];
            };
            yAxis: {
                min: number;
                title: {
                    text: string;
                };
            };
            title: { text: string };
            series: [{ name: string; data: number[] }];
        };
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-vehicle_stats',
    components: {
        Highcharts: Chart,
    },
    data() {
        moment.locale(this.$store.state.lang);
        return {
            moment,
        };
    },
    computed: {
        chart() {
            return {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent',
                },
                xAxis: {
                    categories: Array(this.stats.data.length)
                        .fill('')
                        .map((_, i) =>
                            this.moment().subtract(i, 'days').format('L')
                        )
                        .reverse(),
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b> km',
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: this.lightbox.$sm('distance.axis').toString(),
                    },
                },
                title: {
                    text: '',
                },
                series: [
                    {
                        name: this.lightbox.$sm('distance.series').toString(),
                        data: this.stats.data,
                    },
                ],
            };
        },
    },
    props: {
        stats: {
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
        stats() {
            this.lightbox.finishLoading('vehicle_stats-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('vehicle_stats-mounted');
    },
});
</script>
