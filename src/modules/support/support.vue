<template>
    <lightbox name="support" no-fullscreen>
        <h1>{{ $t('modules.support.name') }}</h1>
        <small v-html="$t('modules.support.note')"></small>
        <v-select
            v-if="window.lssmv4.$store.state.lssm_admin"
            v-model="selectedChat"
            :options="chatSelection"
            :reduce="chat => chat.value"
            :clearable="false"
        ></v-select>
        <chat :messages="chats[selectedChat].messages"></chat>
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
import VSelect from 'vue-select';

export default {
    name: 'support',
    components: { Chat, Lightbox, VSelect },
    data() {
        return {
            selectedChat: Object.keys(
                window.lssmv4.$store.state.support.chats
            )[0],
            window,
        };
    },
    computed: {
        chats: () => window.lssmv4.$store.state.support.chats,
        chatSelection: () =>
            Object.keys(window.lssmv4.$store.state.support.chats).map(c => {
                return {
                    label: window.lssmv4.$store.state.support.chats[c].user,
                    value: c,
                };
            }),
    },
};
</script>

<style scoped lang="sass">
input
    height: 34px
</style>
