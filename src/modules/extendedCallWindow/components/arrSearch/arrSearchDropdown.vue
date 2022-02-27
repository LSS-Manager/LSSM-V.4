<template>
    <v-select
        :id="id"
        :options="arrs"
        :clearable="false"
        multiple
        :placeholder="$sm('settings.arrSearch.title')"
        :selectable="option => !option.category"
        :close-on-select="closeDropdownOnSelect"
        :clear-search-on-select="false"
        :components="{ Deselect }"
        @option:selecting="selected"
        v-model="clickedARRs"
    >
        <div slot="no-options">
            {{ $t('noOptions') }}
        </div>
        <template #option="option">
            <a v-if="!option.category" v-html="option.html"></a>
            <b v-else>{{ option.label }}</b>
        </template>
        <template #selected-option="option">
            <a v-html="option.html"></a>
        </template>
    </v-select>
</template>

<script lang="ts">
import Vue from 'vue';

import type { $m } from 'typings/Module';
import type { DefaultComputed } from 'vue/types/options';
import type { VueSelectProps } from 'vue-select';

interface ARROption {
    label: string;
    id: string;
    html: string;
}

type ARRs = (ARROption | { label: string; id: string; category: true })[];

export default Vue.extend<
    {
        id: string;
        arrs: ARRs;
        Deselect: VueSelectProps['components']['Deselect'];
        clickedARRs: ARRs;
    },
    { selected(option: ARROption): void },
    DefaultComputed,
    { closeDropdownOnSelect: boolean; $sm: $m }
>({
    name: 'lssmv4-ecw-arr-search-dropdown',
    components: {
        VSelect: () =>
            import(
                /* webpackChunkName: "components/vue-select" */ 'vue-select'
            ),
    },
    data() {
        const getOptionFromARRElement = (
            arr: HTMLAnchorElement
        ): ARROption => ({
            label: (arr.title || arr.textContent?.trim()) ?? '',
            id: `${PREFIX}_${arr.id}`,
            html: arr.outerHTML.replace(
                new RegExp(`(?<=id=")(?=${arr.id}")`),
                `${PREFIX}_`
            ),
        });

        const arrs: ARRs = [];
        arrs.push(
            ...Array.from(
                document.querySelectorAll<HTMLAnchorElement>(
                    '#mission_aao_no_category .aao_searchable, #aao_without_category .aao_searchable'
                )
            ).map(getOptionFromARRElement)
        );
        const arrCategories: [string, string][] = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(
                '#aao-tabs > li > a[href^="#aao_category_"]'
            )
        ).map(category => [
            category.textContent?.trim() ?? '',
            category.getAttribute('href') ?? '',
        ]);
        arrCategories.forEach(([name, id]) =>
            arrs.push(
                { label: name, id, category: true },
                ...Array.from(
                    document.querySelectorAll<HTMLAnchorElement>(
                        `${id} .aao_searchable`
                    )
                ).map(getOptionFromARRElement)
            )
        );
        return {
            id: this.$store.getters.nodeAttribute('ecw-arr_search-dropdown'),
            arrs,
            Deselect: {
                render: createElement => createElement(),
            },
            clickedARRs: [],
        };
    },
    methods: {
        selected(option) {
            document
                .querySelector<HTMLAnchorElement>(
                    `#mission-aao-group #${option.id.replace(`${PREFIX}_`, '')}`
                )
                ?.click();
        },
    },
    props: {
        closeDropdownOnSelect: {
            type: Boolean,
            required: true,
        },
        $sm: {
            type: Function,
            required: true,
        },
    },
    mounted() {
        const updateARR = (arr: HTMLAnchorElement) => {
            if (arr.getAttribute('reset') === 'true')
                this.$set(this, 'clickedARRs', []);
            const arrOption = this.arrs.find(
                ({ id }) => id === `${PREFIX}_${arr.id}`
            );
            if (arrOption && 'html' in arrOption) {
                arrOption.html = arr.outerHTML.replace(
                    new RegExp(`(?<=id=")(?=${arr.id}")`),
                    `${PREFIX}_`
                );
            }
        };

        this.$store
            .dispatch('hook', {
                event: 'aaoClickHandler',
                post: true,
                callback: updateARR,
            })
            .then();

        this.$store
            .dispatch('hook', {
                event: 'vehicleGroupClickHandler',
                post: true,
                callback: updateARR,
            })
            .then();

        this.$store
            .dispatch('hook', {
                event: 'aao_available',
                post: true,
                callback(id: number) {
                    const arr = document.querySelector<HTMLAnchorElement>(
                        `#mission-aao-group #aao_${id}`
                    );
                    if (arr) updateARR(arr);
                },
            })
            .then();

        this.$store
            .dispatch('hook', {
                event: 'vehicle_group_available',
                post: true,
                callback(id: number) {
                    const arr = document.querySelector<HTMLAnchorElement>(
                        `#mission-aao-group #vehicle_group_${id}`
                    );
                    if (arr) updateARR(arr);
                },
            })
            .then();

        this.$store
            .dispatch('hook', {
                event: 'vehicleSelectionReset',
                callback: () => this.$set(this, 'clickedARRs', []),
            })
            .then();

        const hideStyle = document.createElement('style');
        hideStyle.textContent = `#mission-aao-group > *:not(#${this.id}) {
            display: none;
        }`;
        document.head.append(hideStyle);
    },
});
</script>
