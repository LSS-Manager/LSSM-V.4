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
                    <a
                        class="navbar-brand"
                        :href="`/alliances/${data.meta.id}`"
                        >{{ data.meta.name }}</a
                    >
                </div>
                <div
                    class="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-alliance"
                >
                    <ul class="nav navbar-nav navbar-right">
                        <li v-for="link in nav" :key="link.href">
                            <a :href="link.href">
                                {{ link.text }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <VerbandBSR
            v-if="type === 'verband/bsr'"
            :bsr="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandBSR>
        <VerbandEditName
            v-else-if="type === 'verband/edit_name'"
            :alliance="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandEditName>
        <VerbandEditText
            v-else-if="type === 'verband/edit_text'"
            :alliance="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandEditText>
        <VerbandHome
            v-else-if="type === 'verband/home'"
            :home="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandHome>
        <VerbandMitglieder
            v-else-if="type === 'verband/mitglieder'"
            :mitglieder="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandMitglieder>
        <VerbandNewsEdit
            v-else-if="type === 'verband/news/edit'"
            :news="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandNewsEdit>
        <VerbandProtokoll
            v-else-if="type === 'verband/protokoll'"
            :protokoll="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandProtokoll>
        <VerbandRegeln
            v-else-if="type === 'verband/regeln'"
            :rules="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandRegeln>
        <Schoolings
            v-else-if="type === 'schoolings'"
            :schoolings="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></Schoolings>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { DefaultData } from 'vue/types/options';
import { RedesignComponent } from 'typings/modules/Redesign';
import { VerbandHomeWindow } from '../parsers/verband/home';
import VueI18n from 'vue-i18n';

interface Link {
    href: string;
    text: string;
}

type Component = RedesignComponent<
    'data',
    'verband/home',
    VerbandHomeWindow,
    DefaultData<Vue>,
    {
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
    },
    { nav: Link[] },
    { type: string }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-lightbox',
    components: {
        VerbandBSR: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/bsr"*/ './verband/bsr.vue'
            ),
        VerbandEditName: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/edit_name"*/ './verband/edit_name.vue'
            ),
        VerbandEditText: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/edit_text"*/ './verband/edit_text.vue'
            ),
        VerbandHome: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/home"*/ './verband/home.vue'
            ),
        VerbandMitglieder: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/mitglieder"*/ './verband/mitglieder.vue'
            ),
        VerbandNewsEdit: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/news/edit"*/ './verband/news/edit.vue'
            ),
        VerbandProtokoll: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/protokoll"*/ './verband/protokoll.vue'
            ),
        VerbandRegeln: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/regeln"*/ './verband/regeln.vue'
            ),
        Schoolings: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/schoolings"*/ './schoolings.vue'
            ),
    },
    data() {
        return {};
    },
    computed: {
        nav() {
            const links = (this.lightbox.$m(
                'verband.nav.links'
            ) as unknown) as Record<string, string>;
            return Object.values(
                (this.lightbox.$m(
                    `verband.nav.${this.data.meta.self ? 'self' : 'other'}`
                ) as unknown) as Record<number, string>
            )
                .filter(link => {
                    if (
                        !this.data.meta.nav.protokoll &&
                        link === '/alliance_logfiles'
                    )
                        return false;
                    return (
                        new URL(
                            this.url.match(/\/verband\/?$/)
                                ? `/alliances/${this.data.meta.id}`
                                : this.url,
                            window.location.origin
                        ).pathname.replace(/\/$/g, '') !==
                        new URL(
                            link.replace(/{id}/g, this.data.meta.id.toString()),
                            window.location.origin
                        ).pathname.replace(/\/$/g, '')
                    );
                })
                .map(link => ({
                    href: link.replace(/{id}/g, this.data.meta.id.toString()),
                    text: links[link],
                }));
        },
    },
    methods: {
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.lightbox.$m(`verband.${key}`, args);
        },
        $mc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.lightbox.$mc(`verband.${key}`, amount, args);
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
    mounted() {
        this.$el.addEventListener('click', e => {
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            const href = target?.getAttribute('href');
            if (!target || !href) return;
            e.preventDefault();
            if (target.hasAttribute('lightbox-open'))
                return window.lightboxOpen(href);
            else this.$set(this.lightbox, 'src', href);
        });
    },
});
</script>
