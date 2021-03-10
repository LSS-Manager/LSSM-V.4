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
        <CreditsDaily
            v-if="type === 'credits/daily'"
            :credits="data"
            :url="url"
            :lightbox="lightbox"
            :$m="$m"
            :$mc="$mc"
            :get-setting="getSetting"
            :set-setting="setSetting"
        ></CreditsDaily>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { CreditsDailyWindow } from '../parsers/credits/daily';
import { DefaultData } from 'vue/types/options';

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
        nav: { title: string; links: Link[] };
    },
    {
        data: CreditsDailyWindow;
        url: string;
        lightbox: Vue;
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
        type: 'credits/daily';
    }
>({
    name: 'credits-lightbox',
    components: {
        CreditsDaily: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits/daily"*/ './credits/daily.vue'
            ),
    },
    data() {
        return {};
    },
    computed: {
        nav() {
            return {
                title: this.$sm('nav.title').toString(),
                links: Object.values(
                    this.$sm('nav.links') as { [index: number]: Link }
                ).filter(
                    ({ href }) =>
                        new URL(this.url, window.location.href).pathname !==
                        new URL(href, window.location.href).pathname
                ),
            };
        },
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`credits.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`credits.${key}`, amount, args);
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
    },
});
</script>
