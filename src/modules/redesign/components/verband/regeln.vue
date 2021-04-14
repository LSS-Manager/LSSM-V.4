<template>
    <div>
        <a
            v-if="rules.edit_text"
            class="btn btn-default pull-right"
            lightbox-open
            href="/veband/text/edit?close-after-submit"
        >
            <font-awesome-icon :icon="faEdit"></font-awesome-icon>
        </a>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <p v-for="(t, index) in rules.rules" :key="index" v-html="t"></p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RedesignSubComponent } from 'typings/modules/Redesign';
import { VerbandRegelnWindow } from '../../parsers/verband/regeln';

type Component = RedesignSubComponent<
    'rules',
    'verband/regeln',
    VerbandRegelnWindow,
    {
        faEdit: IconDefinition;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-regeln',
    data() {
        return {
            faEdit,
        };
    },
    props: {
        rules: {
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
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
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
        rules() {
            this.lightbox.finishLoading('verband/regeln-updated-data');
        },
    },
    mounted() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const Alliance = this;
        this.$store.dispatch('event/addListener', {
            name: 'redesign-edit-alliance-text-submitted',
            listener({ detail: { rules } }: CustomEvent) {
                if (Alliance.rules.meta.self)
                    Alliance.$set(Alliance.lightbox.data, 'rules', rules);
            },
        });
        this.lightbox.finishLoading('verband/regeln-mounted');
    },
});
</script>
