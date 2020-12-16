<template>
    <lightbox name="releasenotes" no-fullscreen no-title-hide>
        <h1>LSSM V.4: {{ $t('modules.releasenotes.name') }}</h1>
        <div v-for="note in notes" :key="note[0]" class="note">
            <h4>
                <b>{{ note[0] }}</b>
                <sup class="badge message_new" v-if="last_seen < note[0]"
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
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    DefaultData,
    DefaultMethods,
    DefaultComputed,
} from 'vue/types/options';
import { ReleaseNoteProps } from 'typings/modules/Releasenotes';
import moment from 'moment';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    ReleaseNoteProps
>({
    name: 'releasenotes',
    data() {
        return {
            moment,
        };
    },
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
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
.note
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
    transition: 0.3s
    border-radius: 5px
    padding: 1rem
    &:hover
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
</style>
