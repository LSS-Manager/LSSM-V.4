<template>
    <div :id="id">
        <v-dialog></v-dialog>
        <notifications
            v-for="group in notificationGroups"
            :key="group"
            :group="group.replace(' ', '_')"
            :position="group"
            :class="group.replace('_', ' ')"
        >
            <template slot="body" slot-scope="props">
                <div
                    class="lssm-notification"
                    :class="`alert-${props.item.type} notification-${props.item.type}`"
                    @click.capture="getHandler(props, $event)()"
                >
                    <img
                        v-if="props.item.data.icon"
                        :src="props.item.data.icon"
                        :alt="props.item.title"
                    />
                    <div v-else></div>
                    <div>
                        <button
                            class="close"
                            data-dismiss="alert"
                            type="button"
                            @click.prevent.stop="props.close()"
                        >
                            ×
                        </button>
                        <div
                            class="notification-title"
                            v-html="props.item.title"
                        ></div>
                        <div
                            class="notification-content"
                            v-html="props.item.text"
                        ></div>
                    </div>
                </div>
            </template>
        </notifications>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import type { DefaultMethods, DefaultProps } from 'vue/types/options';
import type { LSSMV4Computed, LSSMV4Data } from 'typings/LSSMV4';

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
            id: this.$store.getters.nodeAttribute('app', true),
            faTimes,
        };
    },
    computed: {
        notificationGroups() {
            return this.$store.state.notifications.groups;
        },
    },
    methods: {
        getHandler(props, $event) {
            return () =>
                (($event.target as HTMLElement).closest('button.close')
                    ? undefined
                    : props.item.data.clickHandler?.(props, $event)) ??
                props.close();
        },
    },
    mounted() {
        this.$store
            .dispatch('settings/getModule', 'global')
            .then(({ iconBg, iconBgAsNavBg }) => {
                if (iconBgAsNavBg) {
                    this.$store.dispatch('addStyle', {
                        selectorText:
                            '.navbar-default, .navbar-default .dropdown-menu',
                        style: {
                            'background-color': `${iconBg} !important`,
                        },
                    });
                }
            });

        // Workaround for when modals container appears behind V4 instance (dialogs are behind modals)
        const modalsContainer =
            document.querySelector<HTMLDivElement>('#modals-container');
        if (
            modalsContainer &&
            this.$el.compareDocumentPosition(modalsContainer) &
                Node.DOCUMENT_POSITION_FOLLOWING
        )
            this.$el.before(modalsContainer);
    },
});
</script>

<style lang="sass">
@import "~vue-select/src/scss/vue-select.scss"

.alert-unimportant
    background-image: linear-gradient(to bottom, #909090 0, #505050 100%)
    border-color: #303030
    color: #ffffff

body.dark
    .vm--modal
        background-color: #505050
        color: white

        &.vue-dialog
            a
                color: #6dd5f4

            .vue-dialog-button:hover
                background-color: rgba(249, 249, 249, 0.25)

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

    &:not(.leaflet-no-dark-tooltip) .leaflet-tooltip
        background-color: #505050
        color: #ddd
        border: #505050

        &.leaflet-tooltip-left::before
            border-left-color: #505050

        &.leaflet-tooltip-right::before
            border-right-color: #505050

    &.leaflet-no-dark-tooltip .leaflet-tooltip tr
        background-color: unset

    &.leaflet-dark-controls
        .leaflet-control-layers
            background-color: #a0a0a0

        .leaflet-bar
            a
                background-color: #a0a0a0

                &:hover
                    background-color: #dadada

    .bg-danger
        background-color: #a94442

    > :not(nav):not(#col_navbar_holder) .dropdown-menu
        background-image: linear-gradient(to bottom, #505050 0, #000 100%)
        color: #fff
        border: #000

        > li > a
            color: #fff

            &:focus, &:hover
                background-image: linear-gradient(to bottom, #5a5a5a 0, #353535 100%)

    .highcharts-axis-labels text,
    .highcharts-legend-item text,
    .highcharts-axis-title
        color: white !important
        fill: white !important

    .alert-unimportant
        background-color: #303030
        border-color: #303030
        background-image: none

    .help-block
        color: #c2c2c2

.vm--container
    z-index: 5001 !important

    .vm--overlay[data-modal="dialog"]
        background-color: rgba(0, 0, 0, 0.7)
        pointer-events: none

    .vm--modal
        padding: 1rem
        overflow: auto !important
        max-height: 100vh !important

        &.vue-dialog code
            word-break: break-word

.vue-tablist
    list-style: none
    display: flex
    flex-flow: wrap
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
    margin: 1em
    z-index: 10006 !important

    &.bottom.center
        transform-origin: bottom center

        .lssm-notification
            border-top-width: 5px !important

    &.top.center
        transform-origin: top center

        .lssm-notification
            border-bottom-width: 5px !important

    &.right
        &.bottom
            transform-origin: bottom right

        &.top
            transform-origin: top right

        .lssm-notification
            border-left-width: 5px !important

    &.left
        &.bottom
            transform-origin: bottom left

        &.top
            transform-origin: top left

        .lssm-notification
            border-right-width: 5px !important

    .vue-notification-wrapper
        margin: 0.1ch

        .lssm-notification
            font-size: 12px
            padding: 10px
            border-width: 0
            border-style: solid
            display: grid
            grid-template-columns: auto 1fr
            word-break: break-word
            cursor: pointer

            &.notification-danger
                border-color: #ce4844 !important

            &.notification-warning
                border-color: #aa6708 !important

            &.notification-info
                border-color: #1b809e !important

            &.notification-success
                border-color: #2b542c !important

            &.notification-unimportant
                border-color: #707070 !important

            img
                max-width: 100px
                padding-right: 1ch
                align-self: center

.leaflet-layer.leaflet-heatmap-layer
    background-color: transparent !important
</style>
