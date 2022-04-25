<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t.tables.module }}</th>
                <th>{{ $t.tables.annotations }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in modules" :key="module.name">
                <td>
                    {{ module.name }}
                </td>
                <td>{{ module.annotation }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { usePageData } from '@vuepress/client';
import { useThemeData } from '@vuepress/theme-default/lib/client';

import type { DefaultThemePageData } from '@vuepress/theme-default/lib/shared';
import type { ThemeData } from '../../types/ThemeData';

const pageData = usePageData<DefaultThemePageData>();
const themeData = useThemeData<ThemeData>();

const comparison = themeData.value.variables.v3Comparison;

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
const $t = computed(() => comparison.translations[lang.value]);
const modules = computed(() =>
    comparison.v3only
        .map(module => ({
            name: $t.value.modules[module]?.v3Name ?? module,
            annotation: $t.value.modules[module]?.annotation ?? '',
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
);
</script>

<style scoped>
table {
    text-align: center;
}
</style>
