<template>
    <lightbox name="support" no-fullscreen>
        <h1>{{ $t('modules.support.name') }}</h1>
        <small v-html="$t('modules.support.note')"></small>
        <chat
            v-for="(chat, id) in chats"
            :messages="chat.messages"
            :key="id"
        ></chat>
        <label class="input-group">
            <input
                class="form-control input-sm"
                type="text"
                :placeholder="$t('modules.support.input')"
            />
            <span class="input-group-btn">
                <button class="btn btn-success" disabled>
                    {{ $t('modules.support.send') }}
                </button>
            </span>
        </label>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';
import Chat from './components/chat.vue';

export default {
    name: 'support',
    components: { Chat, Lightbox },
    computed: {
        chats: () => window.lssmv4.$store.state.support.chats,
    },
};
</script>

<style scoped lang="sass">
input
    height: 34px
</style>
