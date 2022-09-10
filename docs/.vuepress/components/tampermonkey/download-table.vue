<template>
    <table>
        <thead>
            <tr>
                <th>{{ variables.tables[lang].browser }}</th>
                <th>{{ variables.tables[lang].link }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(url, browser) in browsers" :key="browser">
                <td>{{ browser }}</td>
                <td>
                    <a :href="url" target="_blank">
                        {{ variables.tables[lang].download }}
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { usePageData } from '@vuepress/client';

import type { DefaultThemePageData } from '@vuepress/theme-default/lib/shared';

const pageData = usePageData<DefaultThemePageData>();
const variables = __VAR__;

const browsers = {
    Chrome: 'https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
    Firefox: 'https://addons.mozilla.org/firefox/addon/tampermonkey/',
    Opera: 'https://addons.opera.com/extensions/details/tampermonkey-beta/',
};

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
</script>
