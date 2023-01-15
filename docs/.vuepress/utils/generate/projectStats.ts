import fs from 'fs';
import path from 'path';

import Showdown from 'showdown';

import cloc from '../stats/cloc';
import git from '../stats/git';

const [, , ROOT_PATH, clocStatsPath, gitStatsPath] = process.argv;

const sdConverter = new Showdown.Converter({
    literalMidWordUnderscores: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    smartIndentationFix: true,
    disableForced4SpacesIndentedSublists: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
});

const $t = (path: string) => `{{ $t.${path} }}`;

const getSetupScript = (file: string) => `<script setup lang="ts">
import { computed } from 'vue';

import { usePageData } from '@vuepress/client';

import type { DefaultThemePageData } from '@vuepress/theme-default/lib/shared';

const pageData = usePageData<DefaultThemePageData>();
const stats = __VAR__.stats;

const lang = computed(() => pageData.value.lang.replace(/-/gu, '_'));
const $t = computed(() => stats.${file}[lang.value]);
const $formatNum = (num, style) => new Intl.NumberFormat(pageData.value.lang.replace(/_/gu, '-'), {style, minimumFractionDigits: 0, maximumFractionDigits: 2}).format(num)
</script>`;

const getComponent = (file: string, content: string) =>
    `
<template><div>${sdConverter.makeHtml(content)}</div></template>

${getSetupScript(file)}
`.trim();

const writeComponent = (path: string, file: string, content: string) =>
    fs.writeFileSync(path, getComponent(file, content));

const toLocaleNum = (num: number, style = 'decimal') =>
    `{{ $formatNum(${num}, ${JSON.stringify(style)}) }}`;

(async () => {
    if (fs.existsSync(path.resolve(ROOT_PATH, '.git'))) {
        console.time('stats-cloc');
        writeComponent(clocStatsPath, 'cloc', cloc(ROOT_PATH, $t, toLocaleNum));
        console.timeEnd('stats-cloc');
        console.time('stats-git');
        writeComponent(
            gitStatsPath,
            'git',
            await git(ROOT_PATH, $t, toLocaleNum)
        );
        console.timeEnd('stats-git');
    } else {
        const excuseMessage =
            'This project is not a git repository. Stats will not be generated.';
        writeComponent(clocStatsPath, 'cloc', excuseMessage);
        writeComponent(gitStatsPath, 'git', excuseMessage);
    }
})();

/*
Ideas:
    * build stats (both stable & beta) [get from buildStats file]
        * version
        * size
        * amount of files
        * duration
 */
