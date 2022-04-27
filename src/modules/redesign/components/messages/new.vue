<template>
    <div class="panel">
        <div class="panel-heading">
            <small>
                <a href="/messages">← {{ lightbox.$sm('back') }}</a>
            </small>
            <h1>
                {{ lightbox.$sm('title') }}
                <button
                    class="btn btn-success pull-right"
                    @click="sendMessage"
                    :disabled="
                        !receiver.value || !subject.value || !content.value
                    "
                >
                    {{ lightbox.$sm('send') }}
                    <font-awesome-icon :icon="faPaperPlane"></font-awesome-icon>
                </button>
            </h1>
        </div>
        <div class="panel-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label :for="receiver.id" class="col-sm-2 control-label">
                        {{ lightbox.$sm('receiver') }}
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            class="form-control"
                            :id="receiver.id"
                            :placeholder="lightbox.$sm('receiver')"
                            v-model="receiver.value"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label :for="subject.id" class="col-sm-2 control-label">
                        {{ lightbox.$sm('subject') }}
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            class="form-control"
                            :id="subject.id"
                            :placeholder="lightbox.$sm('subject')"
                            v-model="subject.value"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-2 control-label">
                        <label :for="content.id">
                            {{ lightbox.$sm('content') }}
                        </label>
                        <br />
                        <div class="btn-group" v-if="messageTemplates.enabled">
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
                    <div class="col-sm-10">
                        <textarea
                            class="form-control"
                            :id="content.id"
                            :placeholder="lightbox.$sm('content')"
                            rows="10"
                            v-model="content.value"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';

import type { ConversationMessageTemplate } from '../../../messageTemplates/main';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'message',
    'messages/new',
    Record<
        'content' | 'receiver' | 'subject',
        {
            id: string;
            value: string;
        }
    > & {
        faPaperPlane: IconDefinition;
        messageTemplates: {
            enabled: boolean;
            templates: ConversationMessageTemplate[];
        };
    },
    { sendMessage(): void; fillTemplates(event: MouseEvent): void }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-messages-new',
    data() {
        const id = (id: string) =>
            this.$store.getters.nodeAttribute(
                `redesign-messages-new_${id}`,
                true
            );
        const url = new URL(this.url, window.location.origin);
        return {
            faPaperPlane,
            content: {
                id: id('content'),
                value: '',
            },
            receiver: {
                id: id('receiver'),
                value: url.searchParams.get('target') ?? '',
            },
            subject: {
                id: id('subject'),
                value: url.searchParams.get('subject') ?? '',
            },
            messageTemplates: {
                enabled: false,
                templates: [],
            },
        };
    },
    methods: {
        sendMessage() {
            this.$set(this.lightbox, 'loading', true);
            const url = new URL(`/messages`, window.location.origin);
            url.searchParams.append('utf8', '✓');
            url.searchParams.append(
                'authenticity_token',
                this.message.authenticity_token
            );
            url.searchParams.append('message[recipients]', this.receiver.value);
            url.searchParams.append('message[subject]', this.subject.value);
            url.searchParams.append('message[body]', this.content.value);
            this.$store
                .dispatch('api/request', {
                    url: `/messages`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `/messages/new`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: 'redesign-messages-new',
                })
                .then(({ url }: Response) =>
                    this.$set(this.lightbox, 'src', url)
                );
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
                            await this.$store.dispatch('settings/getSetting', {
                                moduleId: 'messageTemplates',
                                settingId: 'templates',
                                defaultValue: [],
                            })
                        ).value,
                        dropdown,
                        { username: this.receiver.value },
                        (subject, content) => {
                            this.subject.value = subject;
                            this.content.value = content;
                        }
                    )
                );
            }
        },
    },
    computed: {},
    props: {
        message: {
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
        message() {
            this.lightbox.finishLoading('message-new-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('message-new-mounted');

        this.$store
            .dispatch('storage/get', {
                key: 'activeModules',
                defaultValue: [],
            })
            .then((activeModules: string[]) => {
                this.messageTemplates.enabled =
                    activeModules.includes('messageTemplates');
                if (!this.messageTemplates.enabled) return;
                const preselected = parseInt(
                    new URL(this.url, window.location.origin).searchParams.get(
                        'template'
                    ) ?? '-1'
                );
                if (preselected < 0) return;
                this.$store
                    .dispatch('settings/getSetting', {
                        moduleId: 'messageTemplates',
                        settingId: 'templates',
                        defaultValue: [],
                    })
                    .then(
                        ({
                            value: templates,
                        }: {
                            value: ConversationMessageTemplate[];
                        }) => {
                            this.subject.value = templates[preselected].subject;
                            import(
                                /*webpackChunkName: "modules/messageTemplates/conversations/modifyMessage"*/ '../../../messageTemplates/assets/conversations/modifyMessage'
                            ).then(
                                async ({ default: modifyMessage }) =>
                                    (this.content.value = modifyMessage(
                                        templates[preselected].template,
                                        {
                                            username: this.receiver.value,
                                        }
                                    ))
                            );
                        }
                    );
            });
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
