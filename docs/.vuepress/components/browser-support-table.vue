<template>
    <table>
        <thead>
            <tr>
                <th>{{ themeData.variables.tables[lang].browser }}</th>
                <th>{{ themeData.variables.tables[lang].minVersion }}</th>
                <th>{{ themeData.variables.tables[lang].download }}</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="({ supported, download }, browser) in themeData.variables
                    .browsers"
                :key="browser"
            >
                <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
                <td>{{ supported }}</td>
                <td>
                    <a :href="download" target="_blank">
                        {{ themeData.variables.tables[lang].download }}
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { usePageData } from '@vuepress/client';
import { useThemeData } from '@vuepress/theme-default/lib/client';

import type { DefaultThemePageData } from '@vuepress/theme-default/lib/shared';
import type { ThemeData } from '../types/ThemeData';

const pageData = usePageData<DefaultThemePageData>();
const themeData = useThemeData<ThemeData>();

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
</script>
