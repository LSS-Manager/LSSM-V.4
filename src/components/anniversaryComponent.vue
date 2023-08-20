<template ref="$el">
    <div id="lssmv4-anniversary-balloons">
        <div class="anniversary-modal vm--modal hidden">
            <small>{{ $t('global.anniversary.closeNote') }}</small>
            <font-awesome-icon
                :icon="faTimes"
                class="pull-right anniversary-modal-close"
            ></font-awesome-icon>
            <div
                v-html="anniversaryModalContent"
                class="anniversary-modal-content"
            ></div>
        </div>
        <span class="popped-balloons-counter" v-if="currentBalloons.length">
            {{ poppedBalloons }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import Showdown from 'showdown';
import { useRootStore } from '@stores/index';

const random = (max: number) => Math.floor(Math.random() * max);

const $el = ref<HTMLElement>();
const rootStore = useRootStore();
const currentBalloons = ref<HTMLSpanElement[]>([]);
const poppedBalloons = ref(0);
const initialBalloonsKey = `${PREFIX}_anniversary_initial_ballons_dispatched_2022`;
const anniversaryModalContent = ref('');

const props = defineProps<{
    balloons: boolean;
}>();

const createBalloon = (margin = true, rotation = true, animation = true) => {
    const balloon = document.createElement('span');
    balloon.classList.add('lssmv4-anniversary-balloon');
    const image = document.createElement('img');
    image.src = rootStore.lssmLogoUrl;
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
    if (rotation) balloon.dataset.rotation = (random(20) - 10).toString();

    if (animation)
        balloon.style.setProperty('animation-duration', `${duration}ms`);

    return { balloon, duration };
};

const createFixedBalloon = () => createBalloon(false, false, false).balloon;

const launchBalloons = () => {
    let maxDuration = 0;
    for (let i = 0; i < 25; i++) {
        const { balloon, duration } = createBalloon();
        $el.value?.append(balloon);
        currentBalloons.value.push(balloon);
        if (duration > maxDuration) maxDuration = duration;
        balloon.addEventListener('click', () => {
            balloon.style.setProperty('visibility', 'hidden');
            poppedBalloons.value++;
        });
    }
    setTimeout(
        () =>
            currentBalloons.value
                .splice(0, 50)
                .forEach(balloon => balloon.remove()),
        maxDuration
    );
};

const launchModal = () => {
    const leftCarrier = createFixedBalloon();
    leftCarrier.classList.add('modal-carrier', 'carrier-left');
    const rightCarrier = createFixedBalloon();
    rightCarrier.classList.add('modal-carrier', 'carrier-right');

    $el.value?.append(leftCarrier, rightCarrier);

    const modal =
        $el.value?.querySelector<HTMLDivElement>('.anniversary-modal');

    if (!modal) return;

    modal.classList.remove('hidden');
    modal.style.setProperty(
        'background-image',
        `url(${rootStore.lssmLogoUrl})`
    );

    const modalFall = () => {
        modal.classList.add('falling');
        setTimeout(() => {
            modal.remove();
        }, 1000);

        localStorage.setItem(initialBalloonsKey, 'true');
    };
    leftCarrier.addEventListener('click', () => {
        const otherOff = modal.classList.contains('hang-on-left');
        if (!otherOff) modal.classList.add('hang-on-right');
        leftCarrier.classList.add('carrier-leaving');
        setTimeout(() => leftCarrier.remove(), 1000);
        if (otherOff) modalFall();
    });
    rightCarrier.addEventListener('click', () => {
        const otherOff = modal.classList.contains('hang-on-right');
        if (!otherOff) modal.classList.add('hang-on-left');
        rightCarrier.classList.add('carrier-leaving');
        setTimeout(() => rightCarrier.remove(), 1000);
        if (otherOff) modalFall();
    });
    modal.addEventListener('click', e => {
        const target = e.target;
        if (
            !target ||
            !(target instanceof SVGElement) ||
            !target.closest('.anniversary-modal-close')
        )
            return;
        leftCarrier.click();
        setTimeout(() => rightCarrier.click(), 500);
    });
};

onMounted(() => {
    if (props.balloons && !localStorage.getItem(initialBalloonsKey)) {
        (async () => {
            for (const locale of [rootStore.locale, 'en_US']) {
                if (anniversaryModalContent.value) continue;
                await import(
                    /* webpackChunkName: "i18n/anniversary/[request]" */
                    /* webpackInclude:/[\\/]+i18n[\\/]+[a-z]{2}_[A-Z]{2}[\\/]+anniversary.md$/ */
                    `../i18n/${locale}/anniversary.md`
                )
                    .then(
                        ({ default: content }) =>
                            (anniversaryModalContent.value =
                                new Showdown.Converter({
                                    headerLevelStart: 1,
                                    literalMidWordUnderscores: true,
                                    strikethrough: true,
                                    tables: true,
                                    tasklists: true,
                                    smartIndentationFix: true,
                                    disableForced4SpacesIndentedSublists: true,
                                    simpleLineBreaks: true,
                                    openLinksInNewWindow: true,
                                }).makeHtml(content))
                    )
                    .catch(() => {
                        // ignore error => try en_US
                    });
            }
        })();

        launchBalloons();
        launchModal();
    } else {
        $el.value
            ?.querySelector<HTMLDivElement>('.anniversary-modal')
            ?.remove();
    }

    const trigger = rootStore.addMenuItem('');
    trigger.classList.add('lssmv4-anniversary-trigger');
    trigger.addEventListener('click', launchBalloons);
    for (let i = 0; i < 5; i++) {
        const triggerBalloon = createFixedBalloon();
        triggerBalloon.classList.add('trigger');
        trigger.append(triggerBalloon);
    }

    const navbar = document.createElement('div');
    navbar.classList.add('lssmv4-anniversary-navbar');
    for (let i = 0; i < window.innerWidth / 100; i++)
        navbar.append(createBalloon(false, true, false).balloon);
    document.querySelector<HTMLElement>('#main_navbar')?.prepend(navbar);
});
</script>

<style scoped lang="sass">
@use "sass:math"
@use "sass:map"

$balloon-height: 125px

@import '../sass/mixins/anniversaryBallon'

$carrier-balloon-height: 100px
$carrier-balloon-sizes: getBalloonSizes($carrier-balloon-height)
$modal-top: map.get($carrier-balloon-sizes, 'half-height')
$carrier-half-balloon-width: map.get($carrier-balloon-sizes, 'half-width')
$carrier-balloon-total-height: map.get($carrier-balloon-sizes, 'total-height')
$modal-float-time: 7500ms
$modal-fall-time: 1000ms
$one-third: math.div(100%, 3)
$two-thirds: $one-third * 2

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

    .popped-balloons-counter
        position: absolute
        bottom: 1rem
        right: 1rem
        font-size: 30px

    :deep(.lssmv4-anniversary-balloon)
        cursor: pointer
        pointer-events: all

        &:not(.modal-carrier)
            @include anniversaryBalloon($animation: true)

        &.modal-carrier
            @include anniversaryBalloon($animation: false, $balloon-height: $carrier-balloon-height)
            animation: float-modal-carrier ease-in $modal-float-time forwards
            position: absolute
            margin: 0 !important
            transform: translateY($modal-top)
            pointer-events: all
            opacity: 0.95
            cursor: pointer
            background-color: rgba(var(--color), 0.75)

            &.carrier-left
                left: calc(#{$one-third} - #{$carrier-half-balloon-width})

            &.carrier-right
                left: calc(#{$two-thirds} - #{$carrier-half-balloon-width})

            &.carrier-leaving
                animation: float-modal-carrier-leaving ease-in $modal-fall-time forwards
                transform: translateY(-100vh)

    .anniversary-modal
        width: $one-third * 1.2
        position: absolute
        transform: translateY(calc(#{$modal-top} + #{$carrier-balloon-total-height - 5}))
        left: $one-third - 0.1 * $one-third
        z-index: 1
        pointer-events: all
        padding: 1rem
        overflow: auto !important
        max-height: calc(100vh - #{$modal-top} - #{$carrier-balloon-total-height}) !important
        animation: float-modal ease-in $modal-float-time forwards
        background-blend-mode: soft-light
        background-size: contain
        background-repeat: no-repeat
        background-position: center center


        &.hang-on-right
            transform: rotate(-5deg)
            rotate: -5deg
            transform-origin: calc(100% - #{$carrier-half-balloon-width}) $modal-top
        &.hang-on-left
            transform: rotate(5deg)
            rotate: 5deg
            transform-origin: $carrier-half-balloon-width $modal-top

        &.falling
            animation: float-modal-leaving ease-in $modal-fall-time forwards

        .anniversary-modal-close
            cursor: pointer


        .anniversary-modal-content
            background-color: rgba(0, 0, 0, 0.3)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
            transition: box-shadow 0.3s
            border-radius: 5px
            padding: 1rem

            body.dark & :deep(a)
                color: #6dd5f4

            :deep(ul li)
                list-style: none
                text-indent: -1em

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
        transform: translateY(calc(100vh + #{$carrier-balloon-total-height}))
    to
        transform: translateY(calc(#{$modal-top} + #{$carrier-balloon-total-height - 5}))
@keyframes float-modal-leaving
    from
        transform: translateY(calc(#{$modal-top} + #{$carrier-balloon-total-height - 5}))
    to
        transform: translateY(calc(100vh + #{$modal-top}))
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
