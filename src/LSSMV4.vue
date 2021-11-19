<template>
    <div :id="id">
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
                    @click.capture="getHandler(props, $event)()"
                >
                    <img
                        v-if="props.item.data.icon"
                        :src="props.item.data.icon"
                        :alt="props.item.title"
                    />
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
        <div id="lssmv4-anniversary-balloons">
            <div class="anniversary-modal vm--modal">
                <small>{{ $t('anniversary1.closeNote') }}</small>
                <font-awesome-icon
                    :icon="faTimes"
                    class="pull-right anniversary-modal-close"
                ></font-awesome-icon>
                <h1>{{ $t('anniversary1.title') }}</h1>
                <div v-html="$t('anniversary1.content')"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import lssmLogo from './img/lssm_logo';

import { DefaultMethods, DefaultProps } from 'vue/types/options';
import { LSSMV4Computed, LSSMV4Data } from 'typings/LSSMV4';

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
    async mounted() {
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
        const balloonContainer = document.querySelector<HTMLDivElement>(
            '#lssmv4-anniversary-balloons'
        );
        if (balloonContainer) {
            let showBallons = false;
            if (
                new Date() >= new Date('2021-11-20T00:00') &&
                new Date() < new Date('2021-11-29T00:00') &&
                window.location.pathname === '/' &&
                !(await this.$store.dispatch('settings/getSetting', {
                    moduleId: 'global',
                    settingId: 'anniversary1Clicked',
                    defaultValue: false,
                }))
            )
                showBallons = true;
            if (showBallons) {
                const random = (num: number) => Math.floor(Math.random() * num);
                const balloons: HTMLSpanElement[] = [];
                let maxDuration = 0;
                let leftCarrier: HTMLSpanElement | null = null;
                let rightCarrier: HTMLSpanElement | null = null;
                const modal = balloonContainer.querySelector<HTMLDivElement>(
                    '.anniversary-modal'
                );
                for (let i = 0; i < 102; i++) {
                    const balloon = document.createElement('span');
                    let carrier = false;
                    if (!i) {
                        carrier = true;
                        leftCarrier = balloon;
                        leftCarrier.classList.add('carrier-left');
                    } else if (i === 101) {
                        carrier = true;
                        rightCarrier = balloon;
                        rightCarrier.classList.add('carrier-right');
                    }
                    if (!carrier) balloons.push(balloon);
                    else balloon.classList.add('modal-carrier');
                    balloon.classList.add('balloon');
                    const image = document.createElement('img');
                    image.src = lssmLogo.toString();
                    balloon.append(image);
                    balloonContainer.append(balloon);
                    const margins = [random(200), 0, 0, random(50)];
                    const duration = carrier ? 7500 : random(5000) + 5000;
                    if (!carrier && duration > maxDuration)
                        maxDuration = duration;
                    const color = `rgb(${random(255)}, ${random(255)}, ${random(
                        255
                    )})`;
                    balloon.style.setProperty('background-color', color);
                    balloon.style.setProperty('color', color);
                    balloon.style.setProperty(
                        'margin',
                        margins.map(m => `${m}px`).join(' ')
                    );
                    balloon.style.setProperty(
                        'box-shadow',
                        `inset -7px -3px 10px ${color
                            .replace(/rgb/, 'rgba')
                            .replace(/\)$/, ', 0.9)')}`
                    );
                    if (!carrier) {
                        balloon.style.setProperty(
                            'animation-duration',
                            `${duration}ms`
                        );
                    }
                }
                setTimeout(
                    () => balloons.forEach(balloon => balloon.remove()),
                    maxDuration
                );
                if (modal) {
                    const modalFall = () => {
                        modal.classList.add('falling');
                        this.$store.dispatch('settings/setSetting', {
                            moduleId: 'global',
                            settingId: 'anniversary1Clicked',
                            value: true,
                        });
                        setTimeout(() => {
                            modal.remove();
                            balloonContainer.remove();
                        }, 1000);
                    };
                    leftCarrier?.addEventListener('click', () => {
                        const otherOff = modal.classList.contains(
                            'hang-on-left'
                        );
                        if (!otherOff) modal.classList.add('hang-on-right');
                        leftCarrier?.classList.add('carrier-leaving');
                        setTimeout(() => leftCarrier?.remove(), 1000);
                        if (otherOff) modalFall();
                    });
                    rightCarrier?.addEventListener('click', () => {
                        const otherOff = modal.classList.contains(
                            'hang-on-right'
                        );
                        if (!otherOff) modal.classList.add('hang-on-left');
                        rightCarrier?.classList.add('carrier-leaving');
                        setTimeout(() => rightCarrier?.remove(), 1000);
                        if (otherOff) modalFall();
                    });
                    modal.addEventListener('click', e => {
                        const target = e.target as HTMLElement | null;
                        if (
                            !target ||
                            !target.closest('.anniversary-modal-close')
                        )
                            return;
                        leftCarrier?.click();
                        setTimeout(() => rightCarrier?.click(), 500);
                    });
                }
            } else {
                balloonContainer.remove();
            }
        }
    },
});
</script>

