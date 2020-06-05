<template>
    <div :id="id">
        <!--        <modals-container />-->
        <!--        <v-dialog></v-dialog>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'LSSMV4',
    components: {},
    data() {
        return {
            id: this.$store.getters.nodeAttribute('app'),
        };
    },
});
</script>

<style lang="sass">
@import "~vue-select/src/scss/vue-select.scss"

body.dark
    .v--modal-box
        background-color: #505050
        color: white

    .v-select
        .vs__dropdown-toggle
            border-color: dimgrey

            .vs__selected
                color: white
                background-color: #505050

        .vs__dropdown-menu
            color: white
            background-color: #505050

            .vs__dropdown-option
                color: white

    .text-muted
        color: darkgray

    ._vue-flash-msg-body ._vue-flash-msg-body__icon
        background-color: #505050

    pre
        color: #f5f5f5
        background: #333

.v--modal-overlay
    z-index: 5001 !important

    .v--modal-background-click
        background-color: rgba(0, 0, 0, 0.7)

        .v--modal-box
            padding: 1rem
            overflow: auto !important

.vue-tablist
    list-style: none
    display: flex
    padding-left: 0
    border-bottom: 1px solid #e2e2e2


    .vue-tab
        padding: 5px 10px
        cursor: pointer
        user-select: none
        border: 1px solid transparent
        border-bottom-color: #e2e2e2
        border-radius: 3px 3px 0 0
        position: relative
        bottom: -1px
        font-weight: bold
        font-size: 120%


        &[aria-selected='true']
            border-color: #e2e2e2
            border-bottom-color: transparent


        &[aria-disabled='true']
            cursor: not-allowed
            color: #999

.lssm_notice_bg
    background-color: #77dc81
</style>
