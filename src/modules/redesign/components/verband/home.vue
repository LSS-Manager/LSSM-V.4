<template>
    <div class="content">
        <div
            class="pull-left alliance-home-sidebar"
            v-if="
                home.image || home.meta.self || home.edit_text || home.edit_logo
            "
        >
            <div
                class="btn-group pull-right edit-btns"
                v-if="home.edit_text || home.edit_logo"
            >
                <!-- Ah yes, there is really missing an `r` in `verband`. But adding the `r` results in a sweet and cool 404 :) -->
                <a v-if="home.edit_text" href="/veband/text/edit">t</a>
                <a v-if="home.edit_logo" href="/verband/avatar">a</a>
            </div>
            <div class="clearfix"></div>
            <img :src="home.image" alt="" v-if="home.image" />
            <button v-if="home.meta.self" class="btn btn-danger" disabled>
                leave
            </button>
        </div>
        <div class="alliance-home-text">
            <p v-for="(t, index) in home.text" :key="index" v-html="t"></p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { RedesignLightboxVue } from 'typings/modules/Redesign';
import { VerbandHomeWindow } from '../../parsers/verband/home';
import { DefaultComputed, DefaultData } from 'vue/types/options';

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
    DefaultComputed,
    {
        home: VerbandHomeWindow;
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
    }
>({
    name: 'verband-home',
    data() {
        return {};
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`credits/daily.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`credits/daily.${key}`, amount, args);
        },
    },
    props: {
        home: {
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
        home() {
            this.lightbox.finishLoading('verband/home-updated-data');
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
        this.lightbox.finishLoading('verband/home-mounted');
    },
});
</script>

<style scoped lang="sass">
.content
    display: flex

    .alliance-home-sidebar
        margin-right: 1rem

        .edit-btns
            margin-bottom: 1rem

        img
            min-width: 90%
            display: block
            margin: auto

    .alliance-home-text
        width: 100%
</style>
