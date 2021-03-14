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
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table' }"
            :no-search="true"
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
import moment from 'moment';
import VueI18n from 'vue-i18n';
import { CoinsListWindow } from '../../parsers/coins/list';
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
        startPage: number;
        endPage: number;
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
        loadPrev(): void;
        loadNext(): void;
    },
    {
        page: number;
        subtitle: string;
    },
    {
        coins: CoinsListWindow;
        url: string;
        lightbox: RedesignLightboxVue<'coins/list', CoinsListWindow>;
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
    name: 'coins-list',
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
            search: '',
            sort: 'date',
            sortDir: 'asc',
            head: {},
            startPage: 0,
            endPage: 0,
        };
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`coins/list.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`coins/list.${key}`, amount, args);
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
        loadPrev() {
            this.startPage--;
            const url = `/coins/list?page=${this.startPage}`;
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-coins-list-load-prev-${this.startPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/coins/list').then(parser => {
                        const result = parser.default(html);
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'entries', [
                            ...result.entries,
                            ...this.lightbox.data.entries,
                        ]);
                    });
                });
        },
        loadNext() {
            this.endPage++;
            const url = `/coins/list?page=${this.endPage}`;
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-coins-list-load-next-${this.endPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/coins/list').then(parser => {
                        const result = parser.default(html);
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'entries', [
                            ...this.lightbox.data.entries,
                            ...result.entries,
                        ]);
                    });
                });
        },
    },
    computed: {
        page() {
            return parseInt(
                new URL(this.url, window.location.href).searchParams.get(
                    'page'
                ) ?? '1'
            );
        },
        subtitle() {
            return this.$smc('subtitle', this.coins.entries.length, {
                startPage: this.startPage,
                endPage: this.endPage,
                firstDate: this.coins.entries[0]?.date ?? '',
                lastDate:
                    this.coins.entries[this.coins.entries.length - 1]?.date ??
                    '',
                totalPages: this.coins.lastPage.toLocaleString(),
            }).toString();
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
        this.$el.addEventListener('click', e => {
            e.preventDefault();
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            if (!target || !target.hasAttribute('href')) return;
            this.$set(this.lightbox, 'src', target.getAttribute('href'));
        });
        this.startPage = this.page;
        this.endPage = this.page;
        document.title = `${this.$t(
            'modules.redesign.credits.nav.title'
        )}: ${this.$sm('title')}`;
    },
});
</script>
