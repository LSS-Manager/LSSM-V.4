<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <small>
                <a href="/messages">← {{ lightbox.$sm('back') }}</a>
            </small>
            <h1>
                {{ conversation.subject }}
                <button
                    class="btn btn-danger btn-xs pull-right"
                    @click="deleteMessage"
                >
                    {{ lightbox.$sm('delete') }}
                    <font-awesome-icon :icon="faTrashCan"></font-awesome-icon>
                </button>
            </h1>
            <p v-if="other">
                {{
                    lightbox.$sm(
                        other.isAlliance ? 'subtitleAlliance' : 'subtitle'
                    )
                }}
                <b>
                    <a
                        :href="`/${
                            other.isAlliance ? 'alliances' : 'profile'
                        }/${other.id}`"
                        lightbox-open
                    >
                        {{ other.name }}
                    </a>
                </b>
            </p>
        </div>
        <div class="panel-body">
            <div
                class="message message-self response-message"
                v-if="!other || (other && !other.isAlliance)"
            >
                <div class="message-meta well">
                    <button
                        class="btn btn-success response-send"
                        :disabled="!response.length"
                        @click="sendMessage"
                    >
                        <font-awesome-icon
                            :icon="faPaperPlane"
                        ></font-awesome-icon>
                    </button>
                </div>
                <div class="message-content well">
                    <div
                        class="template-btn-holder"
                        v-if="messageTemplates.enabled"
                    >
                        <div class="btn-group">
                            <button
                                class="btn btn-default dropdown-toggle"
                                data-toggle="dropdown"
                                @click.once="fillTemplates"
                            >
                                {{ $t('modules.messageTemplates.name') }}
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu"></ul>
                        </div>
                    </div>
                    <textarea
                        class="form-control response-input"
                        :rows="Math.min(response.split(/\n/).length + 1, 20)"
                        v-model="response"
                    ></textarea>
                </div>
                <div class="message-meta well other-side">
                    <img
                        v-if="other && other.avatar && !other.isAlliance"
                        class="profile-avatar"
                        :src="other.avatar"
                        alt=""
                    />
                </div>
            </div>

            <div class="load-btn top" v-if="loadedPages.first !== 1">
                <button class="btn btn-success" @click="loadPage('prev')">
                    {{ lightbox.$sm('load.prev') }}
                </button>
            </div>

            <template v-for="(message, index) in conversation.messages">
                <div
                    class="message"
                    :class="{ 'message-self': message.sender.id === userid }"
                    :key="index"
                >
                    <div class="message-meta well">
                        <img
                            v-if="
                                message.sender.avatar &&
                                !message.sender.isAlliance
                            "
                            class="profile-avatar"
                            :src="message.sender.avatar"
                            alt=""
                        />
                    </div>
                    <div class="message-content well">
                        <strong>
                            <img
                                v-if="!message.sender.isAlliance"
                                :src="`/images/user_${
                                    message.sender.online ? 'green' : 'gray'
                                }.png`"
                                alt=""
                            />
                            <a
                                :href="`/${
                                    message.sender.isAlliance
                                        ? 'alliances'
                                        : 'profile'
                                }/${message.sender.id}`"
                                lightbox-open
                            >
                                {{ message.sender.name }}
                            </a>
                        </strong>
                        <div v-html="message.content"></div>
                        <small v-if="message.timestamp">
                            {{ moment(message.timestamp).format('LLL') }}
                        </small>
                        <small v-else>
                            {{ moment().format('LLL') }}
                        </small>
                    </div>
                    <div class="message-meta well other-side">
                        <img
                            v-if="
                                other &&
                                other.avatar &&
                                message.sender.id === userid &&
                                !message.sender.isAlliance
                            "
                            class="profile-avatar"
                            :src="other.avatar"
                            alt=""
                        />
                        <img
                            v-else-if="
                                self &&
                                self.avatar &&
                                message.sender.id !== userid &&
                                !message.sender.isAlliance
                            "
                            class="profile-avatar"
                            :src="self.avatar"
                            alt=""
                        />
                    </div>
                </div>
            </template>

            <div
                class="load-btn"
                v-if="loadedPages.last !== conversation.lastPage"
            >
                <button class="btn btn-success" @click="loadPage('next')">
                    {{ lightbox.$sm('load.next') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import moment from 'moment';
import { useSettingsStore } from '@stores/settings';

import type { ConversationMessageTemplate } from '../../../messageTemplates/main';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'conversation',
    'messages/conversation',
    {
        faPaperPlane: IconDefinition;
        faTrashCan: IconDefinition;
        moment: typeof moment;
        userid: number;
        response: string;
        loadedPages: {
            first: number;
            last: number;
        };
        messageTemplates: {
            enabled: boolean;
            templates: ConversationMessageTemplate[];
        };
        settingsStore: ReturnType<typeof useSettingsStore>;
    },
    {
        loadPage(mode: 'next' | 'prev'): void;
        sendMessage(): void;
        deleteMessage(): void;
        fillTemplates(event: MouseEvent): void;
    },
    {
        page: number;
        other:
            | {
                  avatar: string;
                  id: number;
                  name: string;
                  isAlliance: boolean;
              }
            | undefined;
        self:
            | {
                  avatar: string;
                  id: number;
                  name: string;
                  isAlliance: boolean;
              }
            | undefined;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-messages-conversation',
    data() {
        moment.locale(this.lightbox.rootStore.locale);
        return {
            faPaperPlane,
            faTrashCan,
            moment,
            userid: window.user_id,
            response: '',
            loadedPages: {
                first: 0,
                last: 0,
            },
            messageTemplates: {
                enabled: false,
                templates: [],
            },
            settingsStore: useSettingsStore(),
        };
    },
    methods: {
        loadPage(mode) {
            this.$set(this.lightbox, 'loading', true);
            let newPage = this.page;
            if (mode === 'next') {
                this.loadedPages.last++;
                newPage = this.loadedPages.last;
            } else {
                this.loadedPages.first--;
                newPage = this.loadedPages.first;
            }
            const url = new URL(
                `/messages/${this.conversation.id}`,
                window.location.origin
            );
            url.searchParams.set('page', newPage.toString());
            this.lightbox.apiStore
                .request({
                    url,
                    feature: `redesign-conversation-load-${mode}-${newPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/messages/conversation').then(
                        async parser => {
                            const result = await parser.default({
                                doc: new DOMParser().parseFromString(
                                    html,
                                    'text/html'
                                ),
                                href: url.toString(),
                                getIdFromEl: this.lightbox.getIdFromEl,
                                LSSM: this.lightbox,
                                $m: this.lightbox.$m,
                                $sm: this.lightbox.$sm,
                                $mc: this.lightbox.$mc,
                                $smc: this.lightbox.$smc,
                            });
                            this.$set(
                                this.lightbox.data,
                                'lastPage',
                                result.lastPage
                            );
                            this.$set(
                                this.lightbox.data,
                                'messages',
                                mode === 'next'
                                    ? [
                                          ...this.lightbox.data.messages,
                                          ...result.messages,
                                      ]
                                    : [
                                          ...result.messages,
                                          ...this.lightbox.data.messages,
                                      ]
                            );
                            this.lightbox.finishLoading(
                                `conversation-load${mode}`
                            );
                        }
                    );
                });
        },
        sendMessage() {
            this.$set(this.lightbox, 'loading', true);
            const url = new URL(`/messages`, window.location.origin);
            url.searchParams.append('utf8', '✓');
            url.searchParams.append(
                'authenticity_token',
                this.conversation.authenticity_token
            );
            url.searchParams.append(
                'message[conversation_id]',
                this.conversation.id.toString()
            );
            url.searchParams.append('message[body]', this.response);
            this.lightbox.apiStore
                .request({
                    url: `/messages`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `/messages/${this.conversation.id}`,
                            window.location.origin
                        ).toString(),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: 'redesign-messages-conversation-respond',
                })
                .then(() => {
                    this.$set(this.lightbox.data, 'messages', [
                        {
                            sender: {
                                avatar: this.self?.avatar,
                                online: true,
                                id: this.userid,
                                name: window.username,
                            },
                            timestamp: '',
                            content: this.response.replace(/\n/gu, '<br>'),
                        },
                        ...this.lightbox.data.messages,
                    ]);
                    this.response = '';
                    this.lightbox.finishLoading(`conversation-send_message`);
                });
        },
        deleteMessage() {
            this.$set(this.lightbox, 'loading', true);
            const url = new URL(`/messages/trash`, window.location.origin);
            url.searchParams.append('utf8', '✓');
            url.searchParams.append(
                'authenticity_token',
                this.conversation.authenticity_token
            );
            url.searchParams.append('_method', 'delete');
            url.searchParams.append('current_box', 'inbox');
            url.searchParams.append(
                'conversations[]',
                this.conversation.id.toString()
            );
            this.lightbox.apiStore
                .request({
                    url: `/messages/trash`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `/messages`,
                            window.location.origin
                        ).toString(),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: 'redesign-messages-conversation-delete',
                })
                .then(({ url }: Response) => {
                    this.$set(this.lightbox, 'src', url);
                });
        },
        fillTemplates(e) {
            if (!(e.target instanceof HTMLElement)) return;
            const dropdown = e.target
                .closest('.btn-group')
                ?.querySelector<HTMLUListElement>('.dropdown-menu');
            if (dropdown) {
                import(
                    /*webpackChunkName: "modules/messageTemplates/conversations/fillDropdown"*/ '../../../messageTemplates/assets/conversations/fillDropdown'
                ).then(async ({ default: fillDropdown }) =>
                    fillDropdown(
                        (
                            await this.settingsStore.getSetting<{
                                value: ConversationMessageTemplate[];
                                enabled: boolean;
                            }>({
                                moduleId: 'messageTemplates',
                                settingId: 'templates',
                                defaultValue: { value: [], enabled: true },
                            })
                        ).value,
                        dropdown,
                        { username: this.other?.name },
                        (subject, content) => {
                            this.response = content;
                        }
                    )
                );
            }
        },
    },
    computed: {
        page() {
            return parseInt(
                new URL(this.url, window.location.origin).searchParams.get(
                    'page'
                ) ?? '1'
            );
        },
        other() {
            return this.conversation.messages.find(
                ({ sender }) => sender.id !== this.userid
            )?.sender;
        },
        self() {
            return this.conversation.messages.find(
                ({ sender }) => sender.id === this.userid
            )?.sender;
        },
    },
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
        this.loadedPages.first = this.page;
        this.loadedPages.last = this.page;
        this.lightbox.finishLoading('conversation-mounted');

        this.lightbox.storageStore
            .get<string[]>({
                key: 'activeModules',
                defaultValue: [],
            })
            .then(activeModules => {
                this.messageTemplates.enabled =
                    activeModules.includes('messageTemplates');
                if (!this.messageTemplates.enabled) return;
                const preselected = parseInt(
                    new URL(this.url, window.location.origin).searchParams.get(
                        'template'
                    ) ?? '-1'
                );
                if (preselected < 0) return;
                this.settingsStore
                    .getSetting<{
                        value: ConversationMessageTemplate[];
                        enabled: boolean;
                    }>({
                        moduleId: 'messageTemplates',
                        settingId: 'templates',
                        defaultValue: { value: [], enabled: true },
                    })
                    .then(({ value: templates }) =>
                        import(
                            /*webpackChunkName: "modules/messageTemplates/conversations/modifyMessage"*/ '../../../messageTemplates/assets/conversations/modifyMessage'
                        ).then(
                            async ({ default: modifyMessage }) =>
                                (this.response = modifyMessage(
                                    templates[preselected].template,
                                    {
                                        username: this.other?.name,
                                    }
                                ))
                        )
                    );
            });
    },
});
</script>

