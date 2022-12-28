import { execSync } from 'child_process';
import fs from 'fs';

import Showdown from 'showdown';
import simpleGit, { type LogResult } from 'simple-git';

interface ClocResult {
    header: {
        cloc_url: string;
        cloc_version: string;
        elapsed_seconds: number;
        n_files: number;
        n_lines: number;
        files_per_second: number;
        lines_per_second: number;
    };
    SUM: {
        blank: number;
        comment: number;
        code: number;
        nFiles: number;
    };
}

type AbsoluteClocResult = ClocResult &
    Record<
        string,
        {
            nFiles: number;
            blank: number;
            comment: number;
            code: number;
        }
    >;
type RelativeClocResult = ClocResult &
    Record<
        string,
        {
            nFiles: number;
            blank_pct: number;
            comment_pct: number;
            code: number;
        }
    >;

const [, , repository, ROOT_PATH, clocStatsPath, commitStatsPath] =
    process.argv;

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
</script>`;

const clocBin = '"$(yarn workspace lss-manager-v4-docs bin cloc)"';

const absoluteClocStats: AbsoluteClocResult = JSON.parse(
    execSync(
        `cd "${ROOT_PATH}" && ${clocBin} --vcs git --skip-uniqueness --json`
    ).toString()
);
const relativeClocStats: RelativeClocResult = JSON.parse(
    execSync(
        `cd "${ROOT_PATH}" && ${clocBin} --vcs git --skip-uniqueness --json --by-percent cmb`
    ).toString()
);

const clocHeaderStats = absoluteClocStats.header;

const intToLocaleNum = (num: number) =>
    `{{parseInt("${num}").toLocaleString()}}`;
const floatToLocaleNum = (num: number, fixed = 2) =>
    `{{parseFloat("${num.toFixed(fixed)}").toLocaleString()}}`;

const fullClocResult = `
<template><div>${sdConverter.makeHtml(
    `
*generated with [cloc v ${clocHeaderStats.cloc_version}](https://${
        clocHeaderStats.cloc_url
    }) in ${(
        absoluteClocStats.header.elapsed_seconds +
        relativeClocStats.header.elapsed_seconds
    ).toFixed(2)}s*

|${$t('language')}|${$t('files')} (%)|${$t('blank')} (%)|${$t(
        'comment'
    )} (%)|${$t('code')} (%)|${$t('total')}|${$t('percentOfLines')}|
|:-------|--------:|--------:|----------:|-------:|----:|---------:|
${Object.entries(absoluteClocStats)
    .filter(([key]) => !['header', 'SUM'].includes(key))
    .sort(([, { code: codeA }], [, { code: codeB }]) => codeB - codeA)
    .map(
        ([lang, { nFiles, blank, comment, code }]) =>
            `|${[
                lang,
                `${intToLocaleNum(nFiles)} (${floatToLocaleNum(
                    (nFiles / absoluteClocStats.SUM.nFiles) * 100
                )}%)`,
                `${intToLocaleNum(blank)} (${floatToLocaleNum(
                    relativeClocStats[lang].blank_pct
                )}%)`,
                `${intToLocaleNum(comment)} (${floatToLocaleNum(
                    relativeClocStats[lang].comment_pct
                )}%)`,
                `${intToLocaleNum(code)} (${floatToLocaleNum(
                    100 -
                        (relativeClocStats[lang].blank_pct +
                            relativeClocStats[lang].comment_pct)
                )}%)`,
                intToLocaleNum(blank + comment + code),
                `${floatToLocaleNum(
                    ((blank + comment + code) / clocHeaderStats.n_lines) * 100
                )}%`,
            ].join('|')}|`
    )
    .join('\n')}
|||||||
|${[
        $t('sum.toUpperCase()'),
        intToLocaleNum(absoluteClocStats.SUM.nFiles),
        `${intToLocaleNum(absoluteClocStats.SUM.blank)} (${floatToLocaleNum(
            relativeClocStats.SUM.blank
        )}%)`,
        `${intToLocaleNum(absoluteClocStats.SUM.comment)} (${floatToLocaleNum(
            relativeClocStats.SUM.comment
        )}%)`,
        `${intToLocaleNum(absoluteClocStats.SUM.code)} (${floatToLocaleNum(
            100 - (relativeClocStats.SUM.blank + relativeClocStats.SUM.comment)
        )}%)`,
        intToLocaleNum(clocHeaderStats.n_lines),
        '100%',
    ]
        .map(c => `**${c}**`)
        .join('|')}|
`.trim()
)}</div></template>

