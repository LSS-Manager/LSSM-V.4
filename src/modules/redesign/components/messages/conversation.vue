<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <small>
                <a href="/messages">← {{ lightbox.$sm('back') }}</a>
            </small>
            <h1>{{ conversation.subject }}</h1>
            <p>Eine Konversation mit <a href="" lightbox-open>XYZ</a>.</p>
        </div>
        <div class="panel-body">
            <div class="message message-self">
                <div class="message-meta well">
                    <button
                        class="btn btn-success response-send"
                        :disabled="!response.length"
                    >
                        <font-awesome-icon
                            :icon="faPaperPlane"
                        ></font-awesome-icon>
                    </button>
                </div>
                <div class="message-content well">
                    <textarea
                        class="form-control response-input"
                        :rows="Math.min(response.split(/\n/).length + 1, 20)"
                        v-model="response"
                    ></textarea>
                </div>
            </div>
            <template v-for="(message, index) in conversation.messages">
                <div
                    class="message"
                    :class="{ 'message-self': message.sender.id === self }"
                    :key="index"
                >
                    <div class="message-meta well">
                        <img
                            v-if="message.sender.avatar"
                            class="profile-avatar"
                            :src="message.sender.avatar"
                            alt=""
                        />
                        <small>{{ message.timestamp }}</small>
                    </div>
                    <div class="message-content well">
                        <strong>
                            <img
                                :src="`/images/user_${
                                    message.sender.online ? 'green' : 'gray'
                                }.png`"
                                alt=""
                            />
                            <a
                                :href="`/profile/${message.sender.id}`"
                                lightbox-open
                            >
                                {{ message.sender.name }}
                            </a>
                        </strong>
                        <div v-html="message.content"></div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'conversation',
    'messages/conversation',
    { faPaperPlane: IconDefinition; self: number; response: string }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-messages-conversation',
    data() {
        return {
            faPaperPlane,
            self: window.user_id,
            response: '',
        };
    },
    methods: {},
    computed: {},
    props: {
        conversation: {
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
        conversation() {
            this.lightbox.finishLoading('conversation-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('conversation-mounted');
    },
});
</script>

<style scoped lang="sass">
h1
    margin-top: 10px

.message
    display: flex
    text-align: left

    .message-meta
        display: flex
        flex-flow: column

        .profile-avatar
            min-width: 90%
            max-width: 10vw

        .response-send
            height: 100%

    .message-content
        width: 80%

        .response-input
            width: 100%
            resize: vertical

    &.message-self
        flex-direction: row-reverse
        text-align: right

        .message-meta
            border-left: 0

        .message-content
            border-right: 0

    &:not(.message-self)
        .message-meta
            border-right: 0

        .message-content
            border-left: 0
</style>
