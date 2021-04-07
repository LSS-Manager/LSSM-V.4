<template>
    <div class="content">
        <div
            class="pull-left alliance-home-sidebar"
            v-if="
                home.image ||
                    home.meta.self ||
                    home.edit_text ||
                    home.edit_name ||
                    home.edit_logo
            "
        >
            <div
                class="btn-group pull-right edit-btns"
                v-if="home.edit_text || home.edit_logo || home.edit_name"
            >
                <!-- Ah yes, there is really missing an `r` in `verband`. But adding the `r` results in a sweet and cool 404 :) -->
                <a
                    v-if="home.edit_text"
                    class="btn btn-default btn-xs"
                    href="/veband/text/edit"
                    :title="lightbox.$sm('edit_text')"
                >
                    <font-awesome-icon :icon="faEdit"></font-awesome-icon>
                </a>
                <a
                    v-if="home.edit_name"
                    class="btn btn-default btn-xs"
                    :href="`/alliances/${home.meta.id}/edit`"
                    :title="lightbox.$sm('edit_name')"
                >
                    {{ lightbox.$sm('edit_name') }}
                </a>
                <a
                    v-if="home.edit_logo"
                    class="btn btn-default btn-xs"
                    lightbox-open
                    href="/verband/avatar?close-after-submit"
                    :title="lightbox.$sm('edit_logo')"
                >
                    <font-awesome-icon :icon="faImage"></font-awesome-icon>
                </a>
            </div>
            <div class="clearfix"></div>
            <img :src="home.image" alt="" v-if="home.image" />
            <button
                v-if="home.meta.self"
                class="btn btn-danger pull-right"
                disabled
                :title="lightbox.$sm('leave')"
            >
                {{ lightbox.$sm('leave') }}
            </button>
        </div>
        <div class="alliance-home-text">
            <p v-for="(t, index) in home.text" :key="index" v-html="t"></p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { RedesignSubComponent } from 'typings/modules/Redesign';
import { VerbandHomeWindow } from '../../parsers/verband/home';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Component = RedesignSubComponent<
    'home',
    'verband/home',
    VerbandHomeWindow,
    {
        faEdit: IconDefinition;
        faImage: IconDefinition;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-home',
    data() {
        return {
            faEdit,
            faImage,
        };
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
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const Alliance = this;
        this.$store.dispatch('event/addListener', {
            name: 'redesign-edit-alliance-text-submitted',
            listener({ detail: { content } }: CustomEvent) {
                if (Alliance.home.meta.self)
                    Alliance.$set(Alliance.lightbox.data, 'text', content);
            },
        });
        this.$store.dispatch('event/addListener', {
            name: 'redesign-edit-alliance-avatar-submitted',
            listener({ detail: { img } }: CustomEvent) {
                if (Alliance.home.meta.self)
                    Alliance.$set(Alliance.lightbox.data, 'image', img);
            },
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
