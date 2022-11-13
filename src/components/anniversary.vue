<template>
    <div id="lssmv4-anniversary-balloons"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { useRootStore } from '@stores/index';

import type { DefaultProps } from 'vue/types/options';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default Vue.extend<
    { faTimes: IconDefinition; rootStore: ReturnType<typeof useRootStore> },
    { launchBalloons(): void },
    { balloons: boolean },
    DefaultProps
>({
    name: 'lssmv4-anniversary',
    data() {
        return { faTimes, rootStore: useRootStore() };
    },
    props: {
        balloons: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    methods: {
        launchBalloons() {
            const balloonContainer = this.$el;
            const random = (num: number) => Math.floor(Math.random() * num);
            const balloons: HTMLSpanElement[] = [];
            let maxDuration = 0;
            for (let i = 0; i < 50; i++) {
                const balloon = document.createElement('span');
                balloons.push(balloon);
                balloon.classList.add('balloon');
                const image = document.createElement('img');
                image.src = this.rootStore.lssmLogoUrl;
                balloon.append(image);
                balloonContainer.append(balloon);
                const margins = [random(200), 0, 0, random(50)];
                const duration = random(5000) + 5000;
                if (duration > maxDuration) maxDuration = duration;
                const color = `${random(255)}, ${random(255)}, ${random(255)}`;
                balloon.style.setProperty('--color', color);
                balloon.style.setProperty(
                    'margin',
                    margins.map(m => `${m}px`).join(' ')
                );
                balloon.style.setProperty(
                    'animation-duration',
                    `${duration}ms`
                );
            }
            setTimeout(
                () => balloons.forEach(balloon => balloon.remove()),
                maxDuration
            );
        },
    },
    mounted() {
        if (this.balloons) this.launchBalloons();
    },
});
</script>

<style scoped lang="sass">
@use "sass:math"

$balloon-width: 106px
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

    :deep(.balloon)
        width: $balloon-width
        height: $balloon-height
        border-radius: 75% 75% 70% 70%
        position: relative
        color: var(--color)
        background-color: rgba(var(--color), 0.5)
        box-shadow: inset -7px -3px 10px currentColor
        animation: float
        animation-timing-function: ease-in
        animation-fill-mode: forwards

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
            background-color: rgba(232, 76, 60, 0.8)
            top: $balloon-height

        &:after
            content: "▲"
            text-align: center
            color: inherit
            top: $balloon-height - 7

        img
            width: 100%
            position: absolute
            top: $half-balloon-height
            transform: translate(0, -50%)
            opacity: 0.75

@keyframes float
    from
        transform: translateY(100vh)
        opacity: 1
    to
        transform: translateY(-200vh)
        opacity: 0
</style>
