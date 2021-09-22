<template>
    <lightbox name="releasenotes" no-fullscreen no-title-hide>
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
                    <b
                        ><a
                            class="lightbox-open"
                            target="_blank"
                            :href="
                                `https://github.com/LSS-Manager/LSSM-V.4/releases/tag/v.${note[0]}`
                            "
                            >{{ note[0] }}</a
                        ></b
                    >
                    <sup
                        class="badge message_new"
                        v-if="semverLt(last_seen, coerce(note[0]) || '4.0.0')"
                        >New!</sup
                    >
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

import { DefaultData, DefaultMethods } from 'vue/types/options';
import {
    ReleaseNoteComputed,
    ReleaseNoteProps,
} from 'typings/modules/Releasenotes';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    ReleaseNoteComputed,
    ReleaseNoteProps
>({
    name: 'releasenotes',
    data() {
        return {
            moment,
            semverLt,
            coerce,
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
                const minor = version.match(/^\d+\.\d+/)[0];
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
        moment.locale(this.$store.state.lang);
    },
});
</script>

<style scoped lang="sass">
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
    &:hover
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)

    ::v-deep ul li
        list-style: disc !important
</style>
