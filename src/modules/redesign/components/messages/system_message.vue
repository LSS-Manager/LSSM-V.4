<template>
    <div class="panel">
        <div class="panel-heading">
            <small>
                <a href="/messages">← {{ lightbox.$sm('back') }}</a>
            </small>
            <h1>
                {{ message.title }}
                <button
                    class="btn btn-danger pull-right"
                    @click="deleteMessage"
                >
                    {{ lightbox.$sm('delete') }}
                    <font-awesome-icon :icon="faTrashCan"></font-awesome-icon>
                </button>
            </h1>
        </div>
        <div class="panel-body" v-html="message.content"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'message',
    'messages/system_message',
    {
        faTrashCan: IconDefinition;
    },
    { deleteMessage(): void },
    { id: string }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-messages-system_messages',
    data() {
        return {
            faTrashCan,
        };
    },
    methods: {
        deleteMessage() {
            this.$set(this.lightbox, 'loading', true);
            const url = new URL(
                `/messages/system_message/${this.id}`,
                window.location.origin
            );
            url.searchParams.append(
                'authenticity_token',
                this.message.authenticity_token
            );
            url.searchParams.append('_method', 'post');
            this.$store
                .dispatch('api/request', {
                    url: `/messages/system_message/${this.id}/remove`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `/messages/system_message/${this.id}`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: 'redesign-messages-system_messages-delete',
                })
                .then(({ url }: Response) => {
                    if (
                        !new URL(
                            this.url,
                            window.location.origin
                        ).searchParams.has('close-after-submit') ||
                        this.lightbox.noModal
                    )
                        return this.$set(this.lightbox, 'src', url);

                    this.$store
                        .dispatch('event/createEvent', {
                            name: 'redesign-messages-system_message-delete',
                            detail: {
                                id: this.id,
                            },
                        })
                        .then(event =>
                            this.$store.dispatch('event/dispatchEvent', event)
                        );
                    window.lightboxClose(this.lightbox.creation);
                });
        },
    },
    computed: {
        id() {
            return new URL(this.url, window.location.origin).pathname.split(
                '/'
            )[3];
        },
    },
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
            this.lightbox.finishLoading('message-system_message-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('message-system_message-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
