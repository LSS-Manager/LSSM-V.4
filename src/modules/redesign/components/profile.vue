<template>
    <div>
        <!-- TODO: btns (ban), friend, ignore, msg, gift -->
        <h1 class="redesign-profile-title" :id="profile.id">
            <img
                :src="`/images/user_${profile.online ? 'green' : 'gray'}.png`"
                alt=""
            />
            {{ profile.name }}
        </h1>
        <div class="pull-left profile-sidebar">
            <div class="well">
                <div>
                    <b>{{ $sm('rank') }}</b>
                    : {{ rank }}
                </div>
                <div v-if="profile.registration">
                    <b>{{ $sm('registration') }}</b>
                    : {{ moment(profile.registration).format('LLLL') }}
                </div>
                <div>
                    {{
                        $sm('credits', {
                            credits: profile.credits.toLocaleString(),
                        })
                    }}
                </div>
                <div v-if="profile.alliance">
                    {{ $sm('alliance') }}:
                    <a :href="`/alliances/${profile.alliance.id}`">
                        {{ profile.alliance.name }}
                    </a>
                </div>
            </div>
            <img
                v-if="profile.image"
                :src="profile.image"
                alt=""
                class="profile-image"
            />
            <div :id="awardsChartId"></div>
        </div>
        <tabs>
            <tab :title="$sm('text')">
                <div v-html="profile.text.replace(/\n/g, '<br>')"></div>
            </tab>
            <tab v-if="profile.has_map" :title="$sm('map')">
                <pre>{{ profile.buildings }}</pre>
            </tab>
            <tab v-if="profile.awards.length" :title="$sm('awards.title')">
                <pre>{{ profile.awards }}</pre>
            </tab>
        </tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import Highcharts, { PlotGaugeOptions } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import VueI18n, { TranslateResult } from 'vue-i18n';
import { ProfileWindow } from '../parsers/profile';
import { RedesignLightboxVue } from 'typings/modules/Redesign';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

export default Vue.extend<
    {
        moment: typeof moment;
        awardsChartId: string;
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
        rank: string;
        awardColors: {
            bronze: number;
            silver: number;
            gold: number;
        };
    },
    {
        profile: ProfileWindow;
        url: string;
        lightbox: RedesignLightboxVue<'profile', ProfileWindow>;
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
    name: 'profile',
    data() {
        moment.locale(this.$store.state.lang);
        return {
            moment,
            awardsChartId: this.$store.getters.nodeAttribute(
                'redesign-profile-awards-gauge-chart',
                true
            ),
        };
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`profile.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`profile.${key}`, amount, args);
        },
    },
    computed: {
        rank() {
            const ranks = this.$t(
                `ranks.${
                    this.$store.state.policechief
                        ? 'policechief'
                        : 'missionchief'
                }`
            ) as { [credits: number]: string };
            return (
                Object.entries(ranks)
                    .reverse()
                    .find(
                        ([credits]) => parseInt(credits) <= this.profile.credits
                    )?.[1] ?? ''
            );
        },
        awardColors() {
            const colors = {
                bronze: 0,
                silver: 0,
                gold: 0,
            };
            this.profile.awards.forEach(({ image }) => {
                if (image.match(/award_bronze/)) colors.bronze++;
                else if (image.match(/award_silver/)) colors.silver++;
                else if (image.match(/award_gold/)) colors.gold++;
            });
            return colors;
        },
    },
    props: {
        profile: {
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
        profile() {
            this.lightbox.finishLoading('profile-updated');
        },
    },
    mounted() {
        this.$el.addEventListener('click', e => {
            e.preventDefault();
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            if (!target || !target.hasAttribute('href')) return;
            this.$set(this.lightbox, 'src', target.getAttribute('href'));
        });
        if (this.$store.state.darkmode)
            Highcharts.setOptions(this.$utils.highChartsDarkMode);
        Highcharts.setOptions({
            lang: {
                ...(this.$t('highcharts') as {
                    [key: string]: TranslateResult;
                }),
            },
        });
        Highcharts.chart(this.awardsChartId, {
            chart: {
                type: 'solidgauge',
            },
            title: {
                text: this.$sm('awards.title').toString(),
                margin: 0,
                style: {
                    fontWeight: 'bold',
                },
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '16px',
                },
                valueSuffix: '',
                pointFormat:
                    '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                positioner(labelWidth: number) {
                    return {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        x: (this.chart.chartWidth - labelWidth) / 2,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        y: this.chart.plotHeight / 2 + 15,
                    };
                },
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [
                    {
                        // Track for Gold
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.color('#f6cd4f')
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0,
                    },
                    {
                        // Track for Silver
                        outerRadius: '87%',
                        innerRadius: '63%',
                        backgroundColor: Highcharts.color('#b6b6b6')
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0,
                    },
                    {
                        // Track for Bronze
                        outerRadius: '62%',
                        innerRadius: '38%',
                        backgroundColor: Highcharts.color('#cd7f32')
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0,
                    },
                ],
            },
            yAxis: {
                min: 0,
                max: parseInt(this.$sm('awards.max').toString()),
                lineWidth: 0,
                tickPositions: [],
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false,
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true,
                },
            },
            series: [
                {
                    name: this.$sm('awards.gold').toString(),
                    data: [
                        {
                            color: '#f6cd4f',
                            radius: '112%',
                            innerRadius: '88%',
                            y: this.awardColors.gold,
                        },
                    ],
                },
                {
                    name: this.$sm('awards.silver').toString(),
                    data: [
                        {
                            color: '#b6b6b6',
                            radius: '87%',
                            innerRadius: '63%',
                            y: this.awardColors.silver,
                        },
                    ],
                },
                {
                    name: this.$sm('awards.bronze').toString(),
                    data: [
                        {
                            color: '#cd7f32',
                            radius: '62%',
                            innerRadius: '38%',
                            y: this.awardColors.bronze,
                        },
                    ],
                },
            ],
        } as PlotGaugeOptions);
        document.title = this.profile.name;
        this.lightbox.finishLoading('profile-mounted');
    },
});
</script>

<style lang="sass" scoped>
.profile-sidebar
    margin-right: 1rem

.profile-image
    min-width: 90%
    display: block
    margin: auto
</style>
