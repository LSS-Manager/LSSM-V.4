import { execSync } from 'child_process';
import fs from 'fs';

import Showdown from 'showdown';

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

const [, , ROOT_PATH, VUEPRESS_PATH, clocStatsPath] = process.argv;

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

const absoluteClocStats: AbsoluteClocResult = JSON.parse(
    execSync(
        `cd "${ROOT_PATH}" && "${VUEPRESS_PATH}/node_modules/.bin/cloc" --vcs git --skip-uniqueness --json`
    ).toString()
);
const relativeClocStats: RelativeClocResult = JSON.parse(
    execSync(
        `cd "${ROOT_PATH}" && "${VUEPRESS_PATH}/node_modules/.bin/cloc" --vcs git --skip-uniqueness --json --by-percent cmb`
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

|Language|files|blank (%)|comment (%)|code (%)|total|% of lines|
|:-------|----:|--------:|----------:|-------:|----:|---------:|
${Object.entries(absoluteClocStats)
    .filter(([key]) => !['header', 'SUM'].includes(key))
    .sort(([, { code: codeA }], [, { code: codeB }]) => codeB - codeA)
    .map(
        ([lang, { nFiles, blank, comment, code }]) =>
            `|${[
                lang,
                intToLocaleNum(nFiles),
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
        'SUM',
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

<script setup></script>
`.trim();

fs.writeFileSync(clocStatsPath, fullClocResult);

/*
Ideas:
    * amount of commits
        git log --format=oneline | wc -l
    * first commit
        git log --reverse --format=%h | head -1
        git log --reverse --format="%h: %s %n %ai (%ar)" | head -2
 */
