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
            :disabled="!noteEdit"
            class="input-group form-control note-message text optional"
            id="note_message"
            v-model="noteText"
            rows="15"
        ></textarea>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'note',
    'note',
    {
        faEdit: IconDefinition;
        faSave: IconDefinition;
        noteEdit: boolean;
        noteText: string;
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
            this.$store.dispatch('api/request', {
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
            });
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
    computed: {},
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
body.dark .form-control[disabled]
  background-color: #323232 !important
.form-control[disabled]
  background-color: inherit
</style>