<style scoped lang="sass">
@use "sass:math"

$balloon-width: 105px
$half-balloon-width: math.div($balloon-width, 2)
$balloon-height: 125px
$half-balloon-height: math.div($balloon-height, 2)
$balloon-cord: 75px
$half-balloon-cord: math.div($balloon-cord, 2)
$balloon-total-height: $balloon-height + $balloon-cord
$one-third: math.div(100%, 3)
$two-thirds: $one-third * 2
$modal-top: 10vh

#lssmv4-anniversary-balloons
    position: fixed
    top: 0
    left: 0
    z-index: 10000
    width: 100%
    height: 100vh
    box-sizing: border-box
    display: flex
    flex-wrap: wrap
    overflow: hidden
    pointer-events: none

    ::v-deep .balloon
        width: $balloon-width
        height: $balloon-height
        border-radius: 75% 75% 70% 70%
        position: relative
        opacity: 0.8

        &:before, &:after
            display: block
            position: absolute
            left: 0
            right: 0
            margin: auto
            opacity: 1

        &:before
            content: ""
            height: $balloon-cord
            width: 1px
            padding: 1px
            background-color: #E84C3C
            top: $balloon-height

        &:after
            content: "▲"
            text-align: center
            color: inherit
            top: $balloon-height - 5

        &:not(.modal-carrier)
            animation: float
            animation-timing-function: ease-in
            animation-fill-mode: forwards

        &.modal-carrier
            animation: float-modal-carrier ease-in 7500ms forwards
            position: absolute
            margin: 0 !important
            transform: translateY($modal-top)
            pointer-events: all
            opacity: 0.95
            cursor: pointer

            &.carrier-left
                left: calc(#{$one-third} - #{$half-balloon-width})

            &.carrier-right
                left: calc(#{$two-thirds} - #{$half-balloon-width})

            &.carrier-leaving
                animation: float-modal-carrier-leaving ease-in 1000ms forwards
                transform: translateY(-100vh)

        img
            width: 100%
            position: absolute
            top: $half-balloon-height
            transform: translate(0, -50%)
            opacity: 0.75

    .anniversary-modal
        width: $one-third * 1.2
        position: absolute
        transform: translateY(calc(#{$modal-top} + #{$balloon-total-height - 5}))
        left: $one-third - 0.1 * $one-third
        z-index: 1
        pointer-events: all
        padding: 1rem
        overflow: auto !important
        max-height: calc(#{100vh - $modal-top} - #{$balloon-total-height}) !important
        animation: float-modal ease-in 7500ms forwards

        &:before
            content: ""
            position: fixed
            width: 100%
            height: 100%
            top: 0
            left: 0
            opacity: 0.1
            background-image: url("https://lss-manager.de/img/lssm.png")
            background-size: contain
            background-repeat: no-repeat
            background-position: center center
            pointer-events: none

        &.hang-on-right
            transform: rotate(-5deg)
            rotate: -5deg
            transform-origin: calc(100% - #{$half-balloon-width}) $modal-top

        &.hang-on-left
            transform: rotate(5deg)
            rotate: 5deg
            transform-origin: $half-balloon-width $modal-top

        &.falling
            animation: float-modal-leaving ease-in 1000ms forwards

        .anniversary-modal-close
            cursor: pointer

        ::v-deep ul li
            text-indent: -1em

@keyframes float
    from
        transform: translateY(100vh)
        opacity: 1
    to
        transform: translateY(-200vh)
        opacity: 0

@keyframes float-modal-carrier
    from
        transform: translateY(100vh)
    to
        transform: translateY($modal-top)

@keyframes float-modal-carrier-leaving
    from
        transform: translateY($modal-top)
    to
        transform: translateY(-100vh)

@keyframes float-modal
    from
        transform: translateY(calc(100vh + #{$balloon-total-height}))
    to
        transform: translateY(calc(#{$modal-top} + #{$balloon-total-height - 5}))

@keyframes float-modal-leaving
    from
        transform: translateY(calc(#{$modal-top} + #{$balloon-total-height - 5}))
    to
        transform: translateY(110vh)
</style>

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

            img
                max-width: 100px
                padding-right: 1ch
                align-self: center
</style>
