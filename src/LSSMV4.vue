<template>
    <div :id="id">
        <!--        <modals-container />-->
        <!--        <v-dialog></v-dialog>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Store } from 'vuex';

declare module 'vue/types/vue' {
    interface Vue {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $store: Store<any>;
    }
}

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

.lssm_notice_bg
    background-color: #77dc81
</style>
