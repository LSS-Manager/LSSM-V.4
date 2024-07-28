<template>
    <div>
        <div
            ref="head"
            class="head"
            :class="{ shown: showHead && headHasChildren, fixed: scrolledOver }"
        >
            <slot name="head"></slot>
            <label class="pull-right" v-if="!noSearch">
                <input
                    type="search"
                    ref="searchField"
                    class="search_input_field"
                    :value="search"
                    @input="updateSearch"
                    :placeholder="searchInputPlaceholder"
                    :title="searchInputPlaceholder"
                />
            </label>
        </div>
        <button
            v-if="headHasChildren"
            class="btn btn-default toggle-head-btn"
            :class="{ hidden: !scrolledOver }"
            @click.prevent="showHead = !showHead"
        >
            <font-awesome-icon :icon="faSlidersH"></font-awesome-icon>
        </button>
        <table v-bind="tableAttrs" ref="table">
            <thead>
                <tr>
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        v-bind="column.attrs"
                        :class="{ noSort: column.noSort }"
                        @click="!column.noSort && $emit('sort', column.key)"
                        :title="titleAttr(column)"
                    >
                        {{ colTitle(column) }}
                        <font-awesome-icon
                            v-if="!column.noSort"
                            class="pull-right"
                            :icon="column.key === sort ? sortIcon : faSort"
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

<script setup lang="ts" generic="ColumnKey extends string = string">
import type Vue from 'vue';
// eslint-disable-next-line no-duplicate-imports
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';

import { useI18n } from '../i18n';

import type { Column } from 'typings/components/EnhancedTable';

const { $t } = useI18n();

const searchField = ref<HTMLInputElement>();
const table = ref<HTMLTableElement>();
const head = ref<HTMLDivElement>();

const scrolledOver = ref<boolean>(false);
const showHead = ref<boolean>(true);

const tableRight = ref<string>('0px');
const headHeight = ref<string>('0px');
const scrollParentTop = ref<string>('0px');

const props = withDefaults(
    defineProps<{
        columns: Column<ColumnKey, boolean>[];
        columnTranslations?: Record<ColumnKey, string>;
        sort?: ColumnKey;
        sortDir?: 'asc' | 'desc';
        noSearch?: boolean;
        search?: string;
        searchPlaceholder?: string;
        tableAttrs?: Record<string, unknown>;
        noBody?: boolean;
    }>(),
    {
        columnTranslations: () => ({}),
        sort: '',
        sortDir: 'asc',
        noSearch: false,
        search: '',
        searchPlaceholder: '',
        tableAttrs: () => ({}),
        noBody: false,
    }
);

const searchInputPlaceholder = computed(
    () => props.searchPlaceholder || $t('search')
);

const sortIcon = computed(() =>
    props.sortDir === 'asc' ? faSortDown : faSortUp
);

const headHasChildren = computed(
    () =>
        Array.from(head.value?.childNodes ?? []).filter(n => {
            if (n.nodeType === Node.COMMENT_NODE) return false;
            return !(
                n.nodeType === Node.TEXT_NODE &&
                (n.textContent?.trim().length ?? 0) === 0
            );
        }).length
);

const colTitle = (col: Column<ColumnKey, boolean>) =>
    props.columnTranslations[col.key] ?? col.title;
const titleAttr = (col: Column<ColumnKey, boolean>) =>
    col.titleAttr ?? colTitle(col);

const $emit = defineEmits<{
    (event: 'mounted'): void;
    (event: 'search', search: string): void;
    (event: 'sort', column: ColumnKey): void;
}>();

const updateSearch = () =>
    $emit('search', searchField.value?.value.trim() ?? '');

watch(table, (t, old) => {
    if (old || !t) return;
    const scrollParent = (window[PREFIX] as Vue).$utils.getScrollParent(t);
    if (!scrollParent) return;
    scrollParent.addEventListener('scroll', () => {
        const clientRect = table.value?.getBoundingClientRect();
        const parentRect = scrollParent.getBoundingClientRect();
        const headRect = head.value?.getBoundingClientRect();

        const unFixedHeadHeight = head.value?.classList.contains('fixed')
            ? parseFloat(headHeight.value)
            : (headRect?.height ?? 0);

        const top = parentRect.top - unFixedHeadHeight;

        scrolledOver.value =
            (clientRect?.top ?? 0) <= top && (clientRect?.bottom ?? 0) > top;
        tableRight.value = `${clientRect?.right ?? 0}px`;
        headHeight.value = `${unFixedHeadHeight}px`;
        scrollParentTop.value = `${parentRect.top}px`;
    });
});

onMounted(() => {
    if (!props.sort) $emit('sort', props.columns[0].key);

    nextTick(() => $emit('mounted'));
});
</script>

<style scoped lang="sass">
$table-right: v-bind(tableRight)
$head-height: v-bind(headHeight)
$scroll-parent-top: v-bind(scrollParentTop)
$padding: .5rem
$btn-width: 40px
$right-end: calc(100vw - $table-right + $padding)
$fixed-top: calc($scroll-parent-top + $padding)

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
        background: #a0a0a0af
        padding: $padding
        border-radius: 15px
        position: fixed
        top: $fixed-top
        z-index: 1
        right: calc($right-end + $btn-width + $padding)

        &:not(.shown)
            display: none

        ~ table
            margin-top: $head-height

    > *
        margin-left: 1rem

.toggle-head-btn
    min-width: $btn-width
    max-width: $btn-width
    position: fixed
    top: $fixed-top
    z-index: 1
    right: $right-end
</style>
