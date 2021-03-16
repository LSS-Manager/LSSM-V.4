<template>
    <div>
        <h1>
            {{ $sm('title') }}:
            {{
                moment()
                    .add(page, 'days')
                    .format('L')
            }}
            <button
                class="btn btn-success"
                :href="`/credits/daily?page=${page - 1}`"
                :disabled="page <= -7"
            >
                -1
            </button>
            <button
                class="btn btn-default"
                href="/credits/daily?page=0"
                :disabled="page === 0"
            >
                {{ $sm('today') }}
            </button>
            <button
                class="btn btn-success"
                :href="`/credits/daily?page=${page + 1}`"
                :disabled="page >= 0"
            >
                +1
            </button>
            <!-- Date input -->
            <small>
                <span class="text-success">
                    +{{ sum.plus.toLocaleString() }}
                </span>
                |
                <span class="text-danger">
                    -{{ Math.abs(sum.minus).toLocaleString() }}
                </span>
                |
                <span
                    :class="
                        `text-${
                            sum.total > 0
                                ? 'success'
                                : sum.total < 0
                                ? 'danger'
                                : ''
                        }`
                    "
                    >{{
                        (sum.total > 0 ? '+' : '') + sum.total.toLocaleString()
                    }}</span
                ></small
            >
        </h1>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table' }"
            :search="search"
            @search="s => (search = s)"
            :sort="sort"
            :sort-dir="sortDir"
            @sort="setSort"
            :shown-sum="(shown_sum = { total: 0, average: 0, amount: 0 })"
        >
            <template v-slot:head>
                <div class="form-group">
                    <label>{{ $sm('filter.total.min') }}</label>
                    <settings-number
                        name="total_min"
                        :placeholder="$sm('filter.total.min')"
                        v-model="filter.total.min"
                        :min="Number.MIN_SAFE_INTEGER"
                        :max="filter.total.max"
                        @input="updateFilter('total.min', filter.total.min)"
                    ></settings-number>
                </div>
                <div class="form-group">
                    <label>{{ $sm('filter.total.max') }}</label>
                    <settings-number
                        name="total_max"
                        :placeholder="$sm('filter.total.max')"
                        v-model="filter.total.max"
                        :min="filter.total.min"
                        :max="Number.MAX_SAFE_INTEGER"
                        @input="updateFilter('total.max', filter.total.max)"
                    ></settings-number>
                </div>
            </template>
            <tr
                v-for="(entry, id) in entriesSorted"
                :key="id"
                :class="{ hidden: entry.hidden }"
                :color="
                    (color = `text-${
                        entry.total > 0
                            ? 'success'
                            : entry.total < 0
                            ? 'danger'
                            : ''
                    }`)
                "
                :sum="
                    (() => {
                        if (entry.hidden) return;
                        shown_sum.total += entry.total;
                        shown_sum.average += entry.average;
                        shown_sum.amount += entry.amount;
                    })()
                "
            >
                <td :class="color">
                    {{ entry.total.toLocaleString() }} Credits
                </td>
                <td :class="color">
                    {{ entry.average.toLocaleString() }} Credits
                </td>
                <td>{{ entry.amount.toLocaleString() }}x</td>
                <td>{{ entry.desc }}</td>
            </tr>
            <template v-slot:foot>
                <tr
                    :sum-color="
                        (sum_color = `text-${
                            shown_sum.total > 0
                                ? 'success'
                                : shown_sum.total < 0
                                ? 'danger'
                                : ''
                        }`)
                    "
                >
                    <th :class="sum_color">
                        {{ shown_sum.total.toLocaleString() }} Credits
                    </th>
                    <th :class="sum_color">
                        {{ shown_sum.average.toLocaleString() }} Credits
                    </th>
                    <th>{{ shown_sum.amount.toLocaleString() }}x</th>
                    <th></th>
                </tr>
            </template>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import VueI18n from 'vue-i18n';
import { CreditsDailyWindow } from '../../parsers/credits/daily';
import { RedesignLightboxVue } from 'typings/modules/Redesign';

export default Vue.extend<
    {
        moment: typeof moment;
        search: string;
        sort: string;
        sortDir: 'asc' | 'desc';
        head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        filter: {
            total: {
                min: number;
                max: number;
            };
        };
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
        setSort(type: string): void;
        updateFilter(filter: string, value: unknown): void;
    },
    {
        page: number;
        entriesFiltered: CreditsDailyWindow['entries'];
        entriesSorted: CreditsDailyWindow['entries'];
        sum: { plus: number; minus: number; total: number };
    },
    {
        credits: CreditsDailyWindow;
        url: string;
        lightbox: RedesignLightboxVue<'credits/daily', CreditsDailyWindow>;
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
    name: 'credits-daily',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
        SettingsNumber: () =>
            import(
                /* webpackChunkName: "components/settings/number" */ '../../../../components/setting/number.vue'
            ),
    },
    data() {
        moment.locale(this.$store.state.lang);
        return {
            moment,
            search: '',
            sort: 'distance',
            sortDir: 'asc',
            head: {},
            filter: {
                total: {
                    min: Number.MIN_SAFE_INTEGER,
                    max: Number.MAX_SAFE_INTEGER,
                },
            },
        };
    },
    computed: {
        page() {
            return parseInt(
                new URL(this.url, window.location.href).searchParams.get(
                    'page'
                ) ?? '0'
            );
        },
        entriesFiltered() {
            return this.credits.entries.map(e => ({
                ...e,
                hidden: !(
                    e.total >= this.filter.total.min &&
                    e.total <= this.filter.total.max &&
                    JSON.stringify(Object.values(e))
                        .toLowerCase()
                        .match(this.search.trim().toLowerCase())
                ),
            }));
        },
        entriesSorted() {
            if (this.sort === 'total') {
                if (this.sortDir === 'desc') return this.entriesFiltered;
                return [...this.entriesFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.entriesFiltered].sort((a, b) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let s = b[this.sort] ?? '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
        sum() {
            const result = { plus: 0, minus: 0, total: 0 };
            this.credits.entries.forEach(({ total }) => {
                result.total += total;
                if (total !== 0) result[total > 0 ? 'plus' : 'minus'] += total;
            });
            return result;
        },
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`credits/daily.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`credits/daily.${key}`, amount, args);
        },
        setSort(type) {
            if (this.sort === type) {
                this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
                this.sort = type;
                this.sortDir = 'asc';
            }
            this.setSetting('sort', type).then(() =>
                this.setSetting('sortDir', this.sortDir).then()
            );
        },
        updateFilter(filter, value) {
            this.setSetting(filter, value).then();
        },
    },
    props: {
        credits: {
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
        credits() {
            this.lightbox.finishLoading('credits/daily-updated-data');
        },
    },
    beforeMount() {
        Object.entries(this.filter).forEach(([filter, props]) => {
            Object.entries(props).forEach(([prop, value]) => {
                this.getSetting(`${filter}.${prop}`, value).then(v =>
                    this.$set(props, prop, v)
                );
            });
        });
        this.head = {
            total: { title: this.$sm('total').toString() },
            average: { title: 'Ø' },
            amount: { title: this.$sm('amount').toString() },
            desc: { title: this.$sm('description').toString() },
        };
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
        this.getSetting('sort', this.sort).then(sort => (this.sort = sort));
        this.getSetting('sortDir', this.sortDir).then(
            dir => (this.sortDir = dir)
        );
        document.title = `${this.$t(
            'modules.redesign.credits.nav.title'
        )}: ${this.$sm('title')}`;
        this.lightbox.finishLoading('credits/daily-mounted');
    },
});
</script>
