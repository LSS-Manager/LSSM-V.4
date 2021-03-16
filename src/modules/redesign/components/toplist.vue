<template>
    <div>
        <label class="pull-right">
            <input
                :placeholder="$sm('search_global')"
                ref="urlSearch"
                :value="urlSearch"
                @keyup.enter="setUrlSearch"
            />
            <button class="btn btn-success" @click="setUrlSearch">
                {{ $sm('search_global') }}
            </button>
        </label>
        <h1>
            {{ $sm('title') }}
            <small v-if="urlSearch">
                {{ $sm('search_global') }}:
                <span class="url-search">{{ urlSearch }}</span>
            </small>
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
                endPage >= toplist.lastPage ||
                    toplist.lastPage === Number.MAX_SAFE_INTEGER
            "
            @click="loadNext"
        >
            {{ $sm('load.next') }}
        </button>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table' }"
            :search="search"
            :search-placeholder="$sm('search_local')"
            @search="s => (search = s)"
        >
            <template v-slot:head>
                <span>{{ $smc('amount', usersFiltered.length) }}</span>
            </template>
            <tr v-for="(entry, id) in usersFiltered" :key="id">
                <td>
                    <img
                        :src="entry.img"
                        :alt="entry.name"
                        v-if="entry.img"
                        loading="lazy"
                    />
                </td>
                <td>{{ entry.credits.toLocaleString() }}</td>
                <td>
                    <img
                        :src="
                            `/images/user_${
                                entry.online ? 'green' : 'gray'
                            }.png`
                        "
                        alt=""
                    />
                    <a :href="`/profile/${entry.id}`">
                        {{ entry.name }}
                    </a>
                </td>
                <td>
                    <a
                        :href="`/alliances/${entry.alliance.id}`"
                        v-if="entry.alliance.name"
                    >
                        {{ entry.alliance.name }}
                    </a>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { TopListWindow } from '../parsers/toplist';
import { RedesignLightboxVue } from 'typings/modules/Redesign';

export default Vue.extend<
    {
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
        setUrlSearch(): void;
    },
    {
        urlSearch: string;
        page: number;
        subtitle: string;
        usersFiltered: TopListWindow['users'];
    },
    {
        toplist: TopListWindow;
        url: string;
        lightbox: RedesignLightboxVue<'toplist', TopListWindow>;
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
    name: 'toplist',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
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
            return this.$m(`toplist.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`toplist.${key}`, amount, args);
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
            const url = new URL('/toplist', window.location.href);
            url.searchParams.set('page', this.startPage.toString());
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('username', search);
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-toplist-load-prev-${this.startPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/toplist').then(parser => {
                        const result = parser.default(
                            html,
                            url.toString(),
                            this.lightbox.getIdFromEl
                        );
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'users', [
                            ...result.users,
                            ...this.lightbox.data.users,
                        ]);
                    });
                });
        },
        loadNext() {
            this.endPage++;
            const url = new URL('/toplist', window.location.href);
            url.searchParams.set('page', this.endPage.toString());
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('username', search);
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-toplist-load-next-${this.endPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/toplist').then(parser => {
                        const result = parser.default(
                            html,
                            url.toString(),
                            this.lightbox.getIdFromEl
                        );
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'users', [
                            ...this.lightbox.data.users,
                            ...result.users,
                        ]);
                    });
                });
        },
        setUrlSearch() {
            const url = new URL(this.url, window.location.href);
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('username', search);
            else url.searchParams.delete('username');

            this.$set(this.lightbox, 'src', url.toString());
        },
    },
    computed: {
        urlSearch() {
            return (
                new URL(this.url, window.location.href).searchParams.get(
                    'username'
                ) ?? ''
            );
        },
        page() {
            return parseInt(
                new URL(this.url, window.location.href).searchParams.get(
                    'page'
                ) ?? '1'
            );
        },
        subtitle() {
            return this.$smc(
                this.urlSearch ? 'search_subtitle' : 'subtitle',
                this.toplist.users.length,
                {
                    startPage: this.startPage,
                    endPage: this.endPage,
                    firstCredits:
                        this.toplist.users[0]?.credits?.toLocaleString() ?? '',
                    lastCredits:
                        this.toplist.users[
                            this.toplist.users.length - 1
                        ]?.credits?.toLocaleString() ?? '',
                    totalPages: this.toplist.lastPage.toLocaleString(),
                }
            ).toString();
        },
        usersFiltered() {
            return this.toplist.users.filter(user =>
                JSON.stringify(Object.values(user))
                    .toLowerCase()
                    .match(this.search.trim().toLowerCase())
            );
        },
    },
    props: {
        toplist: {
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
            image: { title: '', noSort: true },
            credits: { title: this.$sm('credits').toString() },
            name: { title: this.$sm('name').toString() },
            alliance: { title: this.$sm('alliance').toString() },
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
        document.title = this.$sm('title').toString();
    },
});
</script>

<style lang="sass" scoped>
.url-search
    font-family: monospace
</style>
