<template>
    <lightbox name="support" no-fullscreen>
        <h1>{{ $t('modules.support.name') }}</h1>
        <small v-html="$t('modules.support.note')"></small>
        <ul :id="$store.getters.nodeId('support-history')" class="support-chat">
            <li
                class="clearfix"
                v-for="(message, index) in messages"
                :key="index"
                :self="(message.self = message.user === window.username)"
                :color="(message.color = getColor(message.user, message.self))"
            >
                <span
                    class="chat-img"
                    :class="message.self ? 'pull-right' : 'pull-left'"
                >
                    <img
                        :src="
                            `https://placehold.it/50/${
                                message.color
                            }/${getRColor(
                                message.color
                            )}?text=${message.user.split('')[0].toUpperCase()}`
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
                            :title="moment(message.time).format('LLLL:ss')"
                        >
                            <span class="glyphicon glyphicon-time"></span>
                            {{ moment(message.time).fromNow() }}
                        </small>
                        <strong
                            class="primary-font"
                            :class="{ 'pull-right': message.self }"
                            >{{ message.user }}</strong
                        >
                        <small
                            class="text-muted pull-right"
                            v-if="!message.self"
                            :title="moment(message.time).format('LLLL:ss')"
                        >
                            <span class="glyphicon glyphicon-time"></span>
                            {{ moment(message.time).fromNow() }}
                        </small>
                    </div>
                    <p :class="{ 'pull-right': message.self }">
                        {{ message.content }}
                    </p>
                </div>
            </li>
        </ul>
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
        <div class="loading" v-show="loading">
            <i class="fa fa-sync fa-spin fa-3x fa-fw"></i>
        </div>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';
const moment = require('moment');

moment.locale(window.I18n.locale);

export default {
    name: 'support',
    components: { Lightbox },
    data() {
        return {
            loading: false,
            window,
            moment,
            messages: [
                {
                    user: 'Sanni-Hameln',
                    content: 'Grüezi, wie kann ich dir helfen?',
                    time: 1585346399830,
                },
                {
                    user: 'LSSM-Tester',
                    content: 'Hallöle, i hab dahanne a mol ne Frag: lel',
                    time: 0,
                },
                {
                    user: 'jxn_30',
                    content: 'Hajo, des isch subber!',
                    time: new Date().getTime(),
                },
                {
                    user: 'LSSM-Tester2',
                    content:
                        'Ich gehöre nicht hier rein, aber das ist egal, weil das alles hier erstmal statisch zusammengebebbt ist!',
                    time: 1385346399830,
                },
                {
                    user: 'CSA-Verweigerer',
                    content: 'Oh, das ist ja cool! Herzlich Willkommen!',
                    time: 1885386399830,
                },
                {
                    user: 'LSSM-Tester',
                    content: 'So, dann noch ne unnötige Nachricht 😋',
                    time: 4885386399830,
                },
                {
                    user: 'jxn_30',
                    content:
                        'Irgendwie scheinen hier Zeitreisen normal zu sein?...',
                    time: new Date().getTime() * -1,
                },
                {
                    user:
                        'Irgend ein random Username ohne sonstige Bedeutung!!elf!!',
                    content:
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ',
                    time: 1335363998530,
                },
            ],
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

    .glyphicon
        margin-right: 5px

.loading
    display: flex
    justify-content: center
    position: absolute
    height: 100%
    width: 100%
    top: 0
    left: 0
    background: #f5f5f5d6
    align-items: center

input
    height: 34px
</style>
