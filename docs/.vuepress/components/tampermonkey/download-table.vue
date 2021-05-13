<template>
    <table>
        <thead>
            <tr>
                <th>Browser</th>
                <th>Link</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(url, browser) in browsers" :key="browser">
                <td>{{ browser }}</td>
                <td><a :href="url" target="_blank">download</a></td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'tampermonkey-download-table',
    data() {
        return {
            browsers: {
                Chrome:
                    'https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
                Firefox:
                    'https://addons.mozilla.org/firefox/addon/tampermonkey/',
                Opera:
                    'https://addons.opera.com/extensions/details/tampermonkey-beta/',
            },
        };
    },
});
</script>
