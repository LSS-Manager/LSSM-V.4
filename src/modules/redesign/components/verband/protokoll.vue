<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
            <br />
            <small>{{ subtitle }}</small>
        </h1>
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

type Component = RedesignSubComponent<
    'protokoll',
    'verband/protokoll',
    VerbandProtokollWindow,
    {
        startPage: number;
        endPage: number;
        head: Record<string, { title: string; noSort?: boolean }>;
        search: string;
        sort: 'time' | 'executor' | 'description' | 'affected';
        sortDir: 'asc' | 'desc';
    },
    {
        setSort(type: string): void;
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
    },
    data() {
        return {
            startPage: 0,
            endPage: 0,
            head: {},
            search: '',
            sort: 'time',
            sortDir: 'asc',
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
            return this.search.trim().length
                ? this.protokoll.entries.filter(entry =>
                      JSON.stringify(Object.values(entry))
                          .toLowerCase()
                          .match(this.search.trim().toLowerCase())
                  )
                : this.protokoll.entries;
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
                    f = f?.name?.toLowerCase() ?? '';
                    s = s?.name?.toLowerCase() ?? '';
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
        // Object.entries(this.filter).forEach(([filter, props]) => {
        //     Object.entries(props).forEach(([prop, value]) => {
        //         this.getSetting(`${filter}.${prop}`, value).then(v =>
        //             this.$set(props, prop, v)
        //         );
        //     });
        // });
        this.head = {
            time: { title: this.lightbox.$sm('time').toString() },
            executor: { title: this.lightbox.$sm('executor').toString() },
            description: { title: this.lightbox.$sm('description').toString() },
            affected: { title: this.lightbox.$sm('affected').toString() },
        };
    },
    mounted() {
        // this.getSetting(`sort`, this.sort).then(sort => (this.sort = sort));
        // this.getSetting(`sortDir`, this.sortDir).then(
        //     dir => (this.sortDir = dir)
        // );
        this.startPage = this.page;
        this.endPage = this.page;
        this.lightbox.finishLoading('verband/protokoll-mounted');
    },
});
</script>
