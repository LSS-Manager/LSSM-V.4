<template>
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
</template>

<script lang="ts">
import Vue from 'vue';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import lssmLogo from '../img/lssm_logo';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type {
    DefaultComputed,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

export default Vue.extend<
    { faTimes: IconDefinition },
    DefaultMethods<Vue>,
    DefaultComputed,
    DefaultProps
>({
    name: 'lssmv4-anniversary',
    data() {
        return { faTimes };
    },
    mounted() {
        const balloonContainer = this.$el;
        const random = (num: number) => Math.floor(Math.random() * num);
        const balloons: HTMLSpanElement[] = [];
        let maxDuration = 0;
        let leftCarrier: HTMLSpanElement | null = null;
        let rightCarrier: HTMLSpanElement | null = null;
        const modal =
            balloonContainer.querySelector<HTMLDivElement>(
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
            if (!carrier && duration > maxDuration) maxDuration = duration;
            const color = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
            balloon.style.setProperty('background-color', color);
            balloon.style.setProperty('color', color);
            balloon.style.setProperty(
                'margin',
                margins.map(m => `${m}px`).join(' ')
            );
            balloon.style.setProperty(
                'box-shadow',
                `inset -7px -3px 10px ${color
                    .replace(/rgb/u, 'rgba')
                    .replace(/\)$/u, ', 0.9)')}`
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
                    this.$destroy();
                }, 1000);
            };
            leftCarrier?.addEventListener('click', () => {
                const otherOff = modal.classList.contains('hang-on-left');
                if (!otherOff) modal.classList.add('hang-on-right');
                leftCarrier?.classList.add('carrier-leaving');
                setTimeout(() => leftCarrier?.remove(), 1000);
                if (otherOff) modalFall();
            });
            rightCarrier?.addEventListener('click', () => {
                const otherOff = modal.classList.contains('hang-on-right');
                if (!otherOff) modal.classList.add('hang-on-left');
                rightCarrier?.classList.add('carrier-leaving');
                setTimeout(() => rightCarrier?.remove(), 1000);
                if (otherOff) modalFall();
            });
            modal.addEventListener('click', e => {
                const target = e.target as HTMLElement | null;
                if (!target || !target.closest('.anniversary-modal-close'))
                    return;
                leftCarrier?.click();
                setTimeout(() => rightCarrier?.click(), 500);
            });
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
