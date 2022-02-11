<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
            <a class="btn btn-default" @click="toggleEdit">
                <font-awesome-icon
                    :icon="noteEdit ? faSave : faEdit"
                ></font-awesome-icon>
            </a>
        </h1>
        <textarea
            v-show="noteEdit"
            class="input-group form-control text optional"
            :id="noteId"
            v-model="noteText"
            rows="15"
        ></textarea>
        <pre
            v-show="!noteEdit"
            class="input-group form-control"
            :id="previewId"
            >{{ noteText }}</pre
        >
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'note',
    'note',
    {
        faEdit: IconDefinition;
        faSave: IconDefinition;
        noteEdit: boolean;
        noteText: string;
        noteId: string;
        previewId: string;
    },
    {
        saveNote(): void;
        toggleEdit(): void;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-note',
    components: {},
    data() {
        return {
            faEdit,
            faSave,
            noteEdit: false,
            noteText: this.note.note,
            noteId: this.$store.getters.nodeAttribute(
                'redesign-note-message',
                true
            ),
            previewId: this.$store.getters.nodeAttribute(
                'redesign-note-message_preview',
                true
            ),
        };
    },
    methods: {
        saveNote() {
            const url = new URL(`/note`, window.location.origin);
            url.searchParams.append('utf8', '✓');
            url.searchParams.append('_method', 'put');
            url.searchParams.append(
                'authenticity_token',
                this.note.authenticity_token
            );
            url.searchParams.append('note[message]', this.noteText);
            this.$store
                .dispatch('api/request', {
                    url: `/note`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(`/note`, window.location.origin),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: 'redesign-note',
                })
                .then(() =>
                    this.$store
                        .dispatch('event/createEvent', {
                            name: 'redesign-note-saved',
                            detail: {
                                content: this.noteText,
                                previewId: this.previewId,
                            },
                        })
                        .then(event =>
                            this.$store.dispatch('event/dispatchEvent', event)
                        )
                );
        },
        toggleEdit() {
            if (this.noteEdit) {
                this.saveNote();
                this.noteEdit = false;
            } else {
                this.noteEdit = true;
            }
        },
    },
    props: {
        note: {
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
        note() {
            this.lightbox.finishLoading('note-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('note-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical

.form-control[disabled]
    background-color: inherit

body.dark .form-control[disabled]
    background-color: #323232

pre
    white-space: pre-wrap
    overflow-wrap: break-word
</style>
