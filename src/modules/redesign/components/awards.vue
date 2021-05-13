<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
        </h1>
        <div class="awards awards-grid">
            <div
                class="panel panel-default"
                v-for="award in awards.awards"
                :key="award.caption"
            >
                <div class="panel-heading">
                    <span
                        class="pull-right"
                        :class="{
                            'label': award.finished,
                            'label-success': award.finished,
                        }"
                    >
                        <span v-if="award.finished">{{
                            lightbox.$sm('gold')
                        }}</span>
                        <span v-else>
                            {{ award.progress[0].toLocaleString() }} /
                            {{ award.progress[1].toLocaleString() }}
                        </span>
                    </span>
                    <h3 class="panel-title">
                        {{ award.caption }}
                    </h3>
                </div>
                <div class="panel-body">
                    <img
                        loading="lazy"
                        :alt="award.caption"
                        :src="award.image"
                    />
                    <div>
                        <p>{{ award.desc }}</p>
                        <div v-if="award.progress" class="progress">
                            <div
                                class="progress-bar"
                                :style="
                                    `width: ${(award.progress[0] /
                                        award.progress[1]) *
                                        100}%`
                                "
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { AwardsWindow } from '../parsers/awards';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<'awards', 'awards', AwardsWindow>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'awards',
    props: {
        awards: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
        getSetting: {
            type: Function,
            required: true,
        },
        setSetting: {
            type: Function,
            required: true,
        },
    },
    watch: {
        awards() {
            this.lightbox.finishLoading('awards-updated');
        },
    },
    mounted() {
        this.$el.addEventListener('click', e => {
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            const href = target?.getAttribute('href');
            if (!target || !href) return;
            e.preventDefault();
            if (target.hasAttribute('lightbox-open'))
                return window.lightboxOpen(href);
            else this.$set(this.lightbox, 'src', href);
        });
        this.lightbox.finishLoading('awards-mounted');
    },
});
</script>

<style lang="sass" scoped>
.awards .panel-body
    display: flex
    flex-flow: row

    img
        max-width: 50%

    p
        margin-left: 10px

    .progress
        margin-left: 10px


.awards-grid
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
    grid-gap: 1em
</style>
