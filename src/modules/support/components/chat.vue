<template>
    <ul class="support-chat">
        <li
            class="clearfix"
            v-for="(message, index) in messages"
            :key="index"
            :self="(message.self = message.author.name === window.username)"
            :color="
                (message.color = getColor(message.author.name, message.self))
            "
        >
            <span
                class="chat-img"
                :class="message.self ? 'pull-right' : 'pull-left'"
            >
                <img
                    :src="
                        `https://placehold.it/50/${message.color}/${getRColor(
                            message.color
                        )}?text=${message.author.name
                            .split('')[0]
                            .toUpperCase()}`
                    "
                    alt="User Avatar"
                    class="img-circle"
                />
            </span>
            <div class="chat-body clearfix">
                <div class="header">
                    <small
                        class="text-muted"
                        v-if="message.self"
                        :title="moment(message.timestamp).format('LLLL:ss')"
                    >
                        <span class="glyphicon glyphicon-time"></span>
                        {{ moment(message.timestamp).fromNow() }}
                    </small>
                    <strong
                        class="primary-font"
                        :class="{ 'pull-right': message.self }"
                    >
                        <a
                            :href="`/profile/${message.author.uid}`"
                            class="lightbox-open"
                            v-if="message.author.game === window.I18n.locale"
                        >
                            {{ message.author.name }}
                            {{ config.games[message.author.game].flag }}
                        </a>
                        <span v-else>
                            {{ message.author.name }}
                            {{ config.games[message.author.game].flag }}
                        </span>
                    </strong>
                    <small
                        class="text-muted pull-right"
                        v-if="!message.self"
                        :title="moment(message.timestamp).format('LLLL:ss')"
                    >
                        <span class="glyphicon glyphicon-time"></span>
                        {{ moment(message.timestamp).fromNow() }}
                    </small>
                </div>
                <p :class="{ 'pull-right': message.self }">
                    {{ message.content }}
                </p>
            </div>
        </li>
        <li v-if="!messages.length">
            {{ $t('modules.support.empty') }}
        </li>
    </ul>
</template>

<script>
const moment = require('moment');
const config = require('../../../config');

moment.locale(window.I18n.locale);

export default {
    name: 'chat',
    props: {
        messages: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    data() {
        return {
            window,
            moment,
            config,
        };
    },
    methods: {
        getColor(username, self) {
            let hash = 0;
            for (let i = 0; i < username.length; i++) {
                hash = username.charCodeAt(i) + ((hash << 5) - hash);
            }
            if (self) {
                hash += 0x10eeef;
            } else {
                hash -= 0x10ef11;
            }
            hash = (hash & 0x00ffffff).toString(16).toUpperCase();
            return '00000'.substring(0, 6 - hash.length) + hash;
        },
        getRColor(color) {
            color = parseInt(color, 16);
            return Math.sqrt(
                (color & 0xff0000) ** 2 * 0.241 +
                    (color & 0xff00) ** 2 * 0.691 +
                    (color & 0xff) ** 2 * 0.068
            ) < 130
                ? 'fff'
                : '000';
        },
    },
};
</script>

<style scoped lang="sass">
body.dark
    .chat-body .header
        strong
            color: lightblue

.support-chat
    min-height: 10ch
    height: auto
    max-height: 70ch
    border: 1px solid black
    border-radius: 3px
    margin: 1rem 0
    padding: 1rem
    list-style: none
    overflow-y: scroll

    li
        margin-bottom: 10px
        padding-bottom: 5px
        border-bottom: 1px dotted #B3A9A9

        &:not([self])
            .chat-body
                margin-left: 60px

        &[self]
            .chat-body
                margin-right: 60px

        .chat-body p
            margin: 0

    .header .text-muted
        cursor: pointer

        .glyphicon
            margin-right: 5px
</style>
