<template>
    <table>
        <thead>
            <tr>
                <th>{{ moment_texts.titles.shorts.description }}</th>
                <th>{{ moment_texts.titles.shorts.variable }}</th>
                <th>{{ moment_texts.titles.shorts.example }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="short in shorts" :key="short[0]">
                <td>{{ short[1] }}</td>
                <td>
                    <code>{{ short[0] }}</code>
                </td>
                <td>
                    <span
                        class="momentjs-preview"
                        :data-moment="short[0]"
                    ></span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { defineComponent } from 'vue';

import moment from 'moment/min/moment-with-locales.min';

export default defineComponent({
    name: 'momentjs-short-forms',
    computed: {
        moment_texts() {
            return this.$theme.variables.moment[this.$lang];
        },
        shorts() {
            return Object.entries(this.moment_texts.shorts).sort(
                (a, b) => a[0].length - b[0].length
            );
        },
    },
    mounted() {
        moment.locale(this.$lang.replace(/_.*$/u, '').toUpperCase());
        this.$el
            .querySelectorAll('.momentjs-preview[data-moment]')
            .forEach(preview =>
                window.setInterval(
                    () =>
                        (preview.textContent = moment().format(
                            preview.dataset.moment
                        )),
                    1000
                )
            );
    },
});
</script>

<style scoped>
tr td {
    text-align: center;
}
</style>
