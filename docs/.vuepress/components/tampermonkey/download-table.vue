<template>
    <table>
        <thead>
            <tr>
                <th>{{ $theme.variables.tables[lang].browser }}</th>
                <th>{{ $theme.variables.tables[lang].link }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(url, browser) in browsers" :key="browser">
                <td>{{ browser }}</td>
                <td>
                    <a :href="url" target="_blank">
                        {{ $theme.variables.tables[lang].download }}
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'tampermonkey-download-table',
    data() {
        return {
            browsers: {
                Chrome: 'https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
                Firefox:
                    'https://addons.mozilla.org/firefox/addon/tampermonkey/',
                Opera: 'https://addons.opera.com/extensions/details/tampermonkey-beta/',
            },
        };
    },
    computed: {
        lang() {
            return this.$lang.replace(/-/, '_');
        },
    }
});
</script>
