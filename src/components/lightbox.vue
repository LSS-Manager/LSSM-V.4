<template>
    <div :class="{ titleHidden }">
        <div class="controlbtn-container">
            <span
                v-if="!noXBtn"
                class="lightbox-close"
                @click="$modal.hide(name)"
                :title="$t('close')"
            >
                <font-awesome-icon :icon="faTimes"></font-awesome-icon>
            </span>
            <span
                v-if="!noFullscreen && !fullscreen"
                class="toggle-modal-fullscreen"
                @click="expand"
                :title="$t('fullscreen.expand')"
            >
                <font-awesome-icon :icon="faExpand"></font-awesome-icon>
            </span>
            <span
                v-if="!noFullscreen && fullscreen"
                class="toggle-modal-fullscreen"
                @click="compress"
                :title="$t('fullscreen.compress')"
            >
                <font-awesome-icon :icon="faCompress"></font-awesome-icon>
            </span>
            <span
                v-if="!noTitleHide"
                class="toggle-title"
                @click="titleHidden = !titleHidden"
                :title="$tc('hideTitle', !titleHidden)"
            >
                <font-awesome-icon :icon="faChevronUp"></font-awesome-icon>
            </span>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { ExtendedWindow } from '../../typings/helpers';

export default Vue.extend({
    name: 'lightbox',
    data() {
        return {
            fullscreen: false,
            fullscreenBefore: ((window as unknown) as ExtendedWindow)
                .fullScreen,
            origWidth: this.$parent.$parent.modal.width,
            origHeight: this.$parent.$parent.modal.height,
            titleHidden: false,
            faTimes,
            faExpand,
            faCompress,
            faChevronUp,
        };
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        noXBtn: {
            type: Boolean,
            required: false,
            default: false,
        },
        noFullscreen: {
            type: Boolean,
            required: false,
            default: false,
        },
        noTitleHide: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        expand() {
            this.fullscreen = true;
            this.$parent.$parent.modal.width = 100;
            this.$parent.$parent.modal.height = 100;
            if (!((window as unknown) as ExtendedWindow).fullScreen)
                this.$parent.$parent.$el.requestFullscreen();
        },
        compress() {
            this.fullscreen = false;
            this.$parent.$parent.modal.width = this.origWidth;
            this.$parent.$parent.modal.height = this.origHeight;
            if (
                !this.fullscreenBefore &&
                ((window as unknown) as ExtendedWindow).fullScreen
            )
                document.exitFullscreen();
        },
    },
});
</script>

<style scoped lang="sass">
.controlbtn-container
    display: flex
    justify-content: end
    width: calc(3 * 34px)
    position: absolute
    right: 1rem
    top: 1rem
    flex-direction: row-reverse

    > span
        cursor: pointer
        width: 32px
        height: 32px
        display: flex
        align-items: center
        justify-content: center

        svg
            transition: transform 1s
h1
    transition: font-size 1s, margin 1s, opacity 1s

.titleHidden
    h1
        font-size: 0 !important
        margin: 0 !important
        opacity: 0 !important

    .toggle-title svg
        transform: rotate(180deg)
</style>
