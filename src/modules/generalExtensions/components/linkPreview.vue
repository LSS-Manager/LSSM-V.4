<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <font-awesome-icon :icon="icon"></font-awesome-icon>
            <a :href="link" class="lightbox-open">
                {{ title }}
            </a>
            <br v-if="additional" />
            <small v-if="additional">
                {{ additional }}
            </small>
        </div>
        <div class="panel-body"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DefaultProps } from 'vue/types/options';
import {
    LinkPreviewMethods,
    LinkPreview,
    LinkPreviewComputed,
} from 'typings/modules/GeneralExtensions/LinkPreview';

export default Vue.extend<
    LinkPreview,
    LinkPreviewMethods,
    LinkPreviewComputed,
    DefaultProps
>({
    name: 'linkPreview',
    data() {
        return {
            icon: 'question-circle',
            type: '',
            id: 0,
            title: '',
            additional: '',
        } as LinkPreview;
    },
    computed: {
        iconClass() {
            return `fa-${this.icon}`;
        },
        link() {
            return `/${this.type}/${this.id}`;
        },
    },
    methods: {
        setIcon(icon) {
            if (!icon) icon = 'question-circle';
            this.icon = icon;
        },
        setType(type: string) {
            this.type = type;
        },
        setTitle(title: string) {
            this.title = title;
        },
        setId(id: number) {
            this.id = id;
        },
        setAdditional(additional: string) {
            this.additional = additional;
        },
    },
});
</script>

<style scoped lang="sass">
.panel-default
    position: fixed
    z-index: 2000

    .svg-inline--fa
        margin-right: 1rem
</style>
