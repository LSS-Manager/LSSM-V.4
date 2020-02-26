<template>
    <div>
        <button
            v-if="!noXBtn"
            type="button"
            class="close"
            id="lightbox_close"
            aria-label="Close"
            @click="$modal.hide(name)"
        >
            <span aria-hidden="true">×</span>
        </button>
        <span
            v-show="!noFullscreen && !fullscreen"
            class="pull-right toggle-modal-fullscreen"
            @click="expand"
        >
            <i class="fas fa-expand"></i>
        </span>
        <span
            v-show="!noFullscreen && fullscreen"
            class="pull-right toggle-modal-fullscreen"
            @click="compress"
        >
            <i class="fas fa-compress"></i>
        </span>
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
#lightbox_close
    position: absolute
    top: 1rem
    right: 1rem
.toggle-modal-fullscreen
    cursor: pointer
    position: absolute
    top: 1rem
    right: calc(1rem + 32px)
    width: 32px
    height: 32px
    text-align: center

    svg
        vertical-align: unset
        transform: translate(0, 50%)
</style>
