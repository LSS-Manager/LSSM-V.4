<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button
                        type="button"
                        class="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-alliance"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">{{ nav.title }}</a>
                </div>
                <div
                    class="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-alliance"
                >
                    <ul class="nav navbar-nav navbar-right">
                        <li v-for="link in nav.links" :key="link.href">
                            <a :href="link.href">
                                {{ link.text }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <CreditsList
            v-if="type === 'credits/list'"
            :credits="data"
            :url="url"
            :lightbox="lightbox"
            :$m="lightbox.$m"
            :$mc="lightbox.$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></CreditsList>
        <CreditsDaily
            v-else-if="type === 'credits/daily'"
            :credits="data"
            :url="url"
            :lightbox="lightbox"
            :$m="lightbox.$m"
            :$mc="lightbox.$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></CreditsDaily>
        <CreditsOverview
            v-else-if="type === 'credits/overview'"
            :data="data"
            :lightbox="lightbox"
            :$m="lightbox.$m"
            :$mc="lightbox.$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></CreditsOverview>
        <CoinsList
            v-else-if="type === 'coins/list'"
            :coins="data"
            :url="url"
            :lightbox="lightbox"
            :$m="lightbox.$m"
            :$mc="lightbox.$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></CoinsList>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import type { RedesignComponent } from 'typings/modules/Redesign';
import type { DefaultData, DefaultMethods } from 'vue/types/options';

interface Link {
    href: string;
    text: string;
}

type Component = RedesignComponent<
    'data',
    'coins/list' | 'credits/daily' | 'credits/list' | 'credits/overview',
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    {
        nav: { title: string; links: Link[] };
    },
    { type: string }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-credits-lightbox',
    components: {
        CreditsList: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits/list"*/ './credits/list.vue'
            ),
        CreditsDaily: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits/daily"*/ './credits/daily.vue'
            ),
        CreditsOverview: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits/overview"*/ './credits/overview.vue'
            ),
        CoinsList: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/coins/list"*/ './coins/list.vue'
            ),
    },
    data() {
        return {};
    },
    computed: {
        nav() {
            return {
                title: this.lightbox.$m('credits.nav.title').toString(),
                links: Object.values(
                    this.lightbox.$m('credits.nav.links') as unknown as Record<
                        number,
                        Link
                    >
                ).filter(
                    ({ href }) =>
                        new URL(
                            this.url,
                            window.location.origin
                        ).pathname.replace(/\/$/gu, '') !==
                        new URL(href, window.location.origin).pathname.replace(
                            /\/$/gu,
                            ''
                        )
                ),
            };
        },
    },
    props: {
        data: {
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
        type: {
            type: String,
            required: true,
        },
    },
});
</script>
