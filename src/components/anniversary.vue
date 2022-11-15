<template>
    <div id="lssmv4-anniversary-balloons"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { useRootStore } from '@stores/index';

import type { DefaultProps } from 'vue/types/options';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const random = (max: number) => Math.floor(Math.random() * max);

export default Vue.extend<
    { faTimes: IconDefinition; rootStore: ReturnType<typeof useRootStore> },
    {
        createBalloon(
            margin?: boolean,
            rotation?: boolean
        ): {
            balloon: HTMLSpanElement;
            duration: number;
        };
        launchBalloons(): void;
    },
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
        createBalloon(margin = true, rotation = true) {
            const balloon = document.createElement('span');
            balloon.classList.add('lssmv4-anniversary-balloon');
            const image = document.createElement('img');
            image.src = this.rootStore.lssmLogoUrl;
            balloon.append(image);
            const duration = random(5000) + 5000;
            const color = `${random(255)}, ${random(255)}, ${random(255)}`;
            balloon.style.setProperty('--color', color);
            if (margin) {
                const margins = [random(200), 0, 0, random(50)];
                balloon.style.setProperty(
                    'margin',
                    margins.map(m => `${m}px`).join(' ')
                );
            }
            if (rotation)
                balloon.dataset.rotation = (random(20) - 10).toString();

            balloon.style.setProperty('animation-duration', `${duration}ms`);
            return { balloon, duration };
        },
        launchBalloons() {
            const balloonContainer = this.$el;
            const balloons: HTMLSpanElement[] = [];
            let maxDuration = 0;
            for (let i = 0; i < 50; i++) {
                const { balloon, duration } = this.createBalloon();
                balloonContainer.append(balloon);
                balloons.push(balloon);
                if (duration > maxDuration) maxDuration = duration;
            }
            setTimeout(
                () => balloons.forEach(balloon => balloon.remove()),
                maxDuration
            );
        },
    },
    mounted() {
        if (this.balloons) this.launchBalloons();

        const trigger = this.rootStore.addMenuItem('');
        trigger.classList.add('lssmv4-anniversary-trigger');
        trigger.addEventListener('click', this.launchBalloons);
        for (let i = 0; i < 5; i++) {
            const triggerBalloon = this.createBalloon(false, false).balloon;
            triggerBalloon.classList.add('trigger');
            trigger.append(triggerBalloon);
        }

        const navbar = document.createElement('div');
        navbar.classList.add('lssmv4-anniversary-navbar');
        for (let i = 0; i < window.innerWidth / 100; i++)
            navbar.append(this.createBalloon(false).balloon);
        document.querySelector<HTMLElement>('#main_navbar')?.prepend(navbar);
    },
});
</script>

<style scoped lang="sass">
$balloon-height: 125px

@import '../sass/mixins/anniversaryBallon'

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

    :deep(.lssmv4-anniversary-balloon)
        @include anniversaryBalloon($animation: true)
</style>
<style lang="sass">
@use "sass:map"

$balloon-height: 20px

@import '../sass/mixins/anniversaryBallon'

$balloon-sizes: getBalloonSizes($balloon-height)

.lssmv4-anniversary-trigger
    height: map.get($balloon-sizes, 'total-height')
    box-sizing: content-box
    display: flex !important
    justify-content: space-between

    .lssmv4-anniversary-balloon.trigger
        @include anniversaryBalloon($animation: false)

.lssmv4-anniversary-navbar
    width: 100%
    height: 100%
    opacity: 0.3
    padding: 2px
    position: absolute
    display: flex !important
    justify-content: space-around
    pointer-events: none

    .lssmv4-anniversary-balloon
        @include anniversaryBalloon($animation: false, $balloon-height: getBalloonHeightFromTotal(46px))
</style>
