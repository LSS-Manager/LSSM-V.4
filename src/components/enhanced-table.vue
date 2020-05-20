<template>
    <div>
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
        <table v-bind="tableAttrs">
            <thead>
                <tr>
                    <th
                        v-for="(item, key) in head"
                        :key="key"
                        v-bind="item.attrs"
                        @click="$emit('sort', key)"
                    >
                        {{ item.title }}
                        <font-awesome-icon
                            class="pull-right"
                            :icon="
                                `sort${
                                    key === sort
                                        ? sortDir === 'asc'
                                            ? '-down'
                                            : '-up'
                                        : ''
                                }`
                            "
                        ></font-awesome-icon>
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
            <tfoot>
                <slot name="foot"></slot>
            </tfoot>
        </table>
    </div>
</template>

<script>
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';

export default {
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
            default: () => {},
        },
    },
};
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
