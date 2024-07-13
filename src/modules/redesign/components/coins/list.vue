<template>
    <div>
        <h1>
            {{ $sm('title') }}
            <br />
            <small>
                {{ subtitle }}
            </small>
        </h1>
        <button
            class="btn btn-success"
            :disabled="startPage <= 1"
            @click="loadPrev"
        >
            {{ $sm('load.prev') }}
        </button>
        <button
            class="btn btn-success"
            :disabled="
                endPage >= coins.lastPage ||
                coins.lastPage === Number.MAX_SAFE_INTEGER
            "
            @click="loadNext"
        >
            {{ $sm('load.next') }}
        </button>
        <button class="btn btn-default" @click="() => (showChart = !showChart)">
            <font-awesome-icon :icon="faChartLine"></font-awesome-icon>
        </button>
        <highcharts
            v-show="showChart"
            :options="{
                title: { text: 'Coins' },
                chart: { type: 'line' },
                xAxis: {
                    type: 'datetime',
                },
                legend: {
                    enabled: false,
                },
                series: {
                    data: timestamps,
                    name: 'Coins',
                    step: 'left',
                },
            }"
        ></highcharts>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table table-striped' }"
            no-search
        >
            <tr v-for="(entry, id) in coins.entries" :key="id">
                <td :class="`text-${entry.amount > 0 ? 'success' : 'danger'}`">
                    {{ entry.amount > 0 ? '+' : ''
                    }}{{ entry.amount.toLocaleString() }}
                </td>
                <td>{{ entry.desc }}</td>
                <td>{{ entry.date }}</td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import Highcharts from 'highcharts';
import moment from 'moment';
import { useAPIStore } from '@stores/api';
import { useRootStore } from '@stores/index';

import type { CoinsListWindow } from '../../parsers/coins/list';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignLightboxVue } from 'typings/modules/Redesign';
import type { TranslateResult, default as VueI18n } from 'vue-i18n';

export default Vue.extend<
    {
        moment: typeof moment;
        search: string;
        sort: string;
        sortDir: 'asc' | 'desc';
        head: Record<
            string,
            {
                title: string;
                noSort?: boolean;
            }
        >;
        startPage: number;
        endPage: number;
        apiStore: ReturnType<typeof useAPIStore>;
        showChart: boolean;
        faChartLine: IconDefinition;
    },
    {
        $sm(
            key: string,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
        $smc(
            key: string,
            amount: number,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
        loadPrev(): void;
        loadNext(): void;
    },
    {
        page: number;
        subtitle: string;
        timestamps: [number, number][];
    },
    {
        coins: CoinsListWindow;
        url: string;
        lightbox: RedesignLightboxVue<'coins/list'>;
        $m(
            key: string,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
        $mc(
            key: string,
            amount: number,
            args?: Record<string, unknown>
        ): VueI18n.TranslateResult;
        getSetting<T>(setting: string, defaultValue: T): Promise<T>;
        setSetting<T>(settingId: string, value: T): Promise<void>;
    }
>({
    name: 'lssmv4-redesign-coins-list',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
        Highcharts: () => import('highcharts-vue').then(m => m.Chart),
    },
    data() {
        moment.locale(this.lightbox.rootStore.locale);
        const apiStore = useAPIStore();
        apiStore.getCredits('redesign/coins/list').then();
        return {
            moment,
            search: '',
            sort: 'date',
            sortDir: 'asc',
            head: {},
            startPage: 0,
            endPage: 0,
            apiStore,
            showChart: false,
            faChartLine,
        };
    },
    methods: {
        $sm(key: string, args?: Record<string, unknown>) {
            return this.$m(`coins/list.${key}`, args);
        },
        $smc(key: string, amount: number, args?: Record<string, unknown>) {
            return this.$mc(`coins/list.${key}`, amount, args);
        },
        loadPrev() {
            this.$set(this.lightbox, 'loading', true);
            this.startPage--;
            const url = `/coins/list?page=${this.startPage}`;
            this.lightbox.apiStore
                .request(url, `redesign-coins-list-load-prev-${this.startPage}`)
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/coins/list').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            LSSM: this.lightbox,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'entries', [
                            ...result.entries,
                            ...this.lightbox.data.entries,
                        ]);
                        this.lightbox.finishLoading('coins/list-loadprev');
                    });
                });
        },
        loadNext() {
            this.$set(this.lightbox, 'loading', true);
            this.endPage++;
            const url = `/coins/list?page=${this.endPage}`;
            this.lightbox.apiStore
                .request(url, `redesign-coins-list-load-next-${this.endPage}`)
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/coins/list').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            LSSM: this.lightbox,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'entries', [
                            ...this.lightbox.data.entries,
                            ...result.entries,
                        ]);
                        this.lightbox.finishLoading('coins/list-loadnext');
                    });
                });
        },
    },
    computed: {
        page() {
            return parseInt(
                new URL(this.url, window.location.origin).searchParams.get(
                    'page'
                ) ?? '1'
            );
        },
        subtitle() {
            return this.$smc('subtitle', this.coins.entries.length, {
                startPage: this.startPage,
                endPage: this.endPage,
                firstDate: this.coins.entries[0]?.date ?? '',
                lastDate: this.coins.entries.at(-1)?.date ?? '',
                totalPages: this.coins.lastPage.toLocaleString(),
            }).toString();
        },
        timestamps() {
            let lastCoins = this.apiStore.credits.coins_user_current;

            const timestamps: [number, number][] = [[Date.now(), lastCoins]];

            this.coins.entries.forEach(entry => {
                timestamps.push([
                    new Date(entry.timestamp).getTime(),
                    lastCoins,
                ]);
                lastCoins -= entry.amount;
            });
            timestamps.push([(timestamps.at(-1)?.[0] ?? 1) - 1, lastCoins]);

            return timestamps.toReversed();
        },
    },
    props: {
        coins: {
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
        coins() {
            this.lightbox.finishLoading('coins/list-updated-data');
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
        this.head = {
            amount: { title: this.$sm('amount').toString(), noSort: true },
            desc: { title: this.$sm('description').toString(), noSort: true },
            date: { title: this.$sm('date').toString(), noSort: true },
        };
    },
    mounted() {
        if (useRootStore().isDarkMode) {
            Highcharts.setOptions(
                (window[PREFIX] as Vue).$utils.highChartsDarkMode
            );
        }
        Highcharts.setOptions({
            lang: {
                ...(this.$t('highcharts') as Record<string, TranslateResult>),
            },
        });
        this.$el.addEventListener('click', e => {
            e.preventDefault();
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            const href = target?.getAttribute('href');
            if (!target || !href) return;
            if (target.hasAttribute('lightbox-open'))
                return window.lightboxOpen(href);
            else this.$set(this.lightbox, 'src', href);
        });
        this.startPage = this.page;
        this.endPage = this.page;
        this.lightbox.finishLoading('coins/list-mounted');
    },
});
</script>

<style scoped lang="sass">
:deep(.highcharts-root)
    font-size: 1em !important
</style>
