<template>
    <div :class="[{ titleIsHidden, fullHeight }, ...extraClasses]">
        <div class="control-btn-container" :class="{ vertical: verticalBtns }">
            <span
                v-if="!noXBtn && !noModal"
                class="lightbox-close"
                @click="$modal.hide(name)"
                :title="$t('close')"
            >
                <font-awesome-icon :icon="faTimes"></font-awesome-icon>
            </span>
            <span
                v-if="!noFullscreen && !isFullScreen && !noModal"
                class="toggle-modal-fullscreen"
                @click="expand"
                :title="$t('fullscreen.expand')"
            >
                <font-awesome-icon :icon="faExpand"></font-awesome-icon>
            </span>
            <span
                v-if="!noFullscreen && isFullScreen && !noModal"
                class="toggle-modal-fullscreen"
                @click="compress"
                :title="$t('fullscreen.compress')"
            >
                <font-awesome-icon :icon="faCompress"></font-awesome-icon>
            </span>
            <span
                v-if="!noTitleHide"
                class="toggle-title"
                @click="titleIsHidden = !titleIsHidden"
                :title="$tc('hideTitle', +!titleIsHidden)"
            >
                <font-awesome-icon :icon="faChevronUp"></font-awesome-icon>
            </span>
            <slot name="control-buttons"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';

import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

const $el = ref<HTMLElement | null>(null);

const isFullScreen = ref<boolean>(false);
const isFullScreenBefore = ref<boolean>(false);

const titleIsHidden = ref<boolean>(false);

const props = withDefaults(
    defineProps<{
        name: string;
        noXBtn?: boolean;
        noFullscreen?: boolean;
        noTitleHide?: boolean;
        fullHeight?: boolean;
        extraClasses?: string[];
        noModal?: boolean;
        verticalBtns?: boolean;
    }>(),
    {
        noXBtn: false,
        noFullscreen: false,
        noTitleHide: false,
        fullHeight: false,
        extraClasses: () => [],
        noModal: false,
        verticalBtns: false,
    }
);

const getModal = () => $el.value?.closest<HTMLDivElement>('.vm--modal');

const expand = () => {
    if (props.noModal) return;

    isFullScreen.value = true;

    const modalElement = getModal();
    if (!modalElement) return;

    modalElement.classList.add('lssmv4-fullscreen-modal');

    isFullScreenBefore.value = window.fullScreen;
    if (!isFullScreenBefore.value) modalElement.requestFullscreen();
};

const compress = () => {
    if (props.noModal) return;

    isFullScreen.value = false;

    const modalElement = getModal();
    if (!modalElement) return;

    modalElement.classList.remove('lssmv4-fullscreen-modal');

    if (!isFullScreenBefore.value && window.fullScreen)
        document.exitFullscreen();
};

onMounted(() => {
    const currentEl = getCurrentInstance()?.proxy.$el;
    if (currentEl instanceof HTMLElement) $el.value = currentEl;
});
</script>

<style scoped lang="sass">
.control-btn-container
    display: flex
    justify-content: end
    width: auto
    position: absolute
    right: 1rem
    top: 1rem
    flex-direction: row-reverse

    &.vertical
        flex-flow: column

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

.titleIsHidden
    h1
        font-size: 0 !important
        margin: 0 !important
        opacity: 0 !important

    .toggle-title svg
        transform: rotate(180deg)

.fullHeight
    height: 100%
</style>

<style lang="sass">
.lssmv4-fullscreen-modal
    min-width: 100%
    min-height: 100%
    width: 100%
    height: 100%
    max-width: 100%
    max-height: 100%
    top: 0 !important
    left: 0 !important
</style>
