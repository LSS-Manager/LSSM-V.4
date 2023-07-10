<template>
    <svg
        v-show="requestedFilesSize"
        :height="loaderSize"
        :width="loaderSize"
        :style="`stroke-dasharray: ${strokeDashArray}; stroke-dashoffset: ${strokeDashOffset}`"
        :data-total-size="requestedFilesSize"
        :data-finished-size="finishedFilesSize"
        :data-pull-up="pageHasBottomNavbar"
    >
        <circle
            :cx="loaderSize / 2"
            :cy="loaderSize / 2"
            :r="RADIUS"
            stroke="#d9534f"
            :stroke-width="STROKE_WIDTH"
            fill="transparent"
        />
        <image
            :x="loaderSize / 2 - imageWidth / 2"
            :y="loaderSize / 2 - imageHeight / 2"
            :height="imageHeight"
            :width="imageWidth"
            :href="lssmLogoUrl"
        ></image>
    </svg>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useAPIStore } from '@stores/api';
import { useRootStore } from '@stores/index';

const STORAGE = localStorage;
const STORAGE_KEY = `${PREFIX}-file-sizes-${VERSION}`;
const RADIUS = 20;
const STROKE_WIDTH = 3;
const PADDING = 15;

const rootStore = useRootStore();

const fileSizes = ref<Record<string, number>>(
    JSON.parse(STORAGE.getItem(STORAGE_KEY) ?? '{}')
);
const requestedFiles = ref<string[]>([]);
const finishedFiles = ref<string[]>([]);
const pageHasBottomNavbar = ref<boolean>(false);

const { lssmLogoUrl } = storeToRefs(rootStore);

const requestedFilesSize = computed(() =>
    requestedFiles.value
        .map(chunk => fileSizes.value[chunk])
        .reduce((a, b) => a + b, 0)
);
const finishedFilesSize = computed(() =>
    finishedFiles.value
        .map(chunk => fileSizes.value[chunk])
        .reduce((a, b) => a + b, 0)
);

const loaderSize = (RADIUS + STROKE_WIDTH + PADDING) * 2;
const imageHeight = ref<number>(22);
const imageWidth = (RADIUS - STROKE_WIDTH) * 2;
const strokeDashArray = RADIUS * 2 * Math.PI;

const dashOffsetOneFile = computed(
    () => strokeDashArray / requestedFilesSize.value
);
const strokeDashOffset = computed(
    () => strokeDashArray - dashOffsetOneFile.value * finishedFilesSize.value
);

onMounted(() => {
    // clear old cached file-sizes
    Object.keys(STORAGE)
        .filter(
            key =>
                key.startsWith(`${PREFIX}-file-sizes-`) && key !== STORAGE_KEY
        )
        .forEach(key => STORAGE.removeItem(key));

    // if there are no file-sizes cached, fetch them
    if (Object.values(fileSizes.value).length === 0) {
        useAPIStore()
            .request({
                url: rootStore.lssmUrl('/static/fileSizes.json', true),
                feature: 'loading-indicator',
            })
            .then(res => res.json())
            .then(sizes => {
                fileSizes.value = sizes;
                STORAGE.setItem(STORAGE_KEY, JSON.stringify(fileSizes.value));
            });
    }

    // check if the current page has a bottom navbar
    pageHasBottomNavbar.value = !!document.querySelector(
        '.navbar.navbar-fixed-bottom:not(#navbar-mobile-footer)'
    );

    // load the image to get the correct height
    const img = new Image();
    img.addEventListener('load', () => {
        const scale = img.width / imageWidth;
        imageHeight.value = img.height / scale;
    });
    img.src = lssmLogoUrl.value;

    // reset the total and finished arrays after 1s
    let clearTimeout: number | null = null;

    // when a script is being loaded, add it to the total array
    window.addEventListener(LOADSCRIPT_EVENT_START, e => {
        if (!(e instanceof CustomEvent)) return;
        requestedFiles.value.push(e.detail.chunkId);
    });
    // once finished, add the script to the finished array and reset the clearing timer
    window.addEventListener(LOADSCRIPT_EVENT_END, e => {
        if (!(e instanceof CustomEvent)) return;
        if (requestedFiles.value.includes(e.detail.chunkId))
            finishedFiles.value.push(e.detail.chunkId);

        if (clearTimeout) window.clearTimeout(clearTimeout);
        nextTick(() => {
            if (requestedFilesSize.value <= finishedFilesSize.value) {
                clearTimeout = window.setTimeout(() => {
                    requestedFiles.value = [];
                    finishedFiles.value = [];
                }, 1000);
            }
        });
    });
});
</script>

<style scoped lang="sass">
svg
    position: fixed
    bottom: 0
    right: 0
    z-index: 10000

    &[data-pull-up]
        bottom: 50px

    circle
        transform: rotate(-90deg)
        transform-origin: center
</style>
