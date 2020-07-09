<template>
    <ul class="support-chat">
        <li
            class="clearfix"
            v-for="(message, index) in messages"
            :key="index"
            :self="(message.self = message.author.name === window.username)"
            :color="(message.color = getColorFromString(message.author.name))"
        >
            <span
                class="chat-img"
                :class="message.self ? 'pull-right' : 'pull-left'"
            >
                <img
                    :src="`https://placehold.it/50/${
                        message.color
                    }/${getTextColor(
                        message.color
                    )}?text=${message.author.name.split('')[0].toUpperCase()}`"
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
