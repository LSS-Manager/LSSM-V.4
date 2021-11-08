<template>
    <div>
        <div class="head" ref="head">
            <slot name="head"></slot>
            <label class="pull-right" v-if="!noSearch">
                <input
                    type="search"
                    ref="searchField"
                    class="search_input_field"
                    :value="search"
                    @input="$emit('search', $refs.searchField.value)"
                    :placeholder="
                        searchPlaceholder ? searchPlaceholder : $t('search')
                    "
                    :title="
                        searchPlaceholder ? searchPlaceholder : $t('search')
                    "
                />
            </label>
        </div>
        <button
            class="btn btn-default toggle-head-btn hidden"
            ref="toggleHeadBtn"
            @click="$refs.head.classList.toggle('shown')"
        >
            <font-awesome-icon :icon="faSlidersH"></font-awesome-icon>
        </button>
        <table v-bind="tableAttrs" ref="table">
            <thead>
                <tr>
                    <th
                        v-for="(item, key) in head"
                        :key="key"
                        v-bind="item.attrs"
                        :class="{ noSort: item.noSort }"
                        @click="!item.noSort && $emit('sort', key)"
                        :title="titleAttr(item)"
                    >
                        {{ item.title }}
                        <font-awesome-icon
                            v-if="!item.noSort"
                            class="pull-right"
                            :icon="
                                key === sort
                                    ? sortDir === 'asc'
                                        ? faSortDown
                                        : faSortUp
                                    : faSort
                            "
                        ></font-awesome-icon>
                    </th>
                </tr>
            </thead>
            <tbody v-if="!noBody">
                <slot></slot>
            </tbody>
            <slot v-else></slot>
            <tfoot>
                <slot name="foot"></slot>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';

import { DefaultComputed } from 'vue/types/options';
import {
    EnhancedTableData,
    EnhancedTableMethods,
    EnhancedTableProps,
} from '../../typings/components/Enhanced-Table';

export default Vue.extend<
    EnhancedTableData,
    EnhancedTableMethods,
    DefaultComputed,
    EnhancedTableProps
>({
    name: 'enhancedTable',
    data() {
        return {
            faSort,
            faSortUp,
            faSortDown,
            faSlidersH,
        };
    },
    props: {
        head: {
            type: Object,
            required: true,
        },
        sort: {
            type: String,
            required: false,
            default() {
                return Object.keys(this.head)[0];
            },
        },
        sortDir: {
            type: String,
            required: false,
            validator: value => ['asc', 'desc'].includes(value),
        },
        noSearch: {
            type: Boolean,
            required: false,
            default: false,
        },
        search: {
            type: String,
            required: false,
            default: '',
        },
        searchPlaceholder: {
            type: String,
            required: false,
            default: '',
        },
        tableAttrs: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        noBody: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        titleAttr(i) {
            return i.titleAttr ?? i.title;
        },
    },
    mounted() {
        document.addEventListener('scroll', () => {
            const head = this.$refs.head as HTMLDivElement | null;
            const table = this.$refs.table as HTMLTableElement | null;
            const btn = this.$refs.toggleHeadBtn as HTMLButtonElement | null;
            if (!head || !table || !btn) return;
            const above = (table.getBoundingClientRect().top ?? 0) < 0;
            if (above) {
                btn.classList.remove('hidden');
                head.classList.add('fixed');
            } else {
                btn.classList.add('hidden');
                head.classList.remove('fixed');
            }
        });
    },
});
</script>

<style scoped lang="sass">
thead
    position: sticky
    top: 0

    th:not(.noSort)
        cursor: pointer

.head
    display: flex
    justify-content: end
    align-items: end

    &.fixed
        position: fixed
        top: 1rem
        z-index: 1
        right: 6rem
        background: #a0a0a0af
        padding: .5rem
        border-radius: 15px

        &:not(.shown)
            display: none

    > *
        margin-left: 1rem

.toggle-head-btn
    position: fixed
    top: 1rem
    z-index: 1
    right: 4rem
</style>
