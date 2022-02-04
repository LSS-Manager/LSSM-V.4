<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
            <!-- collect all button -->
        </h1>
        <pre>{{ tasks }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<'tasks', 'tasks'>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-tasks',
    components: {},
    data() {
        return {};
    },
    methods: {},
    props: {
        tasks: {
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
        tasks() {
            this.lightbox.finishLoading('tasks-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('tasks-mounted');
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
