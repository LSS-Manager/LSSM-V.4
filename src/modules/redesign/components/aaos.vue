<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <hr />
        <div class="row">
            <div
                class="col-sm-2 col-xs-4 arr-row"
                v-for="row in 6"
                :key="`no_category_${row}`"
            >
                <ARR
                    v-for="arr in aaos.categories[''][row.toString()]"
                    :key="arr.id"
                    :id="arr.id"
                    :bg_color="arr.bg_color"
                    :color="arr.color"
                    :type="arr.type"
                    :title="arr.title"
                    :editable="true"
                    @click="edit(arr.id, arr.type)"
                    @edit="edit(arr.id, arr.type)"
                    @copy="copy(arr.id, arr.type)"
                    @delete="deleteARR(arr.id, arr.type)"
                ></ARR>
            </div>
        </div>
        <div class="clearfix margined"></div>
        <tabs>
            <tab
                v-for="(category, title) in categories"
                :key="title"
                :title="title"
            >
                <div class="row">
                    <div
                        class="col-sm-2 col-xs-4 arr-row"
                        v-for="row in 6"
                        :key="`${title}_${row}`"
                    >
                        <ARR
                            v-for="arr in category[row.toString()]"
                            :key="arr.id"
                            :id="arr.id"
                            :bg_color="arr.bg_color"
                            :color="arr.color"
                            :type="arr.type"
                            :title="arr.title"
                            :editable="true"
                            @click="edit(arr.id, arr.type)"
                            @edit="edit(arr.id, arr.type)"
                            @copy="copy(arr.id, arr.type)"
                            @delete="deleteARR(arr.id, arr.type)"
                        ></ARR>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="arr-list pull-right">
                    <ARR
                        v-for="arr in category['0']"
                        :key="arr.id"
                        :id="arr.id"
                        :bg_color="arr.bg_color"
                        :color="arr.color"
                        :type="arr.type"
                        :title="arr.title"
                        :editable="true"
                        @click="edit(arr.id, arr.type)"
                        @edit="edit(arr.id, arr.type)"
                        @copy="copy(arr.id, arr.type)"
                        @delete="deleteARR(arr.id, arr.type)"
                    ></ARR>
                </div>
            </tab>
        </tabs>
        <div class="clearfix margined"></div>
        <div class="arr-list pull-right">
            <ARR
                v-for="arr in aaos.categories['']['0']"
                :key="arr.id"
                :id="arr.id"
                :bg_color="arr.bg_color"
                :color="arr.color"
                :type="arr.type"
                :title="arr.title"
                :editable="true"
                @click="edit(arr.id, arr.type)"
                @edit="edit(arr.id, arr.type)"
                @copy="copy(arr.id, arr.type)"
                @delete="deleteARR(arr.id, arr.type)"
            ></ARR>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { AAOsWindow } from '../parsers/aaos';
import { DefaultData } from 'vue/types/options';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'aaos',
    'aaos',
    AAOsWindow,
    DefaultData<Vue>,
    {
        edit(id: number, type: 'arr' | 'vehicle_group'): void;
        copy(id: number, type: 'arr' | 'vehicle_group'): void;
        deleteARR(id: number, type: 'arr' | 'vehicle_group'): void;
    },
    { categories: AAOsWindow['categories'] }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'aaos',
    components: {
        ARR: () =>
            import(
                /* webpackChunkName: "components/arr" */ '../../../components/arr.vue'
            ),
    },
    data() {
        return {};
    },
    methods: {
        edit(id, type) {
            window.lightboxOpen(
                `/${type === 'arr' ? 'aaos' : 'vehicle_groups'}/${id}/edit`
            );
        },
        copy(id, type) {
            window.lightboxOpen(
                `/${type === 'arr' ? 'aaos' : 'vehicle_groups'}/${id}/copy`
            );
        },
        deleteARR(id, type) {
            // delete
        },
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
.row
    margin-left: 0
    margin-right: 0

.arr-row
    display: flex
    flex-flow: column
    align-items: flex-start

.margined
    margin-bottom: 2rem

.arr-list > .arr:not(:last-child)
    margin-right: 0.5ch
</style>