${getSetupScript('cloc')}
`.trim();

fs.writeFileSync(clocStatsPath, fullClocResult);

(async () => {
    const git = simpleGit(ROOT_PATH);

    // update master and dev branches
    await Promise.all([
        git.fetch('origin', 'dev:dev'),
        git.fetch('origin', 'master:master'),
    ]);

    const { total: amountOfCommits } = await git.log(['dev']);
    const { total: amountOfCommitsStable } = await git.log(['master']);

    const { latest: firstCommit } = await git.log(['dev', '--max-parents=0']);

    const { latest: latestCommit } = await git.log(['dev', '--max-count=1']);
    const { latest: latestCommitStable } = await git.log([
        'master',
        '--max-count=1',
    ]);

    const changes = execSync('git log dev --format="" --shortstat')
        .toString()
        .split('\n')
        .map(
            line =>
                line
                    .trim()
                    .match(
                        /^(?<changes>\d+) files? changed(?:, (?<insertions>\d+) insertions?\(\+\))?(?:, (?<deletions>\d+) deletions?\(-\))?/u
                    )?.groups
        )
        .reduce(
            (acc, item) => {
                const changes = parseInt(item?.changes ?? '0');
                const insertions = parseInt(item?.insertions ?? '0');
                const deletions = parseInt(item?.deletions ?? '0');
                return {
                    changes:
                        acc.changes + (Number.isNaN(changes) ? 0 : changes),
                    deletions:
                        acc.deletions +
                        (Number.isNaN(deletions) ? 0 : deletions),
                    insertions:
                        acc.insertions +
                        (Number.isNaN(insertions) ? 0 : insertions),
                };
            },
            { changes: 0, insertions: 0, deletions: 0 }
        );

    const padNumber = (num: number) => num.toString().padStart(2, '0');

    const formatDate = (dateInput: string): string => {
        const date = new Date(dateInput);
        const dateString = `${date.getFullYear()}-${padNumber(
            date.getMonth() + 1
        )}-${padNumber(date.getDate())}`;
        const timeString = `${padNumber(date.getHours())}:${padNumber(
            date.getMinutes()
        )}:${padNumber(date.getSeconds())}`;
        return `${dateString} ${timeString} ${
            dateInput
                .split(/(?=[+-])/gu)
                .at(-1)
                ?.replace(/:/gu, '') ?? ''
        }`;
    };

    const getCommitText = (
        text: string,
        commit: LogResult['latest']
    ): string => {
        if (!commit) return '';
        return `
* ${text}: [${commit.hash.substring(
            0,
            10
        )}](https://github.com/${repository}/commit/${commit.hash})
  * \`${commit.message}\`
  * ${formatDate(commit.date)}
`.trim();
    };

    fs.writeFileSync(
        commitStatsPath,
        `
<template><div>
    ${sdConverter.makeHtml(
        `
* ${$t('sum.beta')}: ${intToLocaleNum(amountOfCommits)}
* ${$t('sum.stable')}: ${intToLocaleNum(amountOfCommitsStable)}
${getCommitText($t('first'), firstCommit)}
${getCommitText($t('latest.beta'), latestCommit)}
${getCommitText($t('latest.stable'), latestCommitStable)}
* ${$t('changes.title')}:
  * ${$t('changes.files')}: ${intToLocaleNum(changes.changes)}
  * ${$t('changes.insertions')}: ${intToLocaleNum(changes.insertions)}
  * ${$t('changes.deletions')}: ${intToLocaleNum(changes.deletions)}
`.trim()
    )}
</div></template>

${getSetupScript('commits')}
`.trim()
    );
})();

/*
Ideas:
    * build stats (both stable & beta) [get from buildStats file]
        * version
        * size
        * amount of files
        * duration
 */
