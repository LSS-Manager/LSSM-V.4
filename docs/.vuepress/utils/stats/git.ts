import { execSync } from 'child_process';

import simpleGit, { type LogResult } from 'simple-git';

import config from '../../../../src/config';

export default async (
    ROOT_PATH: string,
    $t: (path: string) => string,
    toLocaleNum: (num: number, style?: string) => string
): Promise<string> => {
    const git = simpleGit(ROOT_PATH);

    // update master and dev branches
    const { current: currentBranch } = await git.branch();
    const updateBranches = [];
    if (currentBranch !== 'dev')
        updateBranches.push(git.fetch('origin', 'dev:dev'));
    if (currentBranch !== 'master')
        updateBranches.push(git.fetch('origin', 'master:master'));
    await Promise.all(updateBranches);

    const gitTime = new Date();
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
* ${text}: [${commit.hash.substring(0, 10)}](https://github.com/${
            config.github.repo
        }/commit/${commit.hash})
  * \`${commit.message}\`
  * ${formatDate(commit.date)}
`.trim();
    };

    return `
*updated at ${gitTime.toISOString()}*
        
* ${$t('sum.beta')}: ${toLocaleNum(amountOfCommits)}
* ${$t('sum.stable')}: ${toLocaleNum(amountOfCommitsStable)}
${getCommitText($t('first'), firstCommit)}
${getCommitText($t('latest.beta'), latestCommit)}
${getCommitText($t('latest.stable'), latestCommitStable)}
* ${$t('changes.title')}:
  * ${$t('changes.files')}: ${toLocaleNum(changes.changes)}
  * ${$t('changes.insertions')}: ${toLocaleNum(changes.insertions)}
  * ${$t('changes.deletions')}: ${toLocaleNum(changes.deletions)}
`.trim();
};
