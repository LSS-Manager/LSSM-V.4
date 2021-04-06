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
        <VerbandHome
            v-if="type === 'verband/home'"
            :home="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></VerbandHome>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { DefaultData } from 'vue/types/options';
import { RedesignLightboxVue } from 'typings/modules/Redesign';
import { VerbandHomeWindow } from '../parsers/verband/home';

interface Link {
    href: string;
    text: string;
}

export default Vue.extend<
    DefaultData<Vue>,
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
    },
    {
        nav: Link[];
    },
    {
        data: VerbandHomeWindow;
        url: string;
        lightbox: RedesignLightboxVue<'verband/home', VerbandHomeWindow>;
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
        type: string;
    }
>({
    name: 'verband-lightbox',
    components: {
        VerbandHome: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband/home"*/ './verband/home.vue'
            ),
    },
    data() {
        return {};
    },
    computed: {
        nav() {
            const links = this.$sm('nav.links') as Record<string, string>;
            return Object.values(
                (this.$sm(
                    `nav.${this.data.meta.self ? 'self' : 'other'}`
                ) as unknown) as Record<number, string>
            )
                .filter(
                    link =>
                        new URL(
                            this.url,
                            window.location.href
                        ).pathname.replace(/\/$/g, '') !==
                        new URL(
                            link.replace(/{id}/g, this.data.meta.id),
                            window.location.href
                        ).pathname.replace(/\/$/g, '')
                )
                .map(link => ({
                    href: link.replace(/{id}/g, this.data.meta.id),
                    text: links[link],
                }));
        },
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`verband.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`verband.${key}`, amount, args);
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
        type: {
            type: String,
            required: true,
        },
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
        this.lightbox.finishLoading('yknfdwef');
    },
});
</script>
