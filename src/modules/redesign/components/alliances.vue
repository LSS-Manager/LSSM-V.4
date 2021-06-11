<template>
    <div>
        <label class="pull-right">
            <input
                :placeholder="lightbox.$sm('search_global')"
                ref="urlSearch"
                :value="urlSearch"
                @keyup.enter="setUrlSearch"
            />
            <button class="btn btn-success" @click="setUrlSearch">
                {{ lightbox.$sm('search_global') }}
            </button>
        </label>
        <h1>
            {{ lightbox.$sm('title') }}
            <small v-if="urlSearch">
                {{ lightbox.$sm('search_global') }}:
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
            {{ lightbox.$sm('load.prev') }}
        </button>
        <button
            class="btn btn-success"
            :disabled="
                endPage >= alliances.lastPage ||
                    alliances.lastPage === Number.MAX_SAFE_INTEGER
            "
            @click="loadNext"
        >
            {{ lightbox.$sm('load.next') }}
        </button>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table table-striped' }"
            :search="search"
            :search-placeholder="lightbox.$sm('search_local')"
            @search="s => (search = s)"
            :sort="sort"
            :sort-dir="sortDir"
            @sort="setSort"
        >
            <template v-slot:head>
                <span>{{
                    lightbox.$smc('amount', alliancesFiltered.length)
                }}</span>
            </template>
            <tr v-for="(entry, id) in alliancesSorted" :key="id">
                <td>
                    <img
                        :src="entry.img"
                        :alt="entry.name"
                        v-if="entry.img"
                        loading="lazy"
                    />
                </td>
                <td>
                    <a :href="`/alliances/${entry.id}`">
                        {{ entry.name }}
                    </a>
                </td>
                <td>{{ entry.credits.toLocaleString() }}</td>
                <td>
                    {{ entry.members.toLocaleString() }}
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { AllianceListWindow } from '../parsers/alliances';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'alliances',
    'alliances',
    AllianceListWindow,
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
        setSort(type: string): void;
        loadPrev(): void;
        loadNext(): void;
        setUrlSearch(): void;
    },
    {
        urlSearch: string;
        page: number;
        subtitle: string;
        alliancesFiltered: AllianceListWindow['alliances'];
        alliancesSorted: AllianceListWindow['alliances'];
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'alliances',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            search: '',
            sort: 'credits',
            sortDir: 'asc',
            head: {},
            startPage: 0,
            endPage: 0,
        };
    },
    methods: {
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
            const url = new URL('/alliances', window.location.origin);
            url.searchParams.set('page', this.startPage.toString());
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('caption', search);
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-alliances-load-prev-${this.startPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/alliances').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                        });
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'alliances', [
                            ...result.alliances,
                            ...this.lightbox.data.alliances,
                        ]);
                        this.lightbox.finishLoading('alliances-loadprev');
                    });
                });
        },
        loadNext() {
            this.$set(this.lightbox, 'loading', true);
            this.endPage++;
            const url = new URL('/alliances', window.location.origin);
            url.searchParams.set('page', this.endPage.toString());
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('caption', search);
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-alliances-load-next-${this.endPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/alliances').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                        });
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'alliances', [
                            ...this.lightbox.data.alliances,
                            ...result.alliances,
                        ]);
                        this.lightbox.finishLoading('alliances-loadnext');
                    });
                });
        },
        setUrlSearch() {
            const url = new URL(this.url, window.location.origin);
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('caption', search);
            else url.searchParams.delete('caption');

            this.$set(this.lightbox, 'src', url.toString());
        },
    },
    computed: {
        urlSearch() {
            return (
                new URL(this.url, window.location.origin).searchParams.get(
                    'caption'
                ) ?? ''
            );
        },
        page() {
            return parseInt(
                new URL(this.url, window.location.origin).searchParams.get(
                    'page'
                ) ?? '1'
            );
        },
        subtitle() {
            return this.lightbox
                .$smc(
                    this.urlSearch ? 'search_subtitle' : 'subtitle',
                    this.alliances.alliances.length,
                    {
                        startPage: this.startPage,
                        endPage: this.endPage,
                        firstCredits:
                            this.alliances.alliances[0]?.credits?.toLocaleString() ??
                            '',
                        lastCredits:
                            this.alliances.alliances[
                                this.alliances.alliances.length - 1
                            ]?.credits?.toLocaleString() ?? '',
                        totalPages: this.alliances.lastPage.toLocaleString(),
                    }
                )
                .toString();
        },
        alliancesFiltered() {
            return this.search.trim().length
                ? this.alliances.alliances.filter(alliance =>
                      JSON.stringify(Object.values(alliance))
                          .toLowerCase()
                          .match(this.search.trim().toLowerCase())
                  )
                : this.alliances.alliances;
        },
        alliancesSorted() {
            if (this.sort === 'credits' && !this.urlSearch) {
                if (this.sortDir === 'asc') return this.alliancesFiltered;
                return [...this.alliancesFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.alliancesFiltered].sort((a, b) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const s = b[this.sort] ?? '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    props: {
        alliances: {
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
        alliances() {
            this.lightbox.finishLoading('alliances-updated-data');
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
            name: { title: this.lightbox.$sm('name').toString() },
            credits: { title: this.lightbox.$sm('credits').toString() },
            members: { title: this.lightbox.$sm('members').toString() },
        };
    },
    mounted() {
        this.getSetting(`sort`, this.sort).then(sort => (this.sort = sort));
        this.getSetting(`sortDir`, this.sortDir).then(
            dir => (this.sortDir = dir)
        );
        this.startPage = this.page;
        this.endPage = this.page;
        this.lightbox.finishLoading('alliances-mounted');
    },
});
</script>

<style lang="sass" scoped>
.url-search
    font-family: monospace
</style>
