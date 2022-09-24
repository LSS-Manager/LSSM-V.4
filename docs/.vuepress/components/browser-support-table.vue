<template>
    <table>
        <thead>
            <tr>
                <th>{{ variables.tables[lang].browser }}</th>
                <th>{{ variables.tables[lang].minVersion }}</th>
                <th>{{ variables.tables[lang].download }}</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="({ supported, download }, browser) in variables.browsers"
                :key="browser"
            >
                <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
                <td>{{ supported }}</td>
                <td>
                    <a :href="download" target="_blank">
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

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
</script>
