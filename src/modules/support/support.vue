<template>
    <lightbox name="support" no-fullscreen>
        <h1>{{ $t('modules.support.name') }}</h1>
        <small v-html="$t('modules.support.note')"></small>
        <form class="chat-control">
            <v-select
                v-if="window.lssmv4.$store.state.lssm_admin"
                v-model="selectedChat"
                :options="chatSelection"
                :reduce="chat => chat.value"
                :clearable="false"
                @input="update"
            ></v-select>
            <button class="btn btn-danger chat-delete" disabled>
                <i class="fas fa-trash-alt"></i>
            </button>
        </form>
        <chat :messages="chats[selectedChat].messages"></chat>
        <label class="input-group">
            <input
                class="form-control input-sm"
                type="text"
                :placeholder="$t('modules.support.input')"
                v-model="message"
                minlength="1"
                maxlength="200"
                :disabled="sending"
                v-on:keydown.enter="send"
            />
            <span class="input-group-btn">
                <button
                    class="btn btn-success"
                    @click="send"
                    :disabled="!message.length || sending"
                >
                    {{ $t('modules.support.send') }}
                </button>
            </span>
        </label>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';
import Chat from './components/chat.vue';
import VSelect from 'vue-select';

export default {
    name: 'support',
    components: { Chat, Lightbox, VSelect },
    data() {
        return {
            selectedChat: Object.keys(
                window.lssmv4.$store.state.support.chats
            )[0],
            message: '',
            sending: false,
            window,
        };
    },
    props: {
        updateFn: {
            type: Function,
            required: false,
            default: () => {},
        },
    },
    computed: {
        chats: () => window.lssmv4.$store.state.support.chats,
        chatSelection: () =>
            Object.keys(window.lssmv4.$store.state.support.chats).map(c => {
                return {
                    label:
                        window.lssmv4.$store.state.support.chats[c].messages[0]
                            .author.name,
                    value: c,
                };
            }),
    },
    methods: {
        send() {
            this.sending = true;
            window.lssmv4.$store
                .dispatch('api/request', {
                    url: `${window.lssmv4.$store.state.server}support/support_message.php`,
                    init: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat: this.selectedChat,
                            message: this.message,
                            username: window.username,
                        }),
                    },
                })
                .then(this.update)
                .then(() => {
                    this.message = '';
                    this.sending = false;
                })
                .catch(() => {});
        },
        update() {
            return this.updateFn().then(() => {
                const chat = document.querySelector('.support-chat');
                chat.scrollTo({
                    top:
                        chat.scrollMaxY ||
                        chat.scrollHeight - chat.clientHeight,
                    left: 0,
                    behavior: 'smooth',
                });
            });
        },
    },
    mounted() {
        this.update();
    },
};
</script>

<style scoped lang="sass">
.chat-control
    display: flex

    .v-select
        width: 100%
        height: 34px

    .chat-delete
        margin-left: 1rem

input
    height: 34px
</style>
