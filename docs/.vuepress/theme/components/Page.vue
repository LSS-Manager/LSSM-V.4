<template>
    <main class="page">
        <slot name="top" />

        <div class="theme-default-content">
            <template v-if="frontmatter.module">
                <h1>
                    {{ frontmatter.title }}
                    <a
                        v-if="frontmatter.github"
                        :href="githubLink"
                        :title="`Issue #${frontmatter.github} on GitHub`"
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
                        <b>{{ frontmatter.description }}</b>
                    </p>
                </blockquote>

                <blockquote v-if="additionalBlockquote">
                    <p v-if="frontmatter.settings">
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
                    <p v-if="frontmatter.alpha">
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
                    <p v-if="frontmatter.dev">
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
                    v-if="frontmatter.mapkitNote"
                    class="custom-container danger"
                >
                    <p class="custom-container-title">Mapkit</p>
                    <p>{{ i18n.head.mapkit }}</p>
                </div>
            </template>
            <Content />
        </div>

        <PageMeta />

        <PageNav />

        <slot name="bottom" />
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeData } from '@vuepress/theme-default/lib/client';
import { usePageData, usePageFrontmatter } from '@vuepress/client';

import PageMeta from '@theme/PageMeta.vue';
import PageNav from '@theme/PageNav.vue';

import octicons from '@primer/octicons';

import type { ThemeData } from '../../types/ThemeData';
import type {
    DefaultThemeNormalPageFrontmatter,
    DefaultThemePageData,
} from '@vuepress/theme-default/lib/shared';

interface ModuleFrontmatter extends DefaultThemeNormalPageFrontmatter {
    module: boolean;
    description: string;
    github?: number;
    settings?: boolean;
    alpha?: boolean;
    dev?: boolean;
    mapkitNote?: boolean;
}

const frontmatter = usePageFrontmatter<ModuleFrontmatter>();
const pageData = usePageData<DefaultThemePageData>();
const themeData = useThemeData<ThemeData>();

const githubLink = computed(
    () =>
        `${themeData.value.variables.github}/issues/${frontmatter.value.github}`
);
const additionalBlockquote = computed(
    () =>
        frontmatter.value.settings ||
        frontmatter.value.alpha ||
        frontmatter.value.dev
);
const i18n = computed(
    () => themeData.value.variables.i18n[pageData.value.lang]
);
</script>

<style lang="sass" scoped>
.description-icon::after
    content: " "

.icon ::v-deep(.octicon:not(.github-icon))
    vertical-align: text-top

.icon ::v-deep(.github-icon)
    width: 1.5ex
    height: 1.5ex

html.dark .icon ::v-deep(.invertible-icon)
    filter: invert(100%)
</style>
