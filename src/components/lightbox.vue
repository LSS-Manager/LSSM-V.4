<template>
    <div :class="{ titleHidden }">
        <div class="controlbtn-container">
            <span
                v-if="!noXBtn"
                class="lightbox-close"
                @click="$modal.hide(name)"
            >
                <i class="fas fa-times"></i>
            </span>
            <span
                v-if="!noFullscreen && !fullscreen"
                class="toggle-modal-fullscreen"
                @click="expand"
            >
                <i class="fas fa-expand"></i>
            </span>
            <span
                v-if="!noFullscreen && fullscreen"
                class="toggle-modal-fullscreen"
                @click="compress"
            >
                <i class="fas fa-compress"></i>
            </span>
            <span
                v-if="!noTitleHide"
                class="toggle-title"
                @click="titleHidden = !titleHidden"
            >
                <i class="fas fa-chevron-up"></i>
            </span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'lightbox',
    data() {
        return {
            fullscreen: false,
            fullscreenBefore: !!window.fullScreen,
            origWidth: this.$parent.$parent.modal.width,
            origHeight: this.$parent.$parent.modal.height,
            titleHidden: false,
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
            if (!window.fullScreen)
                this.$parent.$parent.$el.requestFullscreen();
        },
        compress() {
            this.fullscreen = false;
            this.$parent.$parent.modal.width = this.origWidth;
            this.$parent.$parent.modal.height = this.origHeight;
            if (!this.fullscreenBefore && window.fullScreen)
                document.exitFullscreen();
        },
    },
};
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
