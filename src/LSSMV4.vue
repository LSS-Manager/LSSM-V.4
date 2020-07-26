<template>
    <div :id="id">
        <modals-container />
        <v-dialog></v-dialog>
        <notifications
            v-for="group in notificationGroups"
            :key="group"
            :group="group.replace(' ', '_')"
            :position="group"
            :class="group"
        >
            <template slot="body" slot-scope="props">
                <div
                    class="lssm-notification"
                    :class="
                        `alert-${props.item.type} notification-${props.item.type}`
                    "
                    @click="props.close"
                >
                    <div
                        class="notification-title"
                        v-html="props.item.title"
                    ></div>
                    <div class="notification-content">
                        <pre>{{ props.item }}</pre>
                    </div>
                </div>
            </template>
        </notifications>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { LSSMV4Data, LSSMV4Computed } from '../typings/LSSMV4';
import { DefaultMethods, DefaultProps } from 'vue/types/options';

export default Vue.extend<
    LSSMV4Data,
    DefaultMethods<Vue>,
    LSSMV4Computed,
    DefaultProps
>({
    name: 'LSSMV4',
    components: {},
    data() {
        return {
            id: this.$store.getters.nodeAttribute('app'),
        };
    },
    computed: {
        notificationGroups() {
            return this.$store.state.notifications.groups;
        },
    },
});
</script>

<style lang="sass">
@import "~vue-select/src/scss/vue-select.scss"

body.dark
    .vm--modal
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

    .leaflet-tooltip
        background-color: #505050
        color: #ddd
        border: #505050

        &.leaflet-tooltip-left::before
            border-left-color: #505050

        &.leaflet-tooltip-right::before
            border-right-color: #505050
.vm--container
    z-index: 5001 !important

    .vm--overlay[data-modal="dialog"]
        background-color: rgba(0, 0, 0, 0.7)
        pointer-events: none

    .vm--modal
        padding: 1rem
        overflow: auto !important
        max-height: 100vh !important

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

.lssm_overlay
    position: fixed
    top: 1rem
    left: 1rem
    z-index: 10006
    padding: 10px

[draggable]
    user-select: none
    cursor: pointer

    &:hover
        text-decoration: none

.vue-notification-group
    transform: scale(1.5)
    padding: 1em
    z-index: 10006 !important

    &.bottom
        bottom: 1em !important

        &.center .lssm-notification
            border-top: 5px solid !important

    &.top
        top: 1em !important

        &.center .lssm-notification
            border-bottom: 5px solid !important

    &.right
        right: 4em !important
        .lssm-notification
            border-left: 5px solid !important

    &.left
        left: 4em !important
        .lssm-notification
            border-right: 5px solid !important

    .lssm-notification
        font-size: 12px
        padding: 10px
        margin: 0 5px 5px
        border-width: 0

        &.notification-danger
            border-color: #ce4844 !important

        &.notification-warning
            border-color: #aa6708 !important

        &.notification-info
            border-color: #1b809e !important

        &.notification-success
            border-color: #2b542c !important
</style>
