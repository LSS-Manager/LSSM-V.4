<template>
    <div>
        <div class="head" :class="{ shown: showHead, fixed: scrolledOver }">
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
import { computed, nextTick, onMounted, ref } from 'vue';

import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';

import { useI18n } from '../i18n';

import type { Column } from 'typings/components/EnhancedTable';

const { $t } = useI18n();

const searchField = ref<HTMLInputElement>();
const table = ref<HTMLTableElement>();

const scrolledOver = ref<boolean>(false);
const showHead = ref<boolean>(true);

const tableRight = ref<string>('0px');

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

onMounted(() => {
    document.addEventListener('scroll', () => {
        const clientRect = table.value?.getBoundingClientRect();
        scrolledOver.value =
            (clientRect?.top ?? 0) < 0 && (clientRect?.bottom ?? 0) > 0;
        tableRight.value = `${clientRect?.right ?? 0}px`;
    });

    if (!props.sort) $emit('sort', props.columns[0].key);

    nextTick(() => $emit('mounted'));
});
</script>

<style scoped lang="sass">
$table-right: v-bind(tableRight)
$right-end: calc(100vw - $table-right + 1rem)
$btn-width: 34px
$padding: .5rem

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
        top: 1rem
        z-index: 1
        right: calc($right-end + $btn-width)

        &:not(.shown)
            display: none

    > *
        margin-left: 1rem

.toggle-head-btn
    position: fixed
    top: 1rem + $padding
    z-index: 1
    right: $right-end
</style>
