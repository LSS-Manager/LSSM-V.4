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
                                        :class="
                                            `btn-${
                                                kasse.earnings.type === type
                                                    ? 'success'
                                                    : 'default'
                                            }`
                                        "
                                        @click="setEarningsType(type)"
                                    >
                                        {{ lightbox.$sm(`earnings.${type}`) }}
                                    </a>
                                </span>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div>
                                <a
                                    class="btn btn-success"
                                    @click="earningsPrev"
                                >
                                    -1
                                </a>
                                <b v-if="kasse.earnings.type === 'daily'">
                                    {{
                                        moment()
                                            .add(kasse.earnings.scroll, 'days')
                                            .format('ddd LL')
                                    }}
                                </b>
                                <b v-else>
                                    {{
                                        moment()
                                            .add(
                                                kasse.earnings.scroll,
                                                'months'
                                            )
                                            .format('MMMM YYYY')
                                    }}
                                </b>
                            </div>
                            <enhanced-table
                                :head="{
                                    user: {
                                        title: lightbox.$sm('user'),
                                        noSort: true,
                                    },
                                    credits: {
                                        title: lightbox.$sm('credits'),
                                        noSort: true,
                                    },
                                }"
                                :table-attrs="{ class: 'table table-striped' }"
                                :no-search="true"
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
                                {{ lightbox.$sm('rate') }}:
                                <div class="btn-group">
                                    <a
                                        v-for="rate in 10"
                                        :key="rate"
                                        class="btn btn-xs btn-discount"
                                        :class="
                                            `btn-${
                                                rate === kasse.rate
                                                    ? 'success'
                                                    : 'default'
                                            }`
                                        "
                                        @click="changeRate(rate)"
                                    >
                                        {{ rate }}%
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <pre>{{ kasse.spendings }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import moment from 'moment';

import { RedesignSubComponent } from 'typings/modules/Redesign';
import { VerbandskasseWindow } from '../../parsers/verband/kasse';

type Component = RedesignSubComponent<
    'kasse',
    'verband/kasse',
    VerbandskasseWindow,
    { moment: typeof moment },
    {
        toggle(): void;
        changeRate(rate: number): void;
        setEarningsType(type: string): void;
        earningsPrev(): void;
    },
    { entriesSum: number }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-kasse',
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
</style>
