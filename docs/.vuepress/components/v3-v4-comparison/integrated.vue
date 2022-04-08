<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t.tables.feature }} V.3</th>
                <th>{{ $t.tables.module }} V.4</th>
                <th>{{ $t.tables.setting }} V.4</th>
                <th>
                    {{ $t.tables.changes }} /
                    {{ $t.tables.annotations }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in $modules" :key="module.id">
                <td>
                    {{ module.v3Name }}
                </td>
                <td>
                    <router-link
                        :to="`modules/${module.v4Id}/`"
                        v-if="module.id !== 'releaseNotes'"
                    >
                        {{ module.v4Name }}
                    </router-link>
                </td>
                <td>
                    <template v-if="module.setting">
                        {{ module.setting }}
                    </template>
                </td>
                <td>
                    {{ module.annotation }}
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
import type { ThemeData } from '../../types/ThemeData';

const pageData = usePageData<DefaultThemePageData>();
const themeData = useThemeData<ThemeData>();

const comparison = themeData.value.variables.v3Comparison;
const updated = comparison.updated;

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
const $t = computed(() => comparison.translations[lang.value]);
const $modules = computed(() =>
    Object.entries(updated)
        .map(([module, details]) => {
            return {
                id: module,
                v4Id: details.module,
                v3Name: $t.value.modules[module]?.v3Name ?? module,
                annotation: $t.value.modules[module]?.annotation ?? '',
                v4Name:
                    themeData.value.variables.modules[details.module]
                        ?.translations?.[lang.value]?.name ?? module,
                setting:
                    themeData.value.variables.modules[details.module]
                        ?.translations?.[lang.value]?.settings?.[
                        details.setting
                    ]?.title ?? details.setting,
            };
        })
        .sort((a, b) => a.v3Name.localeCompare(b.v3Name))
);
</script>

<style scoped>
table {
    text-align: center;
}
</style>
