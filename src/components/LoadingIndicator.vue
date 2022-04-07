<template>
    <svg
        v-show="totalSize"
        :height="size"
        :width="size"
        :style="`stroke-dasharray: ${strokeDashArray}; stroke-dashoffset: ${strokeDashOffset}`"
        :data-total-size="totalSize"
        :data-finished-size="finishedSize"
        :data-pull-up="pageHasBottomNavbar"
    >
        <circle
            :cx="size / 2"
            :cy="size / 2"
            :r="radius"
            stroke="#d9534f"
            :stroke-width="strokeWidth"
            fill="transparent"
        />
        <image
            :x="size / 2 - imageWidth / 2"
            :y="size / 2 - imageHeight / 2"
            :height="imageHeight"
            :width="imageWidth"
            :href="lssmLogo"
        ></image>
    </svg>
</template>

<script lang="ts">
import Vue from 'vue';

import lssmLogo from '../img/lssm.png';

import type { DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    {
        total: string[];
        finished: string[];
        fileSizes: Record<string, number>;
        radius: number;
        strokeWidth: number;
        padding: number;
        imageHeight: number;
        lssmLogo: string;
        pageHasBottomNavbar: boolean;
    },
    DefaultMethods<Vue>,
    {
        totalSize: number;
        finishedSize: number;
        size: number;
        strokeDashArray: number;
        strokeDashOffset: number;
        offsetOneFile: number;
        imageWidth: number;
    }
>({
    name: 'lssmv4-loading-indicator',
    data() {
        return {
            total: [],
            finished: [],
            fileSizes: {},
            radius: 20,
            strokeWidth: 3,
            padding: 15,
            imageHeight: 22,
            lssmLogo: `${lssmLogo}?uid=${this.$store.state.lang}-${window.user_id}`,
            pageHasBottomNavbar: !!document.querySelector(
                '.navbar.navbar-fixed-bottom:not(#navbar-mobile-footer)'
            ),
        };
    },
    computed: {
        totalSize() {
            return this.total
                .map(chunk => this.fileSizes[chunk])
                .reduce((a, b) => a + b, 0);
        },
        finishedSize() {
            return this.finished
                .map(chunk => this.fileSizes[chunk])
                .reduce((a, b) => a + b, 0);
        },
        size() {
            return (this.radius + this.padding + this.strokeWidth) * 2;
        },
        strokeDashArray() {
            return this.radius * 2 * Math.PI;
        },
        strokeDashOffset() {
            return (
                this.strokeDashArray - this.offsetOneFile * this.finishedSize
            );
        },
        offsetOneFile() {
            return this.strokeDashArray / this.totalSize;
        },
        imageWidth() {
            return (this.radius - this.strokeWidth) * 2;
        },
    },
    mounted() {
        const fileSizeStorageKey = `${PREFIX}-file-sizes-${VERSION}`;

        Object.keys(localStorage)
            .filter(
                key =>
                    key.startsWith(`${PREFIX}-file-sizes-`) &&
                    key !== fileSizeStorageKey
            )
            .forEach(key => localStorage.removeItem(key));

        const storageFileSizes = localStorage.getItem(fileSizeStorageKey);
        if (storageFileSizes) {
            this.fileSizes = JSON.parse(storageFileSizes);
        } else {
            this.$store
                .dispatch('api/request', {
                    url: `${this.$store.state.server}static/fileSizes.json?uid=${this.$store.state.lang}-${window.user_id}`,
                    feature: 'loading-indicator',
                })
                .then(res => res.json())
                .then(sizes => {
                    this.fileSizes = sizes;
                    localStorage.setItem(
                        fileSizeStorageKey,
                        JSON.stringify(this.fileSizes)
                    );
                });
        }

        const img = new Image();
        img.addEventListener('load', () => {
            const scale = img.width / this.imageWidth;
            this.imageHeight = img.height / scale;
        });
        img.src = this.lssmLogo;

        let clearTimeout: number | null = null;

        window.addEventListener(LOADSCRIPT_EVENT_START, e => {
            if (!(e instanceof CustomEvent)) return;
            this.total.push(e.detail.chunkId);
        });
        window.addEventListener(LOADSCRIPT_EVENT_END, e => {
            if (!(e instanceof CustomEvent)) return;
            if (this.total.includes(e.detail.chunkId))
                this.finished.push(e.detail.chunkId);

            if (clearTimeout) window.clearTimeout(clearTimeout);
            if (this.totalSize === this.finishedSize) {
                clearTimeout = window.setTimeout(() => {
                    this.total = [];
                    this.finished = [];
                }, 1000);
            }
        });
    },
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
