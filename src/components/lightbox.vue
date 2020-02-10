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
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'lightbox',
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
    },
};
</script>

<style scoped lang="sass">
#lightbox_close
    position: absolute
    top: 1rem
    right: 1rem
</style>
