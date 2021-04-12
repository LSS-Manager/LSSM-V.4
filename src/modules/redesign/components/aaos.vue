<template>
    <div>
        <div class="row">
            <div
                class="col-sm-2 col-xs-4"
                v-for="row in 6"
                :key="`no_category_${row}`"
            >
                <pre
                    v-for="arr in aaos.categories[''][row.toString()]"
                    :key="arr.id"
                    >{{ arr }}</pre
                >
            </div>
        </div>
        <div class="clearfix"></div>
        <tabs>
            <tab
                v-for="(category, title) in categories"
                :key="title"
                :title="title"
            >
                <div class="row">
                    <div
                        class="col-sm-2 col-xs-4"
                        v-for="row in 6"
                        :key="`${title}_${row}`"
                    >
                        <pre
                            v-for="arr in category[row.toString()]"
                            :key="arr.id"
                            >{{ arr }}</pre
                        >
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="pull-right">
                    <pre v-for="arr in category['0']" :key="arr.id">{{
                        arr
                    }}</pre>
                </div>
            </tab>
        </tabs>
        <div class="clearfix"></div>
        <div class="pull-right">
            <pre v-for="arr in aaos.categories['']['0']" :key="arr.id">{{
                arr
            }}</pre>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AAOsWindow } from '../parsers/aaos';
import { RedesignComponent } from 'typings/modules/Redesign';
import { DefaultData } from 'vue/types/options';

type Component = RedesignComponent<
    'aaos',
    'aaos',
    AAOsWindow,
    DefaultData<Vue>,
    { categories: AAOsWindow['categories'] }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'aaos',
    data() {
        return {};
    },
    computed: {
        categories() {
            return Object.fromEntries(
                Object.entries(this.aaos.categories).filter(
                    ([title]) => title.length
                )
            );
        },
    },
    props: {
        aaos: {
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
        aaos() {
            this.lightbox.finishLoading('aaos-updated');
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
        this.lightbox.finishLoading('aaos-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