<style scoped lang="sass">
@use "sass:math"

$border-radius: 2em

h1
    margin-top: 10px

.load-btn
    text-align: center

    &.top
        margin-bottom: 15px

.template-btn-holder
    display: flex
    height: 0
    justify-content: flex-end

    .dropdown-toggle
        transform: translate(-10px, -50%)
        border-radius: math.div($border-radius, 2)

    .dropdown-menu
        transform: translate(-10px, 17px)
        border-bottom-left-radius: math.div($border-radius, 2)
        border-bottom-right-radius: math.div($border-radius, 2)

    .open
        .dropdown-toggle
            border-bottom-left-radius: 4px
            border-bottom-right-radius: 4px

body.dark
    .message
        .well
            background-image: linear-gradient(to bottom, #171717 0, #555 100%)

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

        &.other-side
            visibility: hidden

            .profile-avatar
                visibility: collapse

    .message-content
        width: 100%

        .response-input
            width: 100%
            resize: vertical

    &.response-message
        .message-meta.other-side
            height: 0

    &.message-self
        flex-direction: row-reverse

        .message-meta
            border-left: 0
            border-top-right-radius: math.div($border-radius, 2)
            border-bottom-right-radius: math.div($border-radius, 2)

        .message-content
            border-right: 0
            margin-right: 5px
            border-top-left-radius: $border-radius
            border-bottom-left-radius: $border-radius

    &:not(.message-self)
        .message-meta
            border-right: 0
            border-top-left-radius: math.div($border-radius, 2)
            border-bottom-left-radius: math.div($border-radius, 2)

        .message-content
            border-left: 0
            margin-left: 5px
            border-top-right-radius: $border-radius
            border-bottom-right-radius: $border-radius
</style>
