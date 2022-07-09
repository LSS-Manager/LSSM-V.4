<template>
    <lightbox
        name="releasenotes"
        :extra-classes="{ releasenotes: true }"
        no-fullscreen
        no-title-hide
    >
        <h1>LSSM V.4: {{ $t('modules.releasenotes.name') }}</h1>
        <div v-for="(notes, minor) in minors" :key="minor">
            <h2
                :class="{
                    closed: !semverLt(
                        last_seen,
                        coerce(notes[0][0]) || '4.0.0'
                    ),
                }"
                @click="({ target }) => target.classList.toggle('closed')"
            >
                {{ minor }}
            </h2>
            <div v-for="note in notes" :key="note[0]" class="note">
                <h4>
                    <b>
                        <a
                            target="_blank"
                            :href="`https://github.com/LSS-Manager/LSSM-V.4/releases/tag/v${
                                semverLt(note[0], coerce('4.3.3')) ? '.' : ''
                            }${note[0]}`"
                        >
                            {{ note[0] }}
                        </a>
                    </b>
                    <sup
                        class="badge beta_label"
                        v-if="
                            semverLt(currentVersion, coerce(note[0]) || '4.0.0')
                        "
                    >
                        Beta
                    </sup>
                    <sup
                        class="badge message_new"
                        v-else-if="
                            semverLt(last_seen, coerce(note[0]) || '4.0.0')
                        "
                    >
                        New!
                    </sup>
                    <small
                        class="pull-right"
                        :title="moment(note[1].timestamp).format('LLLL')"
                        >{{ moment(note[1].timestamp).fromNow() }}</small
                    >
                </h4>
                <div v-html="note[1].content"></div>
            </div>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import coerce from 'semver/functions/coerce';
import moment from 'moment';
import semverLt from 'semver/functions/lt';
import { useRootStore } from '@stores/index';

import type { DefaultMethods } from 'vue/types/options';
import type { SemVer } from 'semver';
import type {
    ReleaseNoteComputed,
    ReleaseNoteProps,
} from 'typings/modules/Releasenotes';

export default Vue.extend<
    {
        moment: typeof moment;
        semverLt: typeof semverLt;
        coerce: typeof coerce;
        currentVersion: SemVer | string;
    },
    DefaultMethods<Vue>,
    ReleaseNoteComputed,
    ReleaseNoteProps
>({
    name: 'lssmv4-releasenotes',
    data() {
        return {
            moment,
            semverLt,
            coerce,
            currentVersion: coerce(VERSION) || VERSION,
        };
    },
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
    },
    computed: {
        minors() {
            const minors: Record<string, ReleaseNoteProps['notes']> = {};
            this.notes.forEach(([version, note]) => {
                const minor = version.match(/^\d+\.\d+/u)?.[0] ?? '0';
                if (!minors.hasOwnProperty(minor)) minors[minor] = [];
                minors[minor].push([version, note]);
            });
            return minors;
        },
    },
    props: {
        notes: {
            type: Array,
            required: true,
        },
        last_seen: {
            type: String,
            required: false,
            default: '4.0.0',
        },
    },
    mounted() {
        const rootStore = useRootStore();
        moment.locale(rootStore.locale);
        document
            .querySelector<HTMLDivElement>('.releasenotes-modal .vm--modal')
            ?.style.setProperty(
                'background-image',
                `url("${rootStore.lssmLogoUrl}")`
            );
    },
});
</script>

<style lang="sass">
.releasenotes-modal .vm--modal
    background-size: contain
    background-repeat: no-repeat
    background-position: center center

    body.dark &
        background-blend-mode: soft-light
</style>

<style scoped lang="sass">
.releasenotes
    body.dark & a
        color: #6dd5f4

    body:not(.dark) &
        margin: -1rem
        padding: 1rem
        background-color: rgba(255, 255, 255, 0.8)

    h2
        cursor: pointer

        &::before
          content: "▾"

        &.closed
            &::before
                content: "▸"

            ~ .note
              display: none

    .note
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
        transition: box-shadow 0.3s
        border-radius: 5px
        padding: 1rem
        margin-bottom: 0.5em
        &:hover
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)

        .beta_label
            background-color: #f0ad4e

        ::v-deep ul li
            list-style: disc !important

        body.dark &
            background-color: rgba(0, 0, 0, 0.3)

            &::v-deep a
                color: #6dd5f4

        body:not(.dark) &
            background-color: rgba(0, 0, 0, 0.05)
</style>
