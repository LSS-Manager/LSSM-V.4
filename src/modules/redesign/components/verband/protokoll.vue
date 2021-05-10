<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
            <br />
            <small>{{ subtitle }}</small>
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
                endPage >= protokoll.lastPage ||
                    protokoll.lastPage === Number.MAX_SAFE_INTEGER
            "
            @click="loadNext"
        >
            {{ lightbox.$sm('load.next') }}
        </button>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table' }"
            :search="search"
            :search-placeholder="lightbox.$sm('search_local')"
            @search="s => (search = s)"
            :sort="sort"
            :sort-dir="sortDir"
            @sort="setSort"
        >
            <template v-slot:head>
                <div class="form-group">
                    <label>{{ lightbox.$sm('filter.type') }}</label>
                    <multi-select
                        name="types_select"
                        :placeholder="lightbox.$sm('filter.type')"
                        v-model="filter.type"
                        :options="types"
                        @input="updateFilter('type', filter.type)"
                        all-on-none
                    ></multi-select>
                </div>
                <span>{{ lightbox.$smc('amount', entriesSorted.length) }}</span>
            </template>
            <tr v-for="(entry, index) in entriesSorted" :key="index">
                <td :title="entry.time">{{ entry.timestring }}</td>
                <td>
                    <span v-if="entry.executor">
                        <img :src="entry.executor.icon" alt="" />
                        <a
                            lightbox-open
                            :href="`/profile/${entry.executor.id}`"
                        >
                            {{ entry.executor.name }}
                        </a>
                    </span>
                </td>
                <td>{{ entry.description }}</td>
                <td>
                    <span v-if="entry.affected">
                        <img :src="entry.affected.icon" alt="" />
                        <a
                            lightbox-open
                            :href="`/profile/${entry.affected.id}`"
                        >
                            {{ entry.affected.name }}
                        </a>
                    </span>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { RedesignSubComponent } from 'typings/modules/Redesign';
import { VerbandProtokollWindow } from '../../parsers/verband/protokoll';

type sort = 'time' | 'executor' | 'description' | 'affected';
type types = Exclude<VerbandProtokollWindow['entries'][0]['type'], ''>;

type Component = RedesignSubComponent<
    'protokoll',
    'verband/protokoll',
    VerbandProtokollWindow,
    {
        startPage: number;
        endPage: number;
        head: Record<string, { title: string; noSort?: boolean }>;
        search: string;
        sort: sort;
        sortDir: 'asc' | 'desc';
        types: { value: string; label: string }[];
        filter: {
            type: types[];
        };
    },
    {
        setSort(type: sort): void;
        updateFilter(filter: string, value: unknown): void;
        loadPrev(): void;
        loadNext(): void;
    },
    {
        page: number;
        subtitle: string;
        entriesFiltered: VerbandProtokollWindow['entries'];
        entriesSorted: VerbandProtokollWindow['entries'];
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-protokoll',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
        MultiSelect: () =>
            import(
                /* webpackChunkName: "components/settings/multi-select" */ '../../../../components/setting/multi-select.vue'
            ),
    },
    data() {
        return {
            startPage: 0,
            endPage: 0,
            head: {},
            search: '',
            sort: 'time',
            sortDir: 'asc',
            types: [],
            filter: {
                type: [],
            },
        };
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
            return this.lightbox
                .$smc('subtitle', this.protokoll.entries.length, {
                    startPage: this.startPage,
                    endPage: this.endPage,
                    firstDate: this.protokoll.entries[0]?.timestring ?? '',
                    lastDate:
                        this.protokoll.entries[
                            this.protokoll.entries.length - 1
                        ]?.timestring ?? '',
                    totalPages: this.protokoll.lastPage.toLocaleString(),
                })
                .toString();
        },
        entriesFiltered() {
            return this.protokoll.entries.filter(
                entry =>
                    entry.type &&
                    this.filter.type.includes(entry.type) &&
                    JSON.stringify(Object.values(entry))
                        .toLowerCase()
                        .match(this.search.trim().toLowerCase())
            );
        },
        entriesSorted() {
            if (this.sort === 'time') {
                if (this.sortDir === 'asc') return this.entriesFiltered;
                return [...this.entriesFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.entriesFiltered].sort((a, b) => {
                let f = a[this.sort] ?? '';
                let s = b[this.sort] ?? '';
                // console.log(this.sort, a, b, f, s);
                if (['executor', 'affected'].includes(this.sort)) {
                    f =
                        (f as VerbandProtokollWindow['entries'][0]['executor'])?.name?.toLowerCase() ??
                        '';
                    s =
                        (s as VerbandProtokollWindow['entries'][0]['executor'])?.name?.toLowerCase() ??
                        '';
                }
                // console.log(f, s);
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
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
        updateFilter(filter, value) {
            this.setSetting(filter, value).then();
        },
        loadPrev() {
            this.$set(this.lightbox, 'loading', true);
            this.startPage--;
            const url = new URL(`/alliance_logfiles`, window.location.origin);
            url.searchParams.set('page', this.startPage.toString());
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-verband-mitgliederliste-load-prev-${this.startPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/protokoll').then(
                        async parser => {
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
                            this.$set(this.lightbox.data, 'entries', [
                                ...result.entries,
                                ...this.lightbox.data.entries,
                            ]);
                            this.lightbox.finishLoading(
                                'verband-protokoll-loadprev'
                            );
                        }
                    );
                });
        },
        loadNext() {
            this.$set(this.lightbox, 'loading', true);
            this.endPage++;
            const url = new URL(`/alliance_logfiles`, window.location.origin);
            url.searchParams.set('page', this.endPage.toString());
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-verband-mitgliederliste-load-prev-${this.endPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/protokoll').then(
                        async parser => {
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
                            this.$set(this.lightbox.data, 'entries', [
                                ...this.lightbox.data.entries,
                                ...result.entries,
                            ]);
                            this.lightbox.finishLoading(
                                'verband-protokoll-loadnext'
                            );
                        }
                    );
                });
        },
    },
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
        const types = this.protokoll.protokoll_types;
        this.types = Object.entries(types).map(([value, { regex, title }]) => ({
            value,
            label: title ?? regex.toString().replace(/^\/|\/$/g, ''),
        }));
        this.getSetting('type', Object.keys(types)).then(v =>
            this.$set(this.filter, 'type', v.length ? v : Object.keys(types))
        );
        this.head = {
            time: { title: this.lightbox.$sm('time').toString() },
            executor: { title: this.lightbox.$sm('executor').toString() },
            description: { title: this.lightbox.$sm('description').toString() },
            affected: { title: this.lightbox.$sm('affected').toString() },
        };
    },
    mounted() {
        this.startPage = this.page;
        this.endPage = this.page;
        this.lightbox.finishLoading('verband/protokoll-mounted');
    },
});
</script>
