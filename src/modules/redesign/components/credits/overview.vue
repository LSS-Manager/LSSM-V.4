<template>
    <div>
        <h1>{{ $sm('title') }}</h1>
        <div class="credits-overview-wrapper">
            <div :id="chartId"></div>
            <enhanced-table
                :head="head"
                :table-attrs="{ class: 'table table-striped' }"
                :no-search="true"
            >
                <tr
                    v-for="(entry, id) in data.entries"
                    :key="id"
                    :color="
                        (color = `text-${
                            entry.total > 0
                                ? 'success'
                                : entry.total < 0
                                ? 'danger'
                                : ''
                        }`)
                    "
                >
                    <td>{{ dates[7 - id] }}</td>
                    <td class="text-success">
                        {{ entry.plus.toLocaleString() }} Credits
                    </td>
                    <td class="text-danger">
                        {{ entry.minus.toLocaleString() }} Credits
                    </td>
                    <td :class="color">
                        <b>{{ entry.total.toLocaleString() }} Credits</b>
                    </td>
                </tr>
            </enhanced-table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import moment from 'moment';

import { CreditsOverviewWindow } from '../../parsers/credits/overview';
// to seperate typings
// eslint-disable-next-line no-duplicate-imports
import { Options } from 'highcharts';
import { RedesignLightboxVue } from 'typings/modules/Redesign';
import VueI18n, { TranslateResult } from 'vue-i18n';

HighchartsMore(Highcharts);

export default Vue.extend<
    {
        moment: typeof moment;
        head: {
            [key: string]: {
                title: string;
                noSort: true;
            };
        };
        chartId: string;
    },
    {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
    },
    {
        dates: string[];
    },
    {
        data: CreditsOverviewWindow;
        lightbox: RedesignLightboxVue<
            'credits/overview',
            CreditsOverviewWindow
        >;
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $mc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        getSetting: <T>(setting: string, defaultValue: T) => Promise<T>;
        setSetting: <T>(settingId: string, value: T) => Promise<void>;
    }
>({
    name: 'credits-overview',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
    },
    data() {
        moment.locale(this.$store.state.lang);
        return {
            moment,
            head: {},
            chartId: this.$store.getters.nodeAttribute(
                'redesign-credits-overview-chart',
                true
            ),
        };
    },
    computed: {
        dates() {
            return Array(8)
                .fill('')
                .map((_, index) =>
                    moment()
                        .subtract(index, 'days')
                        .format('L')
                );
        },
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`credits/overview.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`credits/overview.${key}`, amount, args);
        },
    },
    props: {
        data: {
            type: Object,
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
        data() {
            this.lightbox.finishLoading('credits/overview-updated-data');
        },
    },
    beforeMount() {
        this.head = {
            date: { title: this.$sm('date').toString(), noSort: true },
            plus: { title: this.$sm('plus').toString(), noSort: true },
            minus: { title: this.$sm('minus').toString(), noSort: true },
            total: { title: this.$sm('total').toString(), noSort: true },
        };
    },
    mounted() {
        if (this.$store.state.darkmode)
            Highcharts.setOptions(this.$utils.highChartsDarkMode);
        Highcharts.setOptions({
            lang: {
                ...(this.$t('highcharts') as {
                    [key: string]: TranslateResult;
                }),
            },
        });
        Highcharts.chart(this.chartId, {
            chart: {
                type: 'column',
            },
            title: { text: '' },
            xAxis: {
                categories: this.dates.reverse(),
            },
            series: ['plus', 'minus', 'total'].map((series, index) => ({
                name: this.$sm(series).toString(),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                data: this.data.entries.map(entry => entry[series]).reverse(),
                color: ['#28a828', '#a32323', '#74868f'][index],
            })),
        } as Options);
        this.lightbox.finishLoading('credits/overview-mounted');
    },
});
</script>

<style lang="sass" scoped>
.credits-overview-wrapper
    display: flex

    > div
        margin: 0 1rem
</style>
