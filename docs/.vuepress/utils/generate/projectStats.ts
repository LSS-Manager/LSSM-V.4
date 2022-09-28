import { execSync } from 'child_process';
import fs from 'fs';

import { Octokit } from 'octokit';
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

const repositoryLink = `https://github.com/${repository}`;

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

(async () => {
    const octokit = new Octokit();

    const firstCommit = (
        await octokit.rest.repos.listCommits({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            until: '2020-02-10T15:13:07Z',
        })
    ).data[0];
    const firstCommitHash = firstCommit.sha.slice(0, 10);
    const latestCommit = (
        await octokit.rest.repos.listCommits({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            sha: 'dev',
        })
    ).data[0];
    const latestCommitHash = latestCommit.sha.slice(0, 10);
    const latestCommitStable = (
        await octokit.rest.repos.listCommits({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            sha: 'master',
        })
    ).data[0];
    const latestCommitStableHash = latestCommitStable.sha.slice(0, 10);

    const amountOfCommits = (
        await octokit.rest.repos.compareCommits({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            base: firstCommitHash,
            head: latestCommitHash,
        })
    ).data.ahead_by;
    const amountOfCommitsStable =
        (
            await octokit.rest.repos.compareCommits({
                owner: repository.split('/')[0],
                repo: repository.split('/')[1],
                base: firstCommitHash,
                head: latestCommitStableHash,
            })
        ).data.ahead_by + 1;

    fs.writeFileSync(
        commitStatsPath,
        `
<template><div>
    ${sdConverter.makeHtml(
        `
* Commits on beta: ${intToLocaleNum(amountOfCommits)}
* Commits on stable: ${intToLocaleNum(amountOfCommitsStable)}
* first commit: [${firstCommitHash}](${repositoryLink}/commit/${firstCommitHash})
  * > ${firstCommit.commit.message
      .split('\n')
      .filter(l => l.trim())
      .join('\n    > ')}
* latest commit on beta: [${latestCommitHash}](${repositoryLink}/commit/${latestCommitHash})
  * > ${latestCommit.commit.message
      .split('\n')
      .filter(l => l.trim())
      .join('\n    > ')}
* latest commit on stable: [${latestCommitStableHash}](${repositoryLink}/commit/${latestCommitStableHash})
  * > ${latestCommitStable.commit.message
      .split('\n')
      .filter(l => l.trim())
      .join('\n    > ')}
`.trim()
    )}
</div></template>

<script setup></script>
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
    * total amount of changes in all beta commits
 */
