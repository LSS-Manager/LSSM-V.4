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
                    <td>
                        <span
                            v-for="(example, index) in examples[categoryName]"
                            :key="`${categoryName}-${index}`"
                        >
                            <template v-if="typeof example === 'string'">
                                ...
                            </template>
                            <code
                                class="momentjs-preview"
                                :data-date="example.toISOString()"
                                :data-moment="variable"
                                v-else
                            ></code>
                            &nbsp;
                        </span>
                    </td>
                    <td>{{ description }}</td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>
import { defineComponent } from 'vue';

import moment from 'moment/min/moment-with-locales.min';

export default defineComponent({
    name: 'momentjs-variables',
    data() {
        return {
            examples: {
                ampm: [
                    new Date(new Date().setHours(5)),
                    new Date(new Date().setHours(15)),
                ],
                dom: [
                    new Date(new Date().setDate(3)),
                    new Date(new Date().setDate(24)),
                ],
                dow: [
                    new Date('1970-01-05'),
                    new Date('1970-01-06'),
                    '',
                    new Date('1970-01-03'),
                    new Date('1970-01-04'),
                ],
                doy: [
                    new Date('1970-01-05'),
                    new Date('1970-03-14'),
                    new Date('1970-08-16'),
                ],
                hour: [
                    new Date(new Date().setHours(5)),
                    new Date(new Date().setHours(15)),
                ],
                minute: [
                    new Date(new Date().setMinutes(5)),
                    new Date(new Date().setMinutes(15)),
                ],
                month: [
                    new Date('1970-01-03'),
                    new Date('1970-02-03'),
                    '',
                    new Date('1970-11-03'),
                    new Date('1970-12-03'),
                ],
                quarter: [
                    new Date('1970-01-03'),
                    new Date('1970-04-03'),
                    new Date('1970-07-03'),
                    new Date('1970-10-03'),
                ],
                second: [
                    new Date(new Date().setSeconds(5)),
                    new Date(new Date().setSeconds(15)),
                ],
                week: [
                    new Date('1970-01-01'),
                    new Date('1970-01-08'),
                    '',
                    new Date('1970-12-24'),
                    new Date('1970-12-31'),
                ],
                year: [
                    new Date('1970-01-03'),
                    new Date('1971-02-03'),
                    '',
                    new Date('2029-11-03'),
                    new Date('2030-12-03'),
                ],
            },
        };
    },
    computed: {
        moment_texts() {
            return this.$theme.variables.moment[this.$lang];
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
        moment.locale(this.$lang.replace(/_.*$/u, '').toUpperCase());
        this.$el
            .querySelectorAll('.momentjs-preview[data-moment][data-date]')
            .forEach(
                preview =>
                    (preview.textContent = moment(preview.dataset.date).format(
                        preview.dataset.moment
                    ))
            );
    },
});
</script>

<style scoped>
tr td {
    text-align: center;
}
</style>
