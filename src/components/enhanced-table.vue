<template>
    <div>
        <div class="head">
            <slot name="head"></slot>
            <label class="pull-right" v-if="!noSearch">
                <input
                    type="search"
                    ref="searchField"
                    class="search_input_field"
                    :value="search"
                    @input="$emit('search', $refs.searchField.value)"
                    :placeholder="$t('search')"
                />
            </label>
        </div>
        <table v-bind="tableAttrs">
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
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import {
    EnhancedTableData,
    EnhancedTableMethods,
    EnhancedTableProps,
} from '../../typings/components/Enhanced-Table';
import { DefaultComputed } from 'vue/types/options';

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
});
</script>

<style scoped lang="sass">
thead th:not(.noSort)
    cursor: pointer

.head
    display: flex
    justify-content: end
    align-items: end

    > *
        margin-left: 1rem
</style>
