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
                endPage >= credits.lastPage ||
                    credits.lastPage === Number.MAX_SAFE_INTEGER
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
            <tr v-for="(entry, id) in credits.entries" :key="id">
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
import { CreditsListWindow } from '../../parsers/credits/list';
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
        credits: CreditsListWindow;
        url: string;
        lightbox: RedesignLightboxVue<'credits/list', CreditsListWindow>;
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
    name: 'credits-index',
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
            return this.$m(`credits/list.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`credits/list.${key}`, amount, args);
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
            this.$set(this.lightbox, 'loading', true);
            this.startPage--;
            const url = `/credits?page=${this.startPage}`;
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-credits-index-load-prev-${this.startPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/credits/list').then(parser => {
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
                        this.lightbox.finishLoading(
                            'credits/overview-loadprev'
                        );
                    });
                });
        },
        loadNext() {
            this.$set(this.lightbox, 'loading', true);
            this.endPage++;
            const url = `/credits?page=${this.endPage}`;
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-credits-index-load-next-${this.endPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/credits/list').then(parser => {
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
                        this.lightbox.finishLoading(
                            'credits/overview-loadnext'
                        );
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
            return this.$smc('subtitle', this.credits.entries.length, {
                startPage: this.startPage,
                endPage: this.endPage,
                firstDate: this.credits.entries[0]?.date ?? '',
                lastDate:
                    this.credits.entries[this.credits.entries.length - 1]
                        ?.date ?? '',
                totalPages: this.credits.lastPage.toLocaleString(),
            }).toString();
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
            this.lightbox.finishLoading('credits/list-updated-data');
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
        this.lightbox.finishLoading('credits/list-mounted');
    },
});
</script>
