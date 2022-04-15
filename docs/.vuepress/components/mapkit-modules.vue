<template>
    <div>
        <ul>
            <li
                v-for="[module, { translations }] in noMapkitModules"
                :key="module"
            >
                <AutoLink
                    :item="{
                        link: `/${lang}/modules/${module}/`,
                        text: translations[lang].name,
                    }"
                />
            </li>
        </ul>
        <div>
            {{ settingsText }}:
            <ul>
                <li
                    v-for="(settings, module) in themeData.variables
                        .noMapkitSettings"
                    :key="module"
                >
                    <AutoLink
                        :item="{
                            link: `/${lang}/modules/${module}/`,
                            text:
                                themeData.variables.modules[module]
                                    .translations[lang]?.name ?? '',
                        }"
                    />:
                    <ul>
                        <li
                            v-for="setting in settings"
                            :key="`${module}_${setting}`"
                        >
                            {{
                                themeData.variables.modules[module]
                                    .translations[lang].settings[setting]
                                    ?.title ?? setting
                            }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs } from 'vue';

import AutoLink from '@theme/AutoLink.vue';
import { usePageData } from '@vuepress/client';
import { useThemeData } from '@vuepress/theme-default/lib/client';

import type { DefaultThemePageData } from '@vuepress/theme-default/lib/shared';
import type { ThemeData } from '../types/ThemeData';

const pageData = usePageData<DefaultThemePageData>();
const themeData = useThemeData<ThemeData>();

const props = defineProps({
    settingsText: {
        type: String,
        required: true,
    },
});

const { settingsText } = toRefs(props);

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
const noMapkitModules = computed(() =>
    Object.entries(themeData.value.variables.modules).filter(
        ([, module]) => module.registration.noMapkit
    )
);
</script>
