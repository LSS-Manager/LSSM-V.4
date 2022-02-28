<template>
    <div>
        <a
            v-if="kasse.canToggle"
            class="btn btn-default pull-right"
            @click="toggle"
        >
            {{ lightbox.$sm(`toggle.${kasse.enabled ? 'disable' : 'enable'}`) }}
        </a>
        <div class="content">
            <div v-if="!kasse.enabled" class="alert alert-info">
                {{ lightbox.$sm('disabled') }}
            </div>
            <div v-else class="row">
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>
                                {{ lightbox.$sm('earnings.title') }}
                                <span class="btn-group">
                                    <a
                                        v-for="type in ['daily', 'monthly']"
                                        :key="type"
                                        class="btn"
                                        :class="`btn-${
                                            kasse.earnings.type === type
                                                ? 'success'
                                                : 'default'
                                        }`"
                                        @click="setEarningsType(type)"
                                    >
                                        {{ lightbox.$sm(`earnings.${type}`) }}
                                    </a>
                                </span>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div>
                                <button
                                    class="btn btn-success"
                                    @click="earningsPrev"
                                >
                                    -1
                                </button>
                                <b
                                    v-if="kasse.earnings.type === 'daily'"
                                    class="today"
                                    @click="today"
                                >
                                    {{
                                        moment()
                                            .add(kasse.earnings.scroll, 'days')
                                            .format('ddd LL')
                                    }}
                                </b>
                                <b v-else class="today" @click="today">
                                    {{
                                        moment()
                                            .add(
                                                kasse.earnings.scroll,
                                                'months'
                                            )
                                            .format('MMMM YYYY')
                                    }}
                                </b>
                                <button
                                    class="btn btn-success"
                                    @click="earningsNext"
                                    :disabled="kasse.earnings.scroll >= 0"
                                >
                                    +1
                                </button>
                            </div>
                            <enhanced-table
                                :head="{
                                    user: {
                                        title: lightbox.$sm('earnings.user'),
                                        noSort: true,
                                    },
                                    credits: {
                                        title: lightbox.$sm('earnings.credits'),
                                        noSort: true,
                                    },
                                }"
                                :table-attrs="{ class: 'table table-striped' }"
                                no-search
                            >
                                <template v-slot:head>
                                    <span>
                                        {{ lightbox.$sm('earnings.sum') }}:
                                        {{ entriesSum.toLocaleString() }}
                                        Credits
                                    </span>
                                </template>
                                <tr
                                    v-for="entry in kasse.earnings.earnings"
                                    :key="entry.user.id"
                                >
                                    <td>
                                        <a
                                            :href="`/profile/${entry.user.id}`"
                                            lightbox-open
                                        >
                                            {{ entry.user.name }}
                                        </a>
                                    </td>
                                    <td>{{ entry.value.toLocaleString() }}</td>
                                </tr>
                            </enhanced-table>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>{{ lightbox.$sm('summary.title') }}</h4>
                        </div>
                        <div class="panel-body">
                            <h1>{{ kasse.value.toLocaleString() }} Credits</h1>
                            <div>
                                {{ lightbox.$sm('summary.rate') }}:
                                <div class="btn-group">
                                    <a
                                        v-for="rate in 10"
                                        :key="rate"
                                        class="btn btn-xs btn-discount"
                                        :class="`btn-${
                                            rate === kasse.rate
                                                ? 'success'
                                                : 'default'
                                        }`"
                                        @click="changeRate(rate)"
                                    >
                                        {{ rate }}%
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>
                                {{ lightbox.$sm('spendings.title') }}
                            </h4>
                        </div>
                        <div class="panel-body">
                            <button
                                class="btn btn-success"
                                :disabled="
                                    kasse.spendings.page >=
                                    kasse.spendings.lastPage
                                "
                                @click="loadMoreSpendings"
                            >
                                {{ lightbox.$sm('spendings.loadMore') }}
                            </button>
                            <enhanced-table
                                :head="{
                                    credits: {
                                        title: lightbox.$sm(
                                            'spendings.credits'
                                        ),
                                        noSort: true,
                                    },
                                    user: {
                                        title: lightbox.$sm('spendings.user'),
                                        noSort: true,
                                    },
                                    description: {
                                        title: lightbox.$sm('spendings.desc'),
                                        noSort: true,
                                    },
                                    date: {
                                        title: lightbox.$sm('spendings.date'),
                                        noSort: true,
                                    },
                                }"
                                :table-attrs="{ class: 'table table-striped' }"
                                no-search
                            >
                                <tr
                                    v-for="(entry, id) in kasse.spendings
                                        .spendings"
                                    :key="id"
                                >
                                    <td>
                                        {{ entry.credits.toLocaleString() }}
                                    </td>
                                    <td>
                                        <a
                                            :href="`/profile/${entry.user.id}`"
                                            lightbox-open
                                        >
                                            {{ entry.user.name }}
                                        </a>
                                    </td>
                                    <td>{{ entry.description }}</td>
                                    <td>{{ entry.date }}</td>
                                </tr>
                            </enhanced-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import moment from 'moment';

import type { RedesignSubComponent } from 'typings/modules/Redesign';

type Component = RedesignSubComponent<
    'kasse',
    'verband/kasse',
    { moment: typeof moment },
    {
        toggle(): void;
        changeRate(rate: number): void;
        setEarningsType(type: string): void;
        today(): void;
        earningsPrev(): void;
        earningsNext(): void;
        loadMoreSpendings(): void;
    },
    { entriesSum: number }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-verband-kasse',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
    },
    data() {
        moment.locale(this.$store.state.lang);
        return { moment };
    },
    computed: {
        entriesSum() {
            return this.kasse.enabled
                ? this.kasse.earnings.earnings.reduce(
                      (sum, { value }) => sum + value,
                      0
                  )
                : 0;
        },
    },
    methods: {
        toggle() {
            this.$set(this.lightbox, 'loading', true);
            const url = new URL('/verband/kasse', window.location.origin);
            this.$store
                .dispatch('api/request', {
                    url: `${url.toString()}/umschalten`,
                    feature: `redesign-verband-kasse-toggle`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/kasse').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        this.$set(this.lightbox, 'data', result);
                        this.lightbox.finishLoading('verband-kasse-toggle');
                    });
                });
        },
        changeRate(rate) {
            this.$set(this.lightbox, 'loading', true);
            this.$store
                .dispatch('api/request', {
                    url: `/verband/kasse/rate/${rate}`,
                    feature: `redesign-verband-kasse-rate`,
                })
                .then(() => {
                    this.$set(this.lightbox.data, 'rate', rate);
                    this.lightbox.finishLoading('verband-kasse-toggle');
                });
        },
        setEarningsType(type) {
            if (!this.kasse.enabled) return;
            this.$set(this.lightbox, 'loading', true);
            const url = new URL('/verband/kasse', window.location.origin);
            url.searchParams.set('type', type);
            this.$store
                .dispatch('api/request', {
                    url: url.toString(),
                    feature: `redesign-verband-kasse-earnings-type`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/kasse').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        if (result.enabled) {
                            this.$set(
                                this.lightbox.data,
                                'earnings',
                                result.earnings
                            );
                        }
                        this.lightbox.finishLoading(
                            'verband-kasse-earnings-type'
                        );
                    });
                });
        },
        today() {
            if (!this.kasse.enabled || !this.kasse.earnings.scroll) return;
            this.$set(this.lightbox, 'loading', true);
            const url = new URL('/verband/kasse', window.location.origin);
            url.searchParams.set('type', this.kasse.earnings.type);
            this.$store
                .dispatch('api/request', {
                    url: url.toString(),
                    feature: `redesign-verband-kasse-earnings-today`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/kasse').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        if (result.enabled) {
                            this.$set(
                                this.lightbox.data,
                                'earnings',
                                result.earnings
                            );
                        }
                        this.lightbox.finishLoading(
                            'verband-kasse-earnings-today'
                        );
                    });
                });
        },
        earningsPrev() {
            if (!this.kasse.enabled) return;
            this.$set(this.lightbox, 'loading', true);
            const url = new URL('/verband/kasse', window.location.origin);
            url.searchParams.set('type', this.kasse.earnings.type);
            url.searchParams.set(
                'scroll',
                (this.kasse.earnings.scroll - 1).toString()
            );
            this.$store
                .dispatch('api/request', {
                    url: url.toString(),
                    feature: `redesign-verband-kasse-earnings-prev`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/kasse').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        if (result.enabled) {
                            this.$set(
                                this.lightbox.data,
                                'earnings',
                                result.earnings
                            );
                        }
                        this.lightbox.finishLoading(
                            'verband-kasse-earnings-prev'
                        );
                    });
                });
        },
        earningsNext() {
            if (!this.kasse.enabled) return;
            this.$set(this.lightbox, 'loading', true);
            const url = new URL('/verband/kasse', window.location.origin);
            url.searchParams.set('type', this.kasse.earnings.type);
            url.searchParams.set(
                'scroll',
                (this.kasse.earnings.scroll + 1).toString()
            );
            this.$store
                .dispatch('api/request', {
                    url: url.toString(),
                    feature: `redesign-verband-kasse-earnings-next`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/kasse').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        if (result.enabled) {
                            this.$set(
                                this.lightbox.data,
                                'earnings',
                                result.earnings
                            );
                        }
                        this.lightbox.finishLoading(
                            'verband-kasse-earnings-next'
                        );
                    });
                });
        },
        loadMoreSpendings() {
            if (!this.kasse.enabled) return;
            this.$set(this.lightbox, 'loading', true);
            const url = new URL('/verband/kasse', window.location.origin);
            url.searchParams.set(
                'page',
                (this.kasse.spendings.page + 1).toString()
            );
            this.$store
                .dispatch('api/request', {
                    url: url.toString(),
                    feature: `redesign-verband-kasse-more-spendings`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/kasse').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        if (result.enabled && this.lightbox.data.enabled) {
                            this.$set(
                                this.lightbox.data.spendings,
                                'page',
                                result.spendings.page
                            );
                            this.$set(
                                this.lightbox.data.spendings,
                                'lastPage',
                                result.spendings.lastPage
                            );
                            this.$set(
                                this.lightbox.data.spendings,
                                'spendings',
                                [
                                    ...this.lightbox.data.spendings.spendings,
                                    ...result.spendings.spendings,
                                ]
                            );
                        }
                        this.lightbox.finishLoading(
                            'verband-kasse-more-spendings'
                        );
                    });
                });
        },
    },
    props: {
        kasse: {
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
        kasse() {
            this.lightbox.finishLoading('verband/kasse-updated-data');
        },
    },
    mounted() {
        this.lightbox.finishLoading('verband/kasse-mounted');
    },
});
</script>

<style scoped lang="sass">
.row
    margin-left: 0
    margin-right: 0

.today
    cursor: pointer
</style>
