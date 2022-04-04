<template>
    <main class="page">
        <slot name="top" />

        <div class="theme-default-content">
            <template v-if="isModule">
                <h1>
                    {{ moduleI18n.name }}
                    <a
                        v-if="moduleRegistration.github"
                        :href="githubIssueLink"
                        :title="`Issue #${moduleRegistration.github} on GitHub`"
                        target="_blank"
                    >
                        <span
                            class="icon"
                            v-html="
                                octicons['mark-github'].toSVG({
                                    class: 'invertible-icon github-icon',
                                })
                            "
                        ></span>
                    </a>
                </h1>
                <blockquote>
                    <p>
                        <span
                            class="icon description-icon"
                            v-html="
                                octicons['info'].toSVG({
                                    class: 'invertible-icon',
                                })
                            "
                        ></span>
                        <b>{{ moduleI18n.description }}</b>
                    </p>
                </blockquote>

                <blockquote v-if="additionalBlockquote">
                    <p v-if="moduleRegistration.settings">
                        <span
                            class="icon"
                            v-html="
                                octicons['gear'].toSVG({
                                    class: 'invertible-icon',
                                })
                            "
                        ></span>
                        {{ i18n.head.settings }}
                    </p>
                    <p v-if="moduleRegistration.alpha">
                        <span
                            class="icon"
                            v-html="
                                octicons['beaker'].toSVG({
                                    class: 'invertible-icon',
                                })
                            "
                        ></span>
                        {{ i18n.head.alpha }}
                    </p>
                    <p v-if="moduleRegistration.dev">
                        <span
                            class="icon"
                            v-html="
                                octicons['bug'].toSVG({
                                    class: 'invertible-icon',
                                })
                            "
                        ></span>
                        {{ i18n.head.dev }}
                    </p>
                </blockquote>

                <div
                    v-if="moduleRegistration.mapkitNote"
                    class="custom-container danger"
                >
                    <p class="custom-container-title">Mapkit</p>
                    <p>{{ i18n.head.mapkit }}</p>
                </div>
            </template>
            <div v-if="frontmatter.empty" class="custom-container warning">
                <p class="custom-container-title">
                    {{ i18n['404'].modules.title }}
                </p>
                <p v-html="emptyMessageContent"></p>
                <div v-if="docsAvailable.length">
                    {{ i18n['404'].modules.languages }}
                    <ul>
                        <li v-for="lang in docsAvailable" :key="lang">
                            <AutoLink
                                :item="{
                                    link: `/${lang}/modules/${moduleId}/`,
                                    text: themeData.locales['/' + lang + '/']
                                        .selectLanguageText,
                                }"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <Content v-else />
        </div>

        <PageMeta />

        <PageNav />

        <slot name="bottom" />
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AutoLink from '@theme/AutoLink.vue';
import octicons from '@primer/octicons';
import PageMeta from '@theme/PageMeta.vue';
import PageNav from '@theme/PageNav.vue';
import { useThemeData } from '@vuepress/theme-default/lib/client';
import { usePageData, usePageFrontmatter } from '@vuepress/client';

import type { Frontmatter } from '../../utils/generate/modules';
import type { ThemeData } from '../../types/ThemeData';
import type {
    DefaultThemeNormalPageFrontmatter,
    DefaultThemePageData,
} from '@vuepress/theme-default/lib/shared';

type ModuleFrontmatter = DefaultThemeNormalPageFrontmatter & Frontmatter;

const frontmatter = usePageFrontmatter<ModuleFrontmatter>();
const pageData = usePageData<DefaultThemePageData>();
const themeData = useThemeData<ThemeData>();

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
const i18n = computed(() => themeData.value.variables.i18n[lang.value]);

const isModule = computed(
    () => pageData.value.path.split('/')[2] === 'modules'
);
const moduleId = computed(() =>
    isModule ? pageData.value.path.split('/')[3] : ''
);
const moduleRegistration = computed(() =>
    isModule
        ? themeData.value.variables.modules[moduleId.value].registration
        : null
);
const githubIssueLink = computed(() => {
    if (!isModule.value || !moduleRegistration.value.github) return '';
    return `${themeData.value.variables.github}/issues/${moduleRegistration.value.github}`;
});
const additionalBlockquote = computed(
    () =>
        isModule.value &&
        (moduleRegistration.value.settings ||
            moduleRegistration.value.alpha ||
            moduleRegistration.value.dev)
);
const moduleI18n = computed(() =>
    isModule
        ? themeData.value.variables.modules[moduleId.value].translations[
              lang.value
          ]
        : null
);

const emptyMessageContent = computed(() =>
    i18n.value['404'].modules.content
        .replace(/\n/gu, '<br>')
        .replace(/\{\{module\}\}/gu, `<b>${moduleI18n.value.name}</b>`)
        .replace(/\{\{lang\}\}/gu, `<code>${lang.value}</code>`)
        .replace(
            /\{\{github\}\}/gu,
            `<a href="${themeData.value.variables.github}/new/dev/src/modules/${moduleId.value}/docs?filename=${lang.value}.md" target="_blank">GitHub</a>`
        )
        .replace(
            /\{\{docs_dir\}\}/gu,
            `<a href="${themeData.value.variables.github}/tree/dev/src/modules/${moduleId.value}/docs" target="_blank">docs directory</a>`
        )
);

const docsAvailable = computed(() =>
    isModule ? themeData.value.variables.modules[moduleId.value].docs : null
);
</script>

<style lang="sass" scoped>
.description-icon::after
    content: " "

.icon ::v-deep(.octicon:not(.github-icon))
    vertical-align: text-top

.icon ::v-deep(.github-icon)
    width: calc(1.5ex + 1px) // to avoid icon being cut off at right border
    height: 1.5ex

html.dark .icon ::v-deep(.invertible-icon)
    filter: invert(100%)
</style>
