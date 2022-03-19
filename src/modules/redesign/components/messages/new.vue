<template>
    <div class="panel">
        <div class="panel-heading">
            <small>
                <a href="/messages">← {{ lightbox.$sm('back') }}</a>
            </small>
            <h1>
                {{ lightbox.$sm('title') }}
                <button class="btn btn-success pull-right" @click="sendMessage">
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
                    <label :for="content.id" class="col-sm-2 control-label">
                        {{ lightbox.$sm('content') }}
                    </label>
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
    },
    { sendMessage(): void }
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
        return {
            faPaperPlane,
            content: {
                id: id('content'),
                value: '',
            },
            receiver: {
                id: id('receiver'),
                value: '',
            },
            subject: {
                id: id('subject'),
                value: '',
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
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
