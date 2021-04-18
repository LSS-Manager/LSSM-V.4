<template>
    <div>
        <div class="btn-group pull-right">
            <a lightbox-open href="/aaos/new" class="btn btn-success">
                <font-awesome-icon :icon="faPlus"></font-awesome-icon>
                {{ lightbox.$sm('add.arr') }}
            </a>
            <a lightbox-open href="/vehicle_groups/new" class="btn btn-default">
                <font-awesome-icon :icon="faPlus"></font-awesome-icon>
                {{ lightbox.$sm('add.group') }}
            </a>
        </div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <div class="btn-group pull-right">
            <a
                class="btn btn-default btn-xs"
                lightbox-open
                href="https://www.youtube.com/embed/SQw3ChM7X70"
                v-if="$store.state.lang === 'de_DE'"
            >
                Erklärungsvideo
            </a>
            <a
                lightbox-open
                href="/aao_exports/new"
                class="btn btn-default btn-xs"
                :title="lightbox.$sm('export')"
            >
                <font-awesome-icon :icon="faFileExport"></font-awesome-icon>
            </a>
            <a
                lightbox-open
                href="/aao_categorys"
                class="btn btn-default btn-xs"
            >
                {{ lightbox.$sm('categories') }}
            </a>
            <button
                class="btn btn-danger btn-xs"
                @click="deleteAll"
                :title="lightbox.$sm('delete_all')"
            >
                <font-awesome-icon :icon="faTrash"></font-awesome-icon>
            </button>
        </div>
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
                    @delete="deleteARR(arr.id, arr.type, '', row.toString())"
                ></ARR>
            </div>
        </div>
        <div class="clearfix margined"></div>
        <tabs v-if="Object.keys(categories).length">
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
                            @delete="
                                deleteARR(
                                    arr.id,
                                    arr.type,
                                    title,
                                    row.toString()
                                )
                            "
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
                        @delete="deleteARR(arr.id, arr.type, title, '0')"
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
                @delete="deleteARR(arr.id, arr.type, '', '0')"
            ></ARR>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import { AAOsWindow } from '../parsers/aaos';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'aaos',
    'aaos',
    AAOsWindow,
    {
        faPlus: IconDefinition;
        faFileExport: IconDefinition;
        faTrash: IconDefinition;
    },
    {
        edit(id: number, type: 'arr' | 'vehicle_group'): void;
        copy(id: number, type: 'arr' | 'vehicle_group'): void;
        deleteARR(
            id: number,
            type: 'arr' | 'vehicle_group',
            category: string,
            row: '0' | '1' | '2' | '3' | '4' | '5' | '6'
        ): void;
        deleteAll(): void;
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
        return {
            faFileExport,
            faPlus,
            faTrash,
        };
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
        deleteARR(id, type, category, row) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            this.$modal.show('dialog', {
                title: this.lightbox.$sm(`delete.${type}.title`),
                text: this.lightbox.$sm(`delete.${type}.text`),
                buttons: [
                    {
                        title: this.lightbox.$sm('delete.cancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.lightbox.$sm('delete.confirm'),
                        async handler() {
                            const url = new URL(
                                window.location.href,
                                window.location.origin
                            );
                            url.searchParams.append('_method', 'delete');
                            url.searchParams.append(
                                'authenticity_token',
                                LSSM.aaos.authenticity_token
                            );
                            LSSM.$store
                                .dispatch('api/request', {
                                    url: `/${
                                        type === 'arr'
                                            ? 'aaos'
                                            : 'vehicle_groups'
                                    }/${id}`,
                                    init: {
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type':
                                                'application/x-www-form-urlencoded',
                                            'Upgrade-Insecure-Requests': '1',
                                        },
                                        refferer: new URL(
                                            type === 'arr'
                                                ? '/aaos'
                                                : `/vehicle_groups/${id}/edit`,
                                            window.location.origin
                                        ).toString(),
                                        body: url.searchParams.toString(),
                                        method: 'POST',
                                        mode: 'cors',
                                    },
                                })
                                .then(() => {
                                    LSSM.$set(
                                        LSSM.lightbox.data.categories[category],
                                        row,
                                        LSSM.lightbox.data.categories[category][
                                            row
                                        ].filter(({ id: aId }) => aId !== id)
                                    );
                                    LSSM.$modal.hide('dialog');
                                });
                        },
                    },
                ],
            });
        },
        deleteAll() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            this.$modal.show('dialog', {
                title: this.lightbox.$sm(`delete.all.title`),
                text: this.lightbox.$sm(`delete.all.text`),
                buttons: [
                    {
                        title: this.lightbox.$sm('delete.cancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.lightbox.$sm('delete.confirm'),
                        async handler() {
                            LSSM.$store
                                .dispatch('api/request', {
                                    url: '/aao/alle_loeschen',
                                })
                                .then(() => {
                                    Object.entries(
                                        LSSM.aaos.categories
                                    ).forEach(([category, rows]) => {
                                        Object.entries(rows).forEach(
                                            ([row, arrs]) =>
                                                LSSM.$set(
                                                    LSSM.lightbox.data
                                                        .categories[category],
                                                    row,
                                                    arrs.filter(
                                                        ({ type }) =>
                                                            type !== 'arr'
                                                    )
                                                )
                                        );
                                    });
                                    LSSM.$modal.hide('dialog');
                                });
                        },
                    },
                ],
            });
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
