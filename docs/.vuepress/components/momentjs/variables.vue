<template>
    <table>
        <thead>
            <tr>
                <th>{{ titles.category }}</th>
                <th>{{ titles.variable }}</th>
                <th>{{ titles.output }}</th>
                <th>{{ titles.description }}</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="categoryName in categoryOrder">
                <tr
                    v-for="(description, variable, index) in categories[
                        categoryName
                    ]"
                    :key="variable"
                >
                    <td>
                        <template v-if="!index">
                            {{ titles[categoryName] }}
                        </template>
                    </td>
                    <td>{{ variable }}</td>
                    <td>:)</td>
                    <td>{{ description }}</td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>
import Vue from 'vue';

import moment from 'moment';

export default Vue.extend({
    name: 'momentjs-short-forms',
    data() {
        return {
            examples: {

            }
        }
    },
    computed: {
        moment_texts() {
            return this.$themeConfig.variables.moment[this.$lang];
        },
        titles() {
            return this.moment_texts.titles.variables;
        },
        categories() {
            return this.moment_texts.variables;
        },
        categoryOrder() {
            return this.categories.order;
        },
    },
    mounted() {
        moment.locale(this.$lang.replace(/_.*?$/, '').toUpperCase());
    },
});
</script>

<style scoped>
tr td {
    text-align: center;
}
</style>
