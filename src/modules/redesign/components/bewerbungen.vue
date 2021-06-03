<template>
    <div>
        <div class="alert alert-success" v-if="alertMsg">
            <button class="close" @click.prevent="alertMsg = ''">×</button>
            {{ alertMsg }}
        </div>
        <h1>
            {{ lightbox.$smc('title', bewerbungen.applications.length) }}
            <a
                v-if="bewerbungen.editSettings"
                class="btn btn-default pull-right"
                href="/alliance_candidature_setting/edit"
                lightbox-open
            >
                {{ lightbox.$sm('rules') }}
            </a>
        </h1>
        <enhanced-table
            no-search
            :table-attrs="{ class: 'table table-striped' }"
            :head="{
                user: { title: lightbox.$sm('user').toString(), noSort: true },
                actions: { title: '', noSort: true },
            }"
        >
            <tr v-for="{ user, id } in bewerbungen.applications" :key="id">
                <td>
                    <a :href="`/profile/${user.id}`" lightbox-open>
                        {{ user.name }}
                    </a>
                    <!-- send a message (customizable predefined text) -->
                </td>
                <td style="text-align: right">
                    <template v-if="bewerbungen.editSettings">
                        <button
                            class="btn btn-success"
                            @click="accept(id, user.name)"
                        >
                            {{ lightbox.$sm('accept') }}
                        </button>
                        <button
                            class="btn btn-danger"
                            @click="decline(id, user.name)"
                        >
                            {{ lightbox.$sm('decline') }}
                        </button>
                    </template>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { BewerbungenWindow } from '../parsers/bewerbungen';
import { RedesignSubComponent } from 'typings/modules/Redesign';

type Component = RedesignSubComponent<
    'bewerbungen',
    'bewerbungen',
    BewerbungenWindow,
    { alertMsg: string },
    {
        accept(id: number, username: string): void;
        decline(id: number, username: string): void;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'bewerbungen',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            alertMsg: '',
        };
    },
    methods: {
        accept(id, username) {
            this.$store
                .dispatch('api/request', {
                    url: `/verband/bewerbungen/annehmen/${id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `/verband/bewerbungen`,
                            window.location.origin
                        ),
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: `redesign-verband-bewerbungen-accept`,
                })
                .then(() => {
                    this.alertMsg = this.lightbox
                        .$sm('alert.accepted', { username })
                        .toString();
                    this.$set(
                        this.lightbox.data,
                        'applications',
                        this.bewerbungen.applications.filter(
                            ({ id: a }) => a !== id
                        )
                    );
                });
        },
        decline(id, username) {
            this.$store
                .dispatch('api/request', {
                    url: `/verband/bewerbungen/ablehnen/${id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `/verband/bewerbungen`,
                            window.location.origin
                        ),
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: `redesign-verband-bewerbungen-decline`,
                })
                .then(() => {
                    this.alertMsg = this.lightbox
                        .$sm('alert.declined', { username })
                        .toString();
                    this.$set(
                        this.lightbox.data,
                        'applications',
                        this.bewerbungen.applications.filter(
                            ({ id: a }) => a !== id
                        )
                    );
                });
        },
    },
    props: {
        bewerbungen: {
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
        bewerbungen() {
            this.lightbox.finishLoading('bewerbungen-updated-data');
        },
    },
    mounted() {
        this.lightbox.finishLoading('bewerbungen-mounted');
    },
});
</script>

<style scoped lang="sass">
.row
    margin-left: 0
    margin-right: 0

.map-locator
  cursor: pointer
</style>
