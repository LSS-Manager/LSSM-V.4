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

const [
    ,
    ,
    repository,
    ROOT_PATH,
    VUEPRESS_PATH,
    clocStatsPath,
    commitStatsPath,
] = process.argv;

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
        `cd "${ROOT_PATH}" && cloc --vcs git --skip-uniqueness --json`
    ).toString()
);
const relativeClocStats: RelativeClocResult = JSON.parse(
    execSync(
        `cd "${ROOT_PATH}" && cloc --vcs git --skip-uniqueness --json --by-percent cmb`
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

|Language|files (%)|blank (%)|comment (%)|code (%)|total|% of lines|
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

const amountOfCommits = parseInt(
    execSync('git log --format=oneline | wc -l').toString()
);
const amountOfCommitsStable = parseInt(
    execSync('git log master --format=oneline | wc -l').toString()
);
const firstCommit = execSync(
    'git log --reverse --format="%h: %s %n %ai" --shortstat | head -4'
).toString();
const firstCommitHash = firstCommit.match(/^[\da-f]{8}(?=:)/u)?.[0] ?? '';
const latestCommit = execSync(
    'git log --format="%h: %s %n %ai" --shortstat -1'
).toString();
const latestCommitHash = latestCommit.match(/^[\da-f]{8}(?=:)/u)?.[0] ?? '';
const latestCommitStable = execSync(
    'git log master --format="%h: %s %n %ai" --shortstat -1'
).toString();
const latestCommitStableHash =
    latestCommitStable.match(/^[\da-f]{8}(?=:)/u)?.[0] ?? '';
const changes = execSync(
    'git log --format="%h" --shortstat | grep -E "^ [0-9]+ files? changed"'
)
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
                changes: acc.changes + (Number.isNaN(changes) ? 0 : changes),
                deletions:
                    acc.deletions + (Number.isNaN(deletions) ? 0 : deletions),
                insertions:
                    acc.insertions +
                    (Number.isNaN(insertions) ? 0 : insertions),
            };
        },
        { changes: 0, insertions: 0, deletions: 0 }
    );

fs.writeFileSync(
    commitStatsPath,
    `
<template><div>
    ${sdConverter.makeHtml(
        `
* Commits on beta: ${intToLocaleNum(amountOfCommits)}
* Commits on stable: ${intToLocaleNum(amountOfCommitsStable)}
* first commit: [${firstCommitHash}](${repository}/commit/${firstCommitHash})
  * > ${firstCommit
      .split('\n')
      .filter(l => l.trim())
      .join('\n    > ')}
* latest commit on beta: [${latestCommitHash}](${repository}/commit/${latestCommitHash})
  * > ${latestCommit
      .split('\n')
      .filter(l => l.trim())
      .join('\n    > ')}
* latest commit on stable: [${latestCommitStableHash}](${repository}/commit/${latestCommitStableHash})
  * > ${latestCommitStable
      .split('\n')
      .filter(l => l.trim())
      .join('\n    > ')}
* total amount of changes in all commits (beta):
  * files changed: ${intToLocaleNum(changes.changes)}
  * insertions: ${intToLocaleNum(changes.insertions)}
  * deletions: ${intToLocaleNum(changes.deletions)}
`.trim()
    )}
</div></template>

<script setup></script>
`.trim()
);

/*
Ideas:
    * build stats (both stable & beta) [get from buildStats file]
        * version
        * size
        * amount of files
        * duration
 */
